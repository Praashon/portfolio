'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';

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
        ? 'bg-[#1d3557]/95 backdrop-blur-lg shadow-lg shadow-[#000]/20' 
        : 'bg-[#1d3557]/80 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="relative group"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-[#a8dadc] to-[#f1faee] bg-clip-text text-transparent hover:from-[#f1faee] hover:to-[#a8dadc] transition-all duration-500 ease-out">
              Prashon
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#a8dadc] to-[#f1faee] group-hover:w-full transition-all duration-500 ease-out"></div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ease-out group ${
                    isActive 
                      ? 'text-[#f1faee] bg-[#457b9d]/30' 
                      : 'text-[#a8dadc] hover:text-[#f1faee] hover:bg-[#457b9d]/20'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#a8dadc] rounded-full"></div>
                  )}
                  {!isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#a8dadc] group-hover:w-full transition-all duration-300 ease-out"></div>
                  )}
                </Link>
              );
            })}
            
            {/* CTA Button */}
            <a
              href="https://github.com/praashon"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-5 py-2 bg-[#457b9d] text-[#f1faee] text-sm font-semibold rounded-full hover:bg-[#1d3557] hover:scale-105 hover:shadow-lg hover:shadow-[#457b9d]/30 transition-all duration-300 ease-out"
            >
              GitHub
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#a8dadc] hover:text-[#f1faee] hover:scale-110 transition-all duration-300 ease-out focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-[#1d3557]/95 backdrop-blur-lg border-t border-[#457b9d]/30">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  style={{ transitionDelay: `${index * 50}ms` }}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ease-out ${
                    isActive
                      ? 'text-[#f1faee] bg-[#457b9d]/30 border-l-4 border-[#a8dadc]'
                      : 'text-[#a8dadc] hover:text-[#f1faee] hover:bg-[#457b9d]/20 hover:translate-x-2'
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
              className="block px-4 py-3 mt-4 bg-[#457b9d] text-[#f1faee] text-center font-semibold rounded-lg hover:bg-[#1d3557] transition-all duration-300 ease-out"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
