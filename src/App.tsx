import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useOfflineSync } from './hooks/useOfflineSync';
import { useScreenNavigation } from './hooks/useScreenNavigation';
import { SyncBar, BottomNav, DeviceFrame } from './components';
import { 
  HomeView, 
  CalculatorView, 
  MeshView, 
  UssdView, 
  CameraView, 
  AnalyzingView, 
  ResultView, 
  SentView, 
  ExpertView, 
  ChatView, 
  ExpertDirectoryView 
} from './views';

export default function App() {
  const { screen, setScreen } = useScreenNavigation();
  const { isOffline, setIsOffline, pendingPhotos, syncStatus, queuePayload } = useOfflineSync();
  const [meshConnected, setMeshConnected] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<any>(null);

  const handleAskExpert = () => {
    queuePayload();
    setScreen('sent');
  };

  const handleSelectExpert = (expert: any) => {
    setSelectedExpert(expert);
    setScreen('expert');
  };

  return (
    <div className={`min-h-screen bg-[#F4F1EA] flex flex-col lg:flex-row items-center justify-center p-4 gap-8 font-sans ${isDarkMode ? 'dark' : ''}`}>
      
      {/* Simulation Controls Panel (For Developers) */}
      <div className="hidden lg:flex flex-col bg-white p-6 rounded-2xl shadow-xl border border-teal-100 w-80 shrink-0">
        <h3 className="text-lg font-bold text-gray-900 mb-2 border-b pb-2">Field Environment Simulator</h3>
        <p className="text-sm text-gray-600 mb-6">Simulate rural constraints.</p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border">
            <span className="font-semibold text-gray-700 text-sm">Internet Connection</span>
            <button 
              aria-label="Toggle Internet"
              onClick={() => setIsOffline(!isOffline)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${!isOffline ? 'bg-green-500' : 'bg-gray-300'}`}
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
              aria-label="Toggle Mesh"
              onClick={() => setMeshConnected(!meshConnected)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${meshConnected ? 'bg-blue-500' : 'bg-gray-300'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${meshConnected ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border">
            <span className="font-semibold text-gray-700 text-sm">Dark Battery Mode</span>
            <button 
              aria-label="Toggle Dark Mode"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${isDarkMode ? 'bg-teal-800' : 'bg-gray-300'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-center mt-6">
            <span className="font-semibold text-blue-900 text-sm block mb-1">Offline Sync Queue</span>
            <span className="text-3xl font-black text-blue-700">{pendingPhotos}</span>
            <span className="text-sm font-medium text-blue-600 block mt-1">Pending Payload Syncs</span>
          </div>
        </div>
      </div>

      {/* Main App Container */}
      <DeviceFrame isOffline={isOffline} isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)}>
        {/* Dynamic Views */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-slate-900 transition-colors relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <div className="h-full overflow-y-auto pb-16">
                {screen === 'home' && <HomeView setScreen={setScreen} isOffline={isOffline} />}
                {screen === 'camera' && <CameraView onCapture={() => setScreen('analyzing')} onBack={() => setScreen('home')} />}
                {screen === 'analyzing' && <AnalyzingView />}
                {screen === 'result' && <ResultView onAskExpert={handleAskExpert} onBack={() => setScreen('home')} isOffline={isOffline} />}
                {screen === 'sent' && <SentView onHome={() => setScreen('home')} isOffline={isOffline} />}
                {screen === 'calculator' && <CalculatorView onBack={() => setScreen('home')} />}
                {screen === 'mesh' && <MeshView onBack={() => setScreen('home')} meshConnected={meshConnected} />}
                {screen === 'ussd' && <UssdView onBack={() => setScreen('home')} />}
                {screen === 'expert' && <ExpertView onBack={() => setScreen('home')} onChat={() => setScreen('chat')} expert={selectedExpert} />}
                {screen === 'chat' && <ChatView onBack={() => setScreen('expert')} isOffline={isOffline} />}
                {screen === 'expertDirectory' && <ExpertDirectoryView onBack={() => setScreen('home')} onSelectExpert={handleSelectExpert} isOffline={isOffline} />}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <SyncBar screen={screen} syncStatus={syncStatus} pendingPhotos={pendingPhotos} />
        <BottomNav screen={screen} setScreen={setScreen} />
      </DeviceFrame>
    </div>
  );
}
