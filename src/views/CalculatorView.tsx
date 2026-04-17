import React, { useState } from 'react';
import { ArrowLeft, RefreshCw, Calculator, ShieldAlert } from 'lucide-react';

// ==============================
// 2. OFFLINE INPUT CALCULATOR
// ==============================
export function CalculatorView({ onBack }: { onBack: () => void }) {
  const [calculated, setCalculated] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // State for ML Inputs (Now defaulting to 'unknown' to represent optional inputs)
  const [cropType, setCropType] = useState('unknown');
  const [daysCategory, setDaysCategory] = useState<'seedling' | 'mid' | 'harvest' | 'unknown'>('unknown');
  const [moisture, setMoisture] = useState<'dry' | 'damp' | 'wet' | 'unknown'>('unknown');
  const [useTensorflow, setUseTensorflow] = useState(true);

  const handleCalculate = () => {
    setLoading(true);
    // Simulate ML calculation delay calling the Python endpoint
    setTimeout(() => {
      setLoading(false);
      setCalculated(true);
    }, 1200);
  };

  // Dynamic ML Output Generator based on inputs
  const getRecommendation = () => {
    let water = "";
    let npk = "";
    let saved = 0;

    // Moisture logic
    if (moisture === 'wet') {
      water = "0 Liters (Do not water)";
      saved += 400;
    } else if (moisture === 'dry') {
      water = "Immediate: 15 Liters/sqm";
    } else {
      water = moisture === 'unknown' ? "Provide baseline 5L/sqm (Safe Estimate)" : "Wait exactly 2 days";
    }

    // NPK Logic based on Crop Type
    let baseNpk = 3.0; // General safe baseline
    if (cropType === 'wheat') baseNpk = 2.5;
    if (cropType === 'rice') baseNpk = 5.0;
    if (cropType === 'cotton') baseNpk = 4.2;

    // Growth Stage Multipliers
    if (daysCategory === 'seedling') baseNpk = baseNpk * 0.2;
    if (daysCategory === 'harvest') {
      baseNpk = 0;
      saved += 450;
    }

    // Combine constraints
    if (baseNpk === 0 || moisture === 'wet') {
      npk = "0 kg (Skip Fertilizer entirely)";
    } else {
      npk = cropType === 'unknown' && daysCategory === 'unknown' 
        ? "2.0 kg/acre (Generic mild dose)" 
        : `${baseNpk.toFixed(1)} kg/acre`;
      saved += 120;
    }

    // Reset savings if no data was provided (baseline)
    if (cropType === 'unknown' && moisture === 'unknown' && daysCategory === 'unknown') {
       saved = 0; 
    }

    return { water, npk, saved, engine: useTensorflow ? "TensorFlow DNN" : "Scikit-Learn Regression" };
  };

  const rec = getRecommendation();

  return (
    <div className="bg-white min-h-full flex flex-col fade-in">
      <div className="p-4 flex items-center gap-3 border-b bg-amber-50">
        <button onClick={onBack}><ArrowLeft size={24} className="text-amber-900" /></button>
        <h2 className="text-lg font-bold text-amber-900">Input Saver Calculator</h2>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl mb-6 shadow-sm">
          <p className="text-sm text-orange-800 font-medium leading-relaxed mb-3">
            Fertilizer is expensive. Enter your crop details below, and Edge ML will calculate the absolute <strong className="font-black">minimum</strong> needed to survive the week.
          </p>
          <div className="flex items-center gap-2 pt-2 border-t border-orange-200/50">
             <span className="text-xs font-bold text-amber-900">Backend Server Engine:</span>
             <button 
               onClick={() => setUseTensorflow(!useTensorflow)}
               className={`text-[10px] px-2 py-1 rounded-sm font-bold transition-colors ${useTensorflow ? 'bg-indigo-600 text-white shadow-sm' : 'bg-gray-200 text-gray-700'}`}
             >
               {useTensorflow ? 'TensorFlow DNN' : 'Scikit-Learn Regression'}
             </button>
          </div>
        </div>

        <div className="space-y-6 flex-1">
          <div>
            <div className="flex justify-between mb-2 items-end">
              <label className="block text-sm font-bold text-gray-700">Crop Type</label>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Optional</span>
            </div>
            <select 
              value={cropType}
              onChange={(e) => { setCropType(e.target.value); setCalculated(false); }}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-3 outline-none font-medium appearance-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="unknown">Not Sure / Skip</option>
              <option value="wheat">🌾 Wheat (rabi)</option>
              <option value="rice">🍚 Rice (kharif)</option>
              <option value="cotton">🌱 Cotton</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between mb-2 items-end">
              <label className="block text-sm font-bold text-gray-700">Growth Stage</label>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Optional</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => { setDaysCategory('seedling'); setCalculated(false); }}
                className={`p-2.5 border-2 rounded-xl text-xs font-bold transition-all ${daysCategory === 'seedling' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200 text-gray-500'}`}
              >Seedling</button>
              <button 
                onClick={() => { setDaysCategory('mid'); setCalculated(false); }}
                className={`p-2.5 border-2 rounded-xl text-xs font-bold transition-all ${daysCategory === 'mid' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200 text-gray-500'}`}
              >Maturing</button>
              <button 
                onClick={() => { setDaysCategory('harvest'); setCalculated(false); }}
                className={`p-2.5 border-2 rounded-xl text-xs font-bold transition-all ${daysCategory === 'harvest' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200 text-gray-500'}`}
              >Near Harvest</button>
              <button 
                onClick={() => { setDaysCategory('unknown'); setCalculated(false); }}
                className={`p-2.5 border-2 rounded-xl text-xs font-bold transition-all ${daysCategory === 'unknown' ? 'border-gray-400 bg-gray-100 text-gray-700' : 'border-gray-200 text-gray-500'}`}
              >Not Sure</button>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2 items-end">
              <label className="block text-sm font-bold text-gray-700">Soil Moisture</label>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Optional</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <button 
                onClick={() => { setMoisture('dry'); setCalculated(false); }}
                className={`py-3 border-2 rounded-xl text-xs font-bold text-center transition-all ${moisture === 'dry' ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-sm' : 'border-gray-200 text-gray-500'}`}
              >Dry</button>
              <button 
                onClick={() => { setMoisture('damp'); setCalculated(false); }}
                className={`py-3 border-2 rounded-xl text-xs font-bold text-center transition-all ${moisture === 'damp' ? 'border-blue-400 bg-blue-50 text-blue-700 shadow-sm' : 'border-gray-200 text-gray-500'}`}
              >Damp</button>
              <button 
                onClick={() => { setMoisture('wet'); setCalculated(false); }}
                className={`py-3 border-2 rounded-xl text-xs font-bold text-center transition-all ${moisture === 'wet' ? 'border-cyan-600 bg-cyan-50 text-cyan-800 shadow-sm' : 'border-gray-200 text-gray-500'}`}
              >Wet</button>
              <button 
                onClick={() => { setMoisture('unknown'); setCalculated(false); }}
                className={`py-3 border-2 rounded-xl text-xs font-bold text-center transition-all leading-tight flex items-center justify-center ${moisture === 'unknown' ? 'border-gray-400 bg-gray-100 text-gray-700 shadow-sm' : 'border-gray-200 text-gray-500'}`}
              >Skip</button>
            </div>
          </div>
        </div>

        {!calculated ? (
          <button 
            disabled={loading}
            onClick={handleCalculate}
            className={`w-full text-white font-bold py-4 rounded-xl shadow-md mt-6 active:scale-95 transition-all flex justify-center items-center gap-2 ${loading ? 'bg-amber-400' : 'bg-amber-600 hover:bg-amber-700'}`}
          >
            {loading ? <RefreshCw size={20} className="animate-spin" /> : <Calculator size={20} />}
            {loading ? 'RUNNING EDGE MODEL...' : 'CALCULATE SURVIVAL MINIMUMS'}
          </button>
        ) : (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-2xl p-5 fade-in shadow-inner">
            <h3 className="font-bold text-green-900 border-b border-green-200 pb-2 mb-3 flex items-center justify-between">
              AI Recommendation
              <span className="text-[9px] bg-green-600 text-white px-2 py-0.5 rounded uppercase tracking-wider">{rec.engine}</span>
            </h3>
            <ul className="space-y-3 mb-4">
              <li className="flex flex-col text-sm border-b border-green-100 pb-2">
                <span className="text-gray-500 text-xs uppercase tracking-wide font-bold mb-1">Minimum Water Needed</span>
                <span className="font-black text-blue-700 text-lg">{rec.water}</span>
              </li>
              <li className="flex flex-col text-sm">
                <span className="text-gray-500 text-xs uppercase tracking-wide font-bold mb-1">NPK Fertilizer Needed</span>
                <span className="font-black text-amber-700 text-lg">{rec.npk}</span>
              </li>
            </ul>
            <div className="bg-white p-3 rounded-xl border border-green-100 flex items-start gap-2 shadow-sm">
              <ShieldAlert className="text-green-600 shrink-0 mt-0.5" size={18} />
              <p className="text-xs text-green-800 font-medium leading-relaxed">
                <strong>Cost Risk Avoided:</strong> ₹{rec.saved}/acre saved today. <span className="opacity-70">Calculated by preventing unnecessary standard-schedule spreading based on your current inputs.</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
