import React from 'react';
import { AlertCircle, ArrowLeft, Send, Database, CheckCircle2, Beaker, Sprout } from 'lucide-react';

export function ResultView({ onAskExpert, onBack, isOffline, scanType = 'crop' }: { onAskExpert: () => void, onBack: () => void, isOffline: boolean, scanType?: 'crop' | 'soil' }) {
  if (scanType === 'soil') {
    return (
      <div className="min-h-full bg-gradient-to-br from-gray-50 to-amber-50 dark:from-slate-900 dark:to-orange-950 flex flex-col transition-colors duration-300">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 py-4 flex items-center gap-3 border-b border-gray-200 dark:border-slate-800 pt-8 sticky top-0 z-10">
          <button onClick={onBack} aria-label="Go Back" className="p-2 -ml-2 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500">
            <ArrowLeft size={24} className="text-gray-700 dark:text-gray-300" aria-label="Back arrow" />
          </button>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Soil Nutrient Report</h2>
        </div>

        <div className="p-5 flex-1 relative z-0">
          <div className="flex gap-3 mb-5">
            <div className="flex-1">
              <p className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 mb-1">Your Soil</p>
              <img 
                src="https://picsum.photos/seed/soil4/200/200" 
                alt="Scanned soil" 
                className="w-full h-32 object-cover rounded-2xl shadow-sm border border-white/50 dark:border-slate-700/50"
              />
            </div>
            <div className="flex-1">
              <p className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-500 mb-1">Ideal Dataset</p>
              <img 
                src="https://picsum.photos/seed/ideal_soil/200/200" 
                alt="Ideal soil reference" 
                className="w-full h-32 object-cover rounded-2xl shadow-sm border-2 border-amber-300 dark:border-amber-600/50"
              />
            </div>
          </div>

          {/* Glassmorphism Card */}
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border text-center p-6 rounded-[24px] shadow-lg mb-6 border-white/60 dark:border-slate-700/60 relative overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
             <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner ring-1 ring-green-400/20">
               <Sprout size={28} aria-label="Sprout icon" />
             </div>
             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1.5 tracking-tight">Nitrogen Deficient</h3>
             <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">Image comparison reveals pale, sandy topsoil. AI Match: 88%.</p>
          </div>

          <div className="bg-amber-50/80 dark:bg-amber-900/20 backdrop-blur-md border border-amber-200 dark:border-amber-800/40 rounded-[24px] p-5 mb-6 shadow-sm">
            <h4 className="font-bold text-amber-900 dark:text-amber-200 mb-4 text-base flex items-center gap-2">
              <Beaker size={18} /> Estimated NPK Levels
            </h4>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1 font-medium text-gray-700 dark:text-gray-300">
                  <span>Nitrogen (N) - Low</span>
                  <span>140 kg/ha</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1 font-medium text-gray-700 dark:text-gray-300">
                  <span>Phosphorus (P) - Optimal</span>
                  <span>22 kg/ha</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1 font-medium text-gray-700 dark:text-gray-300">
                  <span>Potassium (K) - High</span>
                  <span>240 kg/ha</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-amber-800 dark:text-amber-300 mt-5 pt-4 border-t border-amber-200 dark:border-amber-800/50">
              * Based on visual dataset cross-referencing. For exact figures, send samples to a lab.
            </p>
          </div>

        </div>
      </div>
    );
  }

  // CROP DISEASE SCAN MODE
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
