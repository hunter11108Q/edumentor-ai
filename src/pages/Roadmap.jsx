import React, { useState } from 'react';
import { useLearn } from '../context/LearnContext';
import { 
  Milestone, 
  CheckCircle, 
  Circle, 
  Sparkles, 
  Code, 
  Layers, 
  HelpCircle,
  TrendingUp,
  MapPin
} from 'lucide-react';

export default function Roadmap() {
  const { roadmaps, generateRoadmap, toggleMilestone, activeTheme } = useLearn();
  const [selectedSubject, setSelectedSubject] = useState('Python');
  const [activeRoadmapId, setActiveRoadmapId] = useState(null);

  const subjects = ['Python', 'Java', 'Data Structures', 'Web Development', 'Machine Learning'];

  const handleGenerate = () => {
    const rm = generateRoadmap(selectedSubject);
    if (rm) {
      setActiveRoadmapId(rm.id);
    }
  };

  const activeRoadmap = roadmaps.find(r => r.id === activeRoadmapId) || roadmaps[roadmaps.length - 1];

  return (
    <div className="space-y-6">
      {/* Subject Selector Header */}
      <div className={`p-6 rounded-3xl border transition-all duration-300 ${
        activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/60' : 'glass-panel-light border-zinc-200 shadow-sm'
      }`}>
        <div className="max-w-xl">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Milestone className="text-brand-indigo" /> Study Roadmap Generator
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Choose your learning objective to generate an interactive, week-by-week curriculum timeline. Log study sessions automatically as you complete milestones.
          </p>

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className={`flex-1 p-2.5 rounded-xl text-xs outline-none border cursor-pointer ${
                activeTheme === 'dark' 
                  ? 'bg-zinc-950 border-zinc-800 text-white' 
                  : 'bg-zinc-50 border-zinc-200 text-zinc-800'
              }`}
            >
              {subjects.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button
              onClick={handleGenerate}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-purple text-white text-xs font-semibold hover:shadow-lg cursor-pointer shrink-0"
            >
              Generate Learning Path
            </button>
          </div>
        </div>
      </div>

      {/* Main Roadmap Display */}
      {activeRoadmap ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Timeline View */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-zinc-200 dark:text-zinc-200 text-zinc-800">
                {activeRoadmap.topic} Syllabus Timeline
              </h3>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
                Generated: {new Date(activeRoadmap.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Timeline cards */}
            <div className="relative border-l border-zinc-800/80 dark:border-zinc-800/80 border-zinc-200 ml-4 pl-6 space-y-6">
              {activeRoadmap.weeks.map((week, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline node marker */}
                  <div className="absolute -left-[31px] top-1 z-10">
                    <button
                      onClick={() => toggleMilestone(activeRoadmap.id, idx)}
                      className={`w-4 h-4 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-200 bg-zinc-950 hover:scale-110 ${
                        week.completed 
                          ? 'border-brand-emerald text-brand-emerald shadow-[0_0_10px_rgba(16,185,129,0.25)]' 
                          : 'border-zinc-700 text-zinc-500 hover:border-brand-indigo'
                      }`}
                    >
                      {week.completed ? (
                        <CheckCircle size={10} className="fill-brand-emerald text-zinc-950" />
                      ) : (
                        <Circle size={8} className="fill-zinc-700" />
                      )}
                    </button>
                  </div>

                  {/* Card Container */}
                  <div className={`p-4 rounded-2xl border transition-all duration-200 ${
                    week.completed 
                      ? (activeTheme === 'dark' ? 'bg-brand-emerald/5 border-brand-emerald/20 text-zinc-300' : 'bg-brand-emerald/5 border-brand-emerald/20 text-zinc-800')
                      : (activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/50 hover:border-zinc-700' : 'glass-panel-light border-zinc-200 hover:border-zinc-300 shadow-sm')
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        week.completed ? 'bg-brand-emerald/10 text-brand-emerald' : 'bg-brand-indigo/10 text-indigo-400'
                      }`}>
                        {week.week}
                      </span>
                      <button
                        onClick={() => toggleMilestone(activeRoadmap.id, idx)}
                        className={`text-[10px] font-semibold hover:underline cursor-pointer ${
                          week.completed ? 'text-zinc-500' : 'text-brand-indigo'
                        }`}
                      >
                        {week.completed ? 'Mark Incomplete' : 'Mark Complete'}
                      </button>
                    </div>

                    <h4 className="font-bold text-xs mt-2 text-zinc-100 dark:text-zinc-100 text-zinc-800">{week.title}</h4>
                    
                    {/* Topics bullet list */}
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {week.topics.map((topic, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-zinc-500">
                          <Code size={10} className="text-zinc-600" />
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick progress sidebar summary */}
          <div className="space-y-6">
            <div className={`p-5 rounded-3xl border ${
              activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/40' : 'glass-panel-light border-zinc-200 shadow-sm'
            }`}>
              <h3 className="font-bold text-sm mb-4 flex items-center gap-1.5">
                <TrendingUp size={16} className="text-brand-purple" /> Roadmap Progress
              </h3>

              {(() => {
                const total = activeRoadmap.weeks.length;
                const completed = activeRoadmap.weeks.filter(w => w.completed).length;
                const percentage = Math.round((completed / total) * 100);

                return (
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>Status</span>
                      <span className="text-zinc-400">{completed} / {total} Completed</span>
                    </div>

                    <div className="w-full bg-zinc-800/50 rounded-full h-2">
                      <div className="bg-brand-indigo h-2 rounded-full transition-all duration-300" style={{ width: `${percentage}%` }} />
                    </div>

                    <p className="text-[11px] text-zinc-500 leading-relaxed">
                      {percentage === 100 
                        ? "🎉 Fantastic job! You have fully mastered this curriculum outline. Try taking the Subject Quiz to validate your skills!" 
                        : `Keep going! You are ${percentage}% through the ${activeRoadmap.topic} syllabus. Set a regular schedule to check off your milestones.`}
                    </p>
                  </div>
                );
              })()}
            </div>

            {/* Quick action buttons */}
            <div className={`p-5 rounded-3xl border text-center ${
              activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/40 bg-zinc-900/10' : 'glass-panel-light border-zinc-200/80 shadow-sm'
            }`}>
              <h4 className="font-bold text-xs mb-2">Practice Tools</h4>
              <p className="text-[10px] text-zinc-500 mb-4 leading-relaxed">Validate your milestone understanding by spawning quick test items or reviewing curated textbooks.</p>
              
              <div className="space-y-2">
                <button 
                  onClick={() => handleGenerate()} // re-generate trigger
                  className={`w-full py-2.5 rounded-xl border text-[10px] font-bold transition-all cursor-pointer ${
                    activeTheme === 'dark' ? 'border-zinc-800 text-zinc-300 hover:bg-white/5' : 'border-zinc-200 text-zinc-700 hover:bg-black/5 shadow-sm'
                  }`}
                >
                  Regenerate Outline
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className={`p-12 text-center rounded-3xl border ${
          activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/40' : 'glass-panel-light border-zinc-200/80 shadow-sm'
        }`}>
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-brand-indigo flex items-center justify-center mx-auto mb-4 animate-float">
            <Milestone size={32} />
          </div>
          <h3 className="font-bold text-sm mb-1 text-zinc-200 dark:text-zinc-200 text-zinc-800">No active roadmap generated</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto mb-4">
            Pick a subject like Python, Java, or Machine Learning above to map out your custom 4-week study timeline.
          </p>
          <button 
            onClick={handleGenerate}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-purple text-white text-xs font-semibold hover:shadow-lg cursor-pointer"
          >
            Start Default Roadmap
          </button>
        </div>
      )}
    </div>
  );
}
