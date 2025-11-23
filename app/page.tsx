'use client';

import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaCode, FaCoffee } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [isWaving, setIsWaving] = useState(false);

  const handleWave = () => {
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F1F0EA] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#E0DDCF] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-[#534B52] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-[#474448] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-24">
        <div className="text-center max-w-4xl">
          {/* Avatar with personality */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#474448] to-[#2D232E] p-1.5 hover:scale-105 transition-all duration-500 ease-out shadow-2xl shadow-[#534B52]/40">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <img 
                    src="/mine.jpg" 
                    alt="Prashon Gautam - That's me!" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                </div>
              </div>
              {/* Status badge */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#474448] to-[#2D232E] text-white px-4 py-1 rounded-full text-xs font-medium shadow-lg flex items-center gap-1 animate-pulse-soft">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                Available for projects
              </div>
            </div>
          </div>

          {/* Name with warmth */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-[#2D232E]">
            Hey, I'm Prashon!
          </h1>

          {/* Role with personality */}
          <div className="text-2xl md:text-3xl text-[#534B52] mb-6 font-medium">
            Full Stack Developer & Creative Problem Solver
          </div>

          {/* Description - more conversational */}
          <p className="text-lg text-[#534B52] max-w-2xl mx-auto mb-8 leading-relaxed">
            I'm a <span className="font-semibold text-[#2D232E]">BCA student</span> from the beautiful city of Kathmandu, Nepal. 
            I <span className="text-orange-600 font-medium">love</span> turning ideas into reality through code, 
            one pixel at a time. When I'm not coding, you'll find me exploring new technologies or sipping coffee.
          </p>

          {/* Fun stats */}
          <div className="flex flex-wrap gap-6 justify-center mb-14 text-sm">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-[#E0DDCF]">
              <FaCode className="text-[#474448]" />
              <span className="text-gray-700">5+ Projects Built</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-[#E0DDCF]">
              <FaCoffee className="text-[#474448]" />
              <span className="text-gray-700">∞ Cups of Coffee</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-[#E0DDCF]">
              <FaHeart className="text-[#474448]" />
              <span className="text-gray-700">Made with Love</span>
            </div>
          </div>

          {/* CTA Buttons - more inviting */}
          <div className="flex flex-wrap gap-5 justify-center mb-14">
            <Link
              href="/projects"
              className="group px-10 py-4 bg-[#2D232E] text-white rounded-full font-semibold hover:bg-[#474448] hover:scale-105 hover:shadow-2xl shadow-lg transition-all duration-300 ease-out flex items-center gap-2"
            >
              <span>Check Out My Work</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
            <Link
              href="/contact"
              className="px-10 py-4 bg-white text-[#2D232E] border-2 border-[#E0DDCF] rounded-full font-semibold hover:border-[#474448] hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-out"
            >
              Let's Chat!
            </Link>
          </div>

          {/* Social Links - friendlier */}
          <div className="flex gap-8 justify-center">
            <a
              href="https://github.com/praashon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#534B52] hover:text-[#2D232E] hover:-translate-y-2 hover:scale-110 transition-all duration-300 ease-out p-3 bg-white rounded-full shadow-md hover:shadow-xl border border-[#E0DDCF]"
              aria-label="GitHub Profile"
            >
              <FaGithub size={28} />
            </a>
            <a
              href="https://www.linkedin.com/in/mrprashon/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#534B52] hover:text-[#2D232E] hover:-translate-y-2 hover:scale-110 transition-all duration-300 ease-out p-3 bg-white rounded-full shadow-md hover:shadow-xl border border-[#E0DDCF]"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin size={28} />
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=mr.prashon@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#534B52] hover:text-[#2D232E] hover:-translate-y-2 hover:scale-110 transition-all duration-300 ease-out p-3 bg-white rounded-full shadow-md hover:shadow-xl border border-[#E0DDCF]"
              title="Send me an email"
              aria-label="Email Me"
            >
              <FaEnvelope size={28} />
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce">
            <p className="text-sm text-gray-500 mb-2">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full mx-auto flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
