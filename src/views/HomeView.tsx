import React from 'react';
import { Camera, MapPin, WifiOff, Calculator, Radio, Hash, Droplet, Zap, ArrowRight, Search, Users, Mic } from 'lucide-react';

// ==============================
// 1. HOME DASHBOARD
// ==============================
export function HomeView({ setScreen, isOffline }: { setScreen: (s: any) => void, isOffline: boolean }) {
  return (
    <div className="p-5">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Namaste, Ram 👋</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1 transition-colors duration-300">
            <MapPin size={14} aria-label="Location" /> Pune District
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center text-teal-700 dark:text-teal-300 shadow-sm active:scale-95 transition-all outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Voice Input Assistant"
            title="Voice Assistant"
          >
            <Mic size={22} />
          </button>
          <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center text-amber-700 dark:text-amber-300 font-bold text-xl relative">
            R
            {isOffline && <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-900 rounded-full p-0.5"><WifiOff size={14} className="text-orange-500 dark:text-orange-400" aria-label="Offline" /></div>}
          </div>
        </div>
      </div>

      {/* Active Ticket Alert */}
      <button 
        aria-label="View Active Ticket"
        onClick={() => setScreen('expert')}
        className="w-full text-left mb-5 bg-white dark:bg-slate-800 border border-teal-200 dark:border-teal-900/50 rounded-2xl p-4 shadow-sm relative overflow-hidden active:scale-95 transition-all block focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        <div className="absolute top-0 left-0 w-1.5 h-full bg-orange-500"></div>
        <div className="flex justify-between items-center pl-2">
          <div>
            <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest block mb-1">Ticket Updated</span>
            <h3 className="font-bold text-gray-900 dark:text-white text-sm">Expert Assigned: Leaf Rust</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Dr. Suresh has reviewed your payload.</p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-400 p-2 rounded-full border border-orange-100 dark:border-orange-900">
            <ArrowRight size={16} aria-label="Go to ticket" />
          </div>
        </div>
      </button>

      <div className="grid grid-cols-2 gap-3">
        {/* Core AI Triage */}
        <button 
          aria-label="Crop Disease Scan"
          onClick={() => setScreen('camera')}
          className="col-span-2 bg-teal-800 dark:bg-teal-900 rounded-2xl p-5 text-white text-left shadow-lg relative overflow-hidden active:scale-95 transition-all outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-700 dark:bg-teal-800 rounded-full blur-2xl -mr-10 -mt-10 opacity-50"></div>
          <Camera size={28} className="mb-3 relative z-10" aria-label="Camera icon" />
          <h2 className="text-lg font-bold text-white mb-1 relative z-10">Crop Disease Scan</h2>
          <p className="text-teal-100 dark:text-teal-200 text-xs relative z-10">Works fully offline using local Edge AI models.</p>
        </button>

        {/* Offline Input Calculator */}
        <button 
          aria-label="Input Saver Calculator"
          onClick={() => setScreen('calculator')}
          className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-4 text-left shadow-sm active:scale-95 transition-all group relative outline-none focus:ring-2 focus:ring-amber-500"
        >
          <div className="bg-amber-100 dark:bg-amber-900 w-10 h-10 rounded-full flex items-center justify-center text-amber-700 dark:text-amber-400 mb-3">
            <Droplet size={20} aria-label="Droplet icon" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight mb-1">Input Saver Calculator</h3>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-2">Calculate minimum fertilizer to save money.</p>
          
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-[10px] w-48 p-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50 text-center shadow-lg">
            Use Edge ML models to optimize input costs entirely offline.
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45"></div>
          </div>
        </button>

        {/* P2P Mesh Weather */}
        <button 
          aria-label="P2P Mesh Weather"
          onClick={() => setScreen('mesh')}
          className="bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-900/50 rounded-2xl p-4 text-left shadow-sm active:scale-95 transition-all group relative outline-none focus:ring-2 focus:ring-sky-500"
        >
          <div className="bg-sky-100 dark:bg-sky-900 w-10 h-10 rounded-full flex items-center justify-center text-sky-700 dark:text-sky-400 mb-3">
            <Radio size={20} aria-label="Radio node icon" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight mb-1">P2P Mesh Weather</h3>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-2">Get weather from neighbors without internet.</p>
          
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-[10px] w-48 p-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50 text-center shadow-lg">
            Scan local Bluetooth/WiFi Direct meshes to sync weather from peers.
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45"></div>
          </div>
        </button>

        {/* Expert Directory */}
        <button 
          aria-label="Find an Expert"
          onClick={() => setScreen('expertDirectory')}
          className="col-span-2 bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-900 rounded-2xl p-4 text-left shadow-sm flex items-center gap-3 active:scale-95 transition-all outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full text-indigo-700 dark:text-indigo-400">
            <Users size={20} aria-label="Users icon" />
          </div>
          <div>
            <h3 className="font-bold text-indigo-900 dark:text-indigo-100 text-sm leading-tight mb-0.5">Find an Expert</h3>
            <p className="text-[10px] text-indigo-700/70 dark:text-indigo-400/70 line-clamp-1">Search the local registry for agronomists.</p>
          </div>
        </button>

        {/* USSD Market Shield */}
        <button 
          aria-label="USSD Market Shield"
          onClick={() => setScreen('ussd')}
          className="col-span-2 bg-slate-800 dark:bg-slate-950 rounded-2xl p-4 text-left shadow-md flex items-center justify-between active:scale-95 transition-all outline-none focus:ring-2 focus:ring-slate-500"
        >
          <div>
            <h3 className="font-bold text-emerald-400 text-base mb-1 flex items-center gap-2">
              <Hash size={16} aria-label="Hash icon" /> USSD Market Shield
            </h3>
            <p className="text-slate-300 text-xs max-w-[200px]">Dial direct codes to check real Mandi prices offline.</p>
          </div>
          <div className="bg-slate-700 p-3 rounded-full text-white">
            <Zap size={20} className="fill-current text-amber-400" aria-label="Lightning bolt icon" />
          </div>
        </button>
      </div>
    </div>
  );
}
