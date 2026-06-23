"use client";

import React, { useState, useRef, useEffect } from 'react'
import { useChat } from './chat-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  MessageCircle, 
  X, 
  Send, 
  Minimize2, 
  User, 
  Bot, 
  Shield,
  Clock,
  Check,
  CheckCheck,
  MoreVertical,
  Phone,
  Mail,
  ArrowLeft
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export function ChatWidget() {
  const { 
    isOpen, 
    setIsOpen, 
    messages, 
    currentConversation, 
    typingIndicators,
    isLoading,
    isSending,
    unreadCount,
    onlineAgents,
    sendMessage,
    createConversation,
    setTyping,
    setUserInfo,
    userName,
    userEmail
  } = useChat()
  
  const [inputValue, setInputValue] = useState('')
  const [showUserForm, setShowUserForm] = useState(false)
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typingIndicators])
  
  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isSending) return
    
    // If no conversation, show user form first
    if (!currentConversation && !userName) {
      setShowUserForm(true)
      return
    }
    
    if (!currentConversation) {
      await createConversation()
    }
    
    await sendMessage(inputValue)
    setInputValue('')
  }
  
  const handleUserFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName.trim()) return
    
    setUserInfo(formName, formEmail)
    setShowUserForm(false)
    
    if (!currentConversation) {
      await createConversation()
    }
    
    if (inputValue.trim()) {
      await sendMessage(inputValue)
      setInputValue('')
    }
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setTyping(e.target.value.length > 0)
  }
  
  const getMessageStatus = (msg: typeof messages[0]) => {
    if (msg.sender_type === 'user') {
      if (msg.read_at) return <CheckCheck className="w-3 h-3 text-emerald-500" />
      return <Check className="w-3 h-3 text-muted-foreground" />
    }
    return null
  }
  
  const getSenderIcon = (senderType: string) => {
    switch (senderType) {
      case 'agent': return <Shield className="w-4 h-4" />
      case 'ai': return <Bot className="w-4 h-4" />
      case 'system': return <Clock className="w-4 h-4" />
      default: return <User className="w-4 h-4" />
    }
  }
  
  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 group"
          style={{
            background: 'var(--btn-primary-bg)',
            boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)',
          }}
        >
          <MessageCircle className="w-6 h-6 text-white" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}
          <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: 'var(--btn-primary-bg)' }} />
        </button>
      )}
      
      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-96px)] rounded-2xl flex flex-col overflow-hidden animate-scale-in"
          style={{
            backgroundColor: 'var(--page-bg-secondary)',
            border: '1px solid var(--glass-border)',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          }}
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between px-4 py-3 border-b"
            style={{ 
              borderColor: 'var(--glass-border)',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--btn-primary-bg)' }}
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                  BlocksScan Support
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${onlineAgents > 0 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {onlineAgents > 0 ? `${onlineAgents} agent${onlineAgents > 1 ? 's' : ''} online` : 'Agents offline'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg transition-colors hover:bg-white/5"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg transition-colors hover:bg-white/5"
                style={{ color: 'var(--text-secondary)' }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {showUserForm ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: 'var(--btn-primary-bg)' }}
                >
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="text-center space-y-1">
                  <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Start a Conversation
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    Please introduce yourself
                  </p>
                </div>
                <form onSubmit={handleUserFormSubmit} className="w-full space-y-3">
                  <Input
                    placeholder="Your name *"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    className="w-full"
                    style={{ 
                      backgroundColor: 'var(--input-bg)',
                      borderColor: 'var(--input-border)',
                      color: 'var(--text-primary)',
                    }}
                  />
                  <Input
                    type="email"
                    placeholder="Your email (optional)"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full"
                    style={{ 
                      backgroundColor: 'var(--input-bg)',
                      borderColor: 'var(--input-border)',
                      color: 'var(--text-primary)',
                    }}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:opacity-90 text-white"
                    disabled={!formName.trim()}
                  >
                    Start Chat
                  </Button>
                </form>
              </div>
            ) : messages.length === 0 && !isLoading ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: 'var(--btn-primary-bg)' }}
                >
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div className="text-center space-y-1">
                  <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Welcome to BlocksScan
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    How can we help you today?
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['Smart Contract Audit', 'Web3 Integration', 'Consulting', 'General Inquiry'].map((topic) => (
                    <button
                      key={topic}
                      onClick={() => {
                        setInputValue(topic)
                        inputRef.current?.focus()
                      }}
                      className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors hover:bg-white/10"
                      style={{ 
                        backgroundColor: 'var(--badge-bg)',
                        border: '1px solid var(--badge-border)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, index) => {
                  const isUser = msg.sender_type === 'user'
                  const showAvatar = index === 0 || messages[index - 1].sender_type !== msg.sender_type
                  
                  return (
                    <div 
                      key={msg.id} 
                      className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isUser && showAvatar && (
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
                          style={{ backgroundColor: 'var(--badge-bg)' }}
                        >
                          {getSenderIcon(msg.sender_type)}
                        </div>
                      )}
                      {!isUser && !showAvatar && <div className="w-8 flex-shrink-0" />}
                      
                      <div className={`max-w-[75%] space-y-1 ${isUser ? 'items-end' : 'items-start'}`}>
                        {showAvatar && (
                          <span className="text-xs font-medium block" style={{ color: 'var(--text-muted)' }}>
                            {msg.sender_name || msg.sender_type}
                          </span>
                        )}
                        <div 
                          className={`px-3 py-2 rounded-xl text-sm ${
                            isUser 
                              ? 'rounded-br-sm' 
                              : msg.sender_type === 'system' 
                                ? 'rounded-lg opacity-70' 
                                : 'rounded-bl-sm'
                          }`}
                          style={{
                            backgroundColor: isUser ? 'var(--primary)' : msg.sender_type === 'system' ? 'transparent' : 'var(--glass-bg)',
                            color: isUser ? 'white' : 'var(--text-primary)',
                            border: isUser ? 'none' : '1px solid var(--glass-border)',
                          }}
                        >
                          {msg.content}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                            {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                          </span>
                          {getMessageStatus(msg)}
                        </div>
                      </div>
                    </div>
                  )
                })}
                
                {/* Typing Indicator */}
                {typingIndicators.length > 0 && (
                  <div className="flex gap-2 justify-start">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'var(--badge-bg)' }}
                    >
                      <Shield className="w-4 h-4" />
                    </div>
                    <div 
                      className="px-4 py-3 rounded-xl rounded-bl-sm"
                      style={{ 
                        backgroundColor: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                      }}
                    >
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--text-muted)', animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--text-muted)', animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--text-muted)', animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </>
            )}
            
            {isLoading && (
              <div className="flex justify-center">
                <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full" />
              </div>
            )}
          </div>
          
          {/* Input Area */}
          <div 
            className="p-3 border-t"
            style={{ 
              borderColor: 'var(--glass-border)',
              backgroundColor: 'var(--glass-bg)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={handleInputChange}
                placeholder={currentConversation ? "Type a message..." : "Start a conversation..."}
                className="flex-1"
                disabled={isSending}
                style={{ 
                  backgroundColor: 'var(--input-bg)',
                  borderColor: 'var(--input-border)',
                  color: 'var(--text-primary)',
                }}
              />
              <Button 
                type="submit" 
                size="icon"
                disabled={!inputValue.trim() || isSending}
                className="bg-gradient-primary hover:opacity-90 text-white disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <div className="mt-2 flex items-center justify-center gap-1">
              <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                Secured by enterprise-grade encryption
              </span>
              <Shield className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
