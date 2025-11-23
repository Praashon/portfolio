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
  const [errorMessage, setErrorMessage] = useState('');

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
          setErrorMessage('');
        } else if (verifyData.error) {
          setErrorMessage(verifyData.error);
          setSubmitStatus('error');
          setIsSubmitting(false);
          // Auto-hide error after 5 seconds
          setTimeout(() => setErrorMessage(''), 5000);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrorMessage('Something went wrong. Please try again.');
        setSubmitStatus('error');
        setIsSubmitting(false);
        setTimeout(() => setErrorMessage(''), 5000);
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
          setErrorMessage('');
          setTimeout(() => setSubmitStatus('idle'), 5000);
        } else {
          setErrorMessage('Failed to send message. Please try again.');
          setSubmitStatus('error');
          setTimeout(() => setErrorMessage(''), 5000);
        }
      } else {
        setErrorMessage(verifyData.error || 'Invalid verification code');
        setErrors({ ...errors, code: verifyData.error || 'Invalid code' });
        setTimeout(() => setErrorMessage(''), 5000);
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      setErrorMessage('Something went wrong. Please try again.');
      setSubmitStatus('error');
      setTimeout(() => setErrorMessage(''), 5000);
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
    <div className="min-h-screen bg-[#F1F0EA] pt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20">
        {/* Header with warmth */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#2D232E]">
            Let's Connect!
          </h1>
          <p className="text-xl text-[#534B52] max-w-3xl mx-auto mb-4">
            Got a cool project idea? Want to collaborate? Or just want to say hi? 
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            I'm always excited to hear from fellow developers, potential clients, or anyone who wants to chat about tech!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-[#2D232E] mb-4">How to Reach Me</h2>
            <p className="text-gray-600 mb-8">
              Pick your favorite way to connect - I'm active on all of these!
            </p>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-white rounded-2xl border-2 border-[#E0DDCF] hover:border-[#474448] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-out"
                >
                  <div className="text-[#474448] mt-1">{info.icon}</div>
                  <div>
                    <h3 className="text-[#2D232E] font-semibold mb-1">{info.title}</h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-[#534B52] hover:text-[#2D232E] transition-colors duration-300"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-600">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-semibold text-[#2D232E] mb-4">Let's Be Social!</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Follow me for coding updates, projects, and occasional tech memes
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#534B52] hover:text-[#2D232E] hover:-translate-y-2 hover:scale-110 transition-all duration-300 ease-out p-3 bg-white rounded-full shadow-md hover:shadow-xl border-2 border-[#E0DDCF] hover:border-[#474448]"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-10 rounded-3xl border-2 border-[#E0DDCF] shadow-xl">
            <h2 className="text-3xl font-bold text-[#2D232E] mb-4">
              Drop Me a Message
            </h2>
            <p className="text-gray-600 mb-6">
              Fill out the form below and I'll get back to you as soon as possible!
            </p>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-500/10 border-2 border-red-500/50 rounded-lg backdrop-blur-sm animate-[slideDown_0.3s_ease-out]">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5 animate-[shake_0.5s_ease-in-out]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-red-300 font-medium">{errorMessage}</p>
                  </div>
                  <button
                    onClick={() => setErrorMessage('')}
                    className="text-red-400 hover:text-red-300 transition-colors"
                    aria-label="Close"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[#F1F0EA] border-2 ${
                    errors.name ? 'border-red-400' : 'border-[#E0DDCF]'
                  } rounded-xl text-[#2D232E] focus:outline-none focus:border-[#474448] focus:bg-white focus:scale-[1.01] transition-all duration-300 ease-out placeholder:text-[#534B52]`}
                  placeholder="What should I call you?"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="relative">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[#F1F0EA] border-2 ${
                    errors.email ? 'border-red-400' : 'border-[#E0DDCF]'
                  } rounded-xl text-[#2D232E] focus:outline-none focus:border-[#474448] focus:bg-white focus:scale-[1.01] transition-all duration-300 ease-out placeholder:text-[#534B52]`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="relative">
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[#F1F0EA] border-2 ${
                    errors.subject ? 'border-red-400' : 'border-[#E0DDCF]'
                  } rounded-xl text-[#2D232E] focus:outline-none focus:border-[#474448] focus:bg-white focus:scale-[1.01] transition-all duration-300 ease-out placeholder:text-[#534B52]`}
                  placeholder="What's on your mind?"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="relative">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 bg-[#F1F0EA] border-2 ${
                    errors.message ? 'border-red-400' : 'border-[#E0DDCF]'
                  } rounded-xl text-[#2D232E] focus:outline-none focus:border-[#474448] focus:bg-white focus:scale-[1.01] transition-all duration-300 ease-out resize-none placeholder:text-[#534B52]`}
                  placeholder="Tell me about your awesome project idea..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              {!showVerification ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ease-out ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#2D232E] hover:bg-[#474448] hover:scale-105 hover:shadow-xl'
                  } text-white`}
                >
                  <FaPaperPlane className={isSubmitting ? 'animate-pulse' : ''} />
                  {isSubmitting ? 'Sending Code...' : 'Send Message'}
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl text-gray-700">
                    <p className="font-semibold mb-2 flex items-center gap-2">
                      Verification Required
                    </p>
                    <p className="text-sm">We've sent a 6-digit code to <strong className="text-rose-600">{formData.email}</strong>. Please enter it below to verify your email.</p>
                  </div>
                  
                  <div>
                    <label htmlFor="code" className="block text-gray-700 font-medium mb-2">
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
                      className={`w-full px-4 py-3 bg-[#F1F0EA] border-2 ${
                        errors.code ? 'border-red-400' : 'border-[#E0DDCF]'
                      } rounded-xl text-[#2D232E] focus:outline-none focus:border-[#474448] focus:bg-white focus:scale-[1.01] transition-all duration-300 ease-out text-center text-2xl tracking-widest placeholder:text-[#534B52]`}
                      placeholder="000000"
                    />
                    {errors.code && (
                      <p className="text-red-500 text-sm mt-1">{errors.code}</p>
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
                      className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 ease-out"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleVerifyCode}
                      disabled={isSubmitting || verificationCode.length !== 6}
                      className={`flex-2 flex-grow px-6 py-3 rounded-xl font-semibold transition-all duration-300 ease-out ${
                        isSubmitting || verificationCode.length !== 6
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-[#2D232E] hover:bg-[#474448] hover:scale-105'
                      } text-white`}
                    >
                      {isSubmitting ? 'Verifying...' : 'Verify & Send ✓'}
                    </button>
                  </div>
                </div>
              )}

              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-50 border-2 border-green-300 rounded-xl text-green-700 text-center font-medium">
                  <span className="text-2xl mr-2">✓</span>
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-50 border-2 border-red-300 rounded-xl text-red-600 text-center font-medium">
                  <span className="text-2xl mr-2">✗</span>
                  Failed to send message. Please try again or email me directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
