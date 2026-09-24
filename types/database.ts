export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      teams: {
        Row: {
          id: string
          name: string
          slug: string
          avatar_url: string | null
          plan: 'free' | 'lite' | 'pro'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          avatar_url?: string | null
          plan?: 'free' | 'lite' | 'pro'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          avatar_url?: string | null
          plan?: 'free' | 'lite' | 'pro'
          created_at?: string
          updated_at?: string
        }
      }
      team_members: {
        Row: {
          id: string
          team_id: string
          user_id: string
          role: 'owner' | 'admin' | 'member' | 'viewer'
          created_at: string
        }
        Insert: {
          id?: string
          team_id: string
          user_id: string
          role?: 'owner' | 'admin' | 'member' | 'viewer'
          created_at?: string
        }
        Update: {
          id?: string
          team_id?: string
          user_id?: string
          role?: 'owner' | 'admin' | 'member' | 'viewer'
          created_at?: string
        }
      }
      boards: {
        Row: {
          id: string
          team_id: string
          name: string
          description: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          team_id: string
          name: string
          description?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          team_id?: string
          name?: string
          description?: string | null
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      columns: {
        Row: {
          id: string
          board_id: string
          name: string
          position: number
          created_at: string
        }
        Insert: {
          id?: string
          board_id: string
          name: string
          position: number
          created_at?: string
        }
        Update: {
          id?: string
          board_id?: string
          name?: string
          position?: number
          created_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          board_id: string
          column_id: string
          title: string
          description: string | null
          priority: 'urgent' | 'high' | 'medium' | 'low' | 'none'
          assignee_id: string | null
          position: number
          due_date: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          board_id: string
          column_id: string
          title: string
          description?: string | null
          priority?: 'urgent' | 'high' | 'medium' | 'low' | 'none'
          assignee_id?: string | null
          position: number
          due_date?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          board_id?: string
          column_id?: string
          title?: string
          description?: string | null
          priority?: 'urgent' | 'high' | 'medium' | 'low' | 'none'
          assignee_id?: string | null
          position?: number
          due_date?: string | null
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
