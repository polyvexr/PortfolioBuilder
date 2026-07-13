import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import portfolioService from '../api/portfolioService';
import { 
  Plus, 
  Edit3, 
  Eye,
  Layout,
  Copy,
  Check,
  TrendingUp,
  MousePointerClick,
  Layers,
  ArrowUpRight,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await portfolioService.getMyPortfolio();
        setPortfolio(data);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const handleCopyURL = async () => {
    const portfolioURL = `${window.location.origin}/u/${user?.username}`;
    try {
      await navigator.clipboard.writeText(portfolioURL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Calculate setup completion rate
  const checkSteps = [
    { label: "Personal Info", done: !!portfolio?.personalInfo },
    { label: "Experiences", done: portfolio?.experience?.length > 0 },
    { label: "Featured Projects", done: portfolio?.projects?.length > 0 },
    { label: "Social Connections", done: !!portfolio?.socialLinks }
  ];
  const completedCount = checkSteps.filter(s => s.done).length;
  const progressPercent = Math.round((completedCount / checkSteps.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans selection:bg-emerald-500/20 pt-16 transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10 space-y-8">
        
        {/* Dashboard Greeting Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200/60 dark:border-slate-800/80 pb-6">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight font-outfit text-slate-950 dark:text-white">
              Welcome, {user?.name || "Builder"}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Configure layout parameters and analyze profile metrics from one unified panel.
            </p>
          </div>
          
          <Link 
            to="/editor" 
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-xs font-bold rounded-xl hover:bg-slate-850 dark:hover:bg-slate-100 transition-all shadow-sm active:scale-98"
          >
            {portfolio ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {portfolio ? 'Edit Portfolio Config' : 'Create Portfolio'}
          </Link>
        </div>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Primary Cards */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Live Status Card */}
            <div className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 rounded-2xl p-6 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 p-6 opacity-5 dark:opacity-10 pointer-events-none">
                <Layers className="w-24 h-24 text-slate-900 dark:text-white -rotate-12" />
              </div>
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Deployment Status</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  {portfolio && (
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-500 font-bold bg-emerald-500/5 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/10">
                      LIVE
                    </span>
                  )}
                </div>
                
                {portfolio ? (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold font-outfit text-slate-950 dark:text-white">Your digital identity is live</h2>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <div className="px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl text-xs font-mono text-slate-650 dark:text-slate-350 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                        {`${window.location.origin}/u/${user?.username}`}
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <a 
                          href={`/u/${user?.username}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl transition-colors text-xs font-bold border border-slate-200 dark:border-slate-800"
                        >
                          <Eye className="w-3.5 h-3.5" /> View
                        </a>
                        <button 
                          onClick={handleCopyURL}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl transition-colors text-xs font-bold border border-slate-200 dark:border-slate-800 cursor-pointer"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-500" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" /> Copy Link
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h2 className="text-xl font-bold font-outfit text-slate-950 dark:text-white">Configure your custom layout parameters</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed max-w-lg">
                      It takes less than five minutes. Setup your professional timeline, skills, and projects, and compile your first live public URL.
                    </p>
                    <div className="pt-2">
                      <Link 
                        to="/editor" 
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        Create Portfolio <Plus className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/5 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-500/10">
                    <Eye className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/5 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/10">+12%</span>
                </div>
                <div>
                  <div className="text-xl font-bold font-outfit text-slate-950 dark:text-white">128</div>
                  <div className="text-[11px] text-slate-450 dark:text-slate-500 font-semibold tracking-wide uppercase mt-0.5">Profile Views</div>
                </div>
              </div>

              <div className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/5 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-500/10">
                    <MousePointerClick className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/5 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/10">+8%</span>
                </div>
                <div>
                  <div className="text-xl font-bold font-outfit text-slate-950 dark:text-white">42</div>
                  <div className="text-[11px] text-slate-450 dark:text-slate-500 font-semibold tracking-wide uppercase mt-0.5">Social Actions</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sidebar / System Status Cards */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Setup Checklist widget */}
            <div className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 rounded-2xl p-5 shadow-sm space-y-5">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Setup Progress</h3>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-500">{progressPercent}%</span>
              </div>
              
              {/* Simple progress bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-900 rounded-full h-1">
                <div className="bg-emerald-600 dark:bg-emerald-500 h-1 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
              </div>

              <ul className="space-y-3.5">
                {checkSteps.map((item, i) => (
                  <li key={i} className="flex items-center justify-between text-xs">
                    <span className={`font-semibold transition-colors ${item.done ? 'text-slate-650 dark:text-slate-300' : 'text-slate-400'}`}>
                      {item.label}
                    </span>
                    {item.done ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <HelpCircle className="w-4 h-4 text-slate-300 dark:text-slate-800 shrink-0" />
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro tier callout */}
            <div className="border border-slate-200 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-950 rounded-2xl p-5 relative overflow-hidden shadow-sm space-y-4">
              <div className="space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  Subscription Tier
                </h3>
                <h4 className="text-sm font-extrabold text-slate-950 dark:text-white">PortfolioBuilder Pro</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                  Unlock advanced custom CSS triggers, unlimited project lists, custom domains, and raw data exporters.
                </p>
              </div>

              <button className="w-full py-2.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-xs font-bold rounded-xl hover:bg-slate-850 dark:hover:bg-slate-100 transition-all cursor-pointer">
                Upgrade Account
              </button>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
