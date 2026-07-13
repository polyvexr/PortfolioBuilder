import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Zap, 
  Palette, 
  Smartphone, 
  Check, 
  Code, 
  Sparkles, 
  Globe, 
  Layout, 
  ArrowUpRight, 
  Github, 
  Eye, 
  Star, 
  Plus, 
  Trash2,
  Cpu,
  Monitor
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const LandingPage = () => {
  const { setShowRegisterModal, user } = useAuth();
  const { theme } = useTheme();
  
  const handleModel = () => {
    user ? (window.location.href = "/dashboard") : setShowRegisterModal(true);
  };

  // Mock Showcase Data
  const professions = {
    developer: {
      name: "Alex Rivera",
      role: "Full Stack Engineer",
      bio: "Crafting performant web experiences & scalable APIs. Passionate about system design & UX.",
      skills: ["React/Next.js", "Node.js", "TypeScript", "Python", "Docker", "GraphQL", "PostgreSQL"],
      themeColor: "from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400",
      avatar: "AR"
    },
    designer: {
      name: "Sophia Chen",
      role: "Senior UI/UX Designer",
      bio: "Creating human-centric interfaces and interactive prototypes that combine form & function.",
      skills: ["Figma", "Design Systems", "Prototyping", "Framer", "Adobe CC", "Typography", "User Research"],
      themeColor: "from-pink-500 to-rose-500 dark:from-pink-400 dark:to-rose-400",
      avatar: "SC"
    },
    manager: {
      name: "Marcus Vance",
      role: "Lead Product Manager",
      bio: "Driving product strategy, defining roadmaps, and executing data-backed product launches.",
      skills: ["Product Strategy", "User Analytics", "Agile/Scrum", "SQL", "A/B Testing", "Growth Loop", "Jira"],
      themeColor: "from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400",
      avatar: "MV"
    }
  };

  const [activeTab, setActiveTab] = useState('developer');
  const [interactiveSkills, setInteractiveSkills] = useState(professions[activeTab].skills);
  const [newSkillText, setNewSkillText] = useState('');

  // Sync skills when profession tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setInteractiveSkills(professions[tab].skills);
  };

  const addInteractiveSkill = (e) => {
    e.preventDefault();
    if (newSkillText.trim() && !interactiveSkills.includes(newSkillText.trim())) {
      setInteractiveSkills([...interactiveSkills, newSkillText.trim()]);
      setNewSkillText('');
    }
  };

  const removeInteractiveSkill = (skillToRemove) => {
    setInteractiveSkills(interactiveSkills.filter(s => s !== skillToRemove));
  };

  return (
    <div className="min-h-screen mesh-bg text-slate-900 dark:text-slate-100 selection:bg-indigo-500/30 font-sans transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline & Action */}
            <div className="lg:col-span-7 text-left space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 backdrop-blur-md shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Standard for Modern Developers & Designers</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] font-outfit text-slate-950 dark:text-white">
                  Build a <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Premium Portfolio</span> in Minutes.
                </h1>
                
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl font-medium">
                  Say goodbye to generic builders. Fill in your achievements, customize layout options, and instantly deploy a fast, beautifully designed showcase for recruiters.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
              >
                <button 
                  onClick={handleModel} 
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-full text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-xl shadow-indigo-500/25 dark:shadow-indigo-500/15 group cursor-pointer"
                >
                  Start Building Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a 
                  href="#features" 
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-full border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 active:scale-[0.98] transition-all cursor-pointer"
                >
                  Explore Features
                </a>
              </motion.div>

              {/* Mini Stats Banner */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200 dark:border-slate-800 max-w-md"
              >
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white font-outfit">100%</div>
                  <div className="text-xs text-slate-500 font-medium">Recruiter Ready</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white font-outfit">&lt; 3ms</div>
                  <div className="text-xs text-slate-500 font-medium">Load Speeds</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white font-outfit">3+</div>
                  <div className="text-xs text-slate-500 font-medium">Layout Styles</div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Interactive Live Preview Container */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-xl dark:opacity-30" />
              
              <div className="relative border border-slate-200 dark:border-slate-800 rounded-[2rem] bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl shadow-2xl p-6 overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50 pb-4 mb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-800">
                    <Globe className="w-3 h-3 text-indigo-500" /> b-y-p.app/{activeTab}
                  </span>
                </div>

                {/* Profession Toggles */}
                <div className="flex gap-1.5 bg-slate-100/80 dark:bg-slate-900/80 p-1 rounded-xl mb-5 border border-slate-200/30 dark:border-slate-800/30">
                  {Object.keys(professions).map((key) => (
                    <button
                      key={key}
                      onClick={() => handleTabChange(key)}
                      className={`flex-1 text-center py-2 px-1 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                        activeTab === key 
                          ? "bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm" 
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                      }`}
                    >
                      {key}
                    </button>
                  ))}
                </div>

                {/* Simulated Live Portfolio Preview card */}
                <div className="border border-slate-200 dark:border-slate-800/60 rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-inner relative overflow-hidden transition-all duration-300">
                  {/* Subtle decorative mesh inside preview */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-transparent blur-md pointer-events-none" />
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300 font-outfit shadow-sm text-sm">
                      {professions[activeTab].avatar}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-950 dark:text-white text-base font-outfit">{professions[activeTab].name}</h4>
                      <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{professions[activeTab].role}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                    {professions[activeTab].bio}
                  </p>

                  <div className="mt-4">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block mb-2">Skills Showcase</span>
                    <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto custom-scrollbar pr-1">
                      <AnimatePresence>
                        {interactiveSkills.map((skill, index) => (
                          <motion.span
                            key={skill}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="inline-flex items-center gap-1 py-1 px-2.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 transition-colors group/tag"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeInteractiveSkill(skill)}
                              className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                              title="Delete skill"
                            >
                              ×
                            </button>
                          </motion.span>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Try Interactive Editor Directly on Landing Page */}
                <div className="mt-4 border-t border-slate-200/60 dark:border-slate-800/60 pt-4">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-300 block mb-2">Try the Live Builder Editor here:</span>
                  <form onSubmit={addInteractiveSkill} className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Add a skill (e.g. Docker)..."
                      value={newSkillText}
                      onChange={(e) => setNewSkillText(e.target.value)}
                      className="flex-1 text-xs py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button 
                      type="submit"
                      className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add
                    </button>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Beautiful Logo Cloud / Trust */}
      <section className="py-8 border-y border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Supports Everything recruiters look for</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="font-outfit font-extrabold text-base tracking-widest text-slate-600 dark:text-slate-400">RESPONSIVE</span>
            <span className="font-outfit font-extrabold text-base tracking-widest text-slate-600 dark:text-slate-400">LIGHT &amp; DARK</span>
            <span className="font-outfit font-extrabold text-base tracking-widest text-slate-600 dark:text-slate-400">CUSTOM THEMES</span>
            <span className="font-outfit font-extrabold text-base tracking-widest text-slate-600 dark:text-slate-400">SEO OPTIMIZED</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Supercharged Portfolios</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-outfit text-slate-950 dark:text-white">Everything You Need to Stand Out</h2>
            <p className="text-slate-600 dark:text-slate-400 font-medium">Clean, optimized sections carefully designed to maximize readability and impress recruiters.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-5 h-5 text-amber-500" />,
                title: "Real-time Live Editor",
                desc: "Type details, toggle features, watch your portfolio update instantly in our ultra-responsive dashboard editor."
              },
              {
                icon: <Palette className="w-5 h-5 text-indigo-500" />,
                title: "Stunning Layouts",
                desc: "Toggle between Modern, Minimal, or Creative styles with a single click. Every template features both light and dark themes."
              },
              {
                icon: <Smartphone className="w-5 h-5 text-emerald-500" />,
                title: "Lightning Performance",
                desc: "No heavy bloated sites. Developed for ultimate speed and perfect SEO, ensuring your site reads perfectly on mobile or desktop."
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className="p-8 rounded-[2rem] border border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/30 backdrop-blur-md hover:border-indigo-500/20 hover:shadow-lg dark:hover:shadow-indigo-500/5 transition-all group hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-center mb-6 group-hover:scale-105 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 font-outfit text-slate-950 dark:text-white">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beautiful interactive Showcase preview */}
      <section className="py-16 border-t border-slate-200/50 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="relative border border-slate-200 dark:border-slate-800 rounded-[2.5rem] bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 p-8 md:p-12 overflow-hidden shadow-2xl text-center space-y-6">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-indigo-500/10 dark:bg-indigo-400/5 blur-3xl pointer-events-none rounded-full" />
            
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
              <Cpu className="w-3.5 h-3.5" /> Powered by Modern Frameworks
            </span>

            <h3 className="text-2xl md:text-3xl font-extrabold font-outfit text-slate-950 dark:text-white">Ready to impress recruiters?</h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-medium text-sm md:text-base">
              Get an instant portfolio with beautiful cards, custom layouts, project links, dynamic experience timelines, and skill displays.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={handleModel}
                className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-bold shadow-lg shadow-indigo-500/25 dark:shadow-indigo-500/10 hover:shadow-indigo-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Create Your Profile <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/50 dark:border-slate-800/50 py-12 bg-slate-50 dark:bg-slate-950/40 transition-colors">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20 text-xs">BYP</div>
            <span className="text-sm font-bold tracking-tight font-outfit text-slate-950 dark:text-white">Build Your Portfolio</span>
          </div>
          <span className="text-xs font-semibold text-slate-400">© 2026 Build Your Portfolio. Made for creators.</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
