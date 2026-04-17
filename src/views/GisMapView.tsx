import React from 'react';
import { ArrowLeft, Map, Layers, WifiOff, TestTube, Sprout, AlertTriangle, ArrowRight, Calculator } from 'lucide-react';
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default leafet markers in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// A sample polygon simulating farm bounds in Pune/Maharashtra region
const farmPlotCoords: [number, number][] = [
  [18.521, 73.854],
  [18.521, 73.858],
  [18.517, 73.858],
  [18.517, 73.854],
];
const centerPos: [number, number] = [18.519, 73.856];

// Recharts Data (Realistic Soil Health Card values in kg/ha)
const npkData = [
  { name: 'Nitrogen (N)', Current: 180, Optimal: 320 },
  { name: 'Phosphorus (P)', Current: 42, Optimal: 40 },
  { name: 'Potassium (K)', Current: 210, Optimal: 150 },
];

export function GisMapView({ onBack, setScreen, isOffline }: { onBack: () => void; setScreen: (s: any) => void; isOffline: boolean }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-full flex flex-col fade-in transition-colors duration-300">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-gray-200 dark:border-slate-800 pt-8 sticky top-0 z-50 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <button onClick={onBack} aria-label="Go Back" className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors">
            <ArrowLeft size={24} className="text-gray-700 dark:text-gray-300" />
          </button>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Map size={20} className="text-teal-600 dark:text-teal-400" />
            Land & Soil Intelligence
          </h2>
        </div>
      </div>

      <div className="flex-1 relative isolate bg-slate-200 dark:bg-slate-800 flex flex-col">
        {/* Map Container Takes Up Top Half */}
        <div className="relative h-[40%] min-h-[250px] w-full z-10 shrink-0">
          <MapContainer 
            center={centerPos} 
            zoom={15} 
            style={{ height: '100%', width: '100%', position: 'absolute', inset: 0 }}
            zoomControl={false}
          >
            {/* Esri World Imagery (Satellite) */}
            <TileLayer
              attribution='&copy; Esri'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
            
            <Polygon 
              positions={farmPlotCoords} 
              pathOptions={{ color: '#0f766e', fillColor: '#14b8a6', fillOpacity: 0.4, weight: 3 }} 
            />
            
            <Marker position={centerPos}>
              <Popup>
                <div className="text-center font-sans">
                  <span className="font-bold text-gray-900">Plot #482</span><br/>
                  <span className="text-gray-600 text-xs">Black Cotton Soil Zone</span>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
          
          <div className="absolute top-4 right-4 z-40 flex flex-col gap-2">
            <button aria-label="Toggle Layers" className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500">
              <Layers size={20} />
            </button>
          </div>
        </div>

        {/* Bottom context data panel (Scrollable) */}
        <div className="flex-1 bg-white dark:bg-slate-900 z-50 rounded-t-[32px] -mt-6 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] overflow-y-auto no-scrollbar relative border-t border-gray-200 dark:border-slate-800 pb-20">
          <div className="w-12 h-1.5 bg-gray-300 dark:bg-slate-700 rounded-full mx-auto mt-4 mb-2"></div>
          
          <div className="px-5 pt-2 pb-6 space-y-6">
            
            {/* 1. Header & Soil Type */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-black text-xl text-gray-900 dark:text-white leading-tight">MahaBhulekh DB</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Pune District • Zone 4B</p>
              </div>
              {isOffline ? (
                <span className="bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-200 dark:border-amber-800/50 flex items-center gap-1">
                  <WifiOff size={10} /> Cached
                </span>
              ) : (
                <span className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-1 shadow-inner">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Live
                </span>
              )}
            </div>

            {/* 2. Soil Analysis Metrics */}
            <section>
              <h4 className="flex items-center gap-2 text-sm font-bold text-teal-800 dark:text-teal-400 mb-3 uppercase tracking-widest">
                <TestTube size={16} /> Soil Composition
              </h4>
              <div className="bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-2xl p-4">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Predominant Type</p>
                    <p className="text-base font-bold text-gray-900 dark:text-white">Black Soil (Regur)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">pH Level</p>
                    <p className="text-base font-bold text-gray-900 dark:text-white">7.2 <span className="text-green-500 text-xs font-normal border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/30 px-1.5 py-0.5 rounded">Optimal</span></p>
                  </div>
                </div>
                
                {/* NPK Bar Details using Recharts */}
                <div className="h-48 mt-4 -ml-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={npkData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} className="stroke-gray-200 dark:stroke-gray-700" />
                      <XAxis type="number" hide />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fill: '#64748b' }} 
                        width={80}
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                        labelStyle={{ fontSize: '10px', color: '#64748b', marginBottom: '4px' }}
                      />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                      <Bar dataKey="Current" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={12} />
                      <Bar dataKey="Optimal" fill="#10b981" radius={[0, 4, 4, 0]} barSize={12} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            {/* 3. Crop Recommendations Data */}
            <section>
              <h4 className="flex items-center gap-2 text-sm font-bold text-green-800 dark:text-green-400 mb-3 uppercase tracking-widest">
                <Sprout size={16} /> Regional Suitability
              </h4>
              <div className="space-y-3 mb-3">
                
                {/* Sorghum */}
                <div className="bg-white dark:bg-slate-800/80 border border-green-100 dark:border-green-900/30 rounded-2xl p-3 flex items-center justify-between shadow-sm transition-all hover:shadow-md hover:border-green-200 dark:hover:border-green-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/40 flex items-center justify-center text-lg shadow-inner ring-1 ring-emerald-100 dark:ring-emerald-800">
                      🌾
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-900 dark:text-white block uppercase tracking-wide">Sorghum (Jowar)</span>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">Optimal pH Match</span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">92%</span>
                    <div className="w-16 h-1.5 bg-gray-100 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                </div>

                {/* Sugarcane */}
                <div className="bg-white dark:bg-slate-800/80 border border-teal-100 dark:border-teal-900/30 rounded-2xl p-3 flex items-center justify-between shadow-sm transition-all hover:shadow-md hover:border-teal-200 dark:hover:border-teal-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-900/40 flex items-center justify-center text-lg shadow-inner ring-1 ring-teal-100 dark:ring-teal-800">
                      🎋
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-900 dark:text-white block uppercase tracking-wide">Sugarcane</span>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">High K Tolerance</span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="text-sm font-black text-teal-600 dark:text-teal-400">88%</span>
                    <div className="w-16 h-1.5 bg-gray-100 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                      <div className="bg-teal-500 h-full rounded-full" style={{width: '88%'}}></div>
                    </div>
                  </div>
                </div>

                {/* Cotton */}
                <div className="bg-white dark:bg-slate-800/80 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl p-3 flex items-center justify-between shadow-sm transition-all hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center text-lg shadow-inner ring-1 ring-indigo-100 dark:ring-indigo-800">
                      ☁️
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-900 dark:text-white block uppercase tracking-wide">Cotton (Kapas)</span>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">Black Soil Native</span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">85%</span>
                    <div className="w-16 h-1.5 bg-gray-100 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* 4. Actionable Resolutions */}
            <section>
              <h4 className="flex items-center gap-2 text-sm font-bold text-amber-800 dark:text-amber-400 mb-3 uppercase tracking-widest">
                <AlertTriangle size={16} /> Data-Driven Actions
              </h4>
              
              <button 
                onClick={() => setScreen('calculator')}
                className="w-full text-left bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-4 shadow-sm relative overflow-hidden active:scale-95 transition-all flex items-center justify-between mb-3 group focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-lg text-amber-700 dark:text-amber-400 shrink-0">
                    <Calculator size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 dark:text-white text-sm">Fix Nitrogen Deficit</h5>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 leading-tight">Use the Input Saver to calculate exact Urea needed for this plot's low Nitrogen levels.</p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-amber-500 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={() => setScreen('expertDirectory')}
                className="w-full text-left bg-white dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 rounded-2xl p-4 shadow-sm relative overflow-hidden active:scale-95 transition-all flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg text-indigo-600 dark:text-indigo-400 shrink-0">
                    <Sprout size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 dark:text-white text-sm">Consult Soil Experts</h5>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 leading-tight">Find an agronomist familiar with Black Soil properties in the Pune district.</p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-indigo-400 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
