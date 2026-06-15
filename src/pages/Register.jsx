import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLearn } from '../context/LearnContext';
import { User, Mail, Lock, BookOpen } from 'lucide-react';

export default function Register({ setActivePage }) {
  const { register } = useAuth();
  const { activeTheme, showToast } = useLearn();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      register(name, email, password);
      showToast('Registration successful! Welcome to EduMentor AI.', 'success');
      setActivePage('dashboard');
    } catch (err) {
      setError(err.message);
      showToast(err.message, 'error');
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
            Create Account
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Join thousands of students learning efficiently
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Full Name</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-3 text-zinc-500" />
              <input
                type="text"
                placeholder="Alex Mercer"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full py-2.5 pl-10 pr-4 rounded-xl text-xs ${
                  activeTheme === 'dark' ? 'glass-input-dark' : 'glass-input-light'
                }`}
              />
            </div>
          </div>

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
                type="password"
                placeholder="•••••••• (Min. 6 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full py-2.5 pl-10 pr-4 rounded-xl text-xs ${
                  activeTheme === 'dark' ? 'glass-input-dark' : 'glass-input-light'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-purple text-white text-xs font-semibold hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-200 cursor-pointer"
          >
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-zinc-500">
          Already have an account?{' '}
          <button
            onClick={() => setActivePage('login')}
            className="text-brand-indigo hover:underline font-semibold cursor-pointer"
          >
            Log In
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
