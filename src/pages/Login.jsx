import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLearn } from '../context/LearnContext';
import { Mail, Lock, Sparkles, BookOpen, Eye, EyeOff } from 'lucide-react';

export default function Login({ setActivePage }) {
  const { login } = useAuth();
  const { activeTheme, showToast } = useLearn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      login(email, password);
      showToast('Welcome back to EduMentor AI!', 'success');
      setActivePage('dashboard');
    } catch (err) {
      setError(err.message);
      showToast(err.message, 'error');
    }
  };

  const handleDemoLogin = () => {
    // Check if demo user exists, else register it
    const demoEmail = 'student@edumentor.ai';
    const demoPass = 'password123';
    
    const users = JSON.parse(localStorage.getItem('edumentor_users') || '[]');
    const demoExists = users.some(u => u.email.toLowerCase() === demoEmail);

    if (!demoExists) {
      // Create user database entry
      const demoUser = {
        id: 'demo-student',
        name: 'Demo Student',
        email: demoEmail,
        password: demoPass,
        avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=DemoStudent`,
        joinedAt: new Date().toISOString(),
        studyGoal: '2 hours',
        preferredSubject: 'Python'
      };
      users.push(demoUser);
      localStorage.setItem('edumentor_users', JSON.stringify(users));
    }

    try {
      login(demoEmail, demoPass);
      showToast('Logged in as Demo Student!', 'success');
      setActivePage('dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      activeTheme === 'dark' ? 'gradient-bg-dark text-white' : 'gradient-bg-light text-zinc-800'
    }`}>
      <div className={`w-full max-w-md p-8 rounded-3xl border transition-all duration-300 ${
        activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/60' : 'glass-panel-light border-zinc-200 shadow-xl'
      }`}>
        {/* Brand logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-brand-indigo to-brand-purple text-white shadow-lg mb-3">
            <BookOpen size={28} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 to-purple-400 bg-clip-text text-transparent">
            Welcome back
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Access your personalized learning companion
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-3 text-zinc-500" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full py-2.5 pl-10 pr-4 rounded-xl text-xs ${
                  activeTheme === 'dark' ? 'glass-input-dark' : 'glass-input-light'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-3 text-zinc-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full py-2.5 pl-10 pr-10 rounded-xl text-xs ${
                  activeTheme === 'dark' ? 'glass-input-dark' : 'glass-input-light'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-zinc-500 hover:text-zinc-300"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-purple text-white text-xs font-semibold hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-200 cursor-pointer"
          >
            Sign In
          </button>
        </form>

        {/* Try Demo option */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800/30"></div>
          </div>
          <span className="relative px-3 text-[10px] text-zinc-500 uppercase font-semibold bg-zinc-950/0 backdrop-blur-sm">
            or use demo
          </span>
        </div>

        <button
          onClick={handleDemoLogin}
          className={`w-full py-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all duration-150 cursor-pointer ${
            activeTheme === 'dark' 
              ? 'border-zinc-800 text-zinc-300 hover:bg-white/5' 
              : 'border-zinc-200 text-zinc-700 hover:bg-black/5 shadow-sm'
          }`}
        >
          <Sparkles size={14} className="text-amber-500" />
          Log In with Demo Account
        </button>

        {/* Navigation back / signup */}
        <p className="mt-8 text-center text-xs text-zinc-500">
          Don't have an account?{' '}
          <button
            onClick={() => setActivePage('register')}
            className="text-brand-indigo hover:underline font-semibold cursor-pointer"
          >
            Create one free
          </button>
        </p>

        <div className="mt-4 text-center">
          <button 
            onClick={() => setActivePage('landing')}
            className="text-zinc-500 hover:text-zinc-300 text-xs hover:underline cursor-pointer"
          >
            ← Back to Landing
          </button>
        </div>
      </div>
    </div>
  );
}
