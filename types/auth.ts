export interface AuthUser {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
}

export interface Team {
  id: string
  name: string
  slug: string
  role: 'owner' | 'admin' | 'member' | 'viewer'
}

export interface UserTeam {
  id: string
  name: string
  slug: string
  avatar_url: string | null
  plan: string
  role: 'owner' | 'admin' | 'member' | 'viewer'
}

export type AuthState = {
  user: AuthUser | null
  teams: Team[]
  currentTeam: Team | null
}
