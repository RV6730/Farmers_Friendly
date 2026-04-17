import React from 'react';
import { WifiOff, Moon, Sun } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
  isOffline: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function DeviceFrame({ children, isOffline, isDarkMode, toggleDarkMode }: DeviceFrameProps) {
  return (
    <div className="w-full max-w-[380px] h-[800px] bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl relative border-[8px] border-gray-900 overflow-hidden flex flex-col shrink-0 transition-colors duration-300">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-[16px] z-50"></div>
      
      {/* Status Bar */}
      <div className="w-full bg-teal-800 dark:bg-slate-950 text-white pt-6 pb-2 px-6 flex justify-between items-center text-xs font-medium z-40 relative transition-colors duration-300">
        <span>09:41</span>
        <div className="flex items-center gap-2">
          <button onClick={toggleDarkMode} className="mr-2 outline-none focus:ring-1 focus:ring-white rounded-full">
            {isDarkMode ? <Sun size={12} className="text-amber-300" aria-label="Light Mode" /> : <Moon size={12} aria-label="Dark Mode" />}
          </button>
          {isOffline ? (
            <span className="flex items-center gap-1 text-red-200">
              <WifiOff size={12} aria-label="Offline" /> Offline
            </span>
          ) : (
            <span>4G</span>
          )}
          <span>100%</span>
        </div>
      </div>

      {children}
    </div>
  );
}
