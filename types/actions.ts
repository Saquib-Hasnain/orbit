export type ActionResponse<T = void> = 
  | { success: true; data: T }
  | { success: false; error: string }

export type ActionState<T = void> = {
  error?: string
  success?: boolean
  data?: T
}
