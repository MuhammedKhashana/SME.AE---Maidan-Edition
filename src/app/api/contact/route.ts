import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/schemas/contactSchema';

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await req.json();
  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const { name, company, email, message } = result.data;

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? 'Sport Middle East <onboarding@resend.dev>',
    to: [process.env.CONTACT_TO_EMAIL ?? 'info@sportme.ae'],
    replyTo: email,
    subject: `New enquiry from ${name}${company ? ` · ${company}` : ''}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#e62d22">New contact form submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${message ? `<p><strong>Message:</strong></p><p style="white-space:pre-wrap">${message}</p>` : ''}
      </div>
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
