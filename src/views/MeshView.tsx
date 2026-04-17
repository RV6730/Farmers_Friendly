import React from 'react';
import { CloudRain, ArrowLeft, Radio, CloudLightning } from 'lucide-react';

// ==============================
// 3. P2P MESH WEATHER
// ==============================
export function MeshView({ onBack, meshConnected }: { onBack: () => void, meshConnected: boolean }) {
  return (
    <div className="bg-slate-50 min-h-full flex flex-col fade-in">
      <div className="p-4 flex items-center gap-3 border-b bg-sky-600 text-white">
        <button onClick={onBack}><ArrowLeft size={24} className="text-sky-100" /></button>
        <h2 className="text-lg font-bold">P2P Mesh Weather</h2>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        {/* Animated Radar */}
        <div className="w-full h-48 bg-sky-900 rounded-2xl relative overflow-hidden mb-6 shadow-inner flex items-center justify-center">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full aspect-square border border-sky-400 rounded-full animate-[ping_3s_linear_infinite]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] aspect-square border border-sky-400 rounded-full animate-[ping_3s_linear_infinite_1s]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20%] aspect-square border-2 border-sky-300 rounded-full"></div>
          </div>
          
          <Radio size={40} className="text-sky-300 relative z-10 animate-pulse" />

          {meshConnected && (
            <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-[0_0_10px_rgba(74,222,128,1)] z-20 tooltip">
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold bg-white text-gray-900 px-2 py-0.5 rounded shadow">Ramesh</span>
            </div>
          )}
        </div>

        {!meshConnected ? (
          <div className="bg-white border rounded-xl p-5 text-center flex-1 flex flex-col items-center justify-center text-gray-500">
            <CloudRain size={32} className="mb-3 text-gray-300" />
            <h3 className="font-bold text-gray-700 mb-1">Scanning Neighborhood...</h3>
            <p className="text-sm leading-relaxed max-w-[250px]">Searching for nearby Bluetooth or Wi-Fi Direct devices that recently downloaded internet weather data.</p>
          </div>
        ) : (
          <div className="flex-1 fade-in space-y-4">
            <div className="bg-green-50 border border-green-200 p-3 rounded-xl flex items-center gap-3">
              <div className="bg-green-500 w-2 h-2 rounded-full animate-pulse"></div>
              <div>
                <p className="text-xs font-bold text-green-900">Connected to Ramesh</p>
                <p className="text-[10px] text-green-700">Received 24kb localized weather payload</p>
              </div>
            </div>

            <div className="bg-white border border-red-200 rounded-2xl p-5 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-100 rounded-bl-full flex items-start justify-end p-2">
                <CloudLightning size={20} className="text-red-500" />
              </div>
              <h3 className="font-black text-red-700 text-lg mb-1">STORM ALERT</h3>
              <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide">Micro-climate detected locally</p>
              <p className="text-sm text-gray-800 leading-relaxed mb-4">
                Heavy unseasonal shower expected in your exact village radius tomorrow between 4 PM and 6 PM.
              </p>
              <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                <p className="text-sm font-bold text-red-900 font-sans">
                  Recommendation: Delay spraying any expensive fertilizer. It will wash away.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
