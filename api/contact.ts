import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const TO = process.env.CONTACT_TO || 'nebulanoord@gmail.com'
const FROM = process.env.CONTACT_FROM || 'onboarding@resend.dev'

interface ApiResponse {
  status(code: number): ApiResponse
  json(body: unknown): void
}

function escapeHtml(s: string): string {
  return String(s).replace(/[&<>"']/g, (c) => {
    switch (c) {
      case '&': return '&amp;'
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '"': return '&quot;'
      default: return '&#39;'
    }
  })
}

export default async function handler(req: { method?: string; body?: Record<string, unknown> }, res: ApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' })
    return
  }

  if (!process.env.RESEND_API_KEY) {
    res.status(500).json({ ok: false, error: 'Email not configured' })
    return
  }

  const { name, email, message, company } = req.body ?? {}

  // Honeypot: real users never fill this hidden field.
  if (typeof company === 'string' && company.length > 0) {
    res.status(200).json({ ok: true })
    return
  }

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string' || !name || !email || !message) {
    res.status(400).json({ ok: false, error: 'Missing required fields' })
    return
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject: `Portfolio contact — ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt; wrote:</p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
    })

    if (error) {
      res.status(500).json({ ok: false, error: error.message })
      return
    }

    res.status(200).json({ ok: true })
  } catch {
    res.status(500).json({ ok: false, error: 'Failed to send message' })
  }
}
