'use client';

import { FaBriefcase, FaGraduationCap, FaCode, FaLanguage, FaHeart, FaGamepad, FaMusic, FaCoffee, FaBook } from 'react-icons/fa';

export default function About() {
  const stats = [
    { label: 'Years Coding', value: '1+' },
    { label: 'Projects Completed', value: '5+' },
    { label: 'Tech Stack', value: '10+' },
    { label: 'Cups of Coffee', value: '∞' },
  ];

  const experiences = [
    {
      title: 'PHP Developer',
      company: 'Divya Gyan College',
      duration: '3 months',
      description: 'Built dynamic web applications and learned the art of backend development',
      color: 'from-blue-400 to-blue-600'
    },
    {
      title: 'Junior Graphics Designer',
      company: 'Lisnu Tech',
      duration: '6 months',
      description: 'Designed eye-catching visuals that tell stories and connect with people',
      color: 'from-purple-400 to-purple-600'
    },
    {
      title: 'Graphics Design Intern',
      company: 'ITN',
      duration: '4 months',
      description: 'Explored the creative side of tech and honed my design skills',
      color: 'from-pink-400 to-pink-600'
    },
  ];

  const education = [
    {
      degree: 'Bachelor of Computer Application (BCA)',
      institution: 'Divya Gyan College',
      university: 'Tribhuvan University',
      status: 'Ongoing',
      year: '2021 - Present',
      note: 'Learning, growing, and building cool stuff!'
    },
    {
      degree: '+2 Management',
      institution: 'Global College of Management',
      status: 'Completed',
      year: '2019 - 2021',
      note: 'Where my tech journey began'
    },
  ];

  const skillCategories = [
    { 
      name: 'Frontend Magic',
      skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS', 'JavaScript'],
      gradient: 'from-cyan-400 to-blue-500',
    },
    { 
      name: 'Backend Power',
      skills: ['Node.js', 'Express.js', 'Django', 'PHP'],
      gradient: 'from-green-400 to-emerald-600',
    },
    { 
      name: 'Database Wizardry',
      skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis'],
      gradient: 'from-amber-400 to-orange-600',
    },
    { 
      name: 'Tools & Design',
      skills: ['Git', 'VS Code', 'Figma', 'Photoshop'],
      gradient: 'from-purple-400 to-pink-600',
    },
  ];

  const languages = [
    { name: 'Nepali', level: 'Native', icon: '🇳🇵' },
    { name: 'English', level: 'Fluent', icon: '🇬🇧' },
    { name: 'Hindi', level: 'Fluent', icon: '🇮🇳' },
  ];

  const hobbies = [
    { name: 'Coding', icon: <FaCode />, description: 'Obviously!' },
    { name: 'Gaming', icon: <FaGamepad />, description: 'Level up in life & games' },
    { name: 'Music', icon: <FaMusic />, description: 'Lo-fi while coding' },
    { name: 'Reading', icon: <FaBook />, description: 'Tech blogs & novels' },
  ];

  return (
    <div className="min-h-screen bg-[#F1F0EA] pt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20">
        {/* Header with personality */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#2D232E]">
            A Little About Me
          </h1>
          <p className="text-xl text-[#534B52] max-w-3xl mx-auto leading-relaxed mb-4">
            Hey there! I'm <span className="font-bold text-[#2D232E]">Prashon</span>, a curious soul who fell in love with code. 
            I believe in building things that make a difference, one line at a time.
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            When I'm not debugging code (or my life), you'll find me exploring new technologies, 
            sipping coffee, and dreaming about the next cool project to build!
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 border-2 border-[#E0DDCF] text-center hover:scale-105 hover:border-[#474448] hover:shadow-2xl transition-all duration-300 ease-out group"
            >
              <div className="text-3xl font-bold text-[#2D232E] mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Experience Section with personality */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#2D232E] mb-4 flex items-center gap-3">
            <FaBriefcase className="text-[#474448] hover:scale-110 transition-transform duration-300 ease-out" />
            My Journey So Far
          </h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Here's where I've been and what I've learned along the way...
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-rose-100 hover:border-orange-300 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-out group"
              >
                <div className={`h-2 bg-gradient-to-r ${exp.color}`}></div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-[#2D232E] mb-2">{exp.title}</h3>
                  <p className="text-[#474448] font-medium mb-1">{exp.company}</p>
                  <span className="inline-block px-3 py-1 bg-[#E0DDCF] text-[#2D232E] rounded-full text-sm mb-3">
                    {exp.duration}
                  </span>
                  <p className="text-gray-600">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#2D232E] mb-4 flex items-center gap-3">
            <FaGraduationCap className="text-[#474448] hover:scale-110 transition-transform duration-300 ease-out" />
            Education
          </h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            The foundation of my tech adventures!
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden border-2 border-[#E0DDCF] hover:border-[#474448] hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-out group"
              >
                <div className="h-2 bg-gradient-to-r from-[#474448] to-[#2D232E]"></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      edu.status === 'Ongoing' 
                        ? 'bg-[#E0DDCF] text-[#2D232E]' 
                        : 'bg-[#E0DDCF] text-[#474448]'
                    }`}>
                      {edu.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#2D232E] mb-2">{edu.degree}</h3>
                  <p className="text-[#474448] font-medium mb-1">{edu.institution}</p>
                  {edu.university && <p className="text-sm text-gray-600 mb-2">{edu.university}</p>}
                  <p className="text-sm text-gray-500 mb-3">{edu.year}</p>
                  <p className="text-sm text-gray-600 italic">{edu.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#2D232E] mb-4 flex items-center gap-3">
            <FaCode className="text-[#474448] hover:scale-110 transition-transform duration-300 ease-out" />
            What I Work With
          </h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            My toolkit for bringing ideas to life!
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden border-2 border-[#E0DDCF] hover:border-[#474448] hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-out group"
              >
                <div className="h-2 bg-gradient-to-r from-[#474448] to-[#2D232E]"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#2D232E] mb-4">{category.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-2 bg-[#E0DDCF] text-[#2D232E] rounded-full text-sm font-medium hover:bg-[#534B52] hover:text-white hover:scale-105 transition-all duration-200 cursor-default border border-[#E0DDCF]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Languages Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#2D232E] mb-4 flex items-center gap-3">
            <FaLanguage className="text-[#474448] hover:scale-110 transition-transform duration-300 ease-out" />
            Languages I Speak
          </h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Communication is key!
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {languages.map((lang, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden border-2 border-[#E0DDCF] hover:border-[#474448] hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-out group"
              >
                <div className="h-2 bg-gradient-to-r from-[#474448] to-[#2D232E]"></div>
                <div className="p-8 text-center">
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">{lang.icon}</div>
                  <h3 className="text-xl font-bold text-[#2D232E] mb-2">{lang.name}</h3>
                  <p className="text-gray-600">{lang.level}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hobbies Section - NEW! */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#2D232E] mb-4 flex items-center gap-3">
            <FaHeart className="text-[#474448] hover:scale-110 transition-transform duration-300 ease-out" />
            When I'm Not Coding
          </h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Life is more than just code (though code is pretty awesome!)
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {hobbies.map((hobby, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 border-2 border-[#E0DDCF] hover:border-[#474448] hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-out group text-center"
              >
                <div className="text-4xl text-[#474448] mb-3 group-hover:scale-125 transition-transform duration-300 flex justify-center">
                  {hobby.icon}
                </div>
                <h3 className="text-lg font-bold text-[#2D232E] mb-1">{hobby.name}</h3>
                <p className="text-sm text-gray-600">{hobby.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <div className="text-center bg-[#E0DDCF] rounded-3xl p-16 border-2 border-[#534B52]">
          <h3 className="text-3xl font-bold text-[#2D232E] mb-4">
            Let's Create Something Amazing Together!
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            I'm always excited to collaborate on new projects or just have a chat about tech!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#2D232E] text-white rounded-full font-semibold hover:bg-[#474448] hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out"
          >
            Let's Talk!
          </a>
        </div>
      </div>
    </div>
  );
}
