import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1d3557] via-[#457b9d] to-[#1d3557] relative overflow-hidden">
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <div className="text-center">
          {/* Avatar */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="w-40 h-40 rounded-full bg-[#f1faee] p-1 hover:scale-105 transition-transform duration-500 ease-out">
                <div className="w-full h-full rounded-full bg-[#f1faee] flex items-center justify-center overflow-hidden">
                  <img src="/mine.jpg" alt="Prashon Gautam" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 ease-out" />
                </div>
              </div>
            </div>
          </div>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-[#f1faee]">
            Prashon Gautam
          </h1>

          {/* Role */}
          <div className="text-2xl md:text-3xl text-[#f1faee] mb-8">
            Full Stack Developer
          </div>

          {/* Description */}
          <p className="text-lg text-[#a8dadc] max-w-2xl mx-auto mb-12">
            🎓 BCA Student from Kathmandu, Nepal | Building amazing web experiences with modern technologies
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Link
              href="/projects"
              className="px-8 py-3 bg-[#1d3557] text-[#f1faee] rounded-full font-semibold hover:bg-[#1d3557]/80 hover:scale-105 transition-all duration-300 ease-out"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-[#e63946] text-[#f1faee] rounded-full font-semibold hover:bg-[#d62839] hover:scale-105 transition-all duration-300 ease-out"
            >
              Get in Touch
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 justify-center">
            <a
              href="https://github.com/praashon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a8dadc] hover:text-[#f1faee] hover:-translate-y-1 transition-all duration-300 ease-out"
            >
              <FaGithub size={32} />
            </a>
            <a
              href="https://www.linkedin.com/in/mrprashon/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a8dadc] hover:text-[#f1faee] hover:-translate-y-1 transition-all duration-300 ease-out"
            >
              <FaLinkedin size={32} />
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=mr.prashon@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a8dadc] hover:text-[#f1faee] hover:-translate-y-1 transition-all duration-300 ease-out"
              title="Send email"
            >
              <FaEnvelope size={32} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
