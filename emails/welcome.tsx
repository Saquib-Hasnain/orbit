import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface WelcomeEmailProps {
  fullName: string
  teamName: string
  workspaceUrl: string
}

export function WelcomeEmail({
  fullName = 'there',
  teamName = 'Your Team',
  workspaceUrl = 'https://orbit.dev',
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to {teamName} on Orbit - Let's get started!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <div style={logo}>O</div>
            <Heading style={h1}>Orbit</Heading>
          </Section>

          <Section style={content}>
            <Heading style={h2}>Welcome to Orbit, {fullName}!</Heading>
            
            <Text style={text}>
              You've successfully created your workspace <strong>{teamName}</strong>. 
              We're excited to help you and your team stay organized and move faster.
            </Text>

            <Button style={button} href={workspaceUrl}>
              Go to Your Workspace
            </Button>

            <Text style={text}>
              Here are a few things you can do next:
            </Text>

            <ul style={list}>
              <li style={listItem}>Create your first board to organize tasks</li>
              <li style={listItem}>Invite team members to collaborate</li>
              <li style={listItem}>Set up your profile and preferences</li>
            </ul>

            <Text style={text}>
              Need help? Check out our documentation or reach out to our support team.
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              © 2026 Orbit. Built with Next.js, Supabase, and shadcn/ui.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: '#0a0a0a',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '560px',
}

const header = {
  textAlign: 'center' as const,
  marginBottom: '32px',
}

const logo = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48px',
  height: '48px',
  backgroundColor: '#fafafa',
  color: '#0a0a0a',
  borderRadius: '8px',
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '12px',
}

const h1 = {
  color: '#fafafa',
  fontSize: '24px',
  fontWeight: '600',
  margin: '0',
}

const content = {
  backgroundColor: '#18181b',
  borderRadius: '12px',
  padding: '32px',
}

const h2 = {
  color: '#fafafa',
  fontSize: '20px',
  fontWeight: '600',
  marginTop: '0',
  marginBottom: '16px',
}

const text = {
  color: '#a1a1aa',
  fontSize: '14px',
  lineHeight: '24px',
  marginBottom: '16px',
}

const button = {
  backgroundColor: '#fafafa',
  color: '#0a0a0a',
  fontSize: '14px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
  borderRadius: '6px',
  marginTop: '8px',
  marginBottom: '24px',
}

const list = {
  color: '#a1a1aa',
  fontSize: '14px',
  lineHeight: '24px',
  marginBottom: '16px',
  paddingLeft: '20px',
}

const listItem = {
  marginBottom: '8px',
}

const footer = {
  marginTop: '32px',
  textAlign: 'center' as const,
}

const footerText = {
  color: '#71717a',
  fontSize: '12px',
  lineHeight: '20px',
}

export default WelcomeEmail
