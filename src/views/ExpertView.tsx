import React from 'react';
import { ArrowLeft, CheckCircle2, Phone, Star, Award, MessageCircle } from 'lucide-react';

// ==============================
// 6. EXPERT PROFILE VIEW
// ==============================
export function ExpertView({ onBack, onChat, expert }: { onBack: () => void, onChat: () => void, expert?: any }) {
  // Hardcoded default if accessed outside directory
  const currentExpert = expert || {
    name: 'Dr. Suresh Kumar',
    spec: 'Wheat Pathology Specialist',
    rating: 4.92,
    initial: 'S',
    location: 'Pune',
    cases: 842,
    tier: 'Tier 1 (Gov / Free)'
  };
  
  // Safe extraction of cases and tier for dynamic data from DB
  const cases = currentExpert.cases || Math.floor(Math.random() * 500) + 100;
  const tier = currentExpert.tier || 'Tier 2 (Private)';

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-full flex flex-col fade-in transition-colors duration-300">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-gray-200 dark:border-slate-800 pt-8 sticky top-0 z-10 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <button onClick={onBack} aria-label="Go Back" className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"><ArrowLeft size={24} className="text-gray-700 dark:text-gray-300" /></button>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Assigned Expert</h2>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col relative z-0">
        {/* Profile Card */}
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col items-center justify-center mb-6 text-center relative overflow-hidden ring-1 ring-black/5 dark:ring-white/10 transition-colors duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 dark:bg-blue-900/20 rounded-bl-full -mr-8 -mt-8 z-0"></div>
          <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 text-3xl font-bold border-4 border-white dark:border-slate-800 shadow-xl relative z-10 transition-colors duration-300">
            {currentExpert.initial}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white relative z-10 px-2">{currentExpert.name}</h2>
          <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mt-1 relative z-10">{currentExpert.spec}</p>
          <div className="flex items-center gap-2 mt-4 bg-yellow-50 dark:bg-yellow-900/30 px-4 py-1.5 rounded-full border border-yellow-100 dark:border-yellow-900/50 relative z-10 transition-colors duration-300">
            <Star className="text-yellow-500 fill-yellow-500" size={16} aria-label="Star rating" />
            <span className="text-yellow-700 dark:text-yellow-500 font-bold text-sm tracking-wide">{currentExpert.rating} / 5.0</span>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center bg-white/60 dark:bg-slate-800/60 backdrop-blur-md p-4 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm transition-colors duration-300">
            <div className="bg-purple-100 dark:bg-purple-900/40 p-3 rounded-xl text-purple-600 dark:text-purple-400 mr-4 transition-colors duration-300"><Award size={22} aria-label="Award icon"/></div>
            <div>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest mb-0.5">Escalation Tier</p>
              <p className="text-gray-900 dark:text-gray-100 font-bold text-sm transition-colors duration-300">{tier}</p>
            </div>
          </div>
          <div className="flex items-center bg-white/60 dark:bg-slate-800/60 backdrop-blur-md p-4 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm transition-colors duration-300">
            <div className="bg-green-100 dark:bg-green-900/40 p-3 rounded-xl text-green-600 dark:text-green-400 mr-4 transition-colors duration-300"><CheckCircle2 size={22} aria-label="Checkmark badge"/></div>
            <div>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest mb-0.5">Tickets Resolved</p>
              <p className="text-gray-900 dark:text-gray-100 font-bold text-sm transition-colors duration-300">{cases} Cases Handled</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-4 flex gap-3">
          <a href="tel:+9118001234567" aria-label="Call Expert" className="flex-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-green-200 dark:border-green-900 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/50 font-bold py-4 rounded-xl shadow-sm active:scale-95 transition-all flex justify-center items-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
            <Phone size={18} aria-label="Phone icon" />
            CALL
          </a>
          <button 
            aria-label="Chat with Expert"
            onClick={onChat}
            className="flex-[2] bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-md shadow-blue-200 dark:shadow-none active:scale-95 transition-all flex justify-center items-center gap-2 text-sm border-b-4 border-blue-800 dark:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            <MessageCircle size={18} aria-label="Message bubble icon" />
            CHAT NOW
          </button>
        </div>
      </div>
    </div>
  );
}
