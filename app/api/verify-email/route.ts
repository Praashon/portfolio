import { NextResponse } from 'next/server';

// Store verification codes temporarily (in production, use Redis or database)
const verificationCodes = new Map<string, { code: string; timestamp: number; formData: any }>();

// Rate limiting: Track email attempts
const emailAttempts = new Map<string, { count: number; firstAttempt: number }>();

// List of trusted email providers (whitelist approach)
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
  // Educational domains
  'edu', 'ac.uk', 'edu.au', 'edu.np', 'edu.in',
  // Business domains (common extensions)
  'gov', 'org', 'company', 'business'
];

// List of common disposable email domains (expanded blocklist as backup)
const disposableEmailDomains = [
  // Common temp mail services
  'temp-mail.org', 'tempmail.com', 'tempmail.net', 'temp-mail.io', 'temp-mail.de',
  'guerrillamail.com', 'guerrillamail.org', 'guerrillamail.net', 'guerrillamail.info',
  'guerrillamail.biz', 'guerrillamail.de', 'grr.la', 'guerrillamailblock.com',
  '10minutemail.com', '10minutemail.net', '10minemail.com', '10minemail.net', '20minutemail.com',
  'mailinator.com', 'mailinator.net', 'mailinator2.com', 'maildrop.cc',
  'throwaway.email', 'throwemail.com', 'yopmail.com', 'yopmail.fr', 'yopmail.net',
  'mohmal.com', 'sharklasers.com', 'spam4.me', 'getairmail.com',
  'tempinbox.com', 'tempm.com', 'tempmail.de', 'tempemail.net',
  'dispostable.com', 'trashmail.com', 'fakeinbox.com', 'emltmp.com',
  'mintemail.com', 'getnada.com', 'tempmailo.com', 'emailondeck.com',
  'tmails.net', 'mytemp.email', 'temporary-mail.net', 'mail.tm',
  // More services
  'anonbox.net', 'binkmail.com', 'bobmail.info', 'bugmenot.com',
  'deadaddress.com', 'despam.it', 'disposeamail.com', 'dodgeit.com',
  'e4ward.com', 'email60.com', 'emailias.com', 'emailinfive.com',
  'emailsensei.com', 'emailtemporar.ro', 'emailto.de', 'emailxfer.com',
  'etranquil.com', 'example.com', 'fakemailgenerator.com', 'filzmail.com',
  'gishpuppy.com', 'goemailgo.com', 'great-host.in', 'harakirimail.com',
  'hidemail.de', 'incognitomail.com', 'jetable.com', 'jetable.org',
  'mail-temporaire.com', 'mail-temporaire.fr', 'maileater.com', 'mailexpire.com',
  'mailin8r.com', 'mailmetrash.com', 'mailnesia.com', 'mailnull.com',
  'mailsac.com', 'mailtemp.info', 'mailtothis.com', 'meltmail.com',
  'moncourrier.fr.nf', 'mt2009.com', 'mt2014.com', 'mt2015.com', 'mytrashmail.com',
  'neverbox.com', 'no-spam.ws', 'nobulk.com', 'noclickemail.com',
  'nogmailspam.info', 'notsharingmy.info', 'nowmymail.com', 'objectmail.com',
  'obobbo.com', 'onewaymail.com', 'pookmail.com', 'proxymail.eu',
  'spambox.us', 'spamfree24.com', 'spamfree24.de', 'spamfree24.org',
  'spamgourmet.com', 'spaminator.de', 'spaml.com', 'spammotel.com',
  'spamspot.com', 'supergreatmail.com', 'supermailer.jp', 'teleworm.us',
  'thanksnospam.info', 'trash-mail.com', 'trash2009.com', 'trashdevil.com',
  'trashemail.de', 'trashymail.com', 'tyldd.com', 'wegwerfmail.de',
  'wegwerfmail.net', 'wegwerfmail.org', 'wetrainbayarea.com', 'wronghead.com',
  'xyzfree.net', 'zehnminutenmail.de', 'zippymail.info'
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
  // Must have at least 2 parts and common TLD
  const parts = domain.split('.');
  if (parts.length >= 2) {
    const tld = parts[parts.length - 1];
    const commonTLDs = ['com', 'net', 'co', 'io', 'org', 'tech', 'dev', 'app', 'digital', 'solutions'];
    
    // If it's a common TLD and domain doesn't look suspicious, allow it
    if (commonTLDs.includes(tld)) {
      // But still check against blocklist
      if (!disposableEmailDomains.includes(domain) && !hasSuspiciousPattern(domain)) {
        return true;
      }
    }
  }
  
  return false;
}

// Check if email domain is disposable or suspicious
function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return true;
  
  // Check against disposable domains list
  if (disposableEmailDomains.includes(domain)) {
    return true;
  }
  
  return hasSuspiciousPattern(domain);
}

// Helper function to check suspicious patterns
function hasSuspiciousPattern(domain: string): boolean {
  // Check for common patterns in disposable emails
  const suspiciousPatterns = [
    'temp', 'fake', 'trash', 'disposable', 'throwaway', 'junk',
    'spam', 'guerrilla', '10min', '20min', 'minute', 'tempor',
    'dispos', 'instant', 'burner', 'anon', 'hide', 'privacy',
    'throw', 'delete', 'expire', 'temporary'
  ];
  
  // Check if domain contains any suspicious pattern
  if (suspiciousPatterns.some(pattern => domain.includes(pattern))) {
    return true;
  }
  
  // Check for random character domains (common in temp mail)
  // e.g., abc123xyz.com or random-string.net
  const randomPattern1 = /^[a-z0-9]{8,}\./;
  const randomPattern2 = /^[a-z]+-[a-z0-9]+\./;
  if (randomPattern1.test(domain) || randomPattern2.test(domain)) {
    return true;
  }
  
  return false;
}

export async function POST(request: Request) {
  try {
    const { email, name, subject, message, code } = await request.json();

    // Validate email format first
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // First check if email is from trusted provider (whitelist)
    if (!isTrustedEmail(email)) {
      // If not trusted, check if it's explicitly blocked (disposable)
      if (isDisposableEmail(email)) {
        console.log(`Blocked disposable email attempt: ${email}`);
        return NextResponse.json(
          { error: 'Temporary/disposable email addresses are not allowed. Please use a trusted email provider (Gmail, Yahoo, Outlook, etc.).' },
          { status: 403 }
        );
      }
      
      // If not trusted and not explicitly blocked, still reject with a softer message
      console.log(`Blocked untrusted email attempt: ${email}`);
      return NextResponse.json(
        { error: 'Please use a recognized email provider (Gmail, Yahoo, Outlook, ProtonMail, iCloud, etc.) or your company/educational email.' },
        { status: 403 }
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
