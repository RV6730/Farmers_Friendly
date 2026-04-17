import React, { useState } from 'react';
import { ArrowLeft, Delete, Phone } from 'lucide-react';

// ==============================
// 4. USSD MARKET SHIELD
// ==============================
export function UssdView({ onBack }: { onBack: () => void }) {
  const [ussdText, setUssdText] = useState('');
  const [ussdScreen, setUssdScreen] = useState<'idle' | 'menu' | 'prices'>('idle');

  const handleDial = (char: string) => {
    if (ussdText.length < 15) setUssdText(prev => prev + char);
  };

  const handleCall = () => {
    if (ussdScreen === 'idle' && ussdText === '*123#') {
      setUssdScreen('menu');
      setUssdText('');
    } else if (ussdScreen === 'menu' && ussdText === '1') {
      setUssdScreen('prices');
      setUssdText('');
    } else if (ussdScreen === 'prices') {
      setUssdScreen('idle');
      setUssdText('');
    }
  };

  const handleDelete = () => {
    setUssdText(prev => prev.slice(0, -1));
  };

  return (
    <div className="bg-[#121212] min-h-full flex flex-col font-mono text-green-500 relative">
      <button onClick={onBack} className="absolute z-10 top-6 left-4 p-2 bg-gray-800/50 rounded-full text-green-400 border border-green-900/30">
        <ArrowLeft size={20} />
      </button>

      {/* Retro Phone Screen Area */}
      <div className="flex-1 bg-[#1a1a1a] border-b-4 border-[#0a0a0a] flex items-center justify-center p-6 relative">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,0,0.05)_2px,rgba(0,255,0,0.05)_4px)] pointer-events-none"></div>
        
        {ussdScreen === 'idle' && (
           <div className="text-center w-full">
             <div className="text-green-600 text-xs mb-8 uppercase tracking-widest font-bold">Network: Offline Mode</div>
             <div className="text-3xl font-black tracking-widest text-green-400 h-10 break-all">{ussdText || ''}</div>
             {!ussdText && <div className="text-green-800 text-sm mt-4 animate-pulse">Dial *123# for Mandi Prices</div>}
           </div>
        )}

        {ussdScreen === 'menu' && (
          <div className="w-full text-left uppercase text-sm leading-loose">
            <h3 className="border-b border-green-800 pb-1 mb-2 font-bold text-green-400">Fasal-Neeti Markets</h3>
            <p>1. Local Mandi Prices</p>
            <p className="text-green-800">2. FPO Contacts (Disabled)</p>
            <p className="text-green-800">3. My Profile</p>
            <div className="mt-6 flex items-center gap-2">
              <span className="text-green-600">Reply:</span>
              <span className="font-bold text-xl">{ussdText}</span><span className="animate-pulse">_</span>
            </div>
          </div>
        )}

        {ussdScreen === 'prices' && (
          <div className="w-full text-left uppercase text-sm leading-relaxed">
            <h3 className="border-b border-green-800 pb-1 mb-3 font-bold text-green-400">Pune Mandi (Today)</h3>
            <div className="bg-green-900/20 p-2 rounded border border-green-800/50 mb-2">
              <span className="opacity-70 text-xs block mb-1">Wheat (Lokwan)</span>
              <span className="font-bold text-lg">₹ 2,450 / Quintal</span>
            </div>
            <div className="bg-green-900/20 p-2 rounded border border-green-800/50">
              <span className="opacity-70 text-xs block mb-1">Onion (Red)</span>
              <span className="font-bold text-lg">₹ 1,820 / Quintal</span>
            </div>
            <p className="text-[10px] text-green-700 mt-6 leading-tight">Data synced 2 hrs ago via SMS fallback channel.</p>
            <p className="text-xs text-green-500 mt-4 text-center cursor-pointer" onClick={handleCall}>Press SEND to Exit</p>
          </div>
        )}
      </div>

      {/* Dialer Padding */}
      <div className="bg-black pt-4 pb-8 px-6 drop-shadow-[0_-10px_20px_rgba(0,0,0,0.5)] z-10">
        <div className="grid grid-cols-3 gap-3">
          {['1','2','3','4','5','6','7','8','9','*','0','#'].map((char) => (
            <button 
              key={char} 
              onClick={() => handleDial(char)}
              className="bg-gray-900 border-b-4 border-gray-950 active:border-b-0 active:translate-y-1 text-green-500 text-2xl font-bold py-4 rounded-xl flex flex-col flex-1 items-center justify-center transition-all shadow-[0_0_15px_rgba(0,100,0,0.1)] focus:outline-none"
            >
              {char}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="col-span-1"></div>
          <button 
            onClick={handleCall}
            className="bg-green-700 border-b-4 border-green-900 active:border-b-0 active:translate-y-1 text-white py-4 rounded-2xl flex items-center justify-center transition-all shadow-lg focus:outline-none font-sans font-bold"
          >
            <Phone className="fill-white" size={24} />
          </button>
          <button 
            onClick={handleDelete}
            className="text-gray-500 border-b-4 border-black active:border-b-0 active:translate-y-1 py-4 rounded-2xl flex items-center justify-center transition-all focus:outline-none"
          >
            <Delete size={28} />
          </button>
        </div>
      </div>
    </div>
  );
}
