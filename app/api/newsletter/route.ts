import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ success: true, dev: true })
  }

  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
    }

    if (process.env.RESEND_AUDIENCE_ID) {
      await resend.contacts.create({
        email,
        audienceId: process.env.RESEND_AUDIENCE_ID,
        unsubscribed: false,
      })
    }

    await resend.emails.send({
      from: 'Legaseedz <noreply@legaseedz.com>',
      to: email,
      subject: "You're in.",
      text: "You're on the Legaseedz drop list. First access to new genetics, apparel, and limited batches. — Legaseedz",
      html: `
        <div style="font-family:Georgia,serif;max-width:560px;padding:32px;background:#0D0C08;color:#F2EDE0;">
          <p style="color:#C9920A;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;font-family:monospace;margin-bottom:16px;">
            Drop List Confirmed
          </p>
          <h1 style="font-size:36px;font-weight:700;margin-bottom:16px;line-height:1.1;color:#F2EDE0;">
            You're in.
          </h1>
          <div style="width:48px;height:2px;background:#C9920A;margin-bottom:20px;"></div>
          <p style="color:rgba(242,237,224,0.6);line-height:1.7;margin-bottom:24px;">
            First access to new genetics drops, apparel releases, grower content, and limited
            batches — before they go public. No spam. Unsubscribe anytime.
          </p>
          <p style="color:rgba(242,237,224,0.35);font-size:12px;letter-spacing:0.12em;font-family:monospace;">
            — LEGASEEDZ
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Newsletter signup error:', err)
    return NextResponse.json({ error: 'Signup failed. Please try again.' }, { status: 500 })
  }
}
