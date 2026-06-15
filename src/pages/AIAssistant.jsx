import React, { useState, useEffect, useRef } from 'react';
import { useLearn, AI_KNOWLEDGE_BASE } from '../context/LearnContext';
import { 
  Plus, 
  Trash2, 
  Send, 
  Copy, 
  Download, 
  Sparkles, 
  Check,
  Bot,
  User,
  AlertTriangle
} from 'lucide-react';

export default function AIAssistant() {
  const { chatHistory, saveChatHistory, activeTheme, incrementQuestions, showToast } = useLearn();
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  const welcomeText = `Hello! 👋
I am EduMentor AI.

I can help you with:
• Subject explanations
• Study roadmaps
• Quiz generation
• Learning resources
• Academic guidance

How can I assist you today?`;

  // Initialize a default chat session if history is empty
  useEffect(() => {
    if (chatHistory.length === 0) {
      const defaultSession = {
        id: Date.now().toString(),
        title: 'New Discussion',
        messages: [
          { sender: 'ai', text: welcomeText, timestamp: new Date().toISOString() }
        ]
      };
      saveChatHistory([defaultSession]);
      setActiveSessionId(defaultSession.id);
    } else if (!activeSessionId) {
      setActiveSessionId(chatHistory[0].id);
    }
  }, [chatHistory, activeSessionId]);

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, activeSessionId, isTyping]);

  const activeSession = chatHistory.find(s => s.id === activeSessionId) || chatHistory[0];

  const handleNewChat = () => {
    const newSession = {
      id: Date.now().toString(),
      title: `Discussion #${chatHistory.length + 1}`,
      messages: [
        { sender: 'ai', text: welcomeText, timestamp: new Date().toISOString() }
      ]
    };
    saveChatHistory([newSession, ...chatHistory]);
    setActiveSessionId(newSession.id);
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear this discussion's messages?")) {
      const updatedChats = chatHistory.map(s => {
        if (s.id === activeSessionId) {
          return {
            ...s,
            messages: [{ sender: 'ai', text: welcomeText, timestamp: new Date().toISOString() }]
          };
        }
        return s;
      });
      saveChatHistory(updatedChats);
      showToast("Chat history cleared.", "info");
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const userText = inputMessage.trim();
    setInputMessage('');
    incrementQuestions();

    // 1. Add user message
    const userMsg = { sender: 'user', text: userText, timestamp: new Date().toISOString() };
    let updatedSession = { ...activeSession, messages: [...activeSession.messages, userMsg] };
    
    // Update session title on the first real message if it is default
    if (activeSession.title === 'New Discussion' || activeSession.title.startsWith('Discussion #')) {
      updatedSession.title = userText.length > 25 ? userText.substring(0, 22) + '...' : userText;
    }

    const updatedChats = chatHistory.map(s => s.id === activeSessionId ? updatedSession : s);
    saveChatHistory(updatedChats);

    // 2. Trigger Typing animation and AI response
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = '';
      const cleanInput = userText.toLowerCase();

      // Knowledge Base Router
      if (cleanInput.includes('artificial intelligence') || cleanInput === 'what is ai' || cleanInput === 'ai') {
        aiResponseText = AI_KNOWLEDGE_BASE.ai;
      } else if (cleanInput.includes('machine learning') || cleanInput === 'what is ml' || cleanInput === 'ml') {
        aiResponseText = AI_KNOWLEDGE_BASE.ml;
      } else if (cleanInput.includes('dbms') || cleanInput.includes('database management')) {
        aiResponseText = AI_KNOWLEDGE_BASE.dbms;
      } else if (cleanInput === 'python' || cleanInput.includes('explain python')) {
        aiResponseText = AI_KNOWLEDGE_BASE.python;
      } else if (cleanInput === 'java' || cleanInput.includes('explain java')) {
        aiResponseText = AI_KNOWLEDGE_BASE.java;
      } else if (cleanInput.includes('data structures') || cleanInput.includes('dsa') || cleanInput === 'ds') {
        aiResponseText = AI_KNOWLEDGE_BASE.ds;
      } else {
        // Fallback response
        aiResponseText = `Sorry, I couldn't understand that request.

Try:
• Ask a subject question (e.g., "What is Artificial Intelligence?", "Explain DBMS", "Explain Python")
• Generate a roadmap
• Create a quiz
• Request learning resources`;
      }

      const aiMsg = { sender: 'ai', text: aiResponseText, timestamp: new Date().toISOString() };
      const finalSession = { ...updatedSession, messages: [...updatedSession.messages, aiMsg] };
      const finalChats = chatHistory.map(s => s.id === activeSessionId ? finalSession : s);
      
      saveChatHistory(finalChats);
      setIsTyping(false);
    }, 1200);
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedId(idx);
    showToast("Copied to clipboard!", "success");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExport = () => {
    if (!activeSession) return;
    
    // Create text content
    const exportContent = activeSession.messages.map(m => {
      const role = m.sender === 'user' ? 'User' : 'EduMentor AI';
      return `[${new Date(m.timestamp).toLocaleTimeString()}] ${role}:\n${m.text}\n\n========================\n`;
    }).join('\n');

    const blob = new Blob([exportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeSession.title.replace(/\s+/g, '_')}_history.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast("Chat history exported!", "success");
  };

  // Basic Markdown Renderer for Educational Replies
  const renderMessageContent = (text) => {
    const lines = text.split('\n');
    let insideCodeBlock = false;
    let codeBlockLines = [];

    return lines.map((line, idx) => {
      // Code Blocks
      if (line.trim().startsWith('```')) {
        if (insideCodeBlock) {
          insideCodeBlock = false;
          const codeString = codeBlockLines.join('\n');
          codeBlockLines = [];
          return (
            <pre key={idx} className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-3 my-2 text-xs font-mono overflow-x-auto text-zinc-300 text-left">
              <code>{codeString}</code>
            </pre>
          );
        } else {
          insideCodeBlock = true;
          return null;
        }
      }

      if (insideCodeBlock) {
        codeBlockLines.push(line);
        return null;
      }

      // Headers (### or ####)
      if (line.startsWith('### ')) {
        return <h3 key={idx} className="text-sm font-bold text-white mt-3 mb-1 text-left">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('#### ')) {
        return <h4 key={idx} className="text-xs font-bold text-zinc-300 mt-2 mb-1 text-left">{line.replace('#### ', '')}</h4>;
      }

      // Bullet points
      if (line.startsWith('• ') || line.startsWith('* ')) {
        const clean = line.replace(/^[•*]\s+/, '');
        // Highlight inline bold markers
        return (
          <li key={idx} className="list-disc list-inside text-xs text-zinc-400 mt-1 pl-2 text-left">
            {parseInlineBold(clean)}
          </li>
        );
      }

      // Number list
      if (/^\d+\.\s+/.test(line)) {
        const clean = line.replace(/^\d+\.\s+/, '');
        return (
          <div key={idx} className="text-xs text-zinc-400 mt-1 pl-2 text-left">
            <span className="font-bold mr-1">{line.match(/^\d+/)[0]}.</span>
            {parseInlineBold(clean)}
          </div>
        );
      }

      // Normal text with bold inline formatting
      return (
        <p key={idx} className="text-xs leading-relaxed text-zinc-400 text-left mt-1 min-h-[12px]">
          {parseInlineBold(line)}
        </p>
      );
    });
  };

  const parseInlineBold = (lineText) => {
    const parts = lineText.split('**');
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i} className="text-white font-semibold">{part}</strong>;
      }
      return part;
    });
  };

  return (
    <div className={`h-[calc(100vh-6rem)] flex rounded-3xl border overflow-hidden ${
      activeTheme === 'dark' ? 'glass-panel-dark border-zinc-800/40' : 'glass-panel-light border-zinc-200/80 shadow-sm'
    }`}>
      {/* Sidebar: Chat sessions list */}
      <div className={`w-56 shrink-0 hidden md:flex flex-col border-r h-full ${
        activeTheme === 'dark' ? 'border-zinc-800/40 bg-zinc-950/20' : 'border-zinc-200/60 bg-zinc-50/20'
      }`}>
        <div className="p-3 border-b border-zinc-800/40">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-purple text-white text-xs font-semibold hover:shadow-md cursor-pointer transition-shadow"
          >
            <Plus size={14} /> New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {chatHistory.map((session) => (
            <button
              key={session.id}
              onClick={() => setActiveSessionId(session.id)}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-left text-xs font-medium truncate cursor-pointer transition-colors ${
                session.id === activeSessionId
                  ? (activeTheme === 'dark' ? 'bg-white/5 text-white' : 'bg-black/5 text-zinc-950')
                  : 'text-zinc-500 hover:bg-zinc-500/5'
              }`}
            >
              <Bot size={14} className="shrink-0 text-brand-indigo" />
              <span className="truncate">{session.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Workspace */}
      <div className="flex-1 flex flex-col h-full bg-zinc-950/10">
        {/* Chat window header */}
        <div className={`px-4 py-3 border-b flex items-center justify-between shrink-0 ${
          activeTheme === 'dark' ? 'border-zinc-800/40' : 'border-zinc-200/60'
        }`}>
          <div className="flex items-center gap-2">
            <Bot size={18} className="text-brand-indigo" />
            <div>
              <h4 className="font-semibold text-xs leading-none">{activeSession?.title || 'EduMentor Assistant'}</h4>
              <span className="text-[10px] text-zinc-500 mt-0.5">Online • AI Classroom Tutor</span>
            </div>
          </div>

          <div className="flex gap-1">
            <button
              onClick={handleExport}
              className={`p-2 rounded-lg hover:bg-zinc-500/10 transition-colors cursor-pointer text-zinc-400`}
              title="Export Discussion"
            >
              <Download size={15} />
            </button>
            <button
              onClick={handleClearHistory}
              className={`p-2 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer text-red-400`}
              title="Clear discussion"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>

        {/* Message Feed Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeSession?.messages.map((msg, index) => {
            const isUser = msg.sender === 'user';
            return (
              <div 
                key={index} 
                className={`flex gap-3 max-w-[85%] ${
                  isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {/* Avatar */}
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border text-xs font-semibold ${
                  isUser 
                    ? 'bg-zinc-800 border-zinc-700 text-zinc-200' 
                    : 'bg-brand-indigo/15 border-brand-indigo/25 text-brand-indigo'
                }`}>
                  {isUser ? <User size={14} /> : <Bot size={14} />}
                </div>

                {/* Message block */}
                <div className={`flex flex-col group`}>
                  <div className={`px-4 py-3 rounded-2xl border text-xs leading-relaxed relative ${
                    isUser 
                      ? (activeTheme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-200 rounded-tr-none' : 'bg-brand-indigo/10 border-brand-indigo/20 text-zinc-800 rounded-tr-none') 
                      : (activeTheme === 'dark' ? 'bg-zinc-950/40 border-zinc-800/40 text-zinc-300 rounded-tl-none' : 'bg-white border-zinc-200 text-zinc-800 shadow-sm rounded-tl-none')
                  }`}>
                    {renderMessageContent(msg.text)}

                    {/* Quick copy overlay */}
                    {!isUser && (
                      <button
                        onClick={() => handleCopy(msg.text, index)}
                        className={`absolute -bottom-2 -right-2 p-1.5 rounded-lg border bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                        title="Copy text"
                      >
                        {copiedId === index ? <Check size={11} className="text-brand-emerald" /> : <Copy size={11} />}
                      </button>
                    )}
                  </div>
                  <span className="text-[9px] text-zinc-500 mt-1 self-end">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Typing Animation */}
          {isTyping && (
            <div className="flex gap-3 mr-auto max-w-[85%]">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border border-brand-indigo/25 bg-brand-indigo/15 text-brand-indigo">
                <Bot size={14} />
              </div>
              <div className={`px-4 py-3 rounded-2xl rounded-tl-none border flex items-center gap-1 ${
                activeTheme === 'dark' ? 'bg-zinc-950/40 border-zinc-800/40' : 'bg-white border-zinc-200 shadow-sm'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-indigo animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-indigo animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-indigo animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className={`p-3 border-t shrink-0 ${
          activeTheme === 'dark' ? 'border-zinc-800/40' : 'border-zinc-200/60'
        }`}>
          <div className="flex gap-2 relative">
            <input
              type="text"
              placeholder="Ask a question (e.g. 'What is Machine Learning?', 'Explain DBMS')..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className={`flex-1 py-2.5 pl-4 pr-12 rounded-xl text-xs outline-none ${
                activeTheme === 'dark' ? 'glass-input-dark' : 'glass-input-light'
              }`}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className={`absolute right-1.5 top-1.5 p-2 rounded-lg bg-gradient-to-r from-brand-indigo to-brand-purple text-white cursor-pointer hover:shadow-md transition-shadow disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              <Send size={13} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
