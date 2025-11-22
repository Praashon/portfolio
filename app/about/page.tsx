import { FaBriefcase, FaGraduationCap, FaCode, FaLanguage, FaMapMarkerAlt, FaEnvelope, FaGithub } from 'react-icons/fa';

export default function About() {
  const stats = [
    { label: 'Experience', value: '1+ Years' },
    { label: 'Projects', value: '5+' },
    { label: 'Technologies', value: '10+' },
  ];

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
      year: '2021 - Present',
    },
    {
      degree: '+2 Science',
      institution: 'Global College of Management',
      status: 'Completed',
      year: '2019 - 2021',
    },
  ];

  const skillCategories = [
    { 
      name: 'Frontend Development',
      skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS', 'JavaScript'],
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
    },
    { 
      name: 'Backend Development',
      skills: ['Node.js', 'Express.js', 'Django', 'PHP'],
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
    },
    { 
      name: 'Database Management',
      skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis'],
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
    },
    { 
      name: 'Tools & Design',
      skills: ['Git', 'VS Code', 'Figma', 'Photoshop'],
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
    },
  ];

  const languages = [
    { name: 'Nepali', level: 'Native', icon: '🇳🇵' },
    { name: 'English', level: 'Fluent', icon: '🇬🇧' },
    { name: 'Hindi', level: 'Fluent', icon: '🇮🇳' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1d3557] via-[#457b9d] to-[#1d3557] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[#f1faee]">
            About Me
          </h1>
          <p className="text-xl text-[#a8dadc] max-w-3xl mx-auto">
            Full-stack developer passionate about building elegant solutions to complex problems
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#1d3557]/50 backdrop-blur-sm rounded-xl p-6 border border-[#457b9d]/30 text-center hover:scale-105 hover:border-[#a8dadc]/50 transition-all duration-300 ease-out"
            >
              <div className="text-3xl font-bold text-[#f1faee] mb-1">{stat.value}</div>
              <div className="text-sm text-[#a8dadc]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Experience Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#f1faee] mb-8 flex items-center gap-3">
            <FaBriefcase className="text-[#f1faee] hover:scale-110 transition-transform duration-300 ease-out" />
            Work Experience
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="bg-[#1d3557]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#457b9d]/30 hover:border-[#a8dadc]/70 hover:-translate-y-2 transition-all duration-300 ease-out"
              >
                <div className="h-2 bg-gradient-to-r from-[#001d3d] to-[#293241]"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#f1faee] mb-2">{exp.title}</h3>
                  <p className="text-[#f1faee] font-medium mb-1">{exp.company}</p>
                  <span className="inline-block px-3 py-1 bg-[#457b9d]/20 text-[#a8dadc] rounded-full text-sm mb-3">
                    {exp.duration}
                  </span>
                  <p className="text-[#a8dadc]">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#f1faee] mb-8 flex items-center gap-3">
            <FaGraduationCap className="text-[#f1faee] hover:scale-110 transition-transform duration-300 ease-out" />
            Education
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-[#1d3557]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#457b9d]/30 hover:border-[#a8dadc]/70 hover:-translate-y-2 transition-all duration-300 ease-out"
              >
                <div className="h-2 bg-gradient-to-r from-[#001d3d] to-[#293241]"></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-[#f1faee] mb-2">{edu.degree}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    edu.status === 'Ongoing' 
                      ? 'bg-[#457b9d]/20 text-[#a8dadc]' 
                      : 'bg-[#457b9d]/20 text-[#a8dadc]'
                  }`}>
                    {edu.status}
                  </span>
                </div>
                  <p className="text-[#f1faee] font-medium mb-1">{edu.institution}</p>
                  {edu.university && <p className="text-sm text-[#a8dadc] mb-2">{edu.university}</p>}
                  <p className="text-sm text-[#a8dadc]">{edu.year}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#f1faee] mb-8 flex items-center gap-3">
            <FaCode className="text-[#f1faee] hover:scale-110 transition-transform duration-300 ease-out" />
            Skills
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="bg-[#1d3557]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#457b9d]/30 hover:border-[#a8dadc]/70 hover:-translate-y-2 transition-all duration-300 ease-out"
              >
                <div className="h-2 bg-gradient-to-r from-[#001d3d] to-[#293241]"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#f1faee] mb-4">{category.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#457b9d]/20 text-[#a8dadc] rounded-full text-sm"
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
          <h2 className="text-3xl font-bold text-[#f1faee] mb-8 flex items-center gap-3">
            <FaLanguage className="text-[#f1faee] hover:scale-110 transition-transform duration-300 ease-out" />
            Languages
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {languages.map((lang, index) => (
              <div
                key={index}
                className="bg-[#1d3557]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-[#457b9d]/30 hover:border-[#a8dadc]/70 hover:-translate-y-2 transition-all duration-300 ease-out"
              >
                <div className="h-2 bg-gradient-to-r from-[#001d3d] to-[#293241]"></div>
                <div className="p-6 text-center">
                  <div className="text-4xl mb-3">{lang.icon}</div>
                  <h3 className="text-xl font-bold text-[#f1faee] mb-2">{lang.name}</h3>
                  <p className="text-[#a8dadc]">{lang.level}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-[#a8dadc] mb-4">Want to work together?</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#e63946] text-[#f1faee] rounded-full font-semibold hover:bg-[#d62839] hover:scale-105 transition-all duration-300 ease-out"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
