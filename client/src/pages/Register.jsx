import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Loader2, AlertCircle, AtSign, X, Layers } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
    username: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register, showRegisterModal, setShowRegisterModal, setShowLoginModal } = useAuth();
  const navigate = useNavigate();

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setShowRegisterModal(false);
    };
    if (showRegisterModal) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [showRegisterModal, setShowRegisterModal]);

  // Reset form when modal opens
  useEffect(() => {
    if (showRegisterModal) {
      setError('');
    }
  }, [showRegisterModal]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if(formData.password !== formData.confirmpassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const result = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.username
    );
    
    if (result.success) {
      setShowRegisterModal(false);
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const switchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  if (!showRegisterModal) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={() => setShowRegisterModal(false)}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-[modalIn_0.25s_ease-out] my-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 py-8 px-6 shadow-2xl rounded-2xl sm:px-10 relative">
          
          {/* Close button */}
          <button
            onClick={() => setShowRegisterModal(false)}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {/* Logo */}
            <div className="flex justify-center items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-950 dark:bg-white flex items-center justify-center text-white dark:text-slate-950">
                <Layers className="w-4 h-4 text-emerald-500" />
              </div>
              <span className="text-lg font-bold text-slate-950 dark:text-white tracking-tight font-outfit">PortfolioBuilder</span>
            </div>

            <h2 className="text-center text-xl font-extrabold text-slate-950 dark:text-white font-outfit">Create your account</h2>

            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3.5 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="reg-name" className="block text-xs font-bold text-slate-500 dark:text-slate-400 pl-1 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="h-4 h-4 text-slate-450 dark:text-slate-500" />
                </div>
                <input
                  id="reg-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-all text-xs"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="reg-username" className="block text-xs font-bold text-slate-500 dark:text-slate-400 pl-1 mb-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <AtSign className="h-4 h-4 text-slate-450 dark:text-slate-500" />
                </div>
                <input
                  id="reg-username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-all text-xs"
                  placeholder="johndoe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="reg-email" className="block text-xs font-bold text-slate-500 dark:text-slate-400 pl-1 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 h-4 text-slate-450 dark:text-slate-500" />
                </div>
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-all text-xs"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="reg-password" className="block text-xs font-bold text-slate-500 dark:text-slate-400 pl-1 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 h-4 text-slate-450 dark:text-slate-500" />
                </div>
                <input
                  id="reg-password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-all text-xs"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label htmlFor="reg-confirmpassword" className="block text-xs font-bold text-slate-500 dark:text-slate-400 pl-1 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 h-4 text-slate-450 dark:text-slate-500" />
                </div>
                <input
                  id="reg-confirmpassword"
                  name="confirmpassword"
                  type="password"
                  required
                  value={formData.confirmpassword}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-all text-xs"
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
                  'Create Account'
                )}
              </button>
              <p className="mt-3 text-center text-xs text-slate-550 dark:text-slate-400">
                Already have an account?{' '}
                <button type="button" onClick={switchToLogin} className="font-bold text-emerald-600 dark:text-emerald-500 hover:underline cursor-pointer">
                  Sign in
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
