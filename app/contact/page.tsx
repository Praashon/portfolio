'use client';

import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaPaperPlane } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'verifying'>('idle');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitStatus('verifying');

      try {
        // Step 1: Send verification code
        const verifyResponse = await fetch('/api/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const verifyData = await verifyResponse.json();

        if (verifyData.requiresVerification) {
          setShowVerification(true);
          setSubmitStatus('idle');
          setIsSubmitting(false);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitStatus('error');
        setIsSubmitting(false);
      }
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setErrors({ ...errors, code: 'Please enter the 6-digit code' });
      return;
    }

    setIsSubmitting(true);
    try {
      // Verify the code
      const verifyResponse = await fetch('/api/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, code: verificationCode }),
      });

      const verifyData = await verifyResponse.json();

      if (verifyData.verified) {
        // Now send the actual message
        const contactResponse = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (contactResponse.ok) {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
          setShowVerification(false);
          setVerificationCode('');
          setTimeout(() => setSubmitStatus('idle'), 5000);
        } else {
          setSubmitStatus('error');
        }
      } else {
        setErrors({ ...errors, code: verifyData.error || 'Invalid code' });
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope size={24} />,
      title: 'Email',
      value: 'mr.prashon@gmail.com',
      link: 'mailto:mr.prashon@gmail.com',
    },
    {
      icon: <FaMapMarkerAlt size={24} />,
      title: 'Location',
      value: 'Kathmandu, Nepal',
    },
    {
      icon: <FaPhone size={24} />,
      title: 'Phone',
      value: '+977-9767235285',
      link: 'tel:+9779767235285',
    },
  ];

  const socialLinks = [
    {
      icon: <FaGithub size={32} />,
      name: 'GitHub',
      url: 'https://github.com/praashon',
    },
    {
      icon: <FaLinkedin size={32} />,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/mrprashon/',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1d3557] via-[#457b9d] to-[#1d3557] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[#f1faee]">
            Get In Touch
          </h1>
          <p className="text-xl text-[#a8dadc] max-w-3xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-[#f1faee] mb-8">Contact Information</h2>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-[#1d3557]/50 backdrop-blur-sm rounded-lg border border-[#457b9d]/30 hover:border-[#a8dadc]/50 hover:-translate-y-1 transition-all duration-300 ease-out"
                >
                  <div className="text-[#f1faee] mt-1">{info.icon}</div>
                  <div>
                    <h3 className="text-[#f1faee] font-semibold mb-1">{info.title}</h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-[#a8dadc] hover:text-[#e63946] transition-colors duration-300"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-[#a8dadc]">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-semibold text-[#f1faee] mb-4">Connect with me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#a8dadc] hover:text-[#f1faee] hover:-translate-y-1 transition-all duration-300 ease-out"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#1d3557]/30 backdrop-blur-sm p-8 rounded-2xl border border-[#457b9d]/30 shadow-2xl">
            <h2 className="text-3xl font-bold text-[#f1faee] mb-8">
              Send a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <label htmlFor="name" className="block text-[#a8dadc] font-medium mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[#1d3557]/70 border-2 ${
                    errors.name ? 'border-red-500' : 'border-[#457b9d]/50'
                  } rounded-lg text-[#f1faee] focus:outline-none focus:border-[#a8dadc] focus:bg-[#1d3557] focus:scale-[1.02] transition-all duration-300 ease-out placeholder:text-[#a8dadc]/50`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="relative">
                <label htmlFor="email" className="block text-[#a8dadc] font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[#1d3557]/70 border-2 ${
                    errors.email ? 'border-red-500' : 'border-[#457b9d]/50'
                  } rounded-lg text-[#f1faee] focus:outline-none focus:border-[#a8dadc] focus:bg-[#1d3557] focus:scale-[1.02] transition-all duration-300 ease-out placeholder:text-[#a8dadc]/50`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="relative">
                <label htmlFor="subject" className="block text-[#a8dadc] font-medium mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[#1d3557]/70 border-2 ${
                    errors.subject ? 'border-red-500' : 'border-[#457b9d]/50'
                  } rounded-lg text-[#f1faee] focus:outline-none focus:border-[#a8dadc] focus:bg-[#1d3557] focus:scale-[1.02] transition-all duration-300 ease-out placeholder:text-[#a8dadc]/50`}
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="relative">
                <label htmlFor="message" className="block text-[#a8dadc] font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 bg-[#1d3557]/70 border-2 ${
                    errors.message ? 'border-red-500' : 'border-[#457b9d]/50'
                  } rounded-lg text-[#f1faee] focus:outline-none focus:border-[#a8dadc] focus:bg-[#1d3557] focus:scale-[1.02] transition-all duration-300 ease-out resize-none placeholder:text-[#a8dadc]/50`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              {!showVerification ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-semibold transition-all duration-300 ease-out ${
                    isSubmitting
                      ? 'bg-[#457b9d] cursor-not-allowed'
                      : 'bg-[#e63946] hover:bg-[#d62839] hover:scale-105'
                  } text-[#f1faee]`}
                >
                  <FaPaperPlane className={isSubmitting ? 'animate-pulse' : ''} />
                  {isSubmitting ? 'Sending Code...' : 'Send Message'}
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-[#457b9d]/20 border border-[#457b9d]/50 rounded-lg text-[#a8dadc]">
                    <p className="font-semibold mb-2">📧 Verification Required</p>
                    <p className="text-sm">We've sent a 6-digit code to <strong>{formData.email}</strong>. Please enter it below to verify your email.</p>
                  </div>
                  
                  <div>
                    <label htmlFor="code" className="block text-[#a8dadc] font-medium mb-2">
                      Verification Code *
                    </label>
                    <input
                      type="text"
                      id="code"
                      maxLength={6}
                      value={verificationCode}
                      onChange={(e) => {
                        setVerificationCode(e.target.value.replace(/\D/g, ''));
                        if (errors.code) setErrors({ ...errors, code: '' });
                      }}
                      className={`w-full px-4 py-3 bg-[#1d3557]/70 border-2 ${
                        errors.code ? 'border-red-500' : 'border-[#457b9d]/50'
                      } rounded-lg text-[#f1faee] focus:outline-none focus:border-[#a8dadc] focus:bg-[#1d3557] focus:scale-[1.02] transition-all duration-300 ease-out text-center text-2xl tracking-widest placeholder:text-[#a8dadc]/50`}
                      placeholder="000000"
                    />
                    {errors.code && (
                      <p className="text-red-400 text-sm mt-1">{errors.code}</p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowVerification(false);
                        setVerificationCode('');
                        setErrors({});
                      }}
                      className="flex-1 px-6 py-3 bg-[#1d3557] text-[#f1faee] rounded-lg font-semibold hover:bg-[#1d3557]/80 transition-all duration-300 ease-out"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleVerifyCode}
                      disabled={isSubmitting || verificationCode.length !== 6}
                      className={`flex-2 flex-grow px-6 py-3 rounded-lg font-semibold transition-all duration-300 ease-out ${
                        isSubmitting || verificationCode.length !== 6
                          ? 'bg-[#457b9d]/50 cursor-not-allowed'
                          : 'bg-[#e63946] hover:bg-[#d62839] hover:scale-105'
                      } text-[#f1faee]`}
                    >
                      {isSubmitting ? 'Verifying...' : 'Verify & Send'}
                    </button>
                  </div>
                </div>
              )}

              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center">
                  ✓ Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center">
                  ✗ Failed to send message. Please try again or email me directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
