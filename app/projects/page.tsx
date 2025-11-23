'use client';

import { JSX } from "react";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaDatabase,
  FaServer,
  FaReact,
} from "react-icons/fa";
import {
  SiPhp,
  SiMysql,
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiDjango,
  SiPython,
  SiPostgresql,
  SiTailwindcss,
  SiJavascript,
} from "react-icons/si";

export default function Projects() {
  const projects = [
    {
      title: "Hotel Booking Management System",
      description:
        "A full-featured hotel management system I built to make booking rooms a breeze!",
      personalNote: "My first big PHP project - learned so much about backend development!",
      tech: ["PHP", "MySQL", "JavaScript", "CSS"],
      features: [
        "User authentication and authorization",
        "Room booking and management",
        "Admin dashboard for managing bookings",
        "User profile management",
        "Booking history and status tracking",
      ],
      github: "https://github.com/Praashon/Hotel-Booking-Management-System",
      gradient: "from-purple-400 to-blue-500",
      icon: <SiPhp size={40} />
    },
    {
      title: "Food Ordering System",
      description:
        "Hungry? This full-stack MERN app lets you order your favorite food with just a few clicks!",
      personalNote: "Built this when I was craving food delivery options - necessity is the mother of invention!",
      tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS"],
      features: [
        "User and restaurant authentication",
        "Real-time menu browsing",
        "Shopping cart functionality",
        "Order placement and tracking",
        "Admin panel for restaurant management",
        "Review and rating system",
      ],
      github: "https://github.com/Praashon/Food-Ordering-System.git",
      gradient: "from-orange-400 to-red-500",
      icon: <SiReact size={40} />
    },
    {
      title: "Real Estate Platform",
      description:
        "Find your dream home with this Django-powered platform! Search, filter, and connect with agents.",
      personalNote: "Django made this so elegant - fell in love with Python's simplicity!",
      tech: ["Django", "Python", "PostgreSQL", "HTML", "CSS"],
      features: [
        "Property listing management",
        "Advanced search and filtering",
        "User authentication",
        "Property inquiry system",
        "Agent profiles",
        "Responsive design",
      ],
      github: "https://github.com/Praashon/Real-Estate",
      gradient: "from-green-400 to-teal-500",
      icon: <SiDjango size={40} />
    },
    {
      title: "Baymax AI",
      description:
        "Your personal AI assistant that actually listens! Voice-powered and super smart.",
      personalNote: "Named after my favorite Disney character - because who doesn't need a healthcare companion?",
      tech: ["Python", "LiveKit", "AI/ML"],
      features: [
        "Real-time voice communication",
        "AI-powered responses",
        "LiveKit API integration",
        "Custom prompts and tools",
        "Agent-based architecture",
      ],
      github: "https://github.com/Praashon/Baymax-AI",
      gradient: "from-blue-400 to-cyan-500",
      icon: <SiPython size={40} />
    },
    {
      title: "Facebook Unsaver",
      description:
        "Clean up your saved posts on Facebook with one click! Because digital decluttering is real.",
      personalNote: "Made this when my saved posts got out of control - now it's just... *click* done!",
      tech: ["JavaScript", "Browser Extension"],
      features: [
        "One-click unsave functionality",
        "Background processing",
        "User-friendly interface",
        "Chrome extension compatible",
        "Efficient batch operations",
      ],
      github: "https://github.com/Praashon/Facebook-Unsaver-Script",
      gradient: "from-indigo-400 to-purple-500",
      icon: <FaReact size={40} />
    },
    {
      title: "Telegram Message Sender",
      description:
        "Automate your Telegram messages like a pro! Smart, efficient, and saves all the details.",
      personalNote: "A handy script for when you need to reach out to multiple people - automation for the win!",
      tech: ["Python", "Python Script"],
      features: [
        "Sends a message to a specified Telegram user.",
        "Saves receiver information to a file",
        "Checks if user info already exists before saving",
      ],
      github: "https://github.com/Praashon/Telegram_Message",
      gradient: "from-sky-400 to-blue-500",
      icon: <FaReact size={40} />
    },
  ];

  const techIcons: { [key: string]: JSX.Element } = {
    PHP: <SiPhp className="text-amber-400" size={24} />,
    MySQL: <SiMysql className="text-orange-400" size={24} />,
    MongoDB: <SiMongodb className="text-amber-500" size={24} />,
    "Express.js": <SiExpress className="text-gray-300" size={24} />,
    "React.js": <SiReact className="text-amber-400" size={24} />,
    "Node.js": <SiNodedotjs className="text-amber-600" size={24} />,
    Django: <SiDjango className="text-orange-600" size={24} />,
    Python: <SiPython className="text-yellow-500" size={24} />,
    PostgreSQL: <SiPostgresql className="text-orange-500" size={24} />,
    "Tailwind CSS": <SiTailwindcss className="text-amber-400" size={24} />,
    LiveKit: <FaServer className="text-amber-500" size={24} />,
    "AI/ML": <FaDatabase className="text-yellow-600" size={24} />,
    JavaScript: <SiJavascript className="text-yellow-500" size={24} />,
    "Browser Extension": (
      <FaExternalLinkAlt className="text-orange-400" size={24} />
    ),
    CSS: <SiTailwindcss className="text-amber-400" size={24} />,
  };

  return (
    <div className="min-h-screen bg-[#F1F0EA] pt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20">
        {/* Header with personality */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#2D232E]">
            Things I've Built
          </h1>
          <p className="text-xl text-[#534B52] max-w-3xl mx-auto mb-4">
            Each project tells a story of learning, problem-solving, and late-night coding sessions
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From full-stack web apps to clever automation tools - here's what keeps me excited about coding!
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden border-2 border-[#E0DDCF] hover:border-[#474448] hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 ease-out flex flex-col group"
            >
              <div className={`h-2 bg-gradient-to-r ${project.gradient}`}></div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-bold text-[#2D232E] mb-3">
                    {project.title}
                  </h2>
                  <p className="text-[#534B52] text-sm mb-3">
                    {project.description}
                  </p>
                  {project.personalNote && (
                    <p className="text-[#2D232E] text-xs italic bg-[#E0DDCF] px-3 py-2 rounded-lg inline-block">
                      💭 {project.personalNote}
                    </p>
                  )}
                </div>

                {/* Tech Stack */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">
                    Built With
                  </h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="flex items-center gap-1 px-3 py-1 bg-[#E0DDCF] rounded-full text-xs text-[#2D232E] border border-[#E0DDCF] hover:bg-[#534B52] hover:text-white transition-all duration-200"
                      >
                        {techIcons[tech]}
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6 flex-grow">
                  <h3 className="text-sm font-semibold text-[#2D232E] mb-2">
                    Cool Features
                  </h3>
                  <ul className="space-y-1">
                    {project.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-[#534B52] text-sm"
                      >
                        <span className="text-[#474448] mt-1">▹</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Links */}
                <div className="mt-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#2D232E] hover:bg-[#474448] text-white rounded-xl hover:scale-105 transition-all duration-300 ease-out shadow-lg group"
                  >
                    <FaGithub size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                    View Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="text-center mt-16 bg-[#E0DDCF] rounded-3xl p-12 border-2 border-[#534B52]">
          <h3 className="text-3xl font-bold text-[#2D232E] mb-4">
            There's More Where That Came From!
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            These are just some highlights! Check out my GitHub to see all my experiments, 
            contributions, and the occasional coding adventure.
          </p>
          <a
            href="https://github.com/praashon"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#2D232E] text-white rounded-full font-semibold hover:bg-[#474448] hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out group"
          >
            <FaGithub size={24} className="group-hover:rotate-12 transition-transform duration-300" />
            Explore My GitHub
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
