import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

export type Database = {
  public: {
    Tables: {
      conversations: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          status: 'active' | 'closed' | 'waiting'
          user_id: string | null
          user_email: string | null
          user_name: string | null
          last_message: string | null
          last_message_at: string | null
          assigned_agent: string | null
          priority: 'low' | 'medium' | 'high' | 'urgent'
          source: string
          metadata: Record<string, unknown> | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          status?: 'active' | 'closed' | 'waiting'
          user_id?: string | null
          user_email?: string | null
          user_name?: string | null
          last_message?: string | null
          last_message_at?: string | null
          assigned_agent?: string | null
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          source?: string
          metadata?: Record<string, unknown> | null
        }
      }
      messages: {
        Row: {
          id: string
          created_at: string
          conversation_id: string
          sender_type: 'user' | 'agent' | 'system' | 'ai'
          sender_id: string | null
          sender_name: string | null
          content: string
          attachments: Record<string, unknown>[] | null
          metadata: Record<string, unknown> | null
          read_at: string | null
          edited_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          conversation_id: string
          sender_type: 'user' | 'agent' | 'system' | 'ai'
          sender_id?: string | null
          sender_name?: string | null
          content: string
          attachments?: Record<string, unknown>[] | null
          metadata?: Record<string, unknown> | null
          read_at?: string | null
          edited_at?: string | null
        }
      }
      agents: {
        Row: {
          id: string
          created_at: string
          email: string
          name: string
          avatar_url: string | null
          status: 'online' | 'away' | 'offline'
          role: 'admin' | 'agent' | 'supervisor'
          last_seen_at: string | null
          metadata: Record<string, unknown> | null
        }
      }
      typing_indicators: {
        Row: {
          id: string
          created_at: string
          conversation_id: string
          user_id: string
          user_name: string
          is_typing: boolean
          updated_at: string
        }
      }
    }
  }
}
