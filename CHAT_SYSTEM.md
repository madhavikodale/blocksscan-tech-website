# BlocksScan Chat System - Setup Guide

## Overview

A production-ready real-time chat system built with Supabase Realtime + Custom UI, integrated into the BlocksScan Technology website.

## Features

- **Floating Chat Widget** — Available on every page
- **Real-time Messaging** — WebSocket-based via Supabase Realtime
- **Typing Indicators** — Live typing status
- **Online/Offline Status** — Agent availability tracking
- **Chat History Persistence** — All messages stored in PostgreSQL
- **Responsive Design** — Works on all devices
- **Theme Support** — Light / Dim / Dark modes matching existing design
- **Admin Dashboard** — Manage conversations at `/admin/chat`
- **Glassmorphism UI** — Matches existing BlocksScan aesthetic
- **Row-Level Security** — Secure data access policies
- **Modular Architecture** — Ready for AI assistant integration

## Architecture

```
src/
├── components/
│   ├── chat/
│   │   ├── chat-context.tsx      # Global chat state + Supabase realtime
│   │   ├── chat-widget.tsx       # Floating widget UI
│   │   └── chat-admin-dashboard.tsx  # Admin panel
│   └── ui/
│       └── table.tsx             # Added table component
├── lib/
│   └── supabase.ts               # Supabase client
├── app/
│   ├── layout.tsx                  # ChatProvider + ChatWidget injected
│   └── admin/
│       └── chat/
│           └── page.tsx            # Admin dashboard route
└── app/globals.css                 # Added --warning CSS variable

supabase/
└── schema.sql                      # Database schema + RLS policies
```

## Database Schema

### Tables

- **conversations** — Chat threads with status, priority, assignment
- **messages** — Individual messages with sender metadata
- **agents** — Support agent profiles with online status
- **typing_indicators** — Real-time typing state

### Row-Level Security

- Users can only view their own conversations
- Agents can view all conversations
- Anyone can view online agents
- All inserts are open (anonymous users need to create conversations)

## Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy the **Project URL** and **Anon Key** from Settings > API

### 2. Configure Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Run Database Schema

1. Open Supabase Dashboard > SQL Editor
2. Copy contents of `supabase/schema.sql`
3. Run the SQL script

### 4. Enable Realtime

1. Go to Database > Replication
2. Enable realtime for tables: `conversations`, `messages`, `typing_indicators`, `agents`

### 5. Add Sample Agent (Optional)

```sql
INSERT INTO agents (email, name, status, role)
VALUES ('admin@blocksscan.tech', 'Support Agent', 'online', 'admin');
```

### 6. Update Supabase Client

Replace placeholder values in `src/lib/supabase.ts` with your actual credentials:

```typescript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'
```

## Usage

### For Website Visitors

- Click the floating chat button (bottom-right corner)
- Enter name and email (first time)
- Start chatting with support
- Messages persist across page navigation

### For Admin

- Navigate to `/admin/chat`
- View all conversations
- Filter by status, priority, search
- Assign agents to conversations
- Set priority levels
- Close resolved conversations

## Customization

### Themes
The chat widget automatically inherits the site's theme (light/dim/dark) via CSS variables defined in `globals.css`.

### Colors
All colors use the existing BlocksScan design tokens:
- `--glass-bg`, `--glass-border` — Glassmorphism effects
- `--primary`, `--accent` — Brand colors
- `--text-primary`, `--text-secondary` — Typography
- `--success`, `--warning`, `--error` — Status indicators

### AI Integration
The `sender_type` enum includes `'ai'` — ready for future AI assistant integration. Add AI responses by inserting messages with `sender_type: 'ai'`.

## Production Checklist

- [ ] Set up Supabase project with production database
- [ ] Configure environment variables on hosting platform
- [ ] Run database schema migration
- [ ] Enable realtime replication
- [ ] Add agent accounts
- [ ] Test RLS policies
- [ ] Configure CORS in Supabase (if needed)
- [ ] Set up rate limiting (Supabase API settings)
- [ ] Add monitoring/alerts for Supabase usage

## Files Created/Modified

**New files:**
- `src/lib/supabase.ts`
- `src/components/chat/chat-context.tsx`
- `src/components/chat/chat-widget.tsx`
- `src/components/chat/chat-admin-dashboard.tsx`
- `src/components/ui/table.tsx`
- `src/app/admin/chat/page.tsx`
- `supabase/schema.sql`

**Modified files:**
- `src/app/layout.tsx` — Added ChatProvider + ChatWidget
- `src/app/globals.css` — Added `--warning` CSS variable
- `package.json` — Added `@supabase/supabase-js`, `date-fns`, `uuid`

## Notes

- The chat widget uses anonymous user IDs stored in localStorage (no login required for visitors)
- Admin access requires agent authentication (extend as needed)
- Supabase free tier includes 500MB database + 2GB bandwidth — sufficient for MVP
- For high traffic, upgrade to Supabase Pro ($25/mo) for connection pooling + more bandwidth
