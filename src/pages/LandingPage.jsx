import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  MessageSquare, 
  Milestone, 
  GraduationCap, 
  Library, 
  Activity, 
  CheckCircle, 
  Users, 
  ShieldCheck, 
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { useLearn } from '../context/LearnContext';
import { useAuth } from '../context/AuthContext';

export default function LandingPage({ setActivePage }) {
  const { activeTheme } = useLearn();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      setActivePage('dashboard');
    } else {
      setActivePage('register');
    }
  };

  const handleTryDemo = () => {
    if (user) {
      setActivePage('dashboard');
    } else {
      setActivePage('login');
    }
  };

  return (
    <div className={`min-h-screen ${
      activeTheme === 'dark' ? 'gradient-bg-dark text-white' : 'gradient-bg-light text-zinc-800'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-md px-6 py-4 flex items-center justify-between ${
        activeTheme === 'dark' ? 'bg-zinc-950/40 border-zinc-800/40' : 'bg-white/40 border-zinc-200/60'
      }`}>
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-purple text-white shadow-md">
            <BookOpen size={20} />
          </div>
          <span className="font-bold text-lg leading-none bg-gradient-to-r from-indigo-500 to-purple-400 bg-clip-text text-transparent">
            EduMentor AI
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActivePage('about')}
            className={`text-xs font-semibold px-3 py-2 rounded-xl transition-colors cursor-pointer ${
              activeTheme === 'dark' ? 'text-zinc-300 hover:bg-white/5' : 'text-zinc-600 hover:bg-black/5'
            }`}
          >
            About SDG 4
          </button>
          {user ? (
            <button 
              onClick={() => setActivePage('dashboard')}
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-purple text-white hover:shadow-lg transition-all cursor-pointer"
            >
              Dashboard
            </button>
          ) : (
            <>
              <button 
                onClick={() => setActivePage('login')}
                className={`text-xs font-semibold px-4 py-2 rounded-xl border transition-colors cursor-pointer ${
                  activeTheme === 'dark' ? 'border-zinc-800 text-zinc-300 hover:bg-white/5' : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setActivePage('register')}
                className="text-xs font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-purple text-white hover:shadow-md transition-all cursor-pointer"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-24 text-center max-w-5xl mx-auto overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-brand-purple/10 blur-[100px] -z-10" />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-400 text-xs font-semibold mb-6 animate-pulse-glow">
          <Sparkles size={12} />
          Empowering Inclusive & Quality Education
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent dark:inline hidden">
            EduMentor AI
          </span>
          <span className="text-zinc-900 dark:hidden inline">
            EduMentor AI
          </span>
          <br />
          <span className="bg-gradient-to-r from-brand-indigo via-brand-purple to-brand-blue bg-clip-text text-transparent">
            Personalized Learning Powered by AI
          </span>
        </h1>

        <p className="text-sm sm:text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Unlock your full academic potential with self-paced roadmap guidelines, interactive doubt-solving support, dynamic quizzes, and structured research recommendations.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleGetStarted}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-purple text-white font-semibold text-sm hover:shadow-[0_0_25px_rgba(99,102,241,0.35)] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            Get Started Free <ArrowRight size={16} />
          </button>
          <button
            onClick={handleTryDemo}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl border font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTheme === 'dark' 
                ? 'border-zinc-800 text-zinc-200 hover:bg-white/5' 
                : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50 shadow-sm'
            }`}
          >
            Try Demo Account
          </button>
        </div>

        {/* Floating Achievements / Graphic Cards */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className={`p-5 rounded-2xl border ${
            activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/60' : 'glass-panel-light border-zinc-200'
          }`}>
            <p className="text-2xl sm:text-3xl font-extrabold text-brand-indigo">98%</p>
            <p className="text-[10px] sm:text-xs text-zinc-500 mt-1 uppercase font-semibold">User Satisfaction</p>
          </div>
          <div className={`p-5 rounded-2xl border ${
            activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/60' : 'glass-panel-light border-zinc-200'
          }`}>
            <p className="text-2xl sm:text-3xl font-extrabold text-brand-purple">24/7</p>
            <p className="text-[10px] sm:text-xs text-zinc-500 mt-1 uppercase font-semibold">Doubt Support</p>
          </div>
          <div className={`p-5 rounded-2xl border ${
            activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/60' : 'glass-panel-light border-zinc-200'
          }`}>
            <p className="text-2xl sm:text-3xl font-extrabold text-brand-emerald">UN SDG 4</p>
            <p className="text-[10px] sm:text-xs text-zinc-500 mt-1 uppercase font-semibold">Quality Aligned</p>
          </div>
          <div className={`p-5 rounded-2xl border ${
            activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/60' : 'glass-panel-light border-zinc-200'
          }`}>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-500">100k+</p>
            <p className="text-[10px] sm:text-xs text-zinc-500 mt-1 uppercase font-semibold">Active Quizzes</p>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className={`py-20 border-t ${
        activeTheme === 'dark' ? 'border-zinc-900 bg-zinc-950/40' : 'border-zinc-200/60 bg-zinc-50/50'
      }`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">
              Designed For Modern Academic Growth
            </h2>
            <p className="text-sm text-zinc-500 mt-2 max-w-lg mx-auto">
              Everything you need to master technical skills and organize your student routine efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className={`p-6 rounded-2xl border ${
              activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/40' : 'glass-panel-light border-zinc-200/80 shadow-sm'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-brand-indigo flex items-center justify-center mb-4">
                <MessageSquare size={20} />
              </div>
              <h3 className="font-bold text-sm mb-2">AI doubt solving</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Connect with the EduMentor AI chatbot instantly to receive code explanations, structural database summaries, or study advice.
              </p>
            </div>

            {/* Feature 2 */}
            <div className={`p-6 rounded-2xl border ${
              activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/40' : 'glass-panel-light border-zinc-200/80 shadow-sm'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-brand-purple flex items-center justify-center mb-4">
                <Milestone size={20} />
              </div>
              <h3 className="font-bold text-sm mb-2">Study Roadmap Generator</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Choose Python, Java, Data Structures, or Machine Learning to build a structured 4-week graphic timeline with progress checkmarks.
              </p>
            </div>

            {/* Feature 3 */}
            <div className={`p-6 rounded-2xl border ${
              activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/40' : 'glass-panel-light border-zinc-200/80 shadow-sm'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-brand-emerald flex items-center justify-center mb-4">
                <GraduationCap size={20} />
              </div>
              <h3 className="font-bold text-sm mb-2">Custom Quiz Generator</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Assess your concept understanding with 5 interactive multiple-choice questions per topic, featuring score readouts and response checks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SDG 4 Impact Section */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className={`rounded-3xl border p-8 sm:p-12 relative overflow-hidden ${
          activeTheme === 'dark' ? 'glass-panel-dark border-purple-500/25 bg-gradient-to-br from-zinc-950 to-indigo-950/20' : 'glass-panel-light border-zinc-200 shadow-xl'
        }`}>
          {/* Decorative sphere */}
          <div className="absolute right-0 bottom-0 w-64 h-64 rounded-full bg-indigo-500/10 blur-[80px] -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-emerald/15 text-brand-emerald border border-brand-emerald/20 uppercase tracking-wider">
                UN SDG 4 Alignment
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-4 mb-4">
                Supporting Sustainable Development Goal 4
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                EduMentor AI promotes **Quality Education** by providing accessible, personalized, and affordable educational assistance to students anytime and anywhere. By democratizing tutoring assistance, we address structural educational resource gaps.
              </p>

              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-brand-emerald/20 text-brand-emerald mt-0.5"><CheckCircle size={14} /></div>
                  <p className="text-xs text-zinc-400">**Accessible Learning**: Zero geographical barriers for students globally.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-brand-emerald/20 text-brand-emerald mt-0.5"><CheckCircle size={14} /></div>
                  <p className="text-xs text-zinc-400">**Adaptive Pacing**: Study roadmaps custom tailored to individual progress rates.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-brand-emerald/20 text-brand-emerald mt-0.5"><CheckCircle size={14} /></div>
                  <p className="text-xs text-zinc-400">**Rich Analytics**: Help students identify knowledge gaps and master subjects.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              {/* SDG 4 Visual Graphic */}
              <div className={`p-6 rounded-2xl border max-w-xs w-full text-center relative ${
                activeTheme === 'dark' ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200/80 shadow-md'
              }`}>
                <div className="w-16 h-16 rounded-2xl bg-[#C5192D] text-white flex items-center justify-center mx-auto mb-4 shadow-lg animate-float">
                  <BookOpen size={36} />
                </div>
                <p className="text-[10px] font-semibold text-[#C5192D] uppercase tracking-wider">SDG Target 4</p>
                <h4 className="font-bold text-sm mt-1 mb-2 text-zinc-100 dark:text-zinc-100 text-zinc-800">Quality Education</h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all."
                </p>
                <div className="mt-5 pt-4 border-t border-zinc-800/40 flex justify-between text-left">
                  <div>
                    <p className="text-xs font-semibold text-zinc-400">Target Year</p>
                    <p className="text-sm font-bold text-brand-indigo">2030</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-zinc-400">Solution</p>
                    <p className="text-sm font-bold text-brand-emerald">AI Mentor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-20 border-t ${
        activeTheme === 'dark' ? 'border-zinc-900 bg-zinc-950/40' : 'border-zinc-200/60 bg-zinc-50/50'
      }`}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center tracking-tight mb-12">
            What Our Students Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-2xl border ${
              activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/40' : 'glass-panel-light border-zinc-200 shadow-sm'
            }`}>
              <p className="text-xs text-zinc-400 italic mb-4">
                "The customized timeline in the roadmap generator helped me structure my Python studies when preparing for internship evaluations. Highly recommended tool!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-indigo/20 flex items-center justify-center text-xs font-bold text-indigo-400">
                  AM
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-none">Alex Mercer</h4>
                  <span className="text-[10px] text-zinc-500">Computer Science Sophomore</span>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-2xl border ${
              activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/40' : 'glass-panel-light border-zinc-200 shadow-sm'
            }`}>
              <p className="text-xs text-zinc-400 italic mb-4">
                "EduMentor's chatbot interface gives detailed, structured markdown responses. It explains machine learning concepts much better than standard search engines."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-purple/20 flex items-center justify-center text-xs font-bold text-purple-400">
                  SK
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-none">Sarah K.</h4>
                  <span className="text-[10px] text-zinc-500">Self-taught Data Analyst</span>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-2xl border ${
              activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/40' : 'glass-panel-light border-zinc-200 shadow-sm'
            }`}>
              <p className="text-xs text-zinc-400 italic mb-4">
                "Being able to take mini-quizzes after studying Data Structures blocks keeps me motivated. The learning streak on the dashboard keeps me accountable!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-emerald/20 flex items-center justify-center text-xs font-bold text-emerald-400">
                  RP
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-none">Rohan Patel</h4>
                  <span className="text-[10px] text-zinc-500">Information Technology Senior</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 border-t text-center text-xs text-zinc-500 ${
        activeTheme === 'dark' ? 'border-zinc-900 bg-zinc-950' : 'border-zinc-200/60 bg-zinc-100/50'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-brand-indigo/20 text-brand-indigo"><BookOpen size={14} /></div>
            <span className="font-bold text-sm bg-gradient-to-r from-indigo-500 to-purple-400 bg-clip-text text-transparent">EduMentor AI</span>
          </div>

          <div className="flex gap-4">
            <button onClick={() => setActivePage('about')} className="hover:underline cursor-pointer">About SDG 4 Project</button>
            <span>•</span>
            <button onClick={handleTryDemo} className="hover:underline cursor-pointer">Try Free Demo</button>
          </div>

          <p className="text-[10px]">
            &copy; {new Date().getFullYear()} EduMentor AI. Built in support of UN SDG Goal 4.
          </p>
        </div>
      </footer>
    </div>
  );
}
