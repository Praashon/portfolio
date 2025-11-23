'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { FaBars, FaTimes, FaHeart } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg shadow-[#E0DDCF]/50' 
        : 'bg-white/90 backdrop-blur-md border-b border-[#E0DDCF]'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="relative group flex items-center gap-3"
          >
            <div className="relative w-10 h-10 overflow-hidden">
              <Image 
                src="/my_logo.png" 
                alt="Prashon" 
                width={40} 
                height={40} 
                className="object-contain group-hover:scale-110 transition-transform duration-300"
                priority
              />
            </div>
            <span className="text-xl font-bold text-[#2D232E] tracking-tight">
              Prashon
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ease-out group ${
                    isActive 
                      ? 'text-white bg-[#2D232E] shadow-md' 
                      : 'text-[#534B52] hover:text-[#2D232E] hover:bg-[#E0DDCF]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            {/* CTA Button */}
            <a
              href="https://github.com/praashon"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-5 py-2 bg-[#2D232E] text-white text-sm font-semibold rounded-full hover:bg-[#474448] hover:scale-105 hover:shadow-lg transition-all duration-300 ease-out"
            >
              GitHub
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#534B52] hover:text-[#2D232E] hover:scale-110 transition-all duration-300 ease-out focus:outline-none p-2 rounded-lg hover:bg-[#E0DDCF]"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white/95 backdrop-blur-lg border-t border-[#E0DDCF]">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  style={{ transitionDelay: `${index * 50}ms` }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ease-out ${
                    isActive
                      ? 'text-white bg-[#2D232E] shadow-md scale-105'
                      : 'text-[#534B52] hover:text-[#2D232E] hover:bg-[#E0DDCF] hover:translate-x-2'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <a
              href="https://github.com/praashon"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 mt-4 bg-[#2D232E] text-white text-center font-semibold rounded-lg hover:bg-[#474448] transition-all duration-300 ease-out"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
