import React, { useState, useEffect } from 'react';
import { CheckCircle, WifiOff, RefreshCw, Database } from 'lucide-react';

export function SentView({ onHome, isOffline }: { onHome: () => void, isOffline: boolean }) {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (isOffline) {
      // Delay slightly so the checkmark is seen first
      const timer1 = setTimeout(() => setShowToast(true), 800);
      const timer2 = setTimeout(() => setShowToast(false), 4000);
      return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }
  }, [isOffline]);

  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-[#f0fdf4] fade-in relative">
      <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 text-white shadow-xl border-4 border-white relative ${isOffline ? 'bg-indigo-500 shadow-indigo-200/50' : 'bg-green-500 shadow-green-200/50'}`}>
        {isOffline ? <Database size={40} /> : <CheckCircle size={48} />}
        {isOffline && (
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
            <div className="bg-indigo-500 rounded-full p-1.5">
              <RefreshCw size={14} className="text-white" />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center gap-2 mb-3">
        <h2 className="text-2xl font-bold text-gray-900">
          {isOffline ? 'Saved Securely!' : 'Request Sent!'}
        </h2>
        {isOffline && (
          <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1.5 border border-indigo-100">
            <WifiOff size={12} /> Queued Locally
          </span>
        )}
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-[200px] mt-2">
        {isOffline 
          ? "Payload securely cached in device storage. It will auto-forward the moment internet restores."
          : "An expert has received your photo and will reply shortly."}
      </p>
      
      <button 
        onClick={onHome}
        className="w-full bg-white text-green-700 font-bold py-4 rounded-xl shadow-sm border border-green-200 active:scale-95 transition-transform text-sm"
      >
        RETURN TO DASHBOARD
      </button>

      {/* Temporary Confirmation Toast */}
      <div className={`absolute bottom-28 left-0 right-0 flex justify-center transition-all duration-500 z-50 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="bg-gray-800 text-white text-xs px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 border border-gray-700">
          <Database size={14} className="text-orange-400 animate-pulse" />
          <span>Saved to Secure Local Storage. Awaiting Sync.</span>
        </div>
      </div>
    </div>
  );
}
