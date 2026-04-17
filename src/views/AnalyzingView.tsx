import React from 'react';
import { Camera, Database } from 'lucide-react';

export function AnalyzingView() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-white fade-in">
      <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center mb-6 relative shadow-inner">
        <div className="absolute inset-0 border-4 border-green-100 border-t-green-600 rounded-full animate-spin"></div>
        <Camera size={48} className="text-green-600 drop-shadow-md" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing...</h2>
      <p className="text-gray-500 text-sm max-w-[200px]">Checking crop for diseases using Edge ML.</p>
      <div className="bg-green-100 border border-green-200 text-green-800 px-4 py-1.5 rounded-full mt-8 font-medium text-xs flex items-center gap-2">
        <Database size={14} /> Processed locally offline
      </div>
    </div>
  );
}
