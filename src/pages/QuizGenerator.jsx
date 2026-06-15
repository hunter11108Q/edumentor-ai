import React, { useState } from 'react';
import { useLearn, MCQ_BANK } from '../context/LearnContext';
import { 
  GraduationCap, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  RefreshCw,
  ArrowRight
} from 'lucide-react';

export default function QuizGenerator() {
  const { addQuizRecord, activeTheme } = useLearn();
  const [selectedSubject, setSelectedSubject] = useState('Python');
  const [quizState, setQuizState] = useState('select'); // 'select' | 'running' | 'results'
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answersLog, setAnswersLog] = useState([]); // log of user selections
  const [score, setScore] = useState(0);

  const handleStart = () => {
    const questions = MCQ_BANK[selectedSubject] || MCQ_BANK.Python;
    setCurrentQuestions(questions);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswersLog([]);
    setScore(0);
    setQuizState('running');
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    // Check if correct
    const currentQ = currentQuestions[currentIndex];
    const isCorrect = selectedAnswer === currentQ.correct;
    const nextScore = isCorrect ? score + 1 : score;
    setScore(nextScore);

    // Log user answer
    const newLog = [...answersLog, {
      question: currentQ.question,
      options: currentQ.options,
      correct: currentQ.correct,
      selected: selectedAnswer,
      isCorrect
    }];
    setAnswersLog(newLog);

    // Advance index
    if (currentIndex + 1 < currentQuestions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    } else {
      // Finished
      setQuizState('results');
      // Record results in global context/localstorage
      addQuizRecord(selectedSubject, nextScore, currentQuestions.length);
    }
  };

  return (
    <div className="space-y-6">
      {/* Selector screen */}
      {quizState === 'select' && (
        <div className={`p-6 sm:p-10 rounded-3xl border text-center transition-all duration-300 max-w-xl mx-auto ${
          activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/60' : 'glass-panel-light border-zinc-200 shadow-sm'
        }`}>
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-brand-indigo flex items-center justify-center mx-auto mb-4 animate-float">
            <GraduationCap size={32} />
          </div>

          <h2 className="text-xl font-bold tracking-tight">AI Quiz Generator</h2>
          <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
            Test your knowledge by taking a quick, 5-question multiple-choice test in your favorite technical topics.
          </p>

          <div className="mt-8 space-y-4 max-w-sm mx-auto">
            <div>
              <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1.5 text-left">Choose Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className={`w-full p-2.5 rounded-xl text-xs outline-none border cursor-pointer ${
                  activeTheme === 'dark' 
                    ? 'bg-zinc-950 border-zinc-800 text-white' 
                    : 'bg-zinc-50 border-zinc-200 text-zinc-800'
                }`}
              >
                <option value="Python">Python Basics</option>
                <option value="Java">Java Object Oriented (OOP)</option>
                <option value="AI">Artificial Intelligence Foundations</option>
                <option value="DBMS">Database Systems (DBMS)</option>
                <option value="Data Structures">Data Structures & Algorithms</option>
              </select>
            </div>

            <button
              onClick={handleStart}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-purple text-white text-xs font-semibold hover:shadow-lg transition-all cursor-pointer"
            >
              Start Concept Assessment
            </button>
          </div>
        </div>
      )}

      {/* Running quiz screen */}
      {quizState === 'running' && currentQuestions.length > 0 && (
        <div className={`p-6 sm:p-8 rounded-3xl border transition-all max-w-2xl mx-auto ${
          activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/40 bg-zinc-900/10' : 'glass-panel-light border-zinc-200 shadow-sm bg-white'
        }`}>
          {/* Progress bar */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] uppercase font-bold text-zinc-500">
              Question {currentIndex + 1} of {currentQuestions.length}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-indigo/15 text-indigo-400 border border-brand-indigo/25">
              {selectedSubject}
            </span>
          </div>

          <div className="w-full bg-zinc-800/50 rounded-full h-1.5 mb-6">
            <div 
              className="bg-brand-indigo h-1.5 rounded-full transition-all duration-300" 
              style={{ width: `${((currentIndex + 1) / currentQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="mb-6 flex gap-3">
            <HelpCircle size={18} className="text-brand-purple shrink-0 mt-0.5" />
            <h3 className="font-bold text-sm leading-relaxed text-zinc-100 dark:text-zinc-100 text-zinc-800">
              {currentQuestions[currentIndex].question}
            </h3>
          </div>

          {/* Options List */}
          <div className="space-y-3 mb-8">
            {currentQuestions[currentIndex].options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedAnswer(idx)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left text-xs font-medium cursor-pointer transition-all duration-150 ${
                    isSelected 
                      ? (activeTheme === 'dark' ? 'bg-brand-indigo/20 border-brand-indigo/60 text-indigo-300' : 'bg-brand-indigo/10 border-brand-indigo/50 text-brand-indigo shadow-sm') 
                      : (activeTheme === 'dark' ? 'bg-zinc-900/30 border-zinc-800/60 hover:bg-white/5 text-zinc-300' : 'bg-zinc-50 border-zinc-200 hover:bg-black/5 text-zinc-800')
                  }`}
                >
                  <span>{option}</span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected 
                      ? 'border-brand-indigo bg-brand-indigo' 
                      : 'border-zinc-700'
                  }`}>
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action button */}
          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-purple text-white text-xs font-semibold hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-1.5"
          >
            {currentIndex + 1 === currentQuestions.length ? 'Submit Quiz' : 'Next Question'} <ArrowRight size={13} />
          </button>
        </div>
      )}

      {/* Results screen */}
      {quizState === 'results' && (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Hero score card */}
          <div className={`p-6 sm:p-8 rounded-3xl border text-center relative overflow-hidden ${
            activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/60 bg-gradient-to-tr from-zinc-950 to-indigo-950/20' : 'glass-panel-light border-zinc-200 shadow-xl'
          }`}>
            <div className="absolute right-0 bottom-0 w-48 h-48 rounded-full bg-brand-purple/10 blur-[60px] -z-10" />

            <div className="w-16 h-16 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple flex items-center justify-center mx-auto mb-4 animate-float">
              <Award size={32} />
            </div>

            <h2 className="text-xl font-bold tracking-tight">Assessment Completed!</h2>
            <p className="text-xs text-zinc-500 mt-1">
              You've successfully finished the {selectedSubject} concept checks.
            </p>

            <div className="my-6">
              <span className="text-4xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-400 bg-clip-text text-transparent">
                {score} / {currentQuestions.length}
              </span>
              <p className="text-[10px] text-zinc-500 uppercase font-bold mt-1">Total Score ({Math.round((score / currentQuestions.length) * 100)}%)</p>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setQuizState('select')}
                className={`px-5 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  activeTheme === 'dark' ? 'border-zinc-800 text-zinc-300 hover:bg-white/5' : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50 shadow-sm'
                }`}
              >
                Change Topic
              </button>
              <button
                onClick={handleStart}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-purple text-white text-xs font-semibold hover:shadow-lg cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw size={12} /> Retake Test
              </button>
            </div>
          </div>

          {/* Details Response Review */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-zinc-200 dark:text-zinc-200 text-zinc-800">Response Review</h3>
            {answersLog.map((log, idx) => (
              <div key={idx} className={`p-4 rounded-2xl border ${
                activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/40 bg-zinc-900/5' : 'glass-panel-light border-zinc-200 shadow-sm bg-white'
              }`}>
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5">
                    {log.isCorrect ? (
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    ) : (
                      <XCircle size={16} className="text-red-500 shrink-0" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-xs text-zinc-200 dark:text-zinc-200 text-zinc-800 leading-relaxed">{log.question}</h4>
                    
                    {/* Choices readout */}
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2 rounded bg-zinc-800/30 border border-zinc-800/40">
                        <span className="text-[10px] text-zinc-500 uppercase font-bold block mb-0.5">Your Choice</span>
                        <span className={log.isCorrect ? 'text-emerald-400 font-semibold' : 'text-red-400 font-semibold'}>
                          {log.options[log.selected]}
                        </span>
                      </div>
                      {!log.isCorrect && (
                        <div className="p-2 rounded bg-zinc-800/30 border border-zinc-800/40">
                          <span className="text-[10px] text-zinc-500 uppercase font-bold block mb-0.5">Correct Answer</span>
                          <span className="text-emerald-400 font-semibold">
                            {log.options[log.correct]}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
