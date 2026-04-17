import React from 'react';
import { Home, Calculator, Radio } from 'lucide-react';
import { ScreenType } from '../hooks/useScreenNavigation';

interface BottomNavProps {
  screen: ScreenType;
  setScreen: (screen: ScreenType) => void;
}

export function BottomNav({ screen, setScreen }: BottomNavProps) {
  if (screen !== 'home' && screen !== 'calculator' && screen !== 'mesh' && screen !== 'gis') {
    return null;
  }

  return (
    <div className="bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center pb-6 transition-colors duration-300">
      <button 
        aria-label="Home Dashboard"
        onClick={() => setScreen('home')} 
        className={`flex flex-col items-center flex-1 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-1 ${screen === 'home' ? 'text-teal-800 dark:text-teal-400' : 'text-gray-400 dark:text-slate-500'}`}
      >
        <Home size={22} className={screen === 'home' ? 'fill-teal-50 dark:fill-teal-900/50' : ''} />
        <span className="text-[10px] font-bold mt-1">Farm</span>
      </button>
      <button 
        aria-label="Input Calculator"
        onClick={() => setScreen('calculator')} 
        className={`flex flex-col items-center flex-1 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-1 ${screen === 'calculator' ? 'text-teal-800 dark:text-teal-400' : 'text-gray-400 dark:text-slate-500'}`}
      >
        <Calculator size={22} className={screen === 'calculator' ? 'fill-teal-50 dark:fill-teal-900/50' : ''} />
        <span className="text-[10px] font-bold mt-1">Inputs</span>
      </button>
      <button 
        aria-label="Mesh Weather"
        onClick={() => setScreen('mesh')} 
        className={`flex flex-col items-center flex-1 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-1 ${screen === 'mesh' ? 'text-teal-800 dark:text-teal-400' : 'text-gray-400 dark:text-slate-500'}`}
      >
        <Radio size={22} className={screen === 'mesh' ? 'fill-teal-50 dark:fill-teal-900/50' : ''} />
        <span className="text-[10px] font-bold mt-1">Weather</span>
      </button>
    </div>
  );
}
