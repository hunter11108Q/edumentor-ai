import React from 'react';
import { 
  BookOpen, 
  LayoutDashboard, 
  MessageSquare, 
  Milestone, 
  GraduationCap, 
  Library, 
  Info, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLearn } from '../context/LearnContext';

export default function Sidebar({ activePage, setActivePage, sidebarOpen, setSidebarOpen, mobileOpen, setMobileOpen }) {
  const { user, logout } = useAuth();
  const { activeTheme } = useLearn();

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, protected: true },
    { id: 'ai', name: 'AI Tutor', icon: MessageSquare, protected: true },
    { id: 'roadmap', name: 'Roadmaps', icon: Milestone, protected: true },
    { id: 'quiz', name: 'Quizzes', icon: GraduationCap, protected: true },
    { id: 'resources', name: 'Resources', icon: Library, protected: true },
    { id: 'about', name: 'About Project', icon: Info, protected: false },
    { id: 'settings', name: 'Settings', icon: Settings, protected: true },
  ];

  const handleNav = (pageId) => {
    setActivePage(pageId);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    setActivePage('landing');
    setMobileOpen(false);
  };

  // Nav styling helper
  const getLinkClass = (itemId) => {
    const isActive = activePage === itemId;
    const base = "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative cursor-pointer ";
    if (activeTheme === 'dark') {
      return base + (isActive 
        ? "bg-brand-indigo/20 text-indigo-400 border border-brand-indigo/30 shadow-[0_0_15px_rgba(99,102,241,0.15)]" 
        : "text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent");
    } else {
      return base + (isActive 
        ? "bg-brand-indigo/10 text-brand-indigo border border-brand-indigo/20 shadow-sm" 
        : "text-zinc-600 hover:bg-black/5 hover:text-zinc-950 border border-transparent");
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-4">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-4 mb-8">
        <div className="p-2 rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-purple text-white shadow-md animate-float">
          <BookOpen size={20} />
        </div>
        {(sidebarOpen || mobileOpen) && (
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-none bg-gradient-to-r from-indigo-500 to-purple-400 bg-clip-text text-transparent">
              EduMentor AI
            </span>
            <span className="text-[10px] text-zinc-500 mt-0.5 uppercase tracking-wider">
              SDG 4 Assistant
            </span>
          </div>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-2 space-y-1.5">
        {menuItems.map((item) => {
          // Hide protected links if user is not logged in
          if (item.protected && !user) return null;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={getLinkClass(item.id)}
              title={!sidebarOpen ? item.name : ''}
            >
              <item.icon size={20} className="shrink-0 transition-transform group-hover:scale-110" />
              {(sidebarOpen || mobileOpen) && (
                <span className="font-medium text-sm transition-opacity duration-200">
                  {item.name}
                </span>
              )}
              {/* Tooltip for collapsed sidebar */}
              {!sidebarOpen && !mobileOpen && (
                <div className="absolute left-14 scale-0 rounded-lg bg-zinc-900 border border-zinc-800 px-2.5 py-1 text-xs text-zinc-200 group-hover:scale-100 transition-all duration-150 origin-left shadow-lg z-50 whitespace-nowrap">
                  {item.name}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / User Profile */}
      {user && (
        <div className="px-2 pt-4 border-t border-zinc-800/40 dark:border-zinc-700/20">
          <div className={`flex items-center gap-3 p-2 rounded-xl ${activeTheme === 'dark' ? 'bg-zinc-900/40' : 'bg-zinc-100/60'}`}>
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-9 h-9 rounded-lg border border-zinc-700/30 object-cover shrink-0"
            />
            {(sidebarOpen || mobileOpen) && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate dark:text-zinc-200 text-zinc-800 leading-tight">
                  {user.name}
                </p>
                <p className="text-[10px] text-zinc-500 truncate mt-0.5">
                  {user.email}
                </p>
              </div>
            )}
          </div>
          
          <button
            onClick={handleLogout}
            className={`w-full mt-2 flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer group`}
            title={!sidebarOpen ? 'Logout' : ''}
          >
            <LogOut size={20} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
            {(sidebarOpen || mobileOpen) && (
              <span className="font-medium text-sm">Logout</span>
            )}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar container */}
      <aside 
        className={`hidden md:block shrink-0 h-screen sticky top-0 transition-all duration-300 z-30 border-r ${
          activeTheme === 'dark' 
            ? 'glass-panel-dark border-zinc-800/40 bg-zinc-950/80' 
            : 'glass-panel-light border-zinc-200/60 bg-white/90'
        } ${sidebarOpen ? 'w-64' : 'w-20'}`}
      >
        <SidebarContent />
        
        {/* Toggle Button */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`absolute -right-3 top-6 w-6 h-6 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-150 ${
            activeTheme === 'dark'
              ? 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white'
              : 'bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-600 hover:text-zinc-900 shadow-sm'
          }`}
        >
          {sidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </aside>

      {/* Mobile drawer backdrop */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Mobile drawer container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 w-64 z-50 transition-transform duration-300 ease-in-out md:hidden border-r ${
          activeTheme === 'dark' 
            ? 'glass-panel-dark border-zinc-800/40 bg-zinc-950/95' 
            : 'glass-panel-light border-zinc-200/80 bg-white/95'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <SidebarContent />
        <button 
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white"
        >
          <X size={20} />
        </button>
      </aside>
    </>
  );
}
