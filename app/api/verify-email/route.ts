import { NextResponse } from 'next/server';

// Store verification codes temporarily (in production, use Redis or database)
const verificationCodes = new Map<string, { code: string; timestamp: number; formData: any }>();

export async function POST(request: Request) {
  try {
    const { email, name, subject, message, code } = await request.json();

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
