import { z } from 'zod'

// Sign In validation schema
export const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

// Sign Up validation schema
export const signUpSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

// Magic Link validation schema
export const magicLinkSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

// Onboarding validation schema
export const onboardingSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  teamName: z.string().min(2, 'Team name must be at least 2 characters'),
  teamSlug: z.string()
    .min(2, 'Slug must be at least 2 characters')
    .max(48, 'Slug must be less than 48 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug can only contain lowercase letters, numbers, and dashes'),
})

// Type exports
export type SignInInput = z.infer<typeof signInSchema>
export type SignUpInput = z.infer<typeof signUpSchema>
export type MagicLinkInput = z.infer<typeof magicLinkSchema>
export type OnboardingInput = z.infer<typeof onboardingSchema>
