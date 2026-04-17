import React from 'react';
import { AlertCircle, ArrowLeft, Send, Database } from 'lucide-react';

export function ResultView({ onAskExpert, onBack, isOffline }: { onAskExpert: () => void, onBack: () => void, isOffline: boolean }) {
  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50 to-teal-100 dark:from-slate-900 dark:to-teal-950 flex flex-col transition-colors duration-300">
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 py-4 flex items-center gap-3 border-b border-gray-200 dark:border-slate-800 pt-8 sticky top-0 z-10">
        <button onClick={onBack} aria-label="Go Back" className="p-2 -ml-2 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500">
          <ArrowLeft size={24} className="text-gray-700 dark:text-gray-300" aria-label="Back arrow" />
        </button>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Disease Report</h2>
      </div>

      <div className="p-5 flex-1 relative z-0">
        <img 
          src="https://picsum.photos/seed/leaf15/400/300" 
          alt="Scanned leaf with detected spots" 
          className="w-full h-48 object-cover rounded-2xl mb-5 shadow-sm border border-white/50 dark:border-slate-700/50"
        />

        {/* Glassmorphism Card */}
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border text-center p-6 rounded-[24px] shadow-lg mb-6 border-white/60 dark:border-slate-700/60 relative overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
           <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/50 dark:to-orange-800/50 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner ring-1 ring-orange-400/20">
             <AlertCircle size={28} aria-label="Alert icon" />
           </div>
           <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1.5 tracking-tight">Possibly: Leaf Rust</h3>
           <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">Abnormal spots detected. AI Confidence: 72%.</p>
        </div>

        <div className="bg-blue-50/80 dark:bg-blue-900/40 backdrop-blur-md border border-blue-200 dark:border-blue-800/60 rounded-[24px] p-6 mb-6 shadow-sm">
          <h4 className="font-bold text-blue-900 dark:text-blue-200 mb-2 text-base">Inconclusive Result</h4>
          <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed mb-5">
            To prevent misdiagnosis, please escalate this to a local Govt Agronomist.
          </p>
          <button 
            aria-label="Send photo to government expert"
            onClick={onAskExpert}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            <Send size={18} aria-label="Send icon" />
            SEND TO GOVT EXPERT
          </button>
          
          {isOffline && (
            <p className="text-xs text-center text-blue-700/80 dark:text-blue-300/80 mt-4 font-medium flex items-center justify-center gap-1.5">
              <Database size={12} aria-label="Database icon" /> Will queue to Local Device Storage
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
