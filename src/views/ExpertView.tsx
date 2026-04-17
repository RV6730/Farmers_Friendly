import React from 'react';
import { ArrowLeft, CheckCircle2, Phone, Star, Award, MessageCircle } from 'lucide-react';

// ==============================
// 6. EXPERT PROFILE VIEW
// ==============================
export function ExpertView({ onBack, onChat }: { onBack: () => void, onChat: () => void }) {
  return (
    <div className="bg-slate-50 min-h-full flex flex-col fade-in">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b pt-8">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full active:bg-gray-100 transition-colors"><ArrowLeft size={24} className="text-gray-700" /></button>
          <h2 className="text-lg font-bold text-gray-900">Assigned Expert</h2>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center mb-6 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4 text-3xl font-bold border-4 border-white shadow-md relative z-10">
            Dr. S
          </div>
          <h2 className="text-2xl font-bold text-gray-900 relative z-10">Dr. Suresh Kumar</h2>
          <p className="text-blue-600 font-medium text-sm mt-1 relative z-10">Wheat Pathology Specialist</p>
          <div className="flex items-center gap-2 mt-4 bg-yellow-50 px-4 py-1.5 rounded-full border border-yellow-100 relative z-10">
            <Star className="text-yellow-500 fill-yellow-500" size={16} />
            <span className="text-yellow-700 font-bold text-sm tracking-wide">4.92 / 5.0</span>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="bg-purple-100 p-3 rounded-xl text-purple-600 mr-4"><Award size={22}/></div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Escalation Tier</p>
              <p className="text-gray-900 font-bold text-sm">Tier 1 (Gov / Free)</p>
            </div>
          </div>
          <div className="flex items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="bg-green-100 p-3 rounded-xl text-green-600 mr-4"><CheckCircle2 size={22}/></div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Tickets Resolved</p>
              <p className="text-gray-900 font-bold text-sm">842 Cases Handled</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-4 flex gap-3">
          <a href="tel:+9118001234567" className="flex-1 bg-white border-2 border-green-200 text-green-700 hover:bg-green-50 font-bold py-4 rounded-xl shadow-sm active:scale-95 transition-all flex justify-center items-center gap-2 text-sm">
            <Phone size={18} />
            CALL
          </a>
          <button 
            onClick={onChat}
            className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md shadow-blue-200 active:scale-95 transition-all flex justify-center items-center gap-2 text-sm border-b-4 border-blue-800"
          >
            <MessageCircle size={18} />
            CHAT NOW
          </button>
        </div>
      </div>
    </div>
  );
}
