import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, Linkedin, Twitter, Mail, MapPin, ExternalLink,
  Calendar, BookOpen, Briefcase, Code, Layers, Award,
  Sparkles, Terminal, Cpu, Globe
} from 'lucide-react';

const formatUrl = (url) => {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
};

const ModernTemplate = ({ portfolio, isDark }) => {
  const { personalInfo, education, experience, projects, skills, socialLinks } = portfolio;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-indigo-500 selection:text-white ${isDark ? 'bg-zinc-950 text-zinc-300' : 'bg-white text-zinc-800'}`}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-screen relative">

        {/* Left Sidebar - Fixed on desktop */}
        <motion.aside 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className={`lg:w-[360px] lg:sticky lg:top-0 lg:h-screen p-8 lg:p-12 flex flex-col justify-between z-20 lg:border-r ${isDark ? 'border-zinc-900 bg-zinc-950' : 'border-zinc-100 bg-white'}`}
        >
          <div className="space-y-6">
            {/* Profile Section */}
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h1 className={`text-3xl font-bold font-outfit tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                  {personalInfo?.name}
                </h1>
                <p className={`text-sm font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-650'} mt-2`}>
                  {personalInfo?.role}
                </p>
              </motion.div>
              
              <div className="space-y-3 mt-6">
                {personalInfo?.email && (
                  <a href={`mailto:${personalInfo.email}`} className={`flex items-center gap-2.5 text-sm ${isDark ? 'text-zinc-400 hover:text-zinc-100' : 'text-zinc-600 hover:text-zinc-900'} transition-colors`}>
                    <Mail className="w-4 h-4 opacity-60" />
                    <span>{personalInfo.email}</span>
                  </a>
                )}
                {personalInfo?.location && (
                  <div className={`flex items-center gap-2.5 text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    <MapPin className="w-4 h-4 opacity-60" />
                    <span>{personalInfo.location}</span>
                  </div>
                )}
              </div>

              {/* Bio */}
              <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'} mt-6`}>
                {personalInfo?.bio}
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-3.5 mt-8 lg:mt-0">
            {[
              { icon: Github, href: socialLinks?.github },
              { icon: Linkedin, href: socialLinks?.linkedin },
              { icon: Twitter, href: socialLinks?.twitter }
            ].map((social, i) => social.href && (
              <a 
                key={i}
                href={formatUrl(social.href)} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`p-2.5 rounded-lg border ${isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-650 hover:text-black'} transition-colors`}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </motion.aside>

        {/* Right Content - Scrollable */}
        <main className="flex-1 p-8 lg:p-5 lg:pt-10 z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-24"
          >
            {/* Experience Section */}
            <section id="experience" className="space-y-8">
              <div className="border-b border-slate-200/60 dark:border-slate-800/80 pb-4">
                <h2 className={`text-2xl font-bold font-outfit tracking-tight flex items-center gap-2.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <Briefcase className="w-5.5 h-5.5 text-indigo-500" />
                  Experience
                </h2>
              </div>

              <div className="space-y-8">
                {experience?.length > 0 ? experience.map((exp, i) => (
                  <motion.div 
                    key={i}
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-8 border-b last:border-b-0 border-dashed border-zinc-200 dark:border-zinc-800"
                  >
                    <div className="space-y-2 max-w-xl">
                      <div>
                        <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>{exp.position}</h3>
                        <p className={`text-sm font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>{exp.company}</p>
                      </div>
                      <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>{exp.description}</p>
                    </div>
                    <div className={`text-xs font-mono text-zinc-400 dark:text-zinc-500`}>
                      {exp.startDate} — {exp.endDate}
                    </div>
                  </motion.div>
                )) : (
                  <div className="text-center py-12 opacity-50 font-medium">Add your experience to showcase your career journey.</div>
                )}
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="space-y-8">
              <div className="border-b border-slate-200/60 dark:border-slate-800/80 pb-4">
                <h2 className={`text-2xl font-bold font-outfit tracking-tight flex items-center gap-2.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <Layers className="w-5.5 h-5.5 text-purple-500" />
                  Featured Projects
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects?.length > 0 ? projects.map((project, i) => (
                  <motion.div 
                    key={i}
                    variants={itemVariants}
                    whileHover={{ y: -3 }}
                    className={`group relative flex flex-col h-full p-6 rounded-2xl border ${isDark ? 'bg-zinc-900/40 border-zinc-800/80 hover:bg-zinc-900/60' : 'bg-zinc-50/50 border-zinc-200/60 hover:bg-zinc-50'} transition-all`}
                  >
                    <div className="relative z-10 flex flex-col h-full space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-base font-bold font-outfit ${isDark ? 'text-white' : 'text-zinc-900'}`}>{project.title}</h3>
                        <div className="flex gap-2">
                          {project.githubLink && (
                            <a href={formatUrl(project.githubLink)} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-lg ${isDark ? 'hover:bg-zinc-850 text-zinc-400 hover:text-white' : 'hover:bg-zinc-200/60 text-zinc-500 hover:text-black'} transition-colors`}>
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {project.liveLink && (
                            <a href={formatUrl(project.liveLink)} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-lg ${isDark ? 'hover:bg-zinc-850 text-zinc-400 hover:text-white' : 'hover:bg-zinc-200/60 text-zinc-500 hover:text-black'} transition-colors`}>
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                      
                      <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'} line-clamp-3 flex-grow`}>{project.description}</p>
                      
                      <div className="flex flex-wrap gap-1.5 pt-4 mt-auto">
                        {project.techStack?.map((tech, j) => (
                          <span key={j} className={`px-2.5 py-0.5 text-[10px] font-mono rounded-md ${isDark ? 'bg-zinc-800/60 text-zinc-400' : 'bg-zinc-200/40 text-zinc-650'}`}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )) : (
                  <div className="md:col-span-2 text-center py-12 opacity-50 font-medium">No projects added yet.</div>
                )}
              </div>
            </section>

            {/* Skills & Education Duo */}
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Skills */}
              <section id="skills" className="space-y-6">
                <div className="border-b border-slate-200/60 dark:border-slate-800/80 pb-3">
                  <h2 className={`text-xl font-bold font-outfit tracking-tight flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <Code className="w-5 h-5 text-blue-500" />
                    Skills
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {skills?.length > 0 ? skills.map((skill, i) => (
                    <motion.div 
                      key={i}
                      variants={itemVariants}
                      whileHover={{ y: -1 }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-medium border ${
                        isDark ? 'bg-zinc-900/40 border-zinc-800/80 text-zinc-300' : 'bg-zinc-50 border-zinc-250 text-zinc-705'
                      } transition-colors`}
                    >
                      {skill.name}
                      <span className={`text-[10px] font-semibold tracking-wide ml-1.5 opacity-50`}>({skill.level})</span>
                    </motion.div>
                  )) : (
                    <div className="opacity-50 font-medium">Add skills to show your technical stack.</div>
                  )}
                </div>
              </section>

              {/* Education */}
              <section id="education" className="space-y-6">
                <div className="border-b border-slate-200/60 dark:border-slate-800/80 pb-3">
                  <h2 className={`text-xl font-bold font-outfit tracking-tight flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <BookOpen className="w-5 h-5 text-emerald-500" />
                    Education
                  </h2>
                </div>
                <div className="space-y-6">
                  {education?.length > 0 ? education.map((edu, i) => (
                    <motion.div 
                      key={i}
                      variants={itemVariants}
                      className={`pb-4 last:pb-0`}
                    >
                      <div className="text-xs text-zinc-400 dark:text-zinc-500 font-mono mb-1">
                        {edu.startYear} — {edu.endYear}
                      </div>
                      <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{edu.degree} in {edu.fieldOfStudy}</h3>
                      <p className={`text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>{edu.institution}</p>
                    </motion.div>
                  )) : (
                    <div className="opacity-50 font-medium">Add educational details to complete your profile.</div>
                  )}
                </div>
              </section>
            </div>

            <footer className={`pt-12 border-t ${isDark ? 'border-white/5' : 'border-slate-200'} text-center pb-8`}>
              <a href="/" className="inline-flex items-center justify-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-500 hover:text-indigo-500 transition-colors">
                MADE WITH <Globe className="w-3 h-3" /> BYP — BUILD YOURS
              </a>
            </footer>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default ModernTemplate;
