import { NextResponse } from 'next/server';

// Store verification codes temporarily (in production, use Redis or database)
const verificationCodes = new Map<string, { code: string; timestamp: number; formData: any }>();

// Rate limiting: Track email attempts
const emailAttempts = new Map<string, { count: number; firstAttempt: number }>();

// List of common disposable email domains
const disposableEmailDomains = [
  'temp-mail.org', 'tempmail.com', 'guerrillamail.com', '10minutemail.com',
  'mailinator.com', 'maildrop.cc', 'throwaway.email', 'yopmail.com',
  'temp-mail.io', 'mohmal.com', 'sharklasers.com', 'guerrillamail.info',
  'spam4.me', 'grr.la', 'guerrillamail.biz', 'guerrillamail.de',
  'getairmail.com', 'tempinbox.com', 'tempm.com', 'tempmail.de',
  'dispostable.com', 'trashmail.com', 'fakeinbox.com', 'emltmp.com',
  'mintemail.com', 'getnada.com', 'tempmailo.com', 'emailondeck.com',
  'tmails.net', 'mytemp.email', 'temporary-mail.net', 'mail.tm'
];

// Check if email domain is disposable
function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return true;
  
  // Check against disposable domains list
  if (disposableEmailDomains.includes(domain)) {
    return true;
  }
  
  // Check for common patterns in disposable emails
  const suspiciousPatterns = ['temp', 'fake', 'trash', 'disposable', 'throwaway'];
  return suspiciousPatterns.some(pattern => domain.includes(pattern));
}

export async function POST(request: Request) {
  try {
    const { email, name, subject, message, code } = await request.json();

    // Block disposable emails
    if (!code && isDisposableEmail(email)) {
      return NextResponse.json(
        { error: 'Please use a valid email address. Temporary/disposable emails are not allowed.' },
        { status: 400 }
      );
    }

    // Rate limiting: Max 3 attempts per email per hour
    if (!code) {
      const now = Date.now();
      const attempts = emailAttempts.get(email);
      
      if (attempts) {
        // Reset if more than 1 hour has passed
        if (now - attempts.firstAttempt > 60 * 60 * 1000) {
          emailAttempts.set(email, { count: 1, firstAttempt: now });
        } else if (attempts.count >= 3) {
          return NextResponse.json(
            { error: 'Too many attempts. Please try again later.' },
            { status: 429 }
          );
        } else {
          attempts.count++;
        }
      } else {
        emailAttempts.set(email, { count: 1, firstAttempt: now });
      }
    }

    // If code is provided, verify it
    if (code) {
      const stored = verificationCodes.get(email);
      
      if (!stored) {
        return NextResponse.json(
          { error: 'Verification code expired or invalid' },
          { status: 400 }
        );
      }

      // Check if code is expired (10 minutes)
      if (Date.now() - stored.timestamp > 10 * 60 * 1000) {
        verificationCodes.delete(email);
        return NextResponse.json(
          { error: 'Verification code expired' },
          { status: 400 }
        );
      }

      if (stored.code !== code) {
        return NextResponse.json(
          { error: 'Invalid verification code' },
          { status: 400 }
        );
      }

      // Code is valid, clean up
      verificationCodes.delete(email);
      return NextResponse.json({ verified: true, message: 'Email verified successfully' });
    }

    // Generate verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store the code
    verificationCodes.set(email, {
      code: verificationCode,
      timestamp: Date.now(),
      formData: { name, subject, message }
    });

    // Send verification email
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your email - Contact Form',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1d3557;">Verify Your Email Address</h2>
          <p>Hello ${name},</p>
          <p>Please use the following code to verify your email and submit your message to Prashon Gautam:</p>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0;">
            <h1 style="color: #457b9d; font-size: 36px; letter-spacing: 5px; margin: 0;">${verificationCode}</h1>
          </div>
          <p style="color: #666;">This code will expire in 10 minutes.</p>
          <p style="color: #666; font-size: 12px;">If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });

    return NextResponse.json({ 
      message: 'Verification code sent to your email',
      requiresVerification: true 
    });
  } catch (error) {
    console.error('Error in verification:', error);
    return NextResponse.json(
      { error: 'Failed to send verification code' },
      { status: 500 }
    );
  }
}
