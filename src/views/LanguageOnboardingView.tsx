import React from 'react';
import { Check, Languages, ArrowRight, Sparkles } from 'lucide-react';

export function LanguageOnboardingView({ language, setLanguage, onComplete }: { language: string, setLanguage: (l: string) => void, onComplete: () => void }) {
  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-full fade-in flex flex-col transition-colors duration-300">
      <div className="px-6 pt-16 pb-6">
        <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/40 rounded-[20px] flex items-center justify-center mb-6 shadow-sm">
          <Languages size={32} className="text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
          Pick your language
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Our localized LLM reasoning will continuously translate expert advice, forms, and crop data for you.
        </p>
      </div>

      <div className="flex-1 px-6 pb-8 flex flex-col space-y-6">
        <div className="space-y-3 flex-1">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${language === lang.code ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 dark:border-indigo-500 shadow-md shadow-indigo-500/10' : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 shadow-sm'}`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl bg-gray-50 dark:bg-slate-700 w-12 h-12 flex items-center justify-center rounded-xl">{lang.native.charAt(0)}</span>
                <div className="text-left">
                  <p className={`text-base font-bold ${language === lang.code ? 'text-indigo-900 dark:text-indigo-100' : 'text-gray-900 dark:text-gray-100'}`}>{lang.native}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium mt-0.5">{lang.name}</p>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${language === lang.code ? 'bg-indigo-500 text-white' : 'bg-gray-100 dark:bg-slate-700 text-transparent'}`}>
                {language === lang.code && <Check size={14} strokeWidth={3} />}
              </div>
            </button>
          ))}
        </div>

        <div className="pt-4">
          <button
            onClick={onComplete}
            className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-4 px-6 rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all active:scale-[0.98]"
          >
            <span>Let's get started</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
