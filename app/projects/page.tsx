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
        "A comprehensive hotel management system with booking functionality, user management, and admin dashboard.",
      tech: ["PHP", "MySQL", "JavaScript", "CSS"],
      features: [
        "User authentication and authorization",
        "Room booking and management",
        "Admin dashboard for managing bookings",
        "User profile management",
        "Booking history and status tracking",
      ],
      github: "https://github.com/praashon",
      gradient: "from-[#001d3d] to-[#293241]",
      icon: <SiPhp size={40} />,
    },
    {
      title: "Food Ordering System",
      description:
        "A full-stack MERN application for online food ordering with real-time order tracking and payment integration.",
      tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS"],
      features: [
        "User and restaurant authentication",
        "Real-time menu browsing",
        "Shopping cart functionality",
        "Order placement and tracking",
        "Admin panel for restaurant management",
        "Review and rating system",
      ],
      github: "https://github.com/praashon",
      gradient: "from-[#001d3d] to-[#293241]",
      icon: <SiReact size={40} />,
    },
    {
      title: "Real Estate Platform",
      description:
        "A Django-based real estate platform for property listings, searches, and inquiries with advanced filtering.",
      tech: ["Django", "Python", "PostgreSQL", "HTML", "CSS"],
      features: [
        "Property listing management",
        "Advanced search and filtering",
        "User authentication",
        "Property inquiry system",
        "Agent profiles",
        "Responsive design",
      ],
      github: "https://github.com/praashon",
      gradient: "from-[#001d3d] to-[#293241]",
      icon: <SiDjango size={40} />,
    },
    {
      title: "Baymax AI",
      description:
        "An AI-powered voice assistant with LiveKit integration for real-time communication and intelligent interactions.",
      tech: ["Python", "LiveKit", "AI/ML"],
      features: [
        "Real-time voice communication",
        "AI-powered responses",
        "LiveKit API integration",
        "Custom prompts and tools",
        "Agent-based architecture",
      ],
      github: "https://github.com/praashon",
      gradient: "from-[#001d3d] to-[#293241]",
      icon: <SiPython size={40} />,
    },
    {
      title: "Facebook Unsaver",
      description:
        "A browser extension that helps users unsave all saved posts on Facebook with a single click.",
      tech: ["JavaScript", "Browser Extension"],
      features: [
        "One-click unsave functionality",
        "Background processing",
        "User-friendly interface",
        "Chrome extension compatible",
        "Efficient batch operations",
      ],
      github: "https://github.com/praashon",
      gradient: "from-[#001d3d] to-[#293241]",
      icon: <FaReact size={40} />,
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
    <div className="min-h-screen bg-gradient-to-br from-[#1d3557] via-[#457b9d] to-[#1d3557] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[#f1faee]">
            Projects
          </h1>
          <p className="text-xl text-[#a8dadc] max-w-3xl mx-auto">
            A showcase of my best work - from full-stack web applications to
            database-driven systems
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-[#1d3557]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#457b9d]/30 hover:border-[#a8dadc]/70 hover:-translate-y-2 transition-all duration-300 ease-out flex flex-col"
            >
              <div className={`h-2 bg-gradient-to-r ${project.gradient}`}></div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-6 text-center">
                  <div
                    className={`inline-block p-4 rounded-lg bg-gradient-to-r ${project.gradient} bg-opacity-10 mb-4 hover:scale-110 transition-transform duration-300 ease-out`}
                  >
                    {project.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-[#f1faee] mb-3">
                    {project.title}
                  </h2>
                  <p className="text-[#a8dadc] text-sm">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-[#f1faee] mb-2">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="flex items-center gap-1 px-3 py-1 bg-[#457b9d]/20 rounded-full text-xs text-[#a8dadc] border border-[#457b9d]/30"
                      >
                        {techIcons[tech]}
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6 flex-grow">
                  <h3 className="text-sm font-semibold text-[#f1faee] mb-2">
                    Key Features
                  </h3>
                  <ul className="space-y-1">
                    {project.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-[#a8dadc] text-sm"
                      >
                        <span className="text-[#e63946] mt-1">▹</span>
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
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-[#1d3557] hover:bg-[#1d3557]/80 text-[#f1faee] rounded-lg hover:scale-105 transition-all duration-300 ease-out shadow-lg hover:shadow-[#1d3557]/50"
                  >
                    <FaGithub size={18} />
                    View Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="text-center mt-16">
          <p className="text-[#a8dadc] mb-4">Want to see more?</p>
          <a
            href="https://github.com/praashon"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#e63946] text-[#f1faee] rounded-full font-semibold hover:bg-[#d62839] hover:scale-105 transition-all duration-300 ease-out"
          >
            <FaGithub size={24} />
            Visit My GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
