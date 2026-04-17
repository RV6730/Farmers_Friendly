import React, { useState, useEffect } from 'react';
import { Camera, CloudRain, Sun, Wind, MapPin, AlertCircle, Image as ImageIcon, CheckCircle, WifiOff, ArrowLeft, Send, RefreshCw, CheckCircle2, Database, Calculator, Radio, Hash, Droplet, ShieldAlert, Home, Zap, Delete, Phone, CloudLightning, Star, Award, MessageCircle, ArrowRight, Search, Users } from 'lucide-react';

export default function App() {
  const [screen, setScreen] = useState<'home' | 'camera' | 'analyzing' | 'result' | 'sent' | 'calculator' | 'mesh' | 'ussd' | 'expert' | 'chat' | 'expertDirectory'>('home');
  const [isOffline, setIsOffline] = useState(true);
  const [meshConnected, setMeshConnected] = useState(false);
  const [pendingPhotos, setPendingPhotos] = useState(0);
  const [syncStatus, setSyncStatus] = useState<'offline' | 'up_to_date' | 'syncing' | 'pending'>('offline');

  // Auto-transition for the analyzing state
  useEffect(() => {
    if (screen === 'analyzing') {
      const timer = setTimeout(() => setScreen('result'), 2500);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  // Sync Engine Mock
  useEffect(() => {
    if (isOffline) {
      setSyncStatus(pendingPhotos > 0 ? 'pending' : 'offline');
    } else {
      if (pendingPhotos > 0) {
        setSyncStatus('syncing');
        const timer = setTimeout(() => {
          setPendingPhotos(0);
          setSyncStatus('up_to_date');
        }, 3000);
        return () => clearTimeout(timer);
      } else {
        setSyncStatus('up_to_date');
      }
    }
  }, [isOffline, pendingPhotos]);

  const handleAskExpert = () => {
    setPendingPhotos(prev => prev + 1);
    setScreen('sent');
  };

  return (
    <div className="min-h-screen bg-[#E8F3E8] flex flex-col lg:flex-row items-center justify-center p-4 gap-8 font-sans">
      
      {/* Simulation Controls Panel (For Hackathon Judges) */}
      <div className="hidden lg:flex flex-col bg-white p-6 rounded-2xl shadow-xl border border-green-100 w-80 shrink-0">
        <h3 className="text-lg font-bold text-gray-900 mb-2 border-b pb-2">Hackathon Demo Panel</h3>
        <p className="text-sm text-gray-600 mb-6">Simulate field constraints for the judges.</p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border">
            <span className="font-semibold text-gray-700 text-sm">Internet Connection</span>
            <button 
              onClick={() => setIsOffline(!isOffline)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${!isOffline ? 'bg-green-500' : 'bg-gray-300'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${!isOffline ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border">
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700 text-sm">P2P Mesh Network</span>
              <span className="text-[10px] text-gray-500">Neighbor Bluetooth</span>
            </div>
            <button 
              onClick={() => setMeshConnected(!meshConnected)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${meshConnected ? 'bg-blue-500' : 'bg-gray-300'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${meshConnected ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-center mt-6">
            <span className="font-semibold text-blue-900 text-sm block mb-1">Local SQLite Queue</span>
            <span className="text-3xl font-black text-blue-700">{pendingPhotos}</span>
            <span className="text-sm font-medium text-blue-600 block mt-1">Pending Payload Syncs</span>
          </div>
        </div>
      </div>

      {/* Mobile Device Frame */}
      <div className="w-full max-w-[380px] h-[800px] bg-white rounded-[40px] shadow-2xl relative border-[8px] border-gray-900 overflow-hidden flex flex-col shrink-0">
        
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-[16px] z-50"></div>
        
        {/* Status Bar */}
        <div className="w-full bg-green-700 text-white pt-6 pb-2 px-6 flex justify-between items-center text-xs font-medium z-40 relative">
          <span>09:41</span>
          <div className="flex items-center gap-2">
            {isOffline ? (
              <span className="flex items-center gap-1 text-red-200">
                <WifiOff size={12} /> Offline
              </span>
            ) : (
              <span>4G</span>
            )}
            <span>100%</span>
          </div>
        </div>

        {/* Dynamic Views */}
        <div className="flex-1 overflow-y-auto bg-gray-50 relative">
          {screen === 'home' && <HomeView setScreen={setScreen} isOffline={isOffline} />}
          {screen === 'camera' && <CameraView onCapture={() => setScreen('analyzing')} onBack={() => setScreen('home')} />}
          {screen === 'analyzing' && <AnalyzingView />}
          {screen === 'result' && <ResultView onAskExpert={handleAskExpert} onBack={() => setScreen('home')} isOffline={isOffline} />}
          {screen === 'sent' && <SentView onHome={() => setScreen('home')} isOffline={isOffline} />}
          {screen === 'calculator' && <CalculatorView onBack={() => setScreen('home')} />}
          {screen === 'mesh' && <MeshView onBack={() => setScreen('home')} meshConnected={meshConnected} />}
          {screen === 'ussd' && <UssdView onBack={() => setScreen('home')} />}
          {screen === 'expert' && <ExpertView onBack={() => setScreen('home')} onChat={() => setScreen('chat')} />}
          {screen === 'chat' && <ChatView onBack={() => setScreen('expert')} isOffline={isOffline} />}
          {screen === 'expertDirectory' && <ExpertDirectoryView onBack={() => setScreen('home')} onSelectExpert={() => setScreen('expert')} isOffline={isOffline} />}
        </div>

        {/* Persistent Sync Indicator */}
        {screen !== 'camera' && screen !== 'ussd' && (
          <div className="bg-[#f8fafc] border-t border-gray-200 px-4 py-2.5 flex justify-between items-center text-[10px] uppercase tracking-wider font-bold z-40 relative shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
            <span className="text-gray-500">Cloud Sync</span>
            <div className="flex items-center gap-1.5 transition-all duration-300">
              {syncStatus === 'offline' && <><WifiOff size={12} className="text-gray-400 opacity-70"/> <span className="text-gray-500">Device Offline</span></>}
              {syncStatus === 'pending' && <><Database size={12} className="text-orange-500 animate-pulse"/> <span className="text-orange-600 animate-pulse">{pendingPhotos} In Queue</span></>}
              {syncStatus === 'syncing' && <><RefreshCw size={12} className="text-blue-500 animate-spin"/> <span className="text-blue-600 animate-pulse">Syncing...</span></>}
              {syncStatus === 'up_to_date' && <><CheckCircle2 size={12} className="text-green-500 fade-in"/> <span className="text-green-600 fade-in">Up to date</span></>}
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        {(screen === 'home' || screen === 'calculator' || screen === 'mesh') && (
          <div className="bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center pb-6">
            <button onClick={() => setScreen('home')} className={`flex flex-col items-center flex-1 ${screen === 'home' ? 'text-green-700' : 'text-gray-400'}`}>
              <Home size={22} className={screen === 'home' ? 'fill-green-50' : ''} />
              <span className="text-[10px] font-bold mt-1">Farm</span>
            </button>
            <button onClick={() => setScreen('calculator')} className={`flex flex-col items-center flex-1 ${screen === 'calculator' ? 'text-green-700' : 'text-gray-400'}`}>
              <Calculator size={22} className={screen === 'calculator' ? 'fill-green-50' : ''} />
              <span className="text-[10px] font-bold mt-1">Inputs</span>
            </button>
            <button onClick={() => setScreen('mesh')} className={`flex flex-col items-center flex-1 ${screen === 'mesh' ? 'text-green-700' : 'text-gray-400'}`}>
              <Radio size={22} className={screen === 'mesh' ? 'fill-green-50' : ''} />
              <span className="text-[10px] font-bold mt-1">Weather</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ==============================
// 1. HOME DASHBOARD
// ==============================
function HomeView({ setScreen, isOffline }: { setScreen: (s: any) => void, isOffline: boolean }) {
  return (
    <div className="p-5 fade-in">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Namaste, Ram 👋</h1>
          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
            <MapPin size={14} /> Pune District
          </p>
        </div>
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-xl relative">
          R
          {isOffline && <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5"><WifiOff size={14} className="text-orange-500" /></div>}
        </div>
      </div>

      {/* Active Ticket Alert */}
      <button 
        onClick={() => setScreen('expert')}
        className="w-full text-left mb-5 bg-white border border-green-200 rounded-2xl p-4 shadow-sm relative overflow-hidden active:scale-95 transition-transform block"
      >
        <div className="absolute top-0 left-0 w-1.5 h-full bg-green-500"></div>
        <div className="flex justify-between items-center pl-2">
          <div>
            <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest block mb-1">Ticket Updated</span>
            <h3 className="font-bold text-gray-900 text-sm">Expert Assigned: Leaf Rust</h3>
            <p className="text-xs text-gray-500 mt-0.5">Dr. Suresh has reviewed your payload.</p>
          </div>
          <div className="bg-green-50 text-green-700 p-2 rounded-full border border-green-100">
            <ArrowRight size={16} />
          </div>
        </div>
      </button>

      <div className="grid grid-cols-2 gap-3">
        {/* Core AI Triage */}
        <button 
          onClick={() => setScreen('camera')}
          className="col-span-2 bg-green-700 rounded-2xl p-5 text-white text-left shadow-lg relative overflow-hidden active:scale-95 transition-transform"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-600 rounded-full blur-2xl -mr-10 -mt-10 opacity-50"></div>
          <Camera size={28} className="mb-3 relative z-10" />
          <h2 className="text-lg font-bold text-white mb-1 relative z-10">Crop Disease Scan</h2>
          <p className="text-green-100 text-xs relative z-10">Works fully offline using local Edge AI models.</p>
        </button>

        {/* Offline Input Calculator */}
        <button 
          onClick={() => setScreen('calculator')}
          className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-left shadow-sm active:scale-95 transition-transform"
        >
          <div className="bg-amber-100 w-10 h-10 rounded-full flex items-center justify-center text-amber-700 mb-3">
            <Droplet size={20} />
          </div>
          <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1">Input Saver Calculator</h3>
          <p className="text-[10px] text-gray-500 line-clamp-2">Calculate minimum fertilizer to save money.</p>
        </button>

        {/* P2P Mesh Weather */}
        <button 
          onClick={() => setScreen('mesh')}
          className="bg-sky-50 border border-sky-200 rounded-2xl p-4 text-left shadow-sm active:scale-95 transition-transform"
        >
          <div className="bg-sky-100 w-10 h-10 rounded-full flex items-center justify-center text-sky-700 mb-3">
            <Radio size={20} />
          </div>
          <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1">P2P Mesh Weather</h3>
          <p className="text-[10px] text-gray-500 line-clamp-2">Get weather from neighbors without internet.</p>
        </button>

        {/* Expert Directory */}
        <button 
          onClick={() => setScreen('expertDirectory')}
          className="col-span-2 bg-indigo-50 border border-indigo-200 rounded-2xl p-4 text-left shadow-sm flex items-center gap-3 active:scale-95 transition-transform"
        >
          <div className="bg-indigo-100 p-3 rounded-full text-indigo-700">
            <Users size={20} />
          </div>
          <div>
            <h3 className="font-bold text-indigo-900 text-sm leading-tight mb-0.5">Find an Expert</h3>
            <p className="text-[10px] text-indigo-700/70 line-clamp-1">Search the local registry for agronomists.</p>
          </div>
        </button>

        {/* USSD Market Shield */}
        <button 
          onClick={() => setScreen('ussd')}
          className="col-span-2 bg-slate-800 rounded-2xl p-4 text-left shadow-md flex items-center justify-between active:scale-95 transition-transform"
        >
          <div>
            <h3 className="font-bold text-green-400 text-base mb-1 flex items-center gap-2">
              <Hash size={16} /> USSD Market Shield
            </h3>
            <p className="text-slate-300 text-xs max-w-[200px]">Dial direct codes to check real Mandi prices offline.</p>
          </div>
          <div className="bg-slate-700 p-3 rounded-full text-white">
            <Zap size={20} className="fill-current text-yellow-400" />
          </div>
        </button>
      </div>
    </div>
  );
}

// ==============================
// 2. OFFLINE INPUT CALCULATOR
// ==============================
function CalculatorView({ onBack }: { onBack: () => void }) {
  const [calculated, setCalculated] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // State for ML Inputs (Now defaulting to 'unknown' to represent optional inputs)
  const [cropType, setCropType] = useState('unknown');
  const [daysCategory, setDaysCategory] = useState<'seedling' | 'mid' | 'harvest' | 'unknown'>('unknown');
  const [moisture, setMoisture] = useState<'dry' | 'damp' | 'wet' | 'unknown'>('unknown');

  const handleCalculate = () => {
    setLoading(true);
    // Simulate ML calculation delay
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

    return { water, npk, saved };
  };

  const rec = getRecommendation();

  return (
    <div className="bg-white min-h-full flex flex-col fade-in">
      <div className="p-4 flex items-center gap-3 border-b bg-amber-50">
        <button onClick={onBack}><ArrowLeft size={24} className="text-amber-900" /></button>
        <h2 className="text-lg font-bold text-amber-900">Input Saver Calculator</h2>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl mb-6">
          <p className="text-sm text-orange-800 font-medium leading-relaxed">
            Fertilizer is expensive. Enter your crop details below, and Edge ML will calculate the absolute <strong className="font-black">minimum</strong> needed to survive the week.
          </p>
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
              <span className="text-[10px] bg-green-600 text-white px-2 py-0.5 rounded uppercase tracking-wider">Edge ML</span>
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

// ==============================
// 3. P2P MESH WEATHER
// ==============================
function MeshView({ onBack, meshConnected }: { onBack: () => void, meshConnected: boolean }) {
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

// ==============================
// 4. USSD MARKET SHIELD
// ==============================
function UssdView({ onBack }: { onBack: () => void }) {
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

// ==============================
// 5. CAMERA & RESULT SHARED (from previous step)
// ==============================
function CameraView({ onCapture, onBack }: { onCapture: () => void, onBack: () => void }) {
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

function AnalyzingView() {
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

function ResultView({ onAskExpert, onBack, isOffline }: { onAskExpert: () => void, onBack: () => void, isOffline: boolean }) {
  return (
    <div className="min-h-full bg-gray-50 flex flex-col fade-in">
      <div className="bg-white px-4 py-4 flex items-center gap-3 border-b pt-8">
        <button onClick={onBack}><ArrowLeft size={24} className="text-gray-700" /></button>
        <h2 className="text-lg font-bold text-gray-900">Disease Report</h2>
      </div>

      <div className="p-5 flex-1">
        <img 
          src="https://picsum.photos/seed/leaf15/400/300" 
          alt="Scanned leaf" 
          className="w-full h-48 object-cover rounded-2xl mb-5 shadow-sm border border-gray-200"
        />

        <div className="bg-white border text-center p-5 rounded-2xl shadow-sm mb-5 border-orange-200 relative overflow-hidden">
           <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
             <AlertCircle size={28} />
           </div>
           <h3 className="text-xl font-bold text-gray-900 mb-1">Possibly: Leaf Rust</h3>
           <p className="text-gray-600 text-sm">Abnormal spots detected. AI Confidence: 72%.</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-6">
          <h4 className="font-bold text-blue-900 mb-2 text-base">Inconclusive Result</h4>
          <p className="text-sm text-blue-800 leading-relaxed mb-4">
            To prevent misdiagnosis, please escalate this to a local Govt Agronomist.
          </p>
          <button 
            onClick={onAskExpert}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all text-sm"
          >
            <Send size={18} />
            SEND TO GOVT EXPERT
          </button>
          
          {isOffline && (
            <p className="text-xs text-center text-blue-700/70 mt-3 font-medium flex items-center justify-center gap-1">
              <Database size={12} /> Will queue locally to SQLite DB
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function SentView({ onHome, isOffline }: { onHome: () => void, isOffline: boolean }) {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (isOffline) {
      // Delay slightly so the checkmark is seen first
      const timer1 = setTimeout(() => setShowToast(true), 800);
      const timer2 = setTimeout(() => setShowToast(false), 4000);
      return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }
  }, [isOffline]);

  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-[#f0fdf4] fade-in relative">
      <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 text-white shadow-xl border-4 border-white relative ${isOffline ? 'bg-indigo-500 shadow-indigo-200/50' : 'bg-green-500 shadow-green-200/50'}`}>
        {isOffline ? <Database size={40} /> : <CheckCircle size={48} />}
        {isOffline && (
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
            <div className="bg-indigo-500 rounded-full p-1.5">
              <RefreshCw size={14} className="text-white" />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center gap-2 mb-3">
        <h2 className="text-2xl font-bold text-gray-900">
          {isOffline ? 'Saved Securely!' : 'Request Sent!'}
        </h2>
        {isOffline && (
          <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1.5 border border-indigo-100">
            <WifiOff size={12} /> Queued Locally
          </span>
        )}
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-[200px] mt-2">
        {isOffline 
          ? "Payload stored in local SQL. It will auto-forward the moment internet restores."
          : "An expert has received your photo and will reply shortly."}
      </p>
      
      <button 
        onClick={onHome}
        className="w-full bg-white text-green-700 font-bold py-4 rounded-xl shadow-sm border border-green-200 active:scale-95 transition-transform text-sm"
      >
        RETURN TO DASHBOARD
      </button>

      {/* Temporary Confirmation Toast */}
      <div className={`absolute bottom-28 left-0 right-0 flex justify-center transition-all duration-500 z-50 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="bg-gray-800 text-white text-xs px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 border border-gray-700">
          <Database size={14} className="text-orange-400 animate-pulse" />
          <span>Saved to SQLite. Awaiting Sync.</span>
        </div>
      </div>
    </div>
  );
}

// ==============================
// 6. EXPERT PROFILE VIEW
// ==============================
function ExpertView({ onBack, onChat }: { onBack: () => void, onChat: () => void }) {
  return (
    <div className="bg-slate-50 min-h-full flex flex-col fade-in">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b pt-8">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full active:bg-gray-100 transition-colors"><ArrowLeft size={24} className="text-gray-700" /></button>
          <h2 className="text-lg font-bold text-gray-900">Assigned Expert</h2>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center mb-6 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4 text-3xl font-bold border-4 border-white shadow-md relative z-10">
            Dr. S
          </div>
          <h2 className="text-2xl font-bold text-gray-900 relative z-10">Dr. Suresh Kumar</h2>
          <p className="text-blue-600 font-medium text-sm mt-1 relative z-10">Wheat Pathology Specialist</p>
          <div className="flex items-center gap-2 mt-4 bg-yellow-50 px-4 py-1.5 rounded-full border border-yellow-100 relative z-10">
            <Star className="text-yellow-500 fill-yellow-500" size={16} />
            <span className="text-yellow-700 font-bold text-sm tracking-wide">4.92 / 5.0</span>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="bg-purple-100 p-3 rounded-xl text-purple-600 mr-4"><Award size={22}/></div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Escalation Tier</p>
              <p className="text-gray-900 font-bold text-sm">Tier 1 (Gov / Free)</p>
            </div>
          </div>
          <div className="flex items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="bg-green-100 p-3 rounded-xl text-green-600 mr-4"><CheckCircle2 size={22}/></div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Tickets Resolved</p>
              <p className="text-gray-900 font-bold text-sm">842 Cases Handled</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-4 flex gap-3">
          <a href="tel:+9118001234567" className="flex-1 bg-white border-2 border-green-200 text-green-700 hover:bg-green-50 font-bold py-4 rounded-xl shadow-sm active:scale-95 transition-all flex justify-center items-center gap-2 text-sm">
            <Phone size={18} />
            CALL
          </a>
          <button 
            onClick={onChat}
            className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md shadow-blue-200 active:scale-95 transition-all flex justify-center items-center gap-2 text-sm border-b-4 border-blue-800"
          >
            <MessageCircle size={18} />
            CHAT NOW
          </button>
        </div>
      </div>
    </div>
  );
}

// ==============================
// 7. EXPERT CHAT VIEW
// ==============================
function ChatView({ onBack, isOffline }: { onBack: () => void, isOffline: boolean }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'expert', text: 'Namaste Ram. I reviewed the photo of your wheat crop. It looks like early-stage Leaf Rust.', time: '10:02 AM' },
    { id: 2, sender: 'expert', text: 'Have you noticed any orange spots on the stems as well, or just on the leaves?', time: '10:03 AM' }
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'farmer', text: inputText, time: 'Now' }]);
    setInputText("");
  };

  return (
    <div className="bg-gray-100 min-h-full flex flex-col fade-in relative">
      {/* Header */}
      <div className="bg-white px-4 flex items-center justify-between border-b pt-8 pb-3 shadow-sm z-10 relative">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full active:bg-gray-100 transition-colors"><ArrowLeft size={24} className="text-gray-700" /></button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs ring-2 ring-white shadow-sm">
              Dr
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900 leading-tight">Dr. Suresh Kumar</h2>
              <p className="text-[10px] text-green-600 font-bold flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online
              </p>
            </div>
          </div>
        </div>
        <a href="tel:+9118001234567" className="p-2 bg-green-50 text-green-600 rounded-full active:bg-green-100 transition-colors pointer-events-auto shadow-sm">
          <Phone size={18} className="fill-green-100 hidden" />
          <Phone size={18} />
        </a>
      </div>

      {/* Offline Alert Context */}
      {isOffline && (
        <div className="bg-orange-50 px-4 py-2.5 flex items-center justify-center gap-2 border-b border-orange-100 z-0">
          <WifiOff size={14} className="text-orange-500" />
          <span className="text-[10px] uppercase font-bold text-orange-700 tracking-wider">Offline - Messages will queue locally</span>
        </div>
      )}

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-6">
        <div className="text-center mb-6">
          <span className="bg-gray-200/60 text-gray-600 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border border-gray-200">Today</span>
        </div>
        
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'farmer' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${msg.sender === 'farmer' ? 'bg-green-600 text-white rounded-br-sm' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm'}`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <div className={`text-[9px] mt-1.5 font-medium text-right flex justify-end gap-1 items-center ${msg.sender === 'farmer' ? 'text-green-200' : 'text-gray-400'}`}>
                {msg.time} 
                {msg.sender === 'farmer' && !isOffline && <span className="font-bold tracking-widest text-[#a3e635]">✓✓</span>}
                {msg.sender === 'farmer' && isOffline && <span className="flex items-center gap-1 opacity-70"><RefreshCw size={8} className="animate-spin" /> queued</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="bg-white p-3 border-t border-gray-200">
        <div className="flex items-center gap-2 bg-gray-50 rounded-full pl-4 pr-1.5 py-1.5 border border-gray-200 shadow-inner">
          <button className="text-gray-400 hover:text-gray-600 transition-colors"><Camera size={20} /></button>
          <input 
            type="text" 
            placeholder="Type your reply..." 
            className="flex-1 bg-transparent text-sm outline-none px-2 py-1 placeholder-gray-400 text-gray-800"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${inputText.trim() ? 'bg-blue-600 text-white shadow-md active:scale-90 shadow-blue-200' : 'bg-gray-200 text-gray-400'}`}
          >
            <Send size={16} className={inputText.trim() ? 'ml-0.5' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ==============================
// 8. EXPERT DIRECTORY VIEW
// ==============================
function ExpertDirectoryView({ onBack, onSelectExpert, isOffline }: { onBack: () => void, onSelectExpert: (expert: any) => void, isOffline: boolean }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("All");
  const [experts, setExperts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch from /api/v1/experts with offline caching logic
    setLoading(true);
    const timer = setTimeout(() => {
      setExperts([
        { id: 1, name: 'Dr. Suresh Kumar', spec: 'Wheat Pathology', location: 'Pune', rating: 4.9, initial: 'S' },
        { id: 2, name: 'Anjali Sharma', spec: 'Pest Control', location: 'Nashik', rating: 4.7, initial: 'A' },
        { id: 3, name: 'Govind Rao', spec: 'Soil Management', location: 'Nagpur', rating: 4.5, initial: 'G' },
        { id: 4, name: 'Dr. Neeta Patil', spec: 'Rice Agronomy', location: 'Pune', rating: 4.8, initial: 'N' },
        { id: 5, name: 'Arjun Desai', spec: 'Irrigation Mgmt', location: 'Solapur', rating: 4.4, initial: 'A' },
      ]);
      setLoading(false);
    }, 600); // Mock network/cache delay
    return () => clearTimeout(timer);
  }, []);

  // Compute unique specializations for the filter bar
  const specializations = ['All', ...Array.from(new Set(experts.map(e => e.spec)))];

  const filtered = experts.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          e.spec.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpec = selectedSpec === 'All' || e.spec === selectedSpec;
    return matchesSearch && matchesSpec;
  });

  return (
    <div className="bg-slate-50 min-h-full flex flex-col fade-in relative">
      {/* Header & Search */}
      <div className="bg-indigo-700 px-4 pt-10 pb-6 rounded-b-[32px] shadow-md z-10">
        <div className="flex items-center gap-3 mb-5 text-white">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full active:bg-indigo-600 transition-colors"><ArrowLeft size={24} /></button>
          <h2 className="text-lg font-bold">Find an Expert</h2>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-indigo-300" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 rounded-xl border-none bg-white/10 text-white placeholder-indigo-200 focus:ring-2 focus:ring-indigo-300 outline-none text-sm shadow-inner transition-colors focus:bg-white focus:text-gray-900"
            placeholder="Search by name or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Specialization Filter Pills */}
        {!loading && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2">
            {specializations.map(spec => (
              <button
                key={spec}
                onClick={() => setSelectedSpec(spec)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${
                  selectedSpec === spec 
                    ? 'bg-white text-indigo-700 border-white' 
                    : 'bg-indigo-800/50 text-indigo-100 border-indigo-500 hover:bg-indigo-600'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        )}
      </div>

      {isOffline && (
        <div className="bg-amber-50 px-4 py-2 flex items-center justify-center gap-2 border-b border-amber-100">
          <Database size={12} className="text-amber-500" />
          <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">Showing locally cached registry</span>
        </div>
      )}

      {/* Results List */}
      <div className="flex-1 overflow-y-auto p-4 pb-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400 gap-3">
            <RefreshCw size={24} className="animate-spin" />
            <span className="text-xs font-bold uppercase tracking-widest">Loading Profiles...</span>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center p-8 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-500 text-sm">No experts found matching "{searchQuery}".</p>
              </div>
            ) : (
              filtered.map(expert => (
                <button 
                  key={expert.id}
                  onClick={() => onSelectExpert(expert)}
                  className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 active:scale-95 transition-transform text-left"
                >
                  <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg shrink-0">
                    {expert.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm truncate">{expert.name}</h3>
                    <p className="text-xs text-indigo-600 font-medium truncate">{expert.spec}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="flex items-center gap-1 text-[10px] text-gray-500 font-bold"><MapPin size={10} /> {expert.location}</span>
                      <span className="flex items-center gap-1 text-[10px] text-yellow-600 font-bold bg-yellow-50 px-1.5 py-0.5 rounded"><Star size={10} className="fill-yellow-500 text-yellow-500" /> {expert.rating}</span>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-gray-300" />
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
