import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to you
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'mr.prashon@gmail.com',
      replyTo: email,
      subject: `📬 New Message from ${name} - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 0; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1d3557 0%, #457b9d 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">✉️ New Contact Message</h1>
              <p style="color: #a8dadc; margin: 10px 0 0 0; font-size: 14px;">Email verified & authenticated</p>
            </div>

            <!-- Sender Info -->
            <div style="padding: 30px; background-color: #f8f9fa; border-left: 5px solid #457b9d;">
              <h2 style="color: #1d3557; margin: 0 0 15px 0; font-size: 20px;">📤 Sender Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600; width: 80px;">Name:</td>
                  <td style="padding: 8px 0; color: #1d3557; font-weight: bold;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600;">Email:</td>
                  <td style="padding: 8px 0;">
                    <a href="mailto:${email}" style="color: #457b9d; text-decoration: none; font-weight: bold; background: white; padding: 5px 10px; border-radius: 5px; display: inline-block;">
                      ${email}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600;">Subject:</td>
                  <td style="padding: 8px 0; color: #1d3557;">${subject}</td>
                </tr>
              </table>
            </div>
            
            <!-- Message Content -->
            <div style="padding: 30px;">
              <h3 style="color: #1d3557; margin: 0 0 15px 0; font-size: 18px;">💬 Message</h3>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #457b9d;">
                <p style="margin: 0; line-height: 1.8; color: #333; white-space: pre-wrap;">${message}</p>
              </div>
            </div>

            <!-- Action Button -->
            <div style="padding: 0 30px 30px 30px; text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; background: #457b9d; color: white; padding: 15px 40px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px;">
                📧 Reply to ${name.split(' ')[0]}
              </a>
            </div>
            
            <!-- Footer -->
            <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #ddd;">
              <p style="margin: 0; color: #888; font-size: 12px;">
                ✅ This email has been verified and sent from your portfolio contact form<br>
                Click "Reply" or use the button above to respond directly to ${email}
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Auto-reply to sender
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thanks for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #1d3557;">Hi ${name}!</h2>
            
            <p style="line-height: 1.6; color: #555;">Thank you for reaching out to me. I've received your message and will get back to you as soon as possible.</p>
            
            <div style="margin: 20px 0; padding: 20px; background-color: #f8f9fa; border-left: 4px solid #457b9d; border-radius: 5px;">
              <p style="margin: 0; color: #333;"><strong>Your message:</strong></p>
              <p style="margin: 10px 0 0 0; line-height: 1.6; color: #555;">${message}</p>
            </div>
            
            <p style="line-height: 1.6; color: #555;">Best regards,<br><strong style="color: #1d3557;">Prashon Gautam</strong></p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
              <p style="color: #888; font-size: 12px;">Full Stack Developer | Kathmandu, Nepal</p>
              <p style="color: #888; font-size: 12px;">
                <a href="https://github.com/praashon" style="color: #457b9d; text-decoration: none;">GitHub</a> | 
                <a href="https://www.linkedin.com/in/mrprashon/" style="color: #457b9d; text-decoration: none;">LinkedIn</a>
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Send emails
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(autoReplyOptions);

    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
