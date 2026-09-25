# Project Plan & Milestone Tracker: Orbit

> Linear-inspired project management app built with Next.js 16, Supabase, shadcn/ui, Stripe, Resend, and Vercel AI SDK.

**Overall Progress:** `[██░░░░░░░░] 16%` (Milestone 1 Complete)

---

## 📊 Milestone Overview

| # | Milestone | Target | Status | Progress |
|---|---|---|---|---|
| **M1** | [Foundation, Tooling & Theme](#milestone-1-foundation-tooling--theme) | Week 1 | 🟢 Done | `100%` |
| **M2** | [Authentication & User Onboarding](#milestone-2-authentication--user-onboarding) | Week 2 | ⚪ Not Started | `0%` |
| **M3** | [Workspace & Board Management](#milestone-3-workspace--board-management) | Week 3-4 | ⚪ Not Started | `0%` |
| **M4** | [Kanban Board & Drag-and-Drop](#milestone-4-kanban-board--drag-and-drop) | Week 5 | ⚪ Not Started | `0%` |
| **M5** | [Team Management & Permissions](#milestone-5-team-management--permissions) | Week 6 | ⚪ Not Started | `0%` |
| **M6** | [AI Features & Stripe Subscriptions](#milestone-6-ai-features--stripe-subscriptions) | Week 7-8 | ⚪ Not Started | `0%` |

**Status Legend:**
- 🟢 Done
- 🟡 In Progress
- ⚪ Not Started
- 🔴 Blocked

---

## Milestone 1: Foundation, Tooling & Theme
**Objective:** Set up developer environment, local database, styling system, and base layout.
**Status:** 🟢 Done

### Tasks
- [x] **1.1 Base Next.js Project**
  - [x] Next.js 16 App Router initialized with TypeScript
  - [x] Tailwind CSS v4 configured with PostCSS
  - [x] Base font setup (Geist Sans & Mono)
- [x] **1.2 UI & Theming System**
  - [x] Initialize `shadcn/ui` with Tailwind v4 compatibility
  - [x] Install `next-themes` for theme provider
  - [x] Set dark mode as default with light mode toggle
  - [x] Add core base UI components (`button`, `input`, `dialog`, `dropdown-menu`, `avatar`, `card`, `tooltip`, `sonner`)
- [x] **1.3 Local Database & Supabase Stack**
  - [x] Initialize Supabase configuration (`supabase init`)
  - [x] Configure local Docker environment (`supabase start` config)
  - [x] Create initial environment variables template (`.env.example` & `.env.local`)
  - [x] Set up Supabase client utilities for Server Components & Client Components (`lib/supabase/`)
- [x] **1.4 Project Architecture & Layout Shell**
  - [x] Create folder structure (`app/(auth)`, `app/(workspace)`, `components/`, `lib/`, `types/`)
  - [x] Configure global error boundary, 404, and loading states
  - [x] Verify build and linting checks (`npm run build`, `npm run lint`)

### Deliverables & Acceptance Criteria
- [x] `npm run dev` and `npm run build` run without errors
- [x] Dark mode is active by default; theme toggle switches cleanly
- [x] Base shadcn/ui components render properly with design tokens

---

## Milestone 2: Authentication & User Onboarding
**Objective:** Complete auth flows, initial team creation, email delivery, and route protection.
**Status:** ⚪ Not Started

### Tasks
- [ ] **2.1 Supabase Auth & Schema Setup**
  - [ ] Define initial SQL migration for `users`, `teams`, `team_members`
  - [ ] Set up Row Level Security (RLS) policies for user profiles & team memberships
  - [ ] Configure Supabase Auth triggers (auto-create user profile on auth signup)
- [ ] **2.2 Auth Pages & State**
  - [ ] Create Sign Up page (`app/(auth)/sign-up/page.tsx`)
  - [ ] Create Sign In page (`app/(auth)/sign-in/page.tsx`)
  - [ ] Implement OAuth providers (GitHub/Google) & Magic Link / Password auth
  - [ ] Build Next.js 16 Auth Middleware / route guards for protected routes
- [ ] **2.3 Onboarding Flow**
  - [ ] Create onboarding wizard (`app/(onboarding)/setup/page.tsx`)
  - [ ] Collect user details (name, avatar)
  - [ ] Create initial team / workspace (team name, slug generation)
  - [ ] Auto-assign user as `owner` of the created team
- [ ] **2.4 Transactional Email Integration**
  - [ ] Integrate Resend SDK (`lib/email/resend.ts`)
  - [ ] Build React Email welcome email template
  - [ ] Trigger welcome email on completed onboarding

### Deliverables & Acceptance Criteria
- [ ] Unauthenticated users are redirected from `/[teamSlug]` to `/sign-in`
- [ ] New user signs up, finishes onboarding, and lands on their newly created workspace
- [ ] Welcome email arrives via Resend

---

## Milestone 3: Workspace & Board Management
**Objective:** Workspace shell, sidebar navigation, team switching, and board CRUD.
**Status:** ⚪ Not Started

### Tasks
- [ ] **3.1 Workspace Layout & Navigation**
  - [ ] Build workspace sidebar (`components/workspace/sidebar.tsx`)
  - [ ] Implement team switcher dropdown
  - [ ] Build user menu & profile popover
  - [ ] Build breadcrumb navigation & command palette (Cmd+K)
- [ ] **3.2 Database Schema for Boards & Tasks**
  - [ ] Migration for `boards`, `columns`/`statuses`, `tasks`, `labels`
  - [ ] Write RLS policies ensuring team isolation for boards & tasks
  - [ ] Create database seed script with sample board and tasks
- [ ] **3.3 Board CRUD Operations**
  - [ ] Board listing view (`app/(workspace)/[teamSlug]/page.tsx`)
  - [ ] Create board modal with custom templates/defaults
  - [ ] Edit board title, description, and settings
  - [ ] Archive / delete board with confirmation dialog
- [ ] **3.4 Task Listing (List View)**
  - [ ] List view component for tasks within a board
  - [ ] Task quick-create inline input
  - [ ] Task filtering (by priority, assignee, status) and search

### Deliverables & Acceptance Criteria
- [ ] Users can navigate between multiple teams/workspaces
- [ ] Creating a board generates default status columns (Backlog, Todo, In Progress, Done)
- [ ] Fast client-side navigation with Server Component data fetching

---

## Milestone 4: Kanban Board & Drag-and-Drop
**Objective:** Linear-quality interactive kanban board with real-time updates and task details.
**Status:** ⚪ Not Started

### Tasks
- [ ] **4.1 Kanban UI & Layout**
  - [ ] Column layout with status indicators, task counters, and add task button
  - [ ] Task card component with priority badges, assignees, label pills, due dates
  - [ ] Responsive horizontal scrolling column container
- [ ] **4.2 Drag-and-Drop Implementation**
  - [ ] Integrate `@dnd-kit/core` and `@dnd-kit/sortable`
  - [ ] Drag task cards between columns
  - [ ] Reorder task cards within the same column
  - [ ] Optimistic UI state updates with rollback on network failure
- [ ] **4.3 Task Detail & Modal / Sheet**
  - [ ] Slide-over drawer or modal for task details
  - [ ] Rich text / markdown task description editor
  - [ ] Quick properties changer (status, priority, assignee, due date, labels)
  - [ ] Task comments section & activity log
- [ ] **4.4 Real-Time Collaboration**
  - [ ] Supabase Realtime channel subscription for board tasks
  - [ ] Live task move / edit updates across multiple browser sessions
  - [ ] User presence indicator (who is currently viewing the board)

### Deliverables & Acceptance Criteria
- [ ] Smooth 60fps drag-and-drop experience
- [ ] Moving a task in one window updates in real-time in another window
- [ ] Task state changes persist to Supabase with proper ordering index

---

## Milestone 5: Team Management & Permissions
**Objective:** Invite team members, configure roles (RBAC), and manage workspace settings.
**Status:** ⚪ Not Started

### Tasks
- [ ] **5.1 Role-Based Access Control (RBAC)**
  - [ ] Define role permissions (`owner`, `admin`, `member`, `viewer`)
  - [ ] Enforce permission checks on API routes and Server Actions
  - [ ] Add RLS enforcement for role-gated mutations
- [ ] **5.2 Member Invitation System**
  - [ ] Database schema for `team_invitations` with expiration tokens
  - [ ] Invite member dialog (email input + role selector)
  - [ ] Resend invitation email with accept link
  - [ ] Accept invitation page & join team flow
- [ ] **5.3 Team Settings UI**
  - [ ] Team profile settings (name, avatar, slug)
  - [ ] Members list with role change dropdown & remove button
  - [ ] Transfer team ownership & delete team workflows
- [ ] **5.4 User Account Settings**
  - [ ] User profile customization (name, avatar upload via Supabase Storage)
  - [ ] Account security & notification preferences

### Deliverables & Acceptance Criteria
- [ ] Team owner can invite members via email
- [ ] Invited user accepts and gets appropriate access to team boards
- [ ] Members cannot delete boards or modify team billing settings

---

## Milestone 6: AI Features & Stripe Subscriptions
**Objective:** AI task generation/enhancement and SaaS subscription monetization.
**Status:** ⚪ Not Started

### Tasks
- [ ] **6.1 Stripe Subscriptions & Billing**
  - [ ] Configure Stripe products & prices (Free, Lite, Pro)
  - [ ] Implement Stripe Checkout session creation
  - [ ] Stripe Customer Portal integration for subscription management
  - [ ] Stripe webhook handler (`app/api/stripe/route.ts`) for invoice/subscription lifecycle events
  - [ ] Database schema for `subscriptions` and team plan tier tracking
  - [ ] Feature gating middleware/helpers (limit boards, member counts, AI calls)
- [ ] **6.2 AI Features (Vercel AI SDK + Claude)**
  - [ ] Set up AI SDK with Claude models
  - [ ] AI Task Drafter: Convert rough text/notes into structured tasks with subtasks
  - [ ] AI Smart Categorization: Auto-suggest labels, priority, and assignees
  - [ ] AI Task Breakdown: Break complex tasks into bite-sized actionable cards
  - [ ] AI Summary: Generate board/sprint progress summary
- [ ] **6.3 Polish & Launch Readiness**
  - [ ] Empty states, micro-interactions, keyboard shortcuts (Linear-style)
  - [ ] Performance audit & Core Web Vitals optimization
  - [ ] End-to-end testing of critical user flows
  - [ ] Production deployment setup on Vercel + Supabase Cloud

### Deliverables & Acceptance Criteria
- [ ] Upgrading team to Lite/Pro activates premium features immediately via webhook
- [ ] AI prompt generates formatted tasks directly onto the kanban board
- [ ] Limits properly enforced for Free tier workspaces

---

## 🛠️ Tech Stack & Tooling

- **Framework:** Next.js 16 (App Router, Server Actions, proxy.ts)
- **Database & Auth:** Supabase (PostgreSQL, RLS, Realtime, Storage)
- **UI & Design:** shadcn/ui, Tailwind CSS v4, Lucide Icons, Dark Mode by default
- **Drag & Drop:** `@dnd-kit/core`, `@dnd-kit/sortable`
- **Payments:** Stripe Checkout & Customer Portal
- **Email:** Resend & React Email
- **AI:** Vercel AI SDK (`ai`), Anthropic Claude models
- **Integrations:** Model Context Protocol (MCP)

---

## 📝 Change Log & Session Notes

| Date | Author | Milestone | Notes |
|---|---|---|---|
| 2026-09-22 | Claude Code | M1 | Initial project plan and milestone tracker created |
