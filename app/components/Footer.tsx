import { FaHeart, FaGithub, FaLinkedin, FaEnvelope, FaCoffee } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/praashon',
      icon: <FaGithub size={20} />,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/mrprashon/',
      icon: <FaLinkedin size={20} />,
    },
    {
      name: 'Email',
      url: 'mailto:mr.prashon@gmail.com',
      icon: <FaEnvelope size={20} />,
    },
  ];

  return (
    <footer className="bg-[#E0DDCF] border-t-2 border-[#534B52] mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Image 
                src="/my_logo.png" 
                alt="Prashon Logo" 
                width={36} 
                height={36}
                className="hover:scale-110 transition-transform duration-300"
              />
              <h3 className="text-2xl font-bold text-[#2D232E] flex items-center gap-2">
                Prashon
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Full Stack Developer from Nepal<br />
              Building the web, one commit at a time.
            </p>
            <div className="flex items-center gap-2 text-sm text-[#534B52]">
              <FaCoffee className="text-[#474448]" />
              <span>Fueled by coffee & curiosity</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-[#2D232E] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-[#534B52] hover:text-[#2D232E] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-bold text-[#2D232E] mb-4">Let's Connect!</h4>
            <p className="text-gray-600 mb-4 text-sm">
              Follow me on social media or drop me a message. I'd love to hear from you!
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white rounded-full text-[#534B52] hover:text-[#2D232E] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border-2 border-[#474448] hover:border-[#2D232E]"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#534B52]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#534B52] text-sm text-center md:text-left">
              © {currentYear} Prashon Gautam. All rights reserved.
            </p>
            {/* <p className="text-[#534B52] text-sm flex items-center gap-2">
              Made with <FaHeart className="text-[#474448] animate-pulse-soft" /> and passion
            </p> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
