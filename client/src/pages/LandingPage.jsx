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
  Monitor,
  Terminal,
  ChevronRight,
  ShieldCheck,
  Briefcase,
  Layers
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

  // Professional Professions Data
  const professions = {
    developer: {
      name: "Adrian Thorne",
      role: "Lead Software Architect",
      company: "Stripe",
      bio: "Designing robust API ecosystems and distributed systems. Committed to developer experience and simple code architectures.",
      skills: ["Go", "Kubernetes", "TypeScript", "PostgreSQL", "gRPC", "Docker", "AWS"],
      projects: [
        { name: "SaaS Billing Engine", desc: "High throughput ledger API" },
        { name: "Kubernetes Operator", desc: "Automated database clustering" }
      ],
      avatar: "AT"
    },
    designer: {
      name: "Evelyn Vance",
      role: "Design System Lead",
      company: "Linear",
      bio: "Crafting beautiful interfaces, accessible web design tokens, and modular components that scale.",
      skills: ["Figma", "Tokens Studio", "Framer", "React", "Tailwind CSS", "A11y Audit", "UI Architecture"],
      projects: [
        { name: "Core Design Kit", desc: "Accessible component library" },
        { name: "Figma Tokens Sync", desc: "Automated git exporter utility" }
      ],
      avatar: "EV"
    },
    manager: {
      name: "Marcus Drake",
      role: "Principal Product Manager",
      company: "Vercel",
      bio: "Structuring product lifecycles, defining development milestones, and optimizing growth loops.",
      skills: ["Product Strategy", "User Analytics", "Cohort Retention", "SQL", "Technical Writing", "OKR Delivery"],
      projects: [
        { name: "Edge Analytics Tool", desc: "Privacy-focused analytics hub" },
        { name: "Vercel Deploy V2", desc: "Next-gen deployment flow design" }
      ],
      avatar: "MD"
    }
  };

  const [activeTab, setActiveTab] = useState('developer');
  const [interactiveSkills, setInteractiveSkills] = useState(professions[activeTab].skills);
  const [newSkillText, setNewSkillText] = useState('');

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 selection:bg-emerald-500/20 font-sans transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 lg:pt-36 lg:pb-20 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        {/* Radial highlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center space-y-8">
          
          {/* Subtle Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800/80 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />
            <span>Developer-focused design system. No templates, just layout rules.</span>
          </div>

          {/* Headline */}
          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-outfit text-slate-950 dark:text-white leading-[1.08]">
              Your portfolio represents you. <br />
              <span className="text-emerald-600 dark:text-emerald-500">Make it look professional.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              No flashy widgets or unreadable layouts. Build a clean, structured digital resume configured with lightning-fast load times and clean typography.
            </p>
          </div>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button 
              onClick={handleModel} 
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 text-sm font-bold rounded-xl text-white dark:text-slate-950 bg-slate-950 dark:bg-white hover:bg-slate-850 dark:hover:bg-slate-100 active:scale-[0.98] transition-all cursor-pointer shadow-sm"
            >
              Start Customizing
              <ArrowRight className="ml-2 w-4 h-4 text-emerald-500 dark:text-emerald-600" />
            </button>
            <a 
              href="#features" 
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
            >
              How It Works
            </a>
          </div>

          {/* New Workspace-style Interactive Hero Mockup */}
          <div className="max-w-5xl mx-auto pt-8">
            <div className="border border-slate-200 dark:border-slate-800/80 rounded-[1.5rem] bg-white dark:bg-slate-950 shadow-xl overflow-hidden text-left grid md:grid-cols-12">
              
              {/* Left Side: Mock Editor Panel */}
              <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Terminal className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Editor Workspace</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Select Design System Profile</h3>
                  <div className="space-y-2 mb-6">
                    {Object.keys(professions).map((key) => (
                      <button
                        key={key}
                        onClick={() => handleTabChange(key)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                          activeTab === key
                            ? "bg-slate-200 dark:bg-slate-900 text-slate-950 dark:text-white"
                            : "text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900"
                        }`}
                      >
                        <span className="capitalize">{key} config</span>
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === key ? 'translate-x-0.5' : 'opacity-40'}`} />
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-800/80 pt-5">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2.5">Edit Skill Badges</span>
                    <form onSubmit={addInteractiveSkill} className="flex gap-2 mb-4">
                      <input 
                        type="text" 
                        placeholder="Add skill tag..."
                        value={newSkillText}
                        onChange={(e) => setNewSkillText(e.target.value)}
                        className="flex-1 text-xs py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500"
                      />
                      <button 
                        type="submit"
                        className="px-3 py-2 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-lg text-xs font-semibold hover:bg-slate-850 dark:hover:bg-slate-100 transition-all cursor-pointer"
                      >
                        Add
                      </button>
                    </form>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 flex items-center gap-1.5 font-mono pt-4 border-t border-slate-200/50 dark:border-slate-800/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live synced to production server
                </div>
              </div>

              {/* Right Side: Professional Portfolio Preview Panel */}
              <div className="md:col-span-7 p-6 md:p-8 bg-white dark:bg-slate-900/40 flex flex-col justify-between">
                
                {/* Simulated Header */}
                <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-5 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300 text-xs">
                      {professions[activeTab].avatar}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-950 dark:text-white text-sm font-outfit">{professions[activeTab].name}</h4>
                      <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider">{professions[activeTab].role} @ {professions[activeTab].company}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono bg-slate-50 dark:bg-slate-900 px-2 py-1 rounded border border-slate-200/80 dark:border-slate-800/80">
                    portfolio.me/{activeTab}
                  </span>
                </div>

                {/* Simulated About */}
                <div className="space-y-4">
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {professions[activeTab].bio}
                  </p>

                  {/* Skills Grid */}
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Expertise</span>
                    <div className="flex flex-wrap gap-1.5">
                      <AnimatePresence>
                        {interactiveSkills.map((skill) => (
                          <motion.span
                            key={skill}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.12 }}
                            className="inline-flex items-center gap-1.5 py-1 px-2 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300"
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

                  {/* Featured Projects Mock */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Featured Work</span>
                    <div className="grid grid-cols-2 gap-3">
                      {professions[activeTab].projects.map((project, i) => (
                        <div key={i} className="p-3 rounded-lg border border-slate-200/60 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/20">
                          <h5 className="text-[11px] font-bold text-slate-900 dark:text-white">{project.name}</h5>
                          <p className="text-[10px] text-slate-400 mt-1">{project.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-8 border-y border-slate-200/40 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">Designed for engineering and design standards</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="font-outfit font-extrabold text-xs tracking-wider text-slate-650 dark:text-slate-400">CLEAN CODE SHOWCASE</span>
            <span className="font-outfit font-extrabold text-xs tracking-wider text-slate-650 dark:text-slate-400">NO VISUAL CLUTTER</span>
            <span className="font-outfit font-extrabold text-xs tracking-wider text-slate-650 dark:text-slate-400">HIGH-PERFORMANCE DATA</span>
            <span className="font-outfit font-extrabold text-xs tracking-wider text-slate-650 dark:text-slate-400">ACCESSIBILITY FIRST</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 lg:py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-500">System Architecture</span>
            <h2 className="text-2xl md:text-3xl font-extrabold font-outfit text-slate-950 dark:text-white">Why Professionals Choose Our Editor</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Built without typical AI page builder fluff. Clean parameters lead to beautiful outcomes.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="w-5 h-5 text-emerald-600" />,
                title: "Live Parameter Tuning",
                desc: "Modify skills, experiences, and titles instantly. The portfolio automatically recalculates layout proportions for clean aesthetics."
              },
              {
                icon: <Palette className="w-5 h-5 text-slate-700 dark:text-slate-350" />,
                title: "Professional Layout Themes",
                desc: "No flashy animations or background gradients. Choose from strict Minimal, Creative, or Modern setups tuned for technical review."
              },
              {
                icon: <Briefcase className="w-5 h-5 text-amber-600" />,
                title: "Recruiter Ready Output",
                desc: "Every public profile features semantic HTML, quick search indexing, and simple dark/light switching matches reviewer device themes."
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className="p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/30 hover:border-emerald-500/20 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-750 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-base font-extrabold mb-2.5 font-outfit text-slate-950 dark:text-white">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Box */}
      <section className="py-12 border-t border-slate-200/40 dark:border-slate-800/40 bg-slate-50/20 dark:bg-slate-950/20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative border border-slate-200 dark:border-slate-800/80 rounded-2xl bg-white dark:bg-slate-950 p-8 md:p-12 overflow-hidden shadow-sm text-center space-y-5">
            
            <h3 className="text-xl md:text-2xl font-bold font-outfit text-slate-950 dark:text-white">Ready to deploy your public portfolio?</h3>
            <p className="text-slate-650 dark:text-slate-405 max-w-lg mx-auto font-medium text-xs md:text-sm">
              Takes less than 5 minutes. No templates to setup, no code to write. Configure your layout parameters and start sharing.
            </p>

            <div className="pt-2 flex justify-center">
              <button 
                onClick={handleModel}
                className="px-6 py-3 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl text-xs font-bold hover:bg-slate-850 dark:hover:bg-slate-100 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                Create Profile <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/45 dark:border-slate-850 py-12 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-950 dark:bg-white flex items-center justify-center text-white dark:text-slate-950">
              <Layers className="w-4 h-4 text-emerald-500" />
            </div>
            <span className="text-sm font-bold tracking-tight font-outfit text-slate-950 dark:text-white">PortfolioBuilder</span>
          </div>
          <span className="text-xs font-medium text-slate-400">© 2026 PortfolioBuilder. Built for builders.</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
