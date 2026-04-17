import React, { useState } from 'react';
import { Phone, User, ArrowRight, Leaf } from 'lucide-react';

export function LoginView({ onLogin }: { onLogin: (name: string, phone: string) => void }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      onLogin(name, phone);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 min-h-full fade-in flex flex-col pt-12 transition-colors duration-300">
      <div className="flex-1 px-6 flex flex-col">
        
        {/* Logo / Header Branding */}
        <div className="mt-8 mb-12 flex flex-col items-center">
          <div className="w-20 h-20 bg-teal-100 dark:bg-teal-900 rounded-[24px] flex items-center justify-center rotate-3 shadow-sm mb-6 transition-colors">
            <Leaf size={40} className="text-teal-600 dark:text-teal-400 -rotate-3" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2 text-center">
            AgriSync
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-center text-sm px-4">
            Connect to experts, analyze crops, and sync offline effortlessly.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5 flex-1">
          <div>
            <label htmlFor="name" className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2 ml-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 rounded-2xl pl-12 pr-4 py-4 text-gray-900 dark:text-white font-medium focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2 ml-1">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Phone size={18} className="text-gray-400 dark:text-gray-500" />
              </div>
              <div className="absolute inset-y-0 left-12 flex items-center pr-2 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 font-medium">+91</span>
              </div>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="00000 00000"
                className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 rounded-2xl pl-[84px] pr-4 py-4 text-gray-900 dark:text-white font-medium focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                required
              />
            </div>
          </div>

          <div className="pt-8">
            <button
              type="submit"
              disabled={!name.trim() || !phone.trim()}
              className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:bg-gray-300 dark:disabled:bg-slate-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-teal-500/30 flex items-center justify-between transition-all active:scale-[0.98]"
            >
              <span>Continue</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
