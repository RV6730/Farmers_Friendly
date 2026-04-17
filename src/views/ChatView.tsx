import React, { useState } from 'react';
import { Camera, WifiOff, ArrowLeft, Send, RefreshCw, Phone } from 'lucide-react';

// ==============================
// 7. EXPERT CHAT VIEW
// ==============================
export function ChatView({ onBack, isOffline }: { onBack: () => void, isOffline: boolean }) {
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
