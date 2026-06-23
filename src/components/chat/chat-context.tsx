"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

export type MessageSender = 'user' | 'agent' | 'system' | 'ai'

export interface ChatMessage {
  id: string
  conversation_id: string
  sender_type: MessageSender
  sender_id: string | null
  sender_name: string | null
  content: string
  created_at: string
  read_at: string | null
  attachments?: Record<string, unknown>[] | null
}

export interface Conversation {
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

export interface TypingIndicator {
  conversation_id: string
  user_id: string
  user_name: string
  is_typing: boolean
}

export interface Agent {
  id: string
  name: string
  email: string
  avatar_url: string | null
  status: 'online' | 'away' | 'offline'
  role: 'admin' | 'agent' | 'supervisor'
  last_seen_at: string | null
}

interface ChatContextType {
  // State
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  messages: ChatMessage[]
  conversations: Conversation[]
  currentConversation: Conversation | null
  typingIndicators: TypingIndicator[]
  agents: Agent[]
  isLoading: boolean
  isSending: boolean
  unreadCount: number
  userId: string
  userName: string
  userEmail: string
  isAdmin: boolean
  onlineAgents: number
  
  // Actions
  sendMessage: (content: string) => Promise<void>
  createConversation: () => Promise<string>
  loadConversation: (conversationId: string) => Promise<void>
  setTyping: (isTyping: boolean) => Promise<void>
  markAsRead: (conversationId: string) => Promise<void>
  closeConversation: (conversationId: string) => Promise<void>
  setUserInfo: (name: string, email: string) => void
  
  // Admin
  assignAgent: (conversationId: string, agentId: string) => Promise<void>
  setPriority: (conversationId: string, priority: Conversation['priority']) => Promise<void>
  loadAllConversations: () => Promise<void>
}

const ChatContext = createContext<ChatContextType | null>(null)

const STORAGE_KEY = 'blocksscan-chat-user'
const CONVERSATION_KEY = 'blocksscan-chat-conversation'

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)
  const [typingIndicators, setTypingIndicators] = useState<TypingIndicator[]>([])
  const [agents, setAgents] = useState<Agent[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [isAdmin, setIsAdmin] = useState(false)
  
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  
  // Initialize user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const data = JSON.parse(stored)
        setUserId(data.userId || uuidv4())
        setUserName(data.userName || '')
        setUserEmail(data.userEmail || '')
      } catch {
        const newId = uuidv4()
        setUserId(newId)
      }
    } else {
      const newId = uuidv4()
      setUserId(newId)
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ userId: newId, userName: '', userEmail: '' }))
    }
  }, [])
  
  // Save user info to localStorage
  useEffect(() => {
    if (userId) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ userId, userName, userEmail }))
    }
  }, [userId, userName, userEmail])
  
  // Load stored conversation
  useEffect(() => {
    if (userId) {
      const storedConv = localStorage.getItem(CONVERSATION_KEY)
      if (storedConv) {
        loadConversation(storedConv)
      }
    }
  }, [userId])
  
  // Subscribe to real-time messages
  useEffect(() => {
    if (!currentConversation?.id) return
    
    const channel = supabase
      .channel(`messages:${currentConversation.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${currentConversation.id}`,
        },
        (payload) => {
          const newMessage = payload.new as ChatMessage
          setMessages((prev) => {
            if (prev.find((m) => m.id === newMessage.id)) return prev
            return [...prev, newMessage]
          })
          
          // Mark as read if chat is open and message is from agent
          if (isOpen && newMessage.sender_type !== 'user') {
            markAsRead(currentConversation.id)
          } else if (!isOpen && newMessage.sender_type !== 'user') {
            setUnreadCount((prev) => prev + 1)
          }
        }
      )
      .subscribe()
    
    return () => {
      supabase.removeChannel(channel)
    }
  }, [currentConversation?.id, isOpen])
  
  // Subscribe to typing indicators
  useEffect(() => {
    if (!currentConversation?.id) return
    
    const channel = supabase
      .channel(`typing:${currentConversation.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'typing_indicators',
          filter: `conversation_id=eq.${currentConversation.id}`,
        },
        (payload) => {
          const indicator = payload.new as TypingIndicator
          setTypingIndicators((prev) => {
            const filtered = prev.filter((t) => t.user_id !== indicator.user_id)
            if (indicator.is_typing) {
              return [...filtered, indicator]
            }
            return filtered
          })
        }
      )
      .subscribe()
    
    return () => {
      supabase.removeChannel(channel)
    }
  }, [currentConversation?.id])
  
  // Subscribe to agents status
  useEffect(() => {
    const channel = supabase
      .channel('agents')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'agents',
        },
        (payload) => {
          const agent = payload.new as Agent
          setAgents((prev) => {
            const filtered = prev.filter((a) => a.id !== agent.id)
            return [...filtered, agent]
          })
        }
      )
      .subscribe()
    
    // Load initial agents
    loadAgents()
    
    return () => {
      supabase.removeChannel(channel)
    }
  }, [])
  
  const loadAgents = async () => {
    const { data } = await supabase.from('agents').select('*')
    if (data) setAgents(data as Agent[])
  }
  
  const onlineAgents = agents.filter((a) => a.status === 'online').length
  
  const createConversation = useCallback(async (): Promise<string> => {
    if (!userId) return ''
    
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('conversations')
        .insert({
          user_id: userId,
          user_name: userName || 'Anonymous',
          user_email: userEmail || null,
          status: 'waiting',
          source: 'website',
          priority: 'medium',
        })
        .select()
        .single()
      
      if (error) throw error
      if (data) {
        const conv = data as Conversation
        setCurrentConversation(conv)
        setMessages([])
        localStorage.setItem(CONVERSATION_KEY, conv.id)
        
        // Add welcome message
        await supabase.from('messages').insert({
          conversation_id: conv.id,
          sender_type: 'system',
          sender_name: 'System',
          content: 'Welcome to BlocksScan Support! An agent will be with you shortly. How can we help you today?',
        })
        
        return conv.id
      }
      return ''
    } catch (err) {
      console.error('Error creating conversation:', err)
      return ''
    } finally {
      setIsLoading(false)
    }
  }, [userId, userName, userEmail])
  
  const loadConversation = useCallback(async (conversationId: string) => {
    setIsLoading(true)
    try {
      // Load conversation
      const { data: convData } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', conversationId)
        .single()
      
      if (convData) {
        setCurrentConversation(convData as Conversation)
        localStorage.setItem(CONVERSATION_KEY, conversationId)
        
        // Load messages
        const { data: msgData } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', conversationId)
          .order('created_at', { ascending: true })
        
        if (msgData) {
          setMessages(msgData as ChatMessage[])
        }
      }
    } catch (err) {
      console.error('Error loading conversation:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])
  
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !currentConversation?.id) return
    
    setIsSending(true)
    try {
      // If no conversation exists, create one
      if (!currentConversation) {
        const convId = await createConversation()
        if (!convId) return
      }
      
      const { error } = await supabase.from('messages').insert({
        conversation_id: currentConversation.id,
        sender_type: 'user',
        sender_id: userId,
        sender_name: userName || 'Anonymous',
        content: content.trim(),
      })
      
      if (error) throw error
    } catch (err) {
      console.error('Error sending message:', err)
    } finally {
      setIsSending(false)
    }
  }, [currentConversation, userId, userName, createConversation])
  
  const setTyping = useCallback(async (isTyping: boolean) => {
    if (!currentConversation?.id || !userId) return
    
    // Debounce typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    
    await supabase.from('typing_indicators').upsert({
      conversation_id: currentConversation.id,
      user_id: userId,
      user_name: userName || 'Anonymous',
      is_typing: isTyping,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'conversation_id,user_id' })
    
    if (isTyping) {
      typingTimeoutRef.current = setTimeout(() => {
        setTyping(false)
      }, 3000)
    }
  }, [currentConversation, userId, userName])
  
  const markAsRead = useCallback(async (conversationId: string) => {
    await supabase
      .from('messages')
      .update({ read_at: new Date().toISOString() })
      .eq('conversation_id', conversationId)
      .is('read_at', null)
      .neq('sender_type', 'user')
    
    setUnreadCount(0)
  }, [])
  
  const closeConversation = useCallback(async (conversationId: string) => {
    await supabase
      .from('conversations')
      .update({ status: 'closed' })
      .eq('id', conversationId)
    
    if (currentConversation?.id === conversationId) {
      setCurrentConversation(null)
      setMessages([])
      localStorage.removeItem(CONVERSATION_KEY)
    }
  }, [currentConversation])
  
  const setUserInfo = useCallback((name: string, email: string) => {
    setUserName(name)
    setUserEmail(email)
  }, [])
  
  // Admin functions
  const loadAllConversations = useCallback(async () => {
    if (!isAdmin) return
    
    const { data } = await supabase
      .from('conversations')
      .select('*')
      .order('updated_at', { ascending: false })
    
    if (data) setConversations(data as Conversation[])
  }, [isAdmin])
  
  const assignAgent = useCallback(async (conversationId: string, agentId: string) => {
    await supabase
      .from('conversations')
      .update({ assigned_agent: agentId, status: 'active' })
      .eq('id', conversationId)
  }, [])
  
  const setPriority = useCallback(async (conversationId: string, priority: Conversation['priority']) => {
    await supabase
      .from('conversations')
      .update({ priority })
      .eq('id', conversationId)
  }, [])
  
  // Open chat resets unread count
  useEffect(() => {
    if (isOpen && currentConversation) {
      markAsRead(currentConversation.id)
    }
  }, [isOpen, currentConversation, markAsRead])
  
  return (
    <ChatContext.Provider
      value={{
        isOpen,
        setIsOpen,
        messages,
        conversations,
        currentConversation,
        typingIndicators,
        agents,
        isLoading,
        isSending,
        unreadCount,
        userId,
        userName,
        userEmail,
        isAdmin,
        onlineAgents,
        sendMessage,
        createConversation,
        loadConversation,
        setTyping,
        markAsRead,
        closeConversation,
        setUserInfo,
        assignAgent,
        setPriority,
        loadAllConversations,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}
