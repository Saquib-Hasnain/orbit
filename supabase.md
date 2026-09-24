# Supabase Local Development & Credentials Guide

This document contains local URLs, ports, credentials, and commands for the local Supabase stack powering **Orbit**.

---

## 🌐 Local URLs & Service Endpoints

When running `npx supabase start`, the following services and web interfaces are available:

| Service | Local URL / Endpoint | Port | Description |
|---|---|---|---|
| **Supabase Studio (Dashboard)** | [http://127.0.0.1:54323](http://127.0.0.1:54323) | `54323` | Web UI for database tables, SQL editor, auth users, storage, and logs |
| **API Gateway (REST / GraphQL)** | [http://127.0.0.1:54321](http://127.0.0.1:54321) | `54321` | PostgREST API & GoTrue Auth endpoint |
| **PostgreSQL Direct Connection** | `postgresql://postgres:postgres@127.0.0.1:54322/postgres` | `54322` | Direct database connection (for pgAdmin, DBeaver, TablePlus, or psql) |
| **Inbucket (Email Testing)** | [http://127.0.0.1:54324](http://127.0.0.1:54324) | `54324` | Local mailbox web UI to view outgoing auth/confirmation emails |
| **Database Pooler (PgBouncer)** | `postgresql://postgres:postgres@127.0.0.1:54329/postgres` | `54329` | Transaction pooler (if enabled) |
| **Edge Functions Runtime** | `http://127.0.0.1:54321/functions/v1/` | `54321` | Local Deno Edge Runtime endpoint |
| **Realtime Server** | `ws://127.0.0.1:54321/realtime/v1` | `54321` | WebSocket endpoint for live board updates |
| **Storage API** | `http://127.0.0.1:54321/storage/v1` | `54321` | S3-compatible file storage API |

---

## 🔑 Access Keys & JWT Credentials

These are standard development keys used for local Supabase Docker instances:

### 1. Public Anonymous Key (`anon`)
Used by client-side components and browser requests (safe to expose publicly):
```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
```

### 2. Service Role Key (`service_role`)
Used **only** on the backend / server side to bypass Row Level Security (RLS) for admin operations (never expose to client):
```env
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
```

### 3. JWT Secret (Local Default)
```
super-secret-jwt-token-with-at-least-32-characters-long
```

---

## 🗄️ Database Connection Details

Use these parameters in any external GUI client (e.g. TablePlus, DBeaver, pgAdmin, VS Code Database Extension):

| Parameter | Value |
|---|---|
| **Host** | `127.0.0.1` or `localhost` |
| **Port** | `54322` |
| **Database** | `postgres` |
| **User** | `postgres` |
| **Password** | `postgres` |
| **SSL Mode** | `Disable` (or `Allow`) |
| **Connection URI** | `postgresql://postgres:postgres@127.0.0.1:54322/postgres` |

---

## 💻 CLI Commands Cheat Sheet

Run these commands from the project root:

```bash
# Start all local Supabase containers (requires Docker Desktop running)
npx supabase start

# Stop all local Supabase containers
npx supabase stop

# Check status and print current ports/keys
npx supabase status

# Reset local database (re-runs all migrations and seed.sql)
npx supabase db reset

# Create a new migration file from schema differences
npx supabase db diff -f <migration_name>

# Create an empty new migration file
npx supabase migration new <migration_name>

# Generate TypeScript types from local database schema
npx supabase gen types typescript --local > types/database.ts
```

---

## 📁 Code Integration in Orbit

Orbit uses `@supabase/ssr` with separate utilities for each Next.js execution context:

- **Server Components & Server Actions:** `lib/supabase/server.ts`
  ```ts
  import { createClient } from '@/lib/supabase/server'
  const supabase = await createClient()
  ```
- **Client Components:** `lib/supabase/client.ts`
  ```ts
  import { createClient } from '@/lib/supabase/client'
  const supabase = createClient()
  ```
- **Next.js 16 Proxy / Session Refresh:** `lib/supabase/middleware.ts` / `proxy.ts`
