import { Resend } from 'resend'
import { WelcomeEmail } from '@/emails/welcome'
import { render } from '@react-email/render'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendWelcomeEmailParams {
  email: string
  fullName: string
  teamName: string
  teamSlug: string
}

export async function sendWelcomeEmail({
  email,
  fullName,
  teamName,
  teamSlug,
}: SendWelcomeEmailParams) {
  try {
    const workspaceUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${teamSlug}`
    
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Orbit <onboarding@orbit.dev>',
      to: email,
      subject: `Welcome to ${teamName} on Orbit`,
      react: WelcomeEmail({ 
        fullName, 
        teamName, 
        workspaceUrl 
      }),
    })

    if (error) {
      console.error('Failed to send welcome email:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error sending welcome email:', error)
    return { success: false, error }
  }
}
