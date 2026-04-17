import React, { useState } from 'react';
import { ArrowLeft, Languages, Bell, Sparkles, Smartphone, Check } from 'lucide-react';

export function SettingsView({ onBack, isOffline, language, setLanguage }: { onBack: () => void, isOffline: boolean, language: string, setLanguage: (l: string) => void }) {
  const [offlineNotifications, setOfflineNotifications] = useState(true);

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-full fade-in pb-10 transition-colors duration-300">
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-gray-200 dark:border-slate-800 pt-8 sticky top-0 z-10 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <button onClick={onBack} aria-label="Go Back" className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors">
            <ArrowLeft size={24} className="text-gray-700 dark:text-gray-300" />
          </button>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Settings</h2>
        </div>
      </div>

      <div className="p-5 space-y-6">
        
        {/* LLM Language Engine Section */}
        <section>
          <h3 className="text-sm font-bold text-teal-800 dark:text-teal-400 mb-3 flex items-center gap-2 uppercase tracking-widest">
            <Languages size={16} /> Language Engine
          </h3>
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-4 shadow-sm transition-colors duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Gemini Native Translation</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mr-4">LLMs dynamically translate colloquial farming terms accurately into local dialects.</p>
              </div>
              <div className="bg-indigo-100 dark:bg-indigo-900/40 p-2 rounded-full text-indigo-600 dark:text-indigo-400">
                <Sparkles size={16} />
              </div>
            </div>

            <div className="space-y-2">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${language === lang.code ? 'bg-teal-50 dark:bg-teal-900/30 border-teal-500 dark:border-teal-500' : 'bg-transparent border-gray-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-700'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lang.native.charAt(0)}</span>
                    <div className="text-left">
                      <p className={`text-sm font-bold ${language === lang.code ? 'text-teal-900 dark:text-teal-100' : 'text-gray-700 dark:text-gray-300'}`}>{lang.native}</p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-500 uppercase">{lang.name}</p>
                    </div>
                  </div>
                  {language === lang.code && <Check size={18} className="text-teal-600 dark:text-teal-400" />}
                </button>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 rounded-xl flex items-start gap-2">
              <Sparkles size={14} className="text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <p className="text-[10px] text-indigo-800 dark:text-indigo-300/80 leading-tight">
                All forms, crop anomaly data, and expert chat logs will be continuously translated to {languages.find(l => l.code === language)?.native || 'English'} using localized LLM reasoning.
              </p>
            </div>
          </div>
        </section>

        {/* Offline Fallback Notifications */}
        <section>
          <h3 className="text-sm font-bold text-amber-800 dark:text-amber-400 mb-3 flex items-center gap-2 uppercase tracking-widest">
            <Bell size={16} /> Notification Routing
          </h3>
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm transition-colors duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Smartphone size={18} className="text-amber-600 dark:text-amber-500" />
                <p className="text-sm font-bold text-gray-900 dark:text-white">Offline SMS/USSD Fallback</p>
              </div>
              <button 
                onClick={() => setOfflineNotifications(!offlineNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 ${offlineNotifications ? 'bg-amber-500' : 'bg-gray-300 dark:bg-slate-700'}`}
                aria-label="Toggle Offline SMS Fallback"
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${offlineNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
              When disconnected from cellular data, critical alerts (Mandi prices, Extreme Weather, Expert Replies) will be routed to your phone via standard SMS texts or USSD popups.
            </p>
            
            {offlineNotifications ? (
              <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 p-3 rounded-xl text-[10px] text-amber-800 dark:text-amber-300/80">
                ✅ <strong>Active:</strong> Standard carrier charges may apply if your peers transmit emergency mesh data to your device via SMS gateway.
              </div>
            ) : (
              <div className="bg-gray-100 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 p-3 rounded-xl text-[10px] text-gray-600 dark:text-gray-400">
                ❌ <strong>Disabled:</strong> You will only receive critical alerts when connected to 3G/4G/Wifi.
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
