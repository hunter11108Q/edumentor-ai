import React from 'react';
import { useLearn } from '../context/LearnContext';
import { 
  BookOpen, 
  HelpCircle, 
  Settings, 
  LayoutDashboard, 
  GraduationCap, 
  Milestone, 
  Globe, 
  ShieldCheck, 
  Users 
} from 'lucide-react';

export default function About() {
  const { activeTheme } = useLearn();

  const specifications = [
    { title: 'Project Title', value: 'EduMentor AI – Personalized Learning & Student Support Platform' },
    { title: 'Project Type', value: 'AI-Powered Educational Assistant aligned with UN SDG 4' },
    { title: 'Main Stack', value: 'React, Tailwind CSS, Recharts, Lucide Icons, LocalStorage' },
    { title: 'Alignment', value: 'UN Sustainable Development Goal 4 (Target 4.3, 4.4)' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Intro Header */}
      <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 ${
        activeTheme === 'dark' 
          ? 'glass-panel-dark border-zinc-800/60 bg-gradient-to-r from-zinc-950 via-zinc-900 to-indigo-950/20' 
          : 'glass-panel-light border-zinc-200 shadow-sm bg-gradient-to-r from-white to-indigo-50/20'
      }`}>
        <div className="max-w-xl">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/20 uppercase tracking-wider">
            Academic Project Submission
          </span>
          <h2 className="text-xl font-bold tracking-tight mt-3">About EduMentor AI</h2>
          <p className="text-xs text-zinc-500 mt-1">
            EduMentor AI is a state-of-the-art personalized educational assistant designed to solve resource discrepancies in learning support and curriculum pacing.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-[#C5192D] text-white flex items-center justify-center shrink-0 w-16 h-16 shadow-lg animate-float">
          <BookOpen size={32} />
        </div>
      </div>

      {/* Specifications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {specifications.map((spec, i) => (
          <div key={i} className={`p-4 rounded-2xl border ${
            activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/40 bg-zinc-900/10' : 'glass-panel-light border-zinc-200/80 shadow-sm'
          }`}>
            <span className="text-[9px] uppercase font-bold text-zinc-500">{spec.title}</span>
            <p className="font-semibold text-xs text-zinc-200 dark:text-zinc-200 text-zinc-800 mt-1">{spec.value}</p>
          </div>
        ))}
      </div>

      {/* Problem vs Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Problem */}
        <div className={`p-6 rounded-3xl border ${
          activeTheme === 'dark' ? 'glass-panel-dark border-red-500/20 bg-red-500/5' : 'glass-panel-light border-zinc-200 shadow-sm bg-white'
        }`}>
          <h3 className="font-bold text-sm text-red-400 mb-3 flex items-center gap-1.5">
            ⚠️ Problem Statement
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Students struggle to find structured learning guidance and quality, vetted educational resources. Standard curricula move at a single pace, leaving some students behind, while search engines provide scattered, unvetted documentation, leading to overwhelm.
          </p>
        </div>

        {/* Solution */}
        <div className={`p-6 rounded-3xl border ${
          activeTheme === 'dark' ? 'glass-panel-dark border-brand-emerald/20 bg-brand-emerald/5' : 'glass-panel-light border-zinc-200 shadow-sm bg-white'
        }`}>
          <h3 className="font-bold text-sm text-brand-emerald mb-3 flex items-center gap-1.5">
            ✅ The Solution
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            EduMentor AI provides immediate doubt-solving support, generates structured timeline roadmaps for self-paced studies, suggests vetted course links, and runs concept checks via interactive quizzes, consolidating all educational resources in a single dashboard.
          </p>
        </div>
      </div>

      {/* SDG-4 Alignment targets */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${
        activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/40' : 'glass-panel-light border-zinc-200 shadow-sm'
      }`}>
        <h3 className="font-bold text-sm mb-4 flex items-center gap-1.5">
          <Globe size={18} className="text-brand-emerald animate-pulse-glow" /> UN SDG Goal 4: Quality Education
        </h3>
        
        <p className="text-xs text-zinc-400 leading-relaxed mb-6">
          EduMentor AI was built to fulfill specific targets of **UN Sustainable Development Goal 4 (Quality Education)**, which calls for inclusive, equitable education and lifelong learning opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-zinc-800/40 bg-zinc-950/20">
            <h4 className="font-semibold text-xs text-brand-indigo">Target 4.3: Equal Access</h4>
            <p className="text-[11px] text-zinc-500 leading-relaxed mt-1">
              Ensure equal access for all women and men to affordable and quality technical, vocational and tertiary education.
            </p>
          </div>
          
          <div className="p-4 rounded-xl border border-zinc-800/40 bg-zinc-950/20">
            <h4 className="font-semibold text-xs text-brand-purple">Target 4.4: Relevant Skills</h4>
            <p className="text-[11px] text-zinc-500 leading-relaxed mt-1">
              Substantially increase the number of youth and adults who have relevant skills, including technical and vocational skills, for employment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
