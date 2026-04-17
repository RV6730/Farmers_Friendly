import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ArrowLeft, RefreshCw, Database, Star, ArrowRight, Search } from 'lucide-react';

// ==============================
// 8. EXPERT DIRECTORY VIEW
// ==============================
export function ExpertDirectoryView({ onBack, onSelectExpert, isOffline }: { onBack: () => void, onSelectExpert: (expert: any) => void, isOffline: boolean }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [experts, setExperts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const prevOfflineRef = useRef(isOffline);

  const fetchExperts = (isRefresh = false) => {
    if (isRefresh) setIsRefreshing(true);
    else setLoading(true);

    const timer = setTimeout(() => {
      setExperts([
        { id: 1, name: 'Dr. Suresh Kumar', spec: 'Wheat Pathology', location: 'Pune', rating: 4.9, initial: 'S' },
        { id: 2, name: 'Anjali Sharma', spec: 'Pest Control', location: 'Nashik', rating: 4.7, initial: 'A' },
        { id: 3, name: 'Govind Rao', spec: 'Soil Management', location: 'Nagpur', rating: 4.5, initial: 'G' },
        { id: 4, name: 'Dr. Neeta Patil', spec: 'Rice Agronomy', location: 'Pune', rating: 4.8, initial: 'N' },
        { id: 5, name: 'Arjun Desai', spec: 'Irrigation Mgmt', location: 'Solapur', rating: 4.4, initial: 'A' },
        // Simulate finding new records when refreshed online
        ...(isRefresh && !isOffline ? [{ id: 6, name: 'Dr. Vikas Sen (New)', spec: 'Soil Management', location: 'Pune', rating: 5.0, initial: 'V' }] : [])
      ]);
      if (isRefresh) setIsRefreshing(false);
      else setLoading(false);
    }, 1200); // Mock network/cache delay

    return timer;
  };

  // Initial mock cache load
  useEffect(() => {
    const timer = fetchExperts();
    return () => clearTimeout(timer);
  }, []);

  // Auto-refresh strategy when coming back online
  useEffect(() => {
    if (prevOfflineRef.current && !isOffline) {
      const timer = fetchExperts(true);
      return () => clearTimeout(timer);
    }
    prevOfflineRef.current = isOffline;
  }, [isOffline]);

  // Compute unique filter options
  const specializations = ['All', ...Array.from(new Set(experts.map(e => e.spec)))];
  const locations = ['All', ...Array.from(new Set(experts.map(e => e.location)))];

  const filtered = experts.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          e.spec.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpec = selectedSpec === 'All' || e.spec === selectedSpec;
    const matchesLocation = selectedLocation === 'All' || e.location === selectedLocation;
    return matchesSearch && matchesSpec && matchesLocation;
  });

  return (
    <div className="bg-slate-50 min-h-full flex flex-col fade-in relative">
      {/* Header & Search */}
      <div className="bg-indigo-700 px-4 pt-10 pb-6 rounded-b-[32px] shadow-md z-10">
        <div className="flex items-center justify-between mb-5 text-white">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 -ml-2 rounded-full active:bg-indigo-600 transition-colors"><ArrowLeft size={24} /></button>
            <h2 className="text-lg font-bold">Find an Expert</h2>
          </div>
          {!isOffline && (
            <button 
              onClick={() => fetchExperts(true)} 
              disabled={isRefreshing}
              className="p-2 -mr-2 rounded-full active:bg-indigo-600 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={20} className={isRefreshing ? 'animate-spin text-indigo-300' : 'text-white'} />
            </button>
          )}
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-indigo-300" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 rounded-xl border-none bg-white/10 text-white placeholder-indigo-200 focus:ring-2 focus:ring-indigo-300 outline-none text-sm shadow-inner transition-colors focus:bg-white focus:text-gray-900"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        {!loading && (
          <div className="space-y-4">
            {/* Location Select */}
            <div className="flex items-center justify-between">
              <label className="text-indigo-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <MapPin size={12} /> Region
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-indigo-800/80 text-white border border-indigo-500 rounded-lg px-3 py-1.5 text-xs font-bold outline-none focus:ring-2 focus:ring-white max-w-[180px]"
              >
                {locations.map(loc => (
                  <option key={loc} value={loc} className="text-gray-900 bg-white">
                    {loc === 'All' ? 'All Regions' : loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Specialization Filter Pills */}
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
                  {spec === 'All' ? 'All Roles' : spec}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Connection & Refresh Context */}
      {isOffline && (
        <div className="bg-amber-50 px-4 py-3 flex items-start gap-3 border-b border-amber-200">
          <Database size={16} className="text-amber-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-[11px] font-bold text-amber-800 uppercase tracking-widest leading-none mb-1">Locally Cached Registry</p>
            <p className="text-xs text-amber-700 leading-tight">You are offline. Showing cached version; real-time updates are unavailable.</p>
          </div>
        </div>
      )}

      {!isOffline && isRefreshing && (
        <div className="bg-indigo-50 px-4 py-2 flex items-center justify-center gap-2 border-b border-indigo-100 shadow-inner fade-in">
          <RefreshCw size={14} className="text-indigo-500 animate-spin" />
          <span className="text-[10px] uppercase font-bold text-indigo-700 tracking-wider">Syncing live directory...</span>
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
