import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LearnProvider, useLearn } from './context/LearnContext';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Toast from './components/Toast';

// Pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AIAssistant from './pages/AIAssistant';
import Roadmap from './pages/Roadmap';
import QuizGenerator from './pages/QuizGenerator';
import Resources from './pages/Resources';
import About from './pages/About';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';

function AppContent() {
  const { user } = useAuth();
  const { activeTheme } = useLearn();
  const [activePage, setActivePage] = useState('landing');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Helper to verify route protections
  const renderPage = () => {
    // Check if the target page requires authentication
    const protectedPages = ['dashboard', 'ai', 'roadmap', 'quiz', 'resources', 'settings'];
    const isProtected = protectedPages.includes(activePage);

    if (isProtected && !user) {
      return <Login setActivePage={setActivePage} />;
    }

    switch (activePage) {
      case 'landing':
        return <LandingPage setActivePage={setActivePage} />;
      case 'login':
        return <Login setActivePage={setActivePage} />;
      case 'register':
        return <Register setActivePage={setActivePage} />;
      case 'dashboard':
        return <Dashboard setActivePage={setActivePage} />;
      case 'ai':
        return <AIAssistant />;
      case 'roadmap':
        return <Roadmap />;
      case 'quiz':
        return <QuizGenerator />;
      case 'resources':
        return <Resources />;
      case 'about':
        return <About />;
      case 'settings':
        return <Settings />;
      default:
        return <LandingPage setActivePage={setActivePage} />;
    }
  };

  const standalonePages = ['landing', 'login', 'register'];
  const isStandalone = standalonePages.includes(activePage) || (activePage !== 'about' && !user);

  if (isStandalone) {
    return (
      <div className={`min-h-screen ${activeTheme === 'dark' ? 'bg-zinc-950 text-white' : 'bg-slate-50 text-zinc-800'}`}>
        {renderPage()}
        <Toast />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex ${
      activeTheme === 'dark' ? 'bg-zinc-950 text-white' : 'bg-slate-50 text-zinc-800'
    }`}>
      {/* Sidebar Navigation */}
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header Bar */}
        <Topbar 
          setMobileOpen={setMobileOpen} 
          setActivePage={setActivePage}
        />

        {/* Dynamic Page Scroll Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto animate-fade-in">
            {renderPage()}
          </div>
        </main>
      </div>

      {/* Toast Notification Container */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LearnProvider>
        <AppContent />
      </LearnProvider>
    </AuthProvider>
  );
}
