import React, { useState } from 'react';
import { useLearn } from '../context/LearnContext';
import { useAuth } from '../context/AuthContext';
import { 
  MessageSquare, 
  GraduationCap, 
  Clock, 
  Flame, 
  BookOpen, 
  CheckSquare, 
  Calendar,
  Sparkles,
  Play
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

export default function Dashboard({ setActivePage }) {
  const { user } = useAuth();
  const { stats, studySessionsList, quizzes, roadmaps, activeTheme, addStudySession } = useLearn();
  const [showLogSession, setShowLogSession] = useState(false);
  const [sessionSubject, setSessionSubject] = useState('Python');
  const [sessionDuration, setSessionDuration] = useState(30);

  // Generate weekly activity data dynamically from logged sessions, fallback to mock data
  const getWeeklyActivityData = () => {
    const defaultData = [
      { name: 'Mon', hours: 1.5 },
      { name: 'Tue', hours: 2.0 },
      { name: 'Wed', hours: 1.0 },
      { name: 'Thu', hours: 2.5 },
      { name: 'Fri', hours: 1.8 },
      { name: 'Sat', hours: stats.studySessions > 0 ? 3.0 : 0.5 },
      { name: 'Sun', hours: stats.studySessions > 0 ? 2.2 : 0.2 },
    ];
    return defaultData;
  };

  // Calculate subject progress data based on quiz records & roadmap milestones
  const getSubjectProgressData = () => {
    const subjects = ['Python', 'Java', 'AI', 'DBMS', 'Data Structures'];
    
    return subjects.map(sub => {
      // Calculate a score from 0 to 100 based on quizzes taken & milestones done
      const subQuizzes = quizzes.filter(q => q.topic.toLowerCase() === sub.toLowerCase());
      const subRoadmaps = roadmaps.filter(r => r.topic.toLowerCase() === sub.toLowerCase());
      
      let score = 25; // baseline interest
      
      if (subQuizzes.length > 0) {
        const avgScore = subQuizzes.reduce((acc, q) => acc + (q.score / q.total), 0) / subQuizzes.length;
        score += Math.round(avgScore * 40); // up to 40 points from quiz success
      }
      
      if (subRoadmaps.length > 0) {
        const roadmap = subRoadmaps[0];
        const completedCount = roadmap.weeks.filter(w => w.completed).length;
        score += Math.round((completedCount / roadmap.weeks.length) * 35); // up to 35 points from roadmap milestones
      }

      return {
        subject: sub,
        A: Math.min(100, score),
        fullMark: 100,
      };
    });
  };

  const handleLogSessionSubmit = (e) => {
    e.preventDefault();
    addStudySession(Number(sessionDuration), sessionSubject);
    setShowLogSession(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className={`p-6 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 ${
        activeTheme === 'dark' 
          ? 'glass-panel-dark border-zinc-800/60 bg-gradient-to-r from-zinc-950 via-zinc-900 to-indigo-950/20' 
          : 'glass-panel-light border-zinc-200 shadow-sm bg-gradient-to-r from-white to-indigo-50/20'
      }`}>
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            Welcome back, {user?.name}! <span className="animate-float">👋</span>
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            "Quality education is not just about learning facts, but training the mind to think." Let's build your streak today!
          </p>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => setShowLogSession(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-purple text-white text-xs font-semibold hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Play size={12} className="fill-white" /> Log Study Session
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Streak */}
        <div className={`p-4 rounded-2xl border transition-all hover:scale-[1.01] ${
          activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/40 bg-zinc-900/10' : 'glass-panel-light border-zinc-200/80 shadow-sm'
        }`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase font-semibold text-zinc-500">Learning Streak</span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500"><Flame size={16} /></div>
          </div>
          <p className="text-2xl font-bold mt-2">{stats.learningStreak} Days</p>
          <p className="text-[10px] text-zinc-500 mt-0.5">Consecutive days active</p>
        </div>

        {/* Card 2: Quizzes Completed */}
        <div className={`p-4 rounded-2xl border transition-all hover:scale-[1.01] ${
          activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/40 bg-zinc-900/10' : 'glass-panel-light border-zinc-200/80 shadow-sm'
        }`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase font-semibold text-zinc-500">Quizzes Taken</span>
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-brand-indigo"><GraduationCap size={16} /></div>
          </div>
          <p className="text-2xl font-bold mt-2">{stats.quizzesCompleted}</p>
          <p className="text-[10px] text-zinc-500 mt-0.5">Completed assessments</p>
        </div>

        {/* Card 3: Questions Asked */}
        <div className={`p-4 rounded-2xl border transition-all hover:scale-[1.01] ${
          activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/40 bg-zinc-900/10' : 'glass-panel-light border-zinc-200/80 shadow-sm'
        }`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase font-semibold text-zinc-500">Questions Asked</span>
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-brand-purple"><MessageSquare size={16} /></div>
          </div>
          <p className="text-2xl font-bold mt-2">{stats.questionsAsked}</p>
          <p className="text-[10px] text-zinc-500 mt-0.5">AI tutor queries</p>
        </div>

        {/* Card 4: Study Sessions */}
        <div className={`p-4 rounded-2xl border transition-all hover:scale-[1.01] ${
          activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/40 bg-zinc-900/10' : 'glass-panel-light border-zinc-200/80 shadow-sm'
        }`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase font-semibold text-zinc-500">Study Sessions</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-brand-emerald"><Clock size={16} /></div>
          </div>
          <p className="text-2xl font-bold mt-2">{stats.studySessions}</p>
          <p className="text-[10px] text-zinc-500 mt-0.5">Logged study hours blocks</p>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Weekly Activity Line Chart */}
        <div className={`p-5 rounded-3xl border lg:col-span-3 ${
          activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/40' : 'glass-panel-light border-zinc-200/80 shadow-sm'
        }`}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-sm">Weekly Study Time</h3>
              <p className="text-[10px] text-zinc-500 mt-0.5">Hours spent per day</p>
            </div>
            <Calendar size={16} className="text-zinc-500" />
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={getWeeklyActivityData()}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={activeTheme === 'dark' ? '#1f2937' : '#f1f5f9'} />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={10} />
                <YAxis stroke="#6b7280" fontSize={10} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: activeTheme === 'dark' ? '#18181b' : '#ffffff',
                    borderColor: activeTheme === 'dark' ? '#27272a' : '#e4e4e7',
                    borderRadius: '12px',
                    fontSize: '11px',
                    color: activeTheme === 'dark' ? '#fff' : '#000'
                  }}
                />
                <Area type="monotone" dataKey="hours" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Progress Radar Chart */}
        <div className={`p-5 rounded-3xl border lg:col-span-2 ${
          activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/40' : 'glass-panel-light border-zinc-200/80 shadow-sm'
        }`}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-sm">Subject Proficiency</h3>
              <p className="text-[10px] text-zinc-500 mt-0.5">Quiz and Roadmap progress metrics</p>
            </div>
            <Sparkles size={16} className="text-purple-400" />
          </div>

          <div className="h-64 flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" radius="70%" data={getSubjectProgressData()}>
                <PolarGrid stroke={activeTheme === 'dark' ? '#374151' : '#e2e8f0'} />
                <PolarAngleAxis dataKey="subject" stroke="#6b7280" fontSize={9} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#6b7280" fontSize={8} />
                <Radar 
                  name={user?.name || "Student"} 
                  dataKey="A" 
                  stroke="#a855f7" 
                  fill="#a855f7" 
                  fillOpacity={0.3} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Roadmaps / Activity Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Roadmaps */}
        <div className={`p-5 rounded-3xl border ${
          activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/40' : 'glass-panel-light border-zinc-200/80 shadow-sm'
        }`}>
          <h3 className="font-bold text-sm mb-4 flex items-center gap-1.5">
            <BookOpen size={16} className="text-indigo-400" /> My Learning Paths
          </h3>
          {roadmaps.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xs text-zinc-500">No active roadmaps generated yet.</p>
              <button 
                onClick={() => setActivePage('roadmap')}
                className="mt-3 text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-brand-indigo/15 text-indigo-400 border border-brand-indigo/25 hover:bg-brand-indigo/20 cursor-pointer"
              >
                Create Study Roadmap
              </button>
            </div>
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {roadmaps.map(r => {
                const completedCount = r.weeks.filter(w => w.completed).length;
                const percent = Math.round((completedCount / r.weeks.length) * 100);
                return (
                  <div key={r.id} className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 ${
                    activeTheme === 'dark' ? 'bg-zinc-900/30 border-zinc-800/60' : 'bg-zinc-50 border-zinc-200/80'
                  }`}>
                    <div>
                      <h4 className="font-semibold text-xs">{r.topic} Roadmap</h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5">{completedCount} of {r.weeks.length} weeks finished</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-16 bg-zinc-700/30 dark:bg-zinc-800/50 rounded-full h-1.5">
                        <div className="bg-brand-emerald h-1.5 rounded-full" style={{ width: `${percent}%` }} />
                      </div>
                      <span className="text-xs font-bold text-zinc-400">{percent}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Quizzes Logs */}
        <div className={`p-5 rounded-3xl border ${
          activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/40' : 'glass-panel-light border-zinc-200/80 shadow-sm'
        }`}>
          <h3 className="font-bold text-sm mb-4 flex items-center gap-1.5">
            <CheckSquare size={16} className="text-emerald-400" /> Recent Quiz Results
          </h3>
          {quizzes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xs text-zinc-500">No quiz assessments completed yet.</p>
              <button 
                onClick={() => setActivePage('quiz')}
                className="mt-3 text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-brand-emerald/15 text-brand-emerald border border-brand-emerald/25 hover:bg-brand-emerald/20 cursor-pointer"
              >
                Take a Quiz
              </button>
            </div>
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {quizzes.map(q => {
                const percent = Math.round((q.score / q.total) * 100);
                return (
                  <div key={q.id} className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 ${
                    activeTheme === 'dark' ? 'bg-zinc-900/30 border-zinc-800/60' : 'bg-zinc-50 border-zinc-200/80'
                  }`}>
                    <div>
                      <h4 className="font-semibold text-xs">{q.topic} Concept Test</h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5">{new Date(q.date).toLocaleDateString()}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        percent >= 80 ? 'bg-emerald-500/10 text-emerald-400' : percent >= 50 ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        Score: {q.score}/{q.total}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Log Study Session Modal */}
      {showLogSession && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4">
          <div className={`w-full max-w-sm rounded-2xl border p-5 shadow-2xl ${
            activeTheme === 'dark' 
              ? 'bg-zinc-900 border-zinc-800 text-zinc-100' 
              : 'bg-white border-zinc-200 text-zinc-800'
          }`}>
            <h3 className="font-bold text-sm mb-4 border-b border-zinc-800/40 pb-2 flex items-center gap-1.5">
              <Clock size={16} className="text-brand-indigo" /> Log Study Session
            </h3>

            <form onSubmit={handleLogSessionSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Subject</label>
                <select
                  value={sessionSubject}
                  onChange={(e) => setSessionSubject(e.target.value)}
                  className={`w-full p-2 rounded-xl text-xs outline-none border ${
                    activeTheme === 'dark' 
                      ? 'bg-zinc-950 border-zinc-800 text-white' 
                      : 'bg-zinc-50 border-zinc-200 text-zinc-800'
                  }`}
                >
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="AI">Artificial Intelligence</option>
                  <option value="DBMS">Database Management (DBMS)</option>
                  <option value="Data Structures">Data Structures</option>
                  <option value="Web Development">Web Development</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Duration (Minutes)</label>
                <input
                  type="number"
                  min="5"
                  max="480"
                  value={sessionDuration}
                  onChange={(e) => setSessionDuration(e.target.value)}
                  className={`w-full p-2 rounded-xl text-xs outline-none border ${
                    activeTheme === 'dark' 
                      ? 'bg-zinc-950 border-zinc-800 text-white' 
                      : 'bg-zinc-50 border-zinc-200 text-zinc-800'
                  }`}
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogSession(false)}
                  className="px-3 py-1.5 rounded-xl border border-zinc-700/30 text-xs font-semibold hover:bg-zinc-500/10 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-purple text-white text-xs font-semibold hover:shadow-md cursor-pointer"
                >
                  Log Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
