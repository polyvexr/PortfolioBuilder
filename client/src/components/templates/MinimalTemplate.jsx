import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, Linkedin, Twitter, Mail, MapPin, ExternalLink,
  Calendar, BookOpen, Briefcase, Code, Layers, Award,
  ArrowUpRight, Zap, Target
} from 'lucide-react';

const formatUrl = (url) => {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
};

const MinimalTemplate = ({ portfolio, isDark }) => {
  const { personalInfo, education, experience, projects, skills, socialLinks } = portfolio;

  const fadeIn = {
    hidden: { opacity: 0, y: 4 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-zinc-950 text-zinc-300' : 'bg-white text-zinc-800'} selection:bg-indigo-500 selection:text-white font-sans`}>
      <main className="max-w-6xl mx-auto px-6 py-12 lg:py-24">
        
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* 1. Profile / Hero (Large Bento) */}
          <motion.section 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className={`md:col-span-8 p-8 lg:p-12 rounded-2xl border ${isDark ? 'bg-zinc-900/40 border-zinc-800/80 text-zinc-300' : 'bg-zinc-50/50 border-zinc-200/60 text-zinc-800'} shadow-sm relative overflow-hidden group`}
          >
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">

                <div className="text-center md:text-left">
                  <h1 className={`text-3xl lg:text-5xl font-extrabold tracking-tight mb-4 font-outfit ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {personalInfo?.name}
                  </h1>
                  <p className={`text-lg font-semibold ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                    {personalInfo?.role}
                  </p>
                </div>
              </div>
              <p className={`text-base lg:text-lg leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'} font-medium max-w-2xl`}>
                {personalInfo?.bio}
              </p>
            </div>
          </motion.section>

          {/* 2. Contact Info (Small Bento) */}
          <motion.section 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.1 }}
            className={`md:col-span-4 p-8 rounded-2xl border ${isDark ? 'bg-zinc-900/40 border-zinc-800/80 text-zinc-300' : 'bg-zinc-50/50 border-zinc-200/60 text-zinc-800'} shadow-sm flex flex-col justify-between`}
          >
            <div className="space-y-6">
              <h2 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Contact & Location</h2>
              <div className="space-y-4">
                {personalInfo?.email && (
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-3 transition-colors hover:text-indigo-500">
                    <Mail className="w-5 h-5 opacity-50" />
                    <span className="font-bold underline underline-offset-4 decoration-2 decoration-indigo-500/30 truncate">{personalInfo.email}</span>
                  </a>
                )}
                {personalInfo?.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 opacity-50" />
                    <span className="font-bold">{personalInfo.location}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2 mt-8">
              {[
                { icon: Github, href: socialLinks?.github },
                { icon: Linkedin, href: socialLinks?.linkedin },
                { icon: Twitter, href: socialLinks?.twitter }
              ].map((social, i) => social.href && (
                <a key={i} href={formatUrl(social.href)} target="_blank" rel="noopener noreferrer" className={`p-3 rounded-xl border ${isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white' : 'bg-white border-zinc-200 text-zinc-650 hover:text-black'} transition-colors`}>
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.section>

          {/* 3. Skills (Medium Bento) */}
          <motion.section 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className={`md:col-span-5 p-8 rounded-2xl border ${isDark ? 'bg-zinc-900/40 border-zinc-800/80' : 'bg-zinc-50/50 border-zinc-200/60'} shadow-sm`}
          >
            <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Zap className="w-5 h-5 text-indigo-500" /> Top Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills?.length > 0 ? skills.map((skill, i) => (
                <span key={i} className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-white border-zinc-200 text-zinc-705'} hover:bg-indigo-650 dark:hover:bg-indigo-600 hover:text-white transition-colors cursor-default shadow-sm`}>
                  {skill.name}
                </span>
              )) : <span className="opacity-50 italic text-sm">No skills added.</span>}
            </div>
          </motion.section>

          {/* 4. Experience Timeline (Large Bento - Scrollable) */}
          <motion.section 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.3 }}
            className={`md:col-span-7 p-8 rounded-2xl border ${isDark ? 'bg-zinc-900/40 border-zinc-800/80' : 'bg-zinc-50/50 border-zinc-200/60'} shadow-sm max-h-[500px] overflow-y-auto custom-scrollbar`}
          >
            <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 sticky top-0 ${isDark ? 'bg-zinc-950/80 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md'} pb-4 z-10 rounded-xl`}>
              <Target className="w-4 h-4 text-indigo-500" /> Experience
            </h2>
            <div className="space-y-8">
              {experience?.length > 0 ? experience.map((exp, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-indigo-500/20 last:border-0 pb-2">
                  <div className="absolute top-0 left-[-5px] w-2 h-2 rounded-full bg-indigo-500" />
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-bold text-base leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{exp.position}</h3>
                    <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md ${isDark ? 'bg-white/10 text-slate-400' : 'bg-slate-200 text-slate-500'}`}>
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <p className="text-indigo-500 font-medium mb-2">{exp.company}</p>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'} font-medium`}>{exp.description}</p>
                </div>
              )) : <p className="opacity-50 italic">No experience logged.</p>}
            </div>
          </motion.section>

          {/* 5. Featured Projects (Big Bento Grid) */}
          <motion.section 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
            className="md:col-span-12"
          >
            <div className="flex items-center justify-between mb-8 px-4">
              <h2 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Featured Projects</h2>
              <div className="h-px flex-1 mx-8 bg-current opacity-10" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects?.length > 0 ? projects.map((project, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -2 }}
                  className={`p-6 rounded-2xl border ${isDark ? 'bg-zinc-900/40 border-zinc-800/80' : 'bg-zinc-50/50 border-zinc-200/60'} shadow-sm group relative overflow-hidden`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-750'}`}>
                      <Layers className="w-5 h-5" />
                    </div>
                    <div className="flex gap-2">
                      {project.githubLink && (
                        <a href={formatUrl(project.githubLink)} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-lg ${isDark ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white' : 'hover:bg-zinc-205/60 text-zinc-500 hover:text-black'} transition-colors`}>
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveLink && (
                        <a href={formatUrl(project.liveLink)} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-lg ${isDark ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white' : 'hover:bg-zinc-205/60 text-zinc-500 hover:text-black'} transition-colors`}>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className={`text-xl font-bold mb-3 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{project.title}</h3>
                  <p className={`text-sm mb-8 leading-relaxed font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.map((tech, j) => (
                      <span key={j} className="text-[10px] font-black uppercase tracking-widest opacity-40">{tech}</span>
                    ))}
                  </div>
                  
                  {/* Decorative number */}
                  <div className={`absolute bottom-[-10px] right-5 text-5xl font-black opacity-[0.03] ${isDark ? 'text-white' : 'text-slate-200'} pointer-events-none group-hover:text-indigo-500/10 transition-colors`}>
                    0{i+1}
                  </div>
                </motion.div>
              )) : <div className="col-span-full text-center py-20 opacity-30 italic">No projects showcased yet.</div>}
            </div>
          </motion.section>

          {/* 6. Education (Medium Bento) */}
          <motion.section 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.5 }}
            className={`md:col-span-12 p-8 lg:p-12 rounded-2xl border ${isDark ? 'bg-zinc-900/40 border-zinc-800/80' : 'bg-zinc-50/50 border-zinc-200/60'} shadow-sm`}
          >
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className={`text-2xl font-bold tracking-tight mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Education</h2>
                <p className={`font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Academic profile and certifications.</p>
              </div>
              <div className="space-y-10">
                {education?.length > 0 ? education.map((edu, i) => (
                  <div key={i} className="flex gap-6">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${isDark ? 'bg-white/5 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className={`text-lg font-bold tracking-tight mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{edu.degree} in {edu.fieldOfStudy}</h4>
                      <p className="font-semibold text-indigo-500 mb-1">{edu.institution}</p>
                      <span className={`text-xs font-medium uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{edu.startYear} — {edu.endYear}</span>
                    </div>
                  </div>
                )) : <p className="opacity-50 italic">No education listed.</p>}
              </div>
            </div>
          </motion.section>

        </div>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-current opacity-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs font-black uppercase tracking-[0.4em] opacity-40">
            BYP ARCHIVE © 2026
          </div>
          <div className="flex gap-4">
            <a href="/" className="text-xs font-black uppercase tracking-widest italic text-indigo-500 hover:text-indigo-600 transition-colors">
              Built with BYP. Create yours free.
            </a>
          </div>
        </footer>

      </main>
    </div>
  );
};

export default MinimalTemplate;
