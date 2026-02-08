
import React from 'react';
import { AppView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView }) => {
  const navItems = [
    { id: AppView.DASHBOARD, label: 'Home', icon: '🏠' },
    { id: AppView.BIBLE, label: 'Bible', icon: '📖' },
    { id: AppView.PREMIUM_GUIDE, label: 'Spiritual', icon: '✨' },
    { id: AppView.PRAYERS, label: 'Journal', icon: '🙏' },
    { id: AppView.AI_PASTOR, label: 'Chat', icon: '💬' },
  ];

  if (activeView === AppView.LANDING) return <>{children}</>;

  return (
    <div className="flex flex-col min-h-screen max-w-lg mx-auto relative px-4 pb-24 pt-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 px-2">
        <h1 className="text-2xl font-bold serif tracking-tight text-white/90">Lumina</h1>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveView(AppView.PREMIUM_GUIDE)}
            className="text-[10px] font-bold px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-full text-yellow-400"
          >
            PREMIUM
          </button>
          <button 
            onClick={() => setActiveView(AppView.SETTINGS)}
            className="p-2 rounded-full bg-white/10 border border-white/10"
          >
            ⚙️
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full overflow-y-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md glass border border-white/20 p-2 z-50 shadow-2xl">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
                activeView === item.id ? 'bg-white/20 scale-110' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
