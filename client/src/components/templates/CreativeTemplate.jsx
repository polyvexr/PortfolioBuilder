import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, Linkedin, Twitter, Mail, MapPin, ExternalLink,
  Calendar, BookOpen, Briefcase, Code, Layers, Award,
  Zap
} from 'lucide-react';

const formatUrl = (url) => {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
};

const CreativeTemplate = ({ portfolio, isDark }) => {
  const { personalInfo, experience, projects, skills, socialLinks } = portfolio;





  return (
    <div className={`min-h-screen relative overflow-hidden font-outfit ${isDark ? 'bg-zinc-950 text-zinc-300' : 'bg-white text-zinc-800'} selection:bg-purple-500 selection:text-white`}>

      <div className="relative z-10">
        {/* Header / Nav Area */}
        <header className="px-8 py-12 flex justify-between items-center max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`text-2xl font-black italic tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            {personalInfo?.name?.split(' ')[0]?.toUpperCase()}.
          </motion.div>
          <div className="flex gap-4">
            {socialLinks?.github && <a href={formatUrl(socialLinks.github)} target="_blank" rel="noopener noreferrer" className={`p-3 backdrop-blur-md rounded-full border transition-all ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/20' : 'bg-white/40 border-slate-200 hover:bg-white/60'}`}><Github className="w-5 h-5" /></a>}
            {socialLinks?.twitter && <a href={formatUrl(socialLinks.twitter)} target="_blank" rel="noopener noreferrer" className={`p-3 backdrop-blur-md rounded-full border transition-all ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/20' : 'bg-white/40 border-slate-200 hover:bg-white/60'}`}><Twitter className="w-5 h-5" /></a>}
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-8 py-20 lg:py-40 max-w-7xl mx-auto flex flex-col items-center text-center">


          <motion.h1 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 font-outfit uppercase break-words max-w-full"
          >
            <span className="text-gradient">Hello, I'm</span><br />
            {personalInfo?.name}
          </motion.h1>

          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.6 }}
             className={`text-xl lg:text-3xl font-medium max-w-3xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'} italic`}
          >
            "{personalInfo?.bio}"
          </motion.p>
        </section>

        {/* Dynamic Skills Cloud */}
        <section className={`py-40 backdrop-blur-3xl overflow-hidden relative ${isDark ? 'bg-black/20' : 'bg-white/20'}`}>
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="grid grid-cols-10 h-full">
                {Array.from({length: 100}).map((_, i) => (
                  <div key={i} className={`border-r border-b ${isDark ? 'border-white/10' : 'border-slate-300/20'}`} />
                ))}
              </div>
           </div>
           
           <div className="max-w-7xl mx-auto px-8 relative">
              <h2 className={`text-xs font-extrabold uppercase tracking-[0.4em] opacity-40 mb-12 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>TECH SPECTRUM</h2>
              <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                {skills?.length > 0 && skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -2 }}
                    className={`px-5 py-2.5 rounded-full border ${isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-zinc-50 border-zinc-200 text-zinc-700'} text-sm font-medium shadow-sm transition-colors hover:border-indigo-500`}
                  >
                    {skill.name} <span className="text-[11px] opacity-50 ml-1">({skill.level})</span>
                  </motion.div>
                ))}
              </div>
           </div>
        </section>

        {/* Experience & Projects - Artistic Layout */}
        <section className="px-8 py-24 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            
            {/* Experience Column */}
            <div className="space-y-16">
              <h2 className="text-3xl font-extrabold mb-12 border-b border-indigo-500/20 pb-4">Experience</h2>
              <div className="space-y-12">
                {experience?.length > 0 && experience.map((exp, i) => (
                  <motion.div 
                    key={i}
                    whileInView={{ y: [15, 0], opacity: [0, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="group"
                  >
                    <div className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-2">{exp.startDate} - {exp.endDate}</div>
                    <h3 className="text-2xl font-bold mb-1 tracking-tight group-hover:text-purple-500 transition-colors">{exp.position}</h3>
                    <div className="text-lg font-semibold mb-4 opacity-70">@ {exp.company}</div>
                    <p className={`text-base leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Projects Column */}
            <div className="space-y-16 lg:pt-20">
              <h2 className="text-3xl font-extrabold mb-12 text-right border-b border-indigo-500/20 pb-4">Projects</h2>
              <div className="space-y-8">
                {projects?.length > 0 && projects.map((project, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -4 }}
                    className={`p-8 rounded-2xl border ${isDark ? 'bg-zinc-900/40 border-zinc-800 hover:bg-zinc-900/60' : 'bg-zinc-50 border-zinc-200/85 hover:bg-zinc-50'} shadow-sm relative overflow-hidden group`}
                  >
                    <div className="relative z-10 flex flex-col space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold tracking-tight">{project.title}</h3>
                        {project.liveLink && (
                          <a href={formatUrl(project.liveLink)} target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-full ${isDark ? 'bg-zinc-800 text-zinc-400 hover:text-white' : 'bg-zinc-100 text-zinc-650 hover:text-black'} shadow-sm transition-all`}>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      <p className={`leading-relaxed text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 pt-4">
                        {project.techStack?.map((tech, j) => (
                          <span key={j} className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-md border ${isDark ? 'bg-zinc-800/60 border-zinc-800 text-zinc-400' : 'bg-white border-zinc-200 text-zinc-600'}`}>{tech}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Massive Footer CTA */}
        <section className={`py-60 relative overflow-hidden bg-gradient-to-b ${isDark ? 'from-transparent to-purple-900/20' : 'from-transparent to-purple-100'}`}>
           <div className="max-w-7xl mx-auto px-8 text-center relative z-10">
              <motion.div
                whileInView={{ y: [20, 0], opacity: [0, 1] }}
                transition={{ duration: 0.6 }}
              >
                <h2 className={`text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-12 uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  LET'S <br /> <span className="text-gradient">WORK</span> <br /> TOGETHER.
                </h2>
                <div className="flex flex-col md:flex-row justify-center gap-8 items-center">
                  <a href={`mailto:${personalInfo?.email}`} className={`px-8 py-4 ${isDark ? 'bg-white text-black' : 'bg-slate-900 text-white'} text-lg font-bold uppercase rounded-full hover:scale-102 transition-all shadow-2xl`}>
                    GET IN TOUCH
                  </a>
                  <div className="flex gap-4">
                     {socialLinks?.linkedin && <a href={formatUrl(socialLinks.linkedin)} target="_blank" rel="noopener noreferrer" className={`w-20 h-20 rounded-full border-2 ${isDark ? 'border-white/20 hover:bg-white hover:text-black' : 'border-slate-900/20 hover:bg-slate-900 hover:text-white'} flex items-center justify-center transition-all`}><Linkedin className="w-8 h-8" /></a>}
                  </div>
                </div>
              </motion.div>
           </div>
           <div className={`absolute bottom-[-100px] left-[-100px] text-[20rem] lg:text-[30rem] font-black italic opacity-[0.03] pointer-events-none select-none ${isDark ? 'text-white' : 'text-black'}`}>
             ARTIST
           </div>
        </section>

        <footer className="py-20 text-center">
          <a href="/" className="group inline-flex flex-col items-center gap-2">
            <p className="text-xs font-black uppercase tracking-[0.5em] opacity-30 group-hover:opacity-100 transition-opacity">Built with BYP</p>
            <span className="text-indigo-500 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">Create your own for free →</span>
          </a>
        </footer>

      </div>
    </div>
  );
};

export default CreativeTemplate;
