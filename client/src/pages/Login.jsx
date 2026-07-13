import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2, AlertCircle, X, Layers } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, showLoginModal, setShowLoginModal, setShowRegisterModal } = useAuth();
  const navigate = useNavigate();

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setShowLoginModal(false);
    };
    if (showLoginModal) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [showLoginModal, setShowLoginModal]);

  // Reset form when modal opens
  useEffect(() => {
    if (showLoginModal) {
      setError('');
    }
  }, [showLoginModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      setShowLoginModal(false);
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  if (!showLoginModal) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={() => setShowLoginModal(false)}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-[modalIn_0.25s_ease-out]">
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 py-8 px-6 shadow-2xl rounded-2xl sm:px-10 relative">
          
          {/* Close button */}
          <button
            onClick={() => setShowLoginModal(false)}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {/* Logo */}
            <div className="flex justify-center items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-950 dark:bg-white flex items-center justify-center text-white dark:text-slate-950">
                <Layers className="w-4 h-4 text-emerald-500" />
              </div>
              <span className="text-lg font-bold text-slate-950 dark:text-white tracking-tight font-outfit">PortfolioBuilder</span>
            </div>
 
            <h2 className="text-center text-xl font-extrabold text-slate-950 dark:text-white font-outfit">Welcome back</h2>
            
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3.5 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="login-email" className="block text-xs font-bold text-slate-500 dark:text-slate-400 pl-1 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 h-4 text-slate-450 dark:text-slate-500" />
                </div>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-all text-xs"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="block text-xs font-bold text-slate-500 dark:text-slate-400 pl-1 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 h-4 text-slate-450 dark:text-slate-500" />
                </div>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-all text-xs"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl text-xs font-bold text-white dark:text-slate-950 bg-slate-950 dark:bg-white hover:bg-slate-850 dark:hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Sign in'
                )}
              </button>
              <p className="mt-3 text-center text-xs text-slate-550 dark:text-slate-400">
                Or{' '}
                <button
                  type="button"
                  onClick={() => { setShowLoginModal(false); setShowRegisterModal(true); }}
                  className="font-bold text-emerald-600 dark:text-emerald-500 hover:underline cursor-pointer"
                >
                  create a new account
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
