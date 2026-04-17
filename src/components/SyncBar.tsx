import React from 'react';
import { WifiOff, Database, RefreshCw, CheckCircle2 } from 'lucide-react';

interface SyncBarProps {
  screen: string;
  syncStatus: 'offline' | 'up_to_date' | 'syncing' | 'pending';
  pendingPhotos: number;
}

export function SyncBar({ screen, syncStatus, pendingPhotos }: SyncBarProps) {
  if (screen === 'camera' || screen === 'ussd') return null;

  return (
    <div className="bg-[#f8fafc] dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 px-4 py-2.5 flex justify-between items-center text-[10px] uppercase tracking-wider font-bold z-40 relative shadow-[0_-2px_10px_rgba(0,0,0,0.05)] transition-colors duration-300">
      <span className="text-gray-500 dark:text-slate-400">Cloud Sync</span>
      <div className="flex items-center gap-1.5 transition-all duration-300">
        {syncStatus === 'offline' && <><WifiOff size={12} className="text-gray-400 dark:text-slate-500 opacity-70" aria-label="Offline icon"/> <span className="text-gray-500 dark:text-slate-400">Device Offline</span></>}
        {syncStatus === 'pending' && <><Database size={12} className="text-orange-500 dark:text-orange-400 animate-pulse" aria-label="Database queue icon"/> <span className="text-orange-600 dark:text-orange-400 animate-pulse">{pendingPhotos} In Queue</span></>}
        {syncStatus === 'syncing' && <><RefreshCw size={12} className="text-blue-500 dark:text-blue-400 animate-spin" aria-label="Syncing icon"/> <span className="text-blue-600 dark:text-blue-400 animate-pulse">Syncing...</span></>}
        {syncStatus === 'up_to_date' && <><CheckCircle2 size={12} className="text-green-500 dark:text-teal-400 fade-in" aria-label="Up to date icon"/> <span className="text-green-600 dark:text-teal-400 fade-in">Up to date</span></>}
      </div>
    </div>
  );
}
