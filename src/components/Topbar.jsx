import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Sun, 
  Moon, 
  Keyboard, 
  HelpCircle,
  Menu,
  Sparkles,
  Command,
  User,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLearn } from '../context/LearnContext';

export default function Topbar({ setMobileOpen, setActivePage }) {
  const { user } = useAuth();
  const { activeTheme, toggleTheme, stats } = useLearn();
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Mock global search topics database
  const searchTopics = [
    { title: 'Python Basics Roadmap', page: 'roadmap', topic: 'Python' },
    { title: 'Java OOP Roadmap', page: 'roadmap', topic: 'Java' },
    { title: 'Data Structures Roadmap', page: 'roadmap', topic: 'Data Structures' },
    { title: 'Web Development Roadmap', page: 'roadmap', topic: 'Web Development' },
    { title: 'Machine Learning Roadmap', page: 'roadmap', topic: 'Machine Learning' },
    { title: 'Python MCQ Quiz', page: 'quiz', topic: 'Python' },
    { title: 'Java OOP Quiz', page: 'quiz', topic: 'Java' },
    { title: 'DBMS Quiz', page: 'quiz', topic: 'DBMS' },
    { title: 'AI Foundations Quiz', page: 'quiz', topic: 'AI' },
    { title: 'Data Structures Quiz', page: 'quiz', topic: 'Data Structures' },
    { title: 'Learning Resources Center', page: 'resources', topic: '' },
    { title: 'AI Assistant Tutor Chat', page: 'ai', topic: '' },
    { title: 'UN SDG 4 Project Specs', page: 'about', topic: '' },
  ];

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    const filtered = searchTopics.filter(t => 
      t.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleResultClick = (res) => {
    setActivePage(res.page);
    setSearchQuery('');
    setSearchResults([]);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if typing in inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key === '?') {
        setShowShortcuts(prev => !prev);
      }
      if (e.key === 't' || e.key === 'T') {
        toggleTheme();
      }
      if (e.key === '/') {
        e.preventDefault();
        document.getElementById('global-search')?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme]);

  return (
    <header className={`h-16 shrink-0 border-b flex items-center justify-between px-4 sticky top-0 z-20 transition-all duration-300 ${
      activeTheme === 'dark' 
        ? 'bg-zinc-950/60 border-zinc-800/40 backdrop-blur-md text-white' 
        : 'bg-white/75 border-zinc-200/60 backdrop-blur-md text-zinc-800'
    }`}>
      {/* Left: Mobile Toggle & Welcome */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setMobileOpen(true)}
          className={`p-2 rounded-lg cursor-pointer md:hidden hover:bg-zinc-500/10 transition-colors`}
        >
          <Menu size={20} />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <Sparkles size={18} className="text-purple-400" />
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-indigo/15 text-indigo-400 border border-brand-indigo/25">
            Goal 4: Quality Education
          </span>
        </div>
      </div>

      {/* Center: Search Bar */}
      {user && (
        <div className="relative flex-1 max-w-md mx-4 sm:mx-8">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-zinc-500" />
            <input 
              id="global-search"
              type="text"
              placeholder="Search features (Press '/' to focus)..."
              value={searchQuery}
              onChange={handleSearch}
              className={`w-full py-1.5 pl-9 pr-4 rounded-xl text-xs outline-none transition-all duration-150 ${
                activeTheme === 'dark' 
                  ? 'glass-input-dark' 
                  : 'glass-input-light'
              }`}
            />
            <kbd className={`absolute right-3 top-2 px-1.5 py-0.5 rounded text-[10px] border hidden md:inline-flex ${
              activeTheme === 'dark' 
                ? 'bg-zinc-900 border-zinc-800 text-zinc-500' 
                : 'bg-zinc-100 border-zinc-200 text-zinc-400'
            }`}>
              /
            </kbd>
          </div>

          {/* Search Dropdown Results */}
          {searchResults.length > 0 && (
            <div className={`absolute top-11 left-0 right-0 rounded-xl border p-2 shadow-xl z-50 overflow-hidden ${
              activeTheme === 'dark' 
                ? 'bg-zinc-900 border-zinc-800 text-zinc-200' 
                : 'bg-white border-zinc-200 text-zinc-800'
            }`}>
              <p className="text-[10px] font-semibold text-zinc-500 px-2.5 py-1 uppercase tracking-wider">Search Results</p>
              <div className="max-h-60 overflow-y-auto space-y-1">
                {searchResults.map((res, i) => (
                  <button
                    key={i}
                    onClick={() => handleResultClick(res)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                      activeTheme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-black/5'
                    }`}
                  >
                    <span>{res.title}</span>
                    <span className="text-[10px] text-zinc-500 italic bg-zinc-500/10 px-1.5 py-0.5 rounded">
                      {res.page}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Streak Counter (visible on md+) */}
        {user && (
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-semibold">
            🔥 {stats.learningStreak} Day Streak
          </div>
        )}

        {/* Shortcuts Helper */}
        <button 
          onClick={() => setShowShortcuts(true)}
          className={`p-2 rounded-lg cursor-pointer hover:bg-zinc-500/10 transition-colors`}
          title="Keyboard Shortcuts"
        >
          <Keyboard size={18} />
        </button>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-lg cursor-pointer hover:bg-zinc-500/10 transition-colors`}
          title={activeTheme === 'dark' ? 'Light Mode (T)' : 'Dark Mode (T)'}
        >
          {activeTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* Keyboard Shortcuts Dialog Modal */}
      {showShortcuts && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4">
          <div className={`w-full max-w-sm rounded-2xl border p-5 shadow-2xl ${
            activeTheme === 'dark' 
              ? 'bg-zinc-900 border-zinc-800 text-zinc-100' 
              : 'bg-white border-zinc-200 text-zinc-800'
          }`}>
            <div className="flex items-center justify-between mb-4 border-b border-zinc-800/40 pb-2">
              <div className="flex items-center gap-2">
                <Command size={18} className="text-purple-400" />
                <h3 className="font-semibold text-sm">Keyboard Shortcuts</h3>
              </div>
              <button 
                onClick={() => setShowShortcuts(false)}
                className="text-xs px-2.5 py-1 rounded-lg border border-zinc-700/30 hover:bg-zinc-500/10 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span>Toggle Dark/Light Mode</span>
                <kbd className="px-2 py-0.5 rounded border border-zinc-700/30 bg-zinc-800 text-[10px] text-zinc-300 font-mono">T</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span>Focus Search Field</span>
                <kbd className="px-2 py-0.5 rounded border border-zinc-700/30 bg-zinc-800 text-[10px] text-zinc-300 font-mono">/</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span>Show/Hide Shortcuts</span>
                <kbd className="px-2 py-0.5 rounded border border-zinc-700/30 bg-zinc-800 text-[10px] text-zinc-300 font-mono">?</kbd>
              </div>
              <div className="pt-2 border-t border-zinc-800/40">
                <p className="text-[10px] text-zinc-500 uppercase font-semibold mb-1">Contextual Navigation</p>
                <p className="text-[11px] text-zinc-400">Click links or search for subjects dynamically to jump into Roadmaps, Quizzes, or resource modules instantly.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
