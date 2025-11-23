import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// List of trusted email providers (same as verify-email route)
const trustedEmailProviders = [
  // Major email providers
  'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.co.uk', 'yahoo.fr', 'yahoo.de',
  'outlook.com', 'hotmail.com', 'live.com', 'msn.com',
  'icloud.com', 'me.com', 'mac.com',
  'aol.com', 'protonmail.com', 'proton.me', 'pm.me',
  'zoho.com', 'yandex.com', 'yandex.ru',
  'mail.com', 'gmx.com', 'gmx.net', 'gmx.de',
  // Corporate email providers
  'microsoft.com', 'apple.com', 'amazon.com', 'facebook.com', 'meta.com',
  'google.com', 'netflix.com', 'tesla.com', 'spacex.com',
];

// Check if email domain is trusted
function isTrustedEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;
  
  // Check if it's from trusted providers
  if (trustedEmailProviders.includes(domain)) {
    return true;
  }
  
  // Check if domain ends with trusted educational/business extensions
  const trustedExtensions = ['.edu', '.gov', '.org', '.ac.uk', '.edu.au', '.edu.np', '.edu.in'];
  if (trustedExtensions.some(ext => domain.endsWith(ext))) {
    return true;
  }
  
  // Allow corporate emails (domain with company name pattern)
  const parts = domain.split('.');
  if (parts.length >= 2) {
    const tld = parts[parts.length - 1];
    const commonTLDs = ['com', 'net', 'co', 'io', 'org', 'tech', 'dev', 'app', 'digital', 'solutions'];
    
    // If it's a common TLD and domain doesn't look suspicious, allow it
    if (commonTLDs.includes(tld) && !hasSuspiciousPattern(domain)) {
      return true;
    }
  }
  
  return false;
}

// Helper function to check suspicious patterns
function hasSuspiciousPattern(domain: string): boolean {
  const suspiciousPatterns = [
    'temp', 'fake', 'trash', 'disposable', 'throwaway', 'junk',
    'spam', 'guerrilla', '10min', '20min', 'minute', 'tempor',
    'dispos', 'instant', 'burner', 'anon', 'hide', 'privacy',
    'throw', 'delete', 'expire', 'temporary'
  ];
  
  if (suspiciousPatterns.some(pattern => domain.includes(pattern))) {
    return true;
  }
  
  const randomPattern1 = /^[a-z0-9]{8,}\./;
  const randomPattern2 = /^[a-z]+-[a-z0-9]+\./;
  if (randomPattern1.test(domain) || randomPattern2.test(domain)) {
    return true;
  }
  
  return false;
}

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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Check if email is from trusted provider
    if (!isTrustedEmail(email)) {
      console.log(`Blocked untrusted email attempt in contact route: ${email}`);
      return NextResponse.json(
        { error: 'Please use a recognized email provider (Gmail, Yahoo, Outlook, ProtonMail, iCloud, etc.) or your company/educational email.' },
        { status: 403 }
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
      subject: `New Message from ${name} - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 0; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1d3557 0%, #457b9d 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Message</h1>
              <p style="color: #a8dadc; margin: 10px 0 0 0; font-size: 14px;">Email verified & authenticated</p>
            </div>

            <!-- Sender Info -->
            <div style="padding: 30px; background-color: #f8f9fa; border-left: 5px solid #457b9d;">
              <h2 style="color: #1d3557; margin: 0 0 15px 0; font-size: 20px;">Sender Information</h2>
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
              <h3 style="color: #1d3557; margin: 0 0 15px 0; font-size: 18px;">Message</h3>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #457b9d;">
                <p style="margin: 0; line-height: 1.8; color: #333; white-space: pre-wrap;">${message}</p>
              </div>
            </div>

            <!-- Action Button -->
            <div style="padding: 0 30px 30px 30px; text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; background: #457b9d; color: white; padding: 15px 40px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px;">
                Reply to ${name.split(' ')[0]}
              </a>
            </div>
            
            <!-- Footer -->
            <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #ddd;">
              <p style="margin: 0; color: #888; font-size: 12px;">
                This email has been verified and sent from your portfolio contact form<br>
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
