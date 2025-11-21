'use client';

import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaCode, FaLanguage } from 'react-icons/fa';

export default function About() {
  const experiences = [
    {
      title: 'PHP Developer',
      company: 'Divya Gyan College',
      duration: '3 months',
      description: 'Developed web applications using PHP and MySQL',
    },
    {
      title: 'Junior Graphics Designer',
      company: 'Lisnu Tech',
      duration: '6 months',
      description: 'Created visual designs and marketing materials',
    },
    {
      title: 'Graphics Design Intern',
      company: 'ITN',
      duration: '4 months',
      description: 'Assisted in creating digital content and designs',
    },
  ];

  const education = [
    {
      degree: 'Bachelor of Computer Application (BCA)',
      institution: 'Divya Gyan College',
      university: 'Tribhuvan University',
      status: 'Ongoing',
    },
    {
      degree: '+2 Science',
      institution: 'Global College of Management',
      status: 'Completed',
    },
    {
      degree: 'SEE',
      institution: 'Siddhartha Vidhyapeeth',
      status: 'Completed',
    },
  ];

  const skills = {
    Frontend: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS', 'JavaScript'],
    Backend: ['Node.js', 'Express.js', 'Django', 'PHP'],
    Database: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis'],
    Tools: ['Git', 'VS Code', 'Figma', 'Photoshop'],
  };

  const languages = [
    { name: 'Nepali', level: 'Native' },
    { name: 'English', level: 'Fluent' },
    { name: 'Hindi', level: 'Fluent' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-amber-950 to-stone-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-500 text-transparent bg-clip-text">
            About Me
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A passionate full-stack developer from Kathmandu, Nepal, dedicated to creating impactful web solutions
          </p>
        </motion.div>

        {/* Experience Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <FaBriefcase className="text-amber-500" />
            Experience
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-stone-900/50 backdrop-blur-sm rounded-lg p-6 border border-amber-900/30 hover:border-amber-700/50 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-amber-400 mb-2">{exp.title}</h3>
                <p className="text-gray-300 font-medium mb-1">{exp.company}</p>
                <p className="text-sm text-gray-400 mb-3">{exp.duration}</p>
                <p className="text-gray-300">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <FaGraduationCap className="text-orange-500" />
            Education
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-stone-900/50 backdrop-blur-sm rounded-lg p-6 border border-amber-900/30 hover:border-amber-700/50 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-orange-400 mb-2">{edu.degree}</h3>
                <p className="text-gray-300 font-medium">{edu.institution}</p>
                {edu.university && <p className="text-sm text-gray-400">{edu.university}</p>}
                <span className="inline-block mt-2 px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm">
                  {edu.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <FaCode className="text-yellow-600" />
            Skills
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skills).map(([category, items], index) => (
              <motion.div
                key={category}
                whileHover={{ scale: 1.05 }}
                className="bg-stone-900/50 backdrop-blur-sm rounded-lg p-6 border border-amber-900/30 hover:border-amber-700/50 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-yellow-500 mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-yellow-700/20 text-yellow-300 rounded-full text-sm hover:bg-yellow-700/30 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Languages Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <FaLanguage className="text-amber-600" />
            Languages
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {languages.map((lang, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-stone-900/50 backdrop-blur-sm rounded-lg p-6 border border-amber-900/30 text-center"
              >
                <h3 className="text-xl font-semibold text-amber-400 mb-2">{lang.name}</h3>
                <p className="text-gray-300">{lang.level}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
