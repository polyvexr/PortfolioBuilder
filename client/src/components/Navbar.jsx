import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LogOut, Sun, Moon, Layers } from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { setShowLoginModal, setShowRegisterModal, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-slate-200/40 dark:border-slate-800/40 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Section */}
          <div 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-950 shadow-sm group-hover:scale-105 transition-all">
              <Layers className="w-5 h-5 text-emerald-500 dark:text-emerald-600" />
            </div>
            <span className="text-lg font-extrabold tracking-tight font-outfit text-slate-950 dark:text-white flex items-center gap-1.5">
              PortfolioBuilder
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50">
                PRO
              </span>
            </span>
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-4">
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl transition-all text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200/50 dark:hover:border-slate-800/50 cursor-pointer"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-900 rounded-full border border-slate-200/60 dark:border-slate-800/80">
                  <div className="w-5.5 h-5.5 rounded-full bg-slate-900 dark:bg-slate-100 text-[10px] font-bold text-white dark:text-slate-950 flex items-center justify-center shadow-sm">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wide">
                    {user?.name?.toUpperCase()}
                  </span>
                </div>

                <button 
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50/50 dark:hover:bg-rose-950/10 rounded-xl transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3.5">
                <button 
                  onClick={() => setShowLoginModal(true)} 
                  className="text-sm font-semibold text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Login
                </button>
                <button 
                  onClick={() => setShowRegisterModal(true)} 
                  className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold rounded-full text-white dark:text-slate-950 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 active:scale-95 transition-all shadow-sm cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;