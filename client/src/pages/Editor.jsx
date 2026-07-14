import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import portfolioService from '../api/portfolioService';
import { 
  ChevronLeft, 
  Save, 
  User, 
  Briefcase, 
  GraduationCap, 
  Layers, 
  Settings as SettingsIcon,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import PersonalInfoForm from '../components/editor/PersonalInfoForm';
import ExperienceForm from '../components/editor/ExperienceForm';
import EducationForm from '../components/editor/EducationForm';
import ProjectsForm from '../components/editor/ProjectsForm';
import SettingsForm from '../components/editor/SettingsForm';

const Editor = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [portfolio, setPortfolio] = useState({
    personalInfo: { name: user?.name || '', bio: '', role: '', profilePhoto: '', email: user?.email || '', phone: '', location: '' },
    education: [],
    skills: [],
    projects: [],
    experience: [],
    certifications: [],
    socialLinks: { github: '', linkedin: '', twitter: '', portfolio: '' },
    settings: { theme: 'light', isPublic: true },
    templateId: 'modern'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await portfolioService.getMyPortfolio();
        if (data) setPortfolio(data);
      } catch {
        console.log('No existing portfolio found, starting fresh');
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await portfolioService.upsertPortfolio(portfolio);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      console.error('Save failed:', error);
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const updatePersonalInfo = (e) => {
    const { name, value } = e.target;
    setPortfolio({
      ...portfolio,
      personalInfo: { ...portfolio.personalInfo, [name]: value }
    });
  };

  const updateSocialLinks = (e) => {
    const { name, value } = e.target;
    setPortfolio({
      ...portfolio,
      socialLinks: { ...portfolio.socialLinks, [name]: value }
    });
  };

  const updateSettings = (key, value) => {
    setPortfolio({
      ...portfolio,
      settings: { ...portfolio.settings, [key]: value }
    });
  };

  // Experience handlers
  const addExperience = () => {
    setPortfolio({
      ...portfolio,
      experience: [...portfolio.experience, { company: '', position: '', location: '', startDate: '', endDate: '', description: '' }]
    });
  };

  const updateExperience = (index, field, value) => {
    const updated = [...portfolio.experience];
    updated[index][field] = value;
    setPortfolio({ ...portfolio, experience: updated });
  };

  const removeExperience = (index) => {
    setPortfolio({
      ...portfolio,
      experience: portfolio.experience.filter((_, i) => i !== index)
    });
  };

  // Education handlers
  const addEducation = () => {
    setPortfolio({
      ...portfolio,
      education: [...portfolio.education, { institution: '', degree: '', fieldOfStudy: '', startYear: '', endYear: '', description: '' }]
    });
  };

  const updateEducation = (index, field, value) => {
    const updated = [...portfolio.education];
    updated[index][field] = value;
    setPortfolio({ ...portfolio, education: updated });
  };

  const removeEducation = (index) => {
    setPortfolio({
      ...portfolio,
      education: portfolio.education.filter((_, i) => i !== index)
    });
  };

  // Skills handlers
  const addSkill = () => {
    setPortfolio({
      ...portfolio,
      skills: [...portfolio.skills, { name: '', level: 'Beginner' }]
    });
  };

  const updateSkill = (index, field, value) => {
    const updated = [...portfolio.skills];
    updated[index][field] = value;
    setPortfolio({ ...portfolio, skills: updated });
  };

  const removeSkill = (index) => {
    setPortfolio({
      ...portfolio,
      skills: portfolio.skills.filter((_, i) => i !== index)
    });
  };

  // Projects handlers
  const addProject = () => {
    setPortfolio({
      ...portfolio,
      projects: [...portfolio.projects, { title: '', description: '', techStack: [], githubLink: '', liveLink: '', image: '' }]
    });
  };

  const updateProject = (index, field, value) => {
    const updated = [...portfolio.projects];
    updated[index][field] = value;
    setPortfolio({ ...portfolio, projects: updated });
  };

  const updateProjectTechStack = (index, techString) => {
    const updated = [...portfolio.projects];
    updated[index].techStack = techString
      .split(/[,\s]+/)
      .map(t => t.trim())
      .filter(t => t);
    setPortfolio({ ...portfolio, projects: updated });
  };

  const removeProject = (index) => {
    setPortfolio({
      ...portfolio,
      projects: portfolio.projects.filter((_, i) => i !== index)
    });
  };

  const tabs = [
    { id: 'personal', label: 'Personal', icon: <User className="w-3.5 h-3.5" /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { id: 'projects', label: 'Projects', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon className="w-3.5 h-3.5" /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans selection:bg-emerald-500/20">
      
      {/* Editor Main Flexbox */}
      <div className="w-full flex flex-col h-screen">
        
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-slate-200/40 dark:border-slate-800/40 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md shrink-0 z-50">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 rounded-xl transition-all cursor-pointer text-slate-550 dark:text-slate-450 hover:text-slate-950 dark:hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h1 className="font-extrabold text-sm hidden sm:block font-outfit tracking-tight text-slate-950 dark:text-white">Workspace Configuration</h1>
          </div>
          
          <div className="flex items-center gap-3.5">
            {saveStatus === 'success' && (
              <motion.div 
                initial={{ opacity: 0, x: 10 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="text-xs text-emerald-600 dark:text-emerald-500 font-bold flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Live Synced
              </motion.div>
            )}
            <button 
              onClick={handleSave} 
              disabled={saving}
              className="px-5 py-2 bg-slate-950 dark:bg-white disabled:opacity-50 text-white dark:text-slate-950 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 hover:bg-slate-850 dark:hover:bg-slate-100 cursor-pointer shadow-sm active:scale-98"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              Publish Config
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex justify-center border-b border-slate-200/40 dark:border-slate-850 bg-white/30 dark:bg-slate-950/20 backdrop-blur-md shrink-0">
          <div className="flex max-w-3xl w-full px-4 overflow-x-auto no-scrollbar gap-1 py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-slate-900 dark:bg-slate-900 text-white dark:text-white' 
                    : 'text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form Content Panel */}
        <div className="flex-1 overflow-y-auto w-full flex items-start justify-center px-6 py-8 custom-scrollbar">
          <div className="w-full max-w-7xl bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-sm">
            <AnimatePresence mode="wait">
              {activeTab === 'personal' && (
                <PersonalInfoForm
                  personalInfo={portfolio.personalInfo}
                  updatePersonalInfo={updatePersonalInfo}
                  skills={portfolio.skills}
                  addSkill={addSkill}
                  updateSkill={updateSkill}
                  removeSkill={removeSkill}
                />
              )}
              
              {activeTab === 'experience' && (
                <ExperienceForm
                  experience={portfolio.experience}
                  addExperience={addExperience}
                  updateExperience={updateExperience}
                  removeExperience={removeExperience}
                />
              )}

              {activeTab === 'education' && (
                <EducationForm
                  education={portfolio.education}
                  addEducation={addEducation}
                  updateEducation={updateEducation}
                  removeEducation={removeEducation}
                />
              )}

              {activeTab === 'projects' && (
                <ProjectsForm
                  projects={portfolio.projects}
                  addProject={addProject}
                  updateProject={updateProject}
                  updateProjectTechStack={updateProjectTechStack}
                  removeProject={removeProject}
                />
              )}

              {activeTab === 'settings' && (
                <SettingsForm
                  settings={portfolio.settings}
                  templateId={portfolio.templateId}
                  updateSettings={updateSettings}
                  setTemplateId={(value) => setPortfolio({ ...portfolio, templateId: value })}
                  socialLinks={portfolio.socialLinks}
                  updateSocialLinks={updateSocialLinks}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Editor;
