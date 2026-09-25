import { resend, EMAIL_FROM } from './client'
import WelcomeEmail from '@/emails/welcome'

export interface SendWelcomeEmailParams {
  to: string
  userName: string
  teamName: string
  teamSlug: string
}

/**
 * Send welcome email to a new user after onboarding completion
 */
export async function sendWelcomeEmail({
  to,
  userName,
  teamName,
  teamSlug,
}: SendWelcomeEmailParams) {
  try {
    // Skip if no API key configured
    if (!process.env.RESEND_API_KEY) {
      console.warn('Skipping welcome email - RESEND_API_KEY not configured')
      return { success: false, error: 'API key not configured' }
    }

    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      subject: `Welcome to ${teamName} on Orbit`,
      react: WelcomeEmail({ userName, teamName, teamSlug }),
    })

    if (error) {
      console.error('Error sending welcome email:', error)
      return { success: false, error }
    }

    console.log('Welcome email sent successfully:', data?.id)
    return { success: true, data }
  } catch (error) {
    console.error('Failed to send welcome email:', error)
    return { success: false, error }
  }
}
