import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const TO_EMAIL = 'hello@legaseedz.com'
const FROM_EMAIL = 'noreply@legaseedz.com'

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: 'Email not configured. Add RESEND_API_KEY to .env.local.' },
      { status: 503 }
    )
  }

  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `[Legaseedz Contact] ${subject || 'New message'}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;padding:24px;background:#0D0C08;color:#F2EDE0;">
          <h2 style="color:#C9920A;font-size:20px;margin-bottom:16px;">New Contact Message</h2>
          <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
          <p><strong>Subject:</strong> ${subject || '(none)'}</p>
          <hr style="border-color:#2a2a20;margin:16px 0;" />
          <p style="white-space:pre-wrap;line-height:1.6;">${message}</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact email error:', err)
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
  }
}
