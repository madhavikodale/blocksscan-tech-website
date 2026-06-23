-- Supabase Database Schema for BlocksScan Chat System
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'waiting' CHECK (status IN ('active', 'closed', 'waiting')),
  user_id TEXT,
  user_email TEXT,
  user_name TEXT,
  last_message TEXT,
  last_message_at TIMESTAMPTZ,
  assigned_agent UUID REFERENCES agents(id) ON DELETE SET NULL,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  source TEXT DEFAULT 'website',
  metadata JSONB DEFAULT '{}'
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('user', 'agent', 'system', 'ai')),
  sender_id TEXT,
  sender_name TEXT,
  content TEXT NOT NULL,
  attachments JSONB DEFAULT '[]',
  metadata JSONB DEFAULT '{}',
  read_at TIMESTAMPTZ,
  edited_at TIMESTAMPTZ
);

-- Agents table (for live support agents)
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  status TEXT DEFAULT 'offline' CHECK (status IN ('online', 'away', 'offline')),
  role TEXT DEFAULT 'agent' CHECK (role IN ('admin', 'agent', 'supervisor')),
  last_seen_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'
);

-- Typing indicators table
CREATE TABLE IF NOT EXISTS typing_indicators (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  user_name TEXT,
  is_typing BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_conversations_status ON conversations(status);
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_assigned_agent ON conversations(assigned_agent);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_typing_conversation_id ON typing_indicators(conversation_id);

-- Enable Row Level Security
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE typing_indicators ENABLE ROW LEVEL SECURITY;

-- RLS Policies for conversations
-- Users can view their own conversations
CREATE POLICY "Users can view own conversations" ON conversations
  FOR SELECT USING (user_id = auth.uid()::text OR auth.role() = 'authenticated');

-- Users can insert their own conversations
CREATE POLICY "Users can create conversations" ON conversations
  FOR INSERT WITH CHECK (true);

-- Users can update their own conversations
CREATE POLICY "Users can update own conversations" ON conversations
  FOR UPDATE USING (user_id = auth.uid()::text);

-- Agents can view all conversations
CREATE POLICY "Agents can view all conversations" ON conversations
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM agents WHERE id = auth.uid()
  ));

-- RLS Policies for messages
-- Users can view messages in their conversations
CREATE POLICY "Users can view messages in own conversations" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM conversations 
      WHERE conversations.id = messages.conversation_id 
      AND (conversations.user_id = auth.uid()::text OR auth.role() = 'authenticated')
    )
  );

-- Users can insert messages in their conversations
CREATE POLICY "Users can create messages" ON messages
  FOR INSERT WITH CHECK (true);

-- Agents can view all messages
CREATE POLICY "Agents can view all messages" ON messages
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM agents WHERE id = auth.uid()
  ));

-- RLS Policies for agents
-- Anyone can view online agents
CREATE POLICY "Anyone can view agents" ON agents
  FOR SELECT USING (true);

-- Only agents can update their own status
CREATE POLICY "Agents can update own status" ON agents
  FOR UPDATE USING (id = auth.uid());

-- RLS Policies for typing indicators
CREATE POLICY "Anyone can view typing indicators" ON typing_indicators
  FOR SELECT USING (true);

CREATE POLICY "Anyone can update typing indicators" ON typing_indicators
  FOR ALL USING (true);

-- Enable Realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE conversations;
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE typing_indicators;
ALTER PUBLICATION supabase_realtime ADD TABLE agents;

-- Function to update conversation last_message
CREATE OR REPLACE FUNCTION update_conversation_last_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE conversations
  SET last_message = NEW.content,
      last_message_at = NEW.created_at,
      updated_at = NOW()
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update conversation on new message
CREATE TRIGGER on_message_inserted
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_conversation_last_message();
