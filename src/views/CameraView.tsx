import React, { useState } from 'react';
import { Camera, Image as ImageIcon, ArrowLeft, Database } from 'lucide-react';

// ==============================
// 5. CAMERA & RESULT SHARED (from previous step)
// ==============================
export function CameraView({ onCapture, onBack }: { onCapture: () => void, onBack: () => void }) {
  const [cropContext, setCropContext] = useState('');
  const [partContext, setPartContext] = useState('');

  return (
    <div className="h-full bg-black flex flex-col fade-in relative">
      <div className="p-4 flex justify-between items-center text-white pt-8 z-30">
        <button onClick={onBack} className="p-2 bg-black/50 rounded-full border border-white/10 backdrop-blur-sm">
          <ArrowLeft size={24} />
        </button>
        <span className="font-medium bg-black/50 px-4 py-1.5 rounded-full border border-white/10 text-sm backdrop-blur-sm">Scan Crop</span>
        <div className="w-10"></div>
      </div>
      
      {/* Optional Context Overlay */}
      <div className="absolute top-24 left-4 right-4 z-20 bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Database size={12} className="text-blue-400"/> Context
          </h3>
          <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-0.5 rounded">Optional</span>
        </div>
        <div className="flex gap-2">
          <select 
            value={cropContext}
            onChange={(e) => setCropContext(e.target.value)}
            className="bg-white/10 text-white border border-white/20 rounded-xl p-2.5 text-sm flex-1 outline-none appearance-none font-medium"
          >
            <option value="" className="text-black">Select Crop...</option>
            <option value="wheat" className="text-black">Wheat</option>
            <option value="rice" className="text-black">Rice</option>
            <option value="cotton" className="text-black">Cotton</option>
          </select>
          <select 
            value={partContext}
            onChange={(e) => setPartContext(e.target.value)}
            className="bg-white/10 text-white border border-white/20 rounded-xl p-2.5 text-sm flex-1 outline-none appearance-none font-medium"
          >
            <option value="" className="text-black">Plant Part...</option>
            <option value="leaf" className="text-black">Leaf</option>
            <option value="stem" className="text-black">Stem</option>
            <option value="fruit" className="text-black">Fruit/Crop</option>
          </select>
        </div>
        <p className="text-white/50 text-[10px] mt-3 leading-tight font-medium">Skipping these? No problem. The Edge AI will fallback to pure visual analysis.</p>
      </div>

      <div className="flex-1 relative flex items-center justify-center">
        <div className="w-64 h-64 border-2 border-white/30 relative">
          <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-green-500"></div>
          <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-green-500"></div>
          <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-green-500"></div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-green-500"></div>
        </div>
        <img 
          src="https://picsum.photos/seed/leaf15/400/600" 
          alt="Camera view" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none" 
        />
        <div className="absolute bottom-10 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-black backdrop-blur-sm">
          Point closely at the sick leaf
        </div>
      </div>

      <div className="bg-[#0a0a0a] pb-12 pt-6 flex justify-center items-center gap-8 px-8 border-t border-gray-900">
        <ImageIcon className="text-white/40" size={32} />
        <button 
          onClick={onCapture}
          className="w-20 h-20 bg-transparent border-4 border-white/80 rounded-full flex items-center justify-center focus:outline-none shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 transition-transform"
        >
          <div className="w-16 h-16 bg-white rounded-full"></div>
        </button>
        <div className="w-8"></div>
      </div>
    </div>
  );
}
