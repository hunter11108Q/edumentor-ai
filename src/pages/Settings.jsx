import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLearn } from '../context/LearnContext';
import { Settings as SettingsIcon, User, Mail, Target, BookOpen, Trash2, ShieldAlert } from 'lucide-react';

export default function Settings() {
  const { user, updateProfile } = useAuth();
  const { activeTheme, clearUserData, showToast } = useLearn();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [studyGoal, setStudyGoal] = useState(user?.studyGoal || '2 hours');
  const [preferredSubject, setPreferredSubject] = useState(user?.preferredSubject || 'Python');

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (!name || !email) {
      showToast('Name and Email cannot be empty.', 'error');
      return;
    }

    updateProfile({ name, email, studyGoal, preferredSubject });
    showToast('Profile settings updated successfully!', 'success');
  };

  const handleClearData = () => {
    if (window.confirm("Warning: This will permanently delete your generated study roadmaps, chat sessions, and quiz metrics. Proceed?")) {
      clearUserData();
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Settings Header */}
      <div className={`p-5 rounded-3xl border transition-all duration-300 ${
        activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/60' : 'glass-panel-light border-zinc-200 shadow-sm'
      }`}>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <SettingsIcon className="text-brand-indigo shrink-0" /> Settings & Profile Preferences
        </h2>
        <p className="text-xs text-zinc-500 mt-1">
          Customize your study parameters, manage active daily targets, edit student credentials, or reset account metrics.
        </p>
      </div>

      {/* Profile Update Form */}
      <div className={`p-6 rounded-3xl border ${
        activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/40 bg-zinc-900/10' : 'glass-panel-light border-zinc-200/80 shadow-sm bg-white'
      }`}>
        <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
          <User size={16} className="text-brand-purple" /> Personal Information
        </h3>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full p-2.5 rounded-xl text-xs outline-none ${
                  activeTheme === 'dark' ? 'glass-input-dark' : 'glass-input-light'
                }`}
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-2.5 rounded-xl text-xs outline-none ${
                  activeTheme === 'dark' ? 'glass-input-dark' : 'glass-input-light'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Daily Study Target</label>
              <select
                value={studyGoal}
                onChange={(e) => setStudyGoal(e.target.value)}
                className={`w-full p-2.5 rounded-xl text-xs outline-none border cursor-pointer ${
                  activeTheme === 'dark' 
                    ? 'bg-zinc-950 border-zinc-800 text-white' 
                    : 'bg-zinc-50 border-zinc-200 text-zinc-800'
                }`}
              >
                <option value="30 minutes">30 minutes / day</option>
                <option value="1 hour">1 hour / day</option>
                <option value="2 hours">2 hours / day</option>
                <option value="4 hours">4 hours / day</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Focus Curriculum</label>
              <select
                value={preferredSubject}
                onChange={(e) => setPreferredSubject(e.target.value)}
                className={`w-full p-2.5 rounded-xl text-xs outline-none border cursor-pointer ${
                  activeTheme === 'dark' 
                    ? 'bg-zinc-950 border-zinc-800 text-white' 
                    : 'bg-zinc-50 border-zinc-200 text-zinc-800'
                }`}
              >
                <option value="Python">Python Basics</option>
                <option value="Java">Java Object Oriented</option>
                <option value="AI">Artificial Intelligence</option>
                <option value="DBMS">Database Systems (DBMS)</option>
                <option value="Data Structures">Data Structures & Algorithms</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-purple text-white text-xs font-semibold hover:shadow-md cursor-pointer transition-shadow"
          >
            Save Profile Settings
          </button>
        </form>
      </div>

      {/* Danger Zone */}
      <div className={`p-6 rounded-3xl border ${
        activeTheme === 'dark' ? 'glass-panel-dark border-red-500/25 bg-red-500/5' : 'glass-panel-light border-red-200/50 bg-red-50/20'
      }`}>
        <h3 className="font-bold text-sm text-red-500 mb-3 flex items-center gap-2">
          <ShieldAlert size={16} /> Danger Zone
        </h3>
        <p className="text-xs text-zinc-500 mb-4 leading-relaxed">
          Purge all progress parameters stored in the browser's database. This will reset quiz metrics, active roadmaps, and dialogue histories.
        </p>

        <button
          onClick={handleClearData}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-semibold cursor-pointer transition-colors shadow-sm"
        >
          <Trash2 size={14} /> Clear Learning Profile Data
        </button>
      </div>
    </div>
  );
}
