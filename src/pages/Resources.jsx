import React, { useState } from 'react';
import { useLearn } from '../context/LearnContext';
import { 
  Library, 
  Youtube, 
  Book, 
  Award, 
  Code, 
  Compass,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';

export default function Resources() {
  const { activeTheme, showToast } = useLearn();
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const subjects = ['All', 'Python', 'Java', 'AI', 'DBMS', 'Data Structures'];
  const categories = ['All', 'YouTube', 'Documentation', 'Courses', 'Books', 'Practice'];

  const resourcesData = [
    // Python
    {
      id: 'py-1',
      subject: 'Python',
      category: 'YouTube',
      title: 'Python Tutorial for Beginners',
      provider: 'Programming with Mosh',
      desc: 'A comprehensive 6-hour introductory Python course covering basic syntax, arrays, loops, and OOP concepts.',
      url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
      difficulty: 'Beginner',
      rating: '4.9'
    },
    {
      id: 'py-2',
      subject: 'Python',
      category: 'Courses',
      title: 'Scientific Computing with Python',
      provider: 'freeCodeCamp',
      desc: 'Detailed online course offering video modules, tasks, and code challenges to learn basic scripting and computing logic.',
      url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/',
      difficulty: 'Intermediate',
      rating: '4.8'
    },
    {
      id: 'py-3',
      subject: 'Python',
      category: 'Practice',
      title: 'Solve Python Challenges',
      provider: 'HackerRank',
      desc: 'Interactive platform with modular tasks to practice loops, classes, file handling, and math libraries.',
      url: 'https://www.hackerrank.com/domains/python',
      difficulty: 'Beginner',
      rating: '4.7'
    },
    {
      id: 'py-4',
      subject: 'Python',
      category: 'Documentation',
      title: 'Python 3 Official Docs',
      provider: 'Python Software Foundation',
      desc: 'Detailed syntax sheets, core library functions reference, exception listings, and style guides (PEP 8).',
      url: 'https://docs.python.org/3/',
      difficulty: 'Advanced',
      rating: '4.9'
    },
    {
      id: 'py-5',
      subject: 'Python',
      category: 'Books',
      title: 'Python Crash Course (3rd Edition)',
      provider: 'No Starch Press',
      desc: 'A project-based guide to programming in Python, excellent for self-study and learning code architecture.',
      url: 'https://nostarch.com/python-crash-course-3rd-edition',
      difficulty: 'Beginner',
      rating: '4.8'
    },
    // Java
    {
      id: 'java-1',
      subject: 'Java',
      category: 'YouTube',
      title: 'Java Tutorial for Beginners',
      provider: 'Programming with Mosh',
      desc: 'Introductory guide explaining JVM, compilation, private variable scope, and class structure rules.',
      url: 'https://www.youtube.com/watch?v=GrYptg111gY',
      difficulty: 'Beginner',
      rating: '4.8'
    },
    {
      id: 'java-2',
      subject: 'Java',
      category: 'Documentation',
      title: 'Java Platform Standard Ed. API Docs',
      provider: 'Oracle Corporation',
      desc: 'Standard API specifications for all classes, interface hierarchies, and default package descriptions.',
      url: 'https://docs.oracle.com/en/java/javase/index.html',
      difficulty: 'Advanced',
      rating: '4.9'
    },
    {
      id: 'java-3',
      subject: 'Java',
      category: 'Practice',
      title: 'Java Coding Tasks',
      provider: 'HackerRank',
      desc: 'Modular programming scenarios including multithreading, abstract designs, and collections exercises.',
      url: 'https://www.hackerrank.com/domains/java',
      difficulty: 'Intermediate',
      rating: '4.7'
    },
    // AI
    {
      id: 'ai-1',
      subject: 'AI',
      category: 'Courses',
      title: 'AI for Everyone',
      provider: 'Andrew Ng via Coursera',
      desc: 'An excellent non-technical primer on artificial intelligence capabilities, business operations, and societal ethics.',
      url: 'https://www.coursera.org/learn/ai-for-everyone',
      difficulty: 'Beginner',
      rating: '4.9'
    },
    {
      id: 'ai-2',
      subject: 'AI',
      category: 'YouTube',
      title: 'Deep Learning Crash Course',
      provider: '3Blue1Brown',
      desc: 'Visual mathematical explanations covering feed-forward networks, backpropagation, and gradient descent matrices.',
      url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi',
      difficulty: 'Advanced',
      rating: '4.9'
    },
    // DBMS
    {
      id: 'db-1',
      subject: 'DBMS',
      category: 'Courses',
      title: 'Relational Database Design and SQL',
      provider: 'freeCodeCamp',
      desc: 'Full course teaching normalized schemas, relational algebra, joins, aggregate operations, and SQL coding.',
      url: 'https://www.freecodecamp.org/news/sql-and-databases-course-rdbms/',
      difficulty: 'Intermediate',
      rating: '4.8'
    },
    {
      id: 'db-2',
      subject: 'DBMS',
      category: 'Documentation',
      title: 'PostgreSQL Core Documentation',
      provider: 'PostgreSQL Global Development Group',
      desc: 'Official database administration guidelines, syntax references, index definitions, and JSON support pages.',
      url: 'https://www.postgresql.org/docs/',
      difficulty: 'Advanced',
      rating: '4.8'
    },
    // Data Structures
    {
      id: 'ds-1',
      subject: 'Data Structures',
      category: 'Courses',
      title: 'Algorithms and Data Structures',
      provider: 'freeCodeCamp',
      desc: 'Video course covering arrays, sorting algorithms, binary search trees, and asymptotic analysis (Big O).',
      url: 'https://www.freecodecamp.org/news/algorithms-and-data-structures-free-12-hour-course/',
      difficulty: 'Intermediate',
      rating: '4.9'
    },
    {
      id: 'ds-2',
      subject: 'Data Structures',
      category: 'Practice',
      title: 'LeetCode Problem Sets',
      provider: 'LeetCode',
      desc: 'Leading practice platform for solving tree traversals, recursion, heap structures, and graph algorithm questions.',
      url: 'https://leetcode.com/problemset/all/',
      difficulty: 'Advanced',
      rating: '4.8'
    }
  ];

  const handleLinkClick = (title) => {
    showToast(`Navigating to: ${title}`, 'info');
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'YouTube':
        return <Youtube size={16} className="text-red-500" />;
      case 'Documentation':
        return <Book size={16} className="text-blue-400" />;
      case 'Courses':
        return <Award size={16} className="text-amber-500" />;
      case 'Books':
        return <Compass size={16} className="text-purple-400" />;
      case 'Practice':
      default:
        return <Code size={16} className="text-emerald-400" />;
    }
  };

  // Filter logic
  const filteredResources = resourcesData.filter(res => {
    const subMatch = selectedSubject === 'All' || res.subject === selectedSubject;
    const catMatch = selectedCategory === 'All' || res.category === selectedCategory;
    return subMatch && catMatch;
  });

  return (
    <div className="space-y-6">
      {/* Search/Filter Hub Header */}
      <div className={`p-6 rounded-3xl border transition-all duration-300 ${
        activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/60' : 'glass-panel-light border-zinc-200 shadow-sm'
      }`}>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Library className="text-brand-indigo" /> Resource Recommendation Center
        </h2>
        <p className="text-xs text-zinc-500 mt-1">
          Explore curated learning paths, video courses, official reference sheets, and interactive practice playgrounds filtered by your immediate goals.
        </p>

        {/* Filter Badges Wrapper */}
        <div className="mt-6 space-y-4">
          {/* Subjects Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-zinc-500 mr-2 flex items-center gap-1">
              <Filter size={10} /> Topic:
            </span>
            {subjects.map(s => (
              <button
                key={s}
                onClick={() => setSelectedSubject(s)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-150 cursor-pointer ${
                  selectedSubject === s
                    ? 'bg-brand-indigo/15 text-indigo-400 border-brand-indigo/35 shadow-sm'
                    : (activeTheme === 'dark' ? 'border-zinc-800 hover:bg-white/5 text-zinc-400' : 'border-zinc-200 hover:bg-black/5 text-zinc-700')
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Categories Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-zinc-500 mr-2 flex items-center gap-1">
              <Filter size={10} /> Category:
            </span>
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-150 cursor-pointer ${
                  selectedCategory === c
                    ? 'bg-brand-purple/15 text-purple-400 border-brand-purple/35 shadow-sm'
                    : (activeTheme === 'dark' ? 'border-zinc-800 hover:bg-white/5 text-zinc-400' : 'border-zinc-200 hover:bg-black/5 text-zinc-700')
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Cards Grid */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div 
              key={res.id} 
              className={`p-5 rounded-3xl border flex flex-col justify-between transition-all hover:scale-[1.01] ${
                activeTheme === 'dark' 
                  ? 'glass-panel-dark border-zinc-800/40 bg-zinc-900/10' 
                  : 'glass-panel-light border-zinc-200/80 shadow-sm bg-white'
              }`}
            >
              <div>
                {/* Card Top Details */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-800/40 border border-zinc-800 text-[10px] text-zinc-400">
                    {getCategoryIcon(res.category)}
                    <span>{res.category}</span>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    res.difficulty === 'Beginner' 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : res.difficulty === 'Intermediate' 
                        ? 'bg-amber-500/10 text-amber-400' 
                        : 'bg-red-500/10 text-red-400'
                  }`}>
                    {res.difficulty}
                  </span>
                </div>

                <h3 className="font-bold text-xs text-zinc-100 dark:text-zinc-100 text-zinc-800 line-clamp-1 mt-1">
                  {res.title}
                </h3>
                <span className="text-[10px] text-zinc-500 block mt-0.5">By {res.provider}</span>
                
                <p className="text-[11px] text-zinc-500 mt-3 leading-relaxed line-clamp-3">
                  {res.desc}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-5 pt-3 border-t border-zinc-800/40 flex items-center justify-between">
                <span className="text-xs font-bold text-amber-500">⭐ {res.rating}</span>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleLinkClick(res.title)}
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-indigo hover:underline cursor-pointer"
                >
                  Visit Link <ExternalLink size={10} />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className={`p-12 text-center rounded-3xl border ${
          activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/40' : 'glass-panel-light border-zinc-200/80 shadow-sm'
        }`}>
          <p className="text-xs text-zinc-500">No resources found matching the selected filters.</p>
          <button 
            onClick={() => { setSelectedSubject('All'); setSelectedCategory('All'); }}
            className="mt-3 text-xs font-semibold px-4 py-2 rounded-xl bg-brand-indigo/10 text-indigo-400 border border-brand-indigo/25 hover:bg-brand-indigo/20 cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
