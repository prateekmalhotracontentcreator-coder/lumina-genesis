
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import BibleReader from './components/BibleReader';
import PrayerWall from './components/PrayerWall';
import AIChaplain from './components/AIChaplain';
import ManifestationPlan from './components/ManifestationPlan';
import PremiumGuide from './components/PremiumGuide';
import BibleTrivia from './components/BibleTrivia';
import ChristianCalendar from './components/ChristianCalendar';
import SleepMeditations from './components/SleepMeditations';
import OccasionalPrayers from './components/OccasionalPrayers';
import MediaVault from './components/MediaVault';
import CommunityHub from './components/CommunityHub';
import EStore from './components/EStore';
import LandingPage from './components/LandingPage';
import BibleStructure from './components/BibleStructure';
import BibleSituationSearch from './components/BibleSituationSearch';
import { AppView, UserProfile } from './types';
import { APP_CONFIG } from './constants';

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Initialize view based on Deep Link state if available
  const [activeView, setActiveView] = useState<AppView>(() => {
    const state = location.state as { view?: string };
    if (state?.view && Object.values(AppView).includes(state.view as AppView)) {
      return state.view as AppView;
    }
    return AppView.DASHBOARD;
  });

  const [profile, setProfile] = useState<UserProfile>({
    name: 'Faithful Soul',
    familyDetails: '',
    isPremium: false,
    points: 750
  });

  // Clear location state after consumption to prevent stuck navigation on refresh
  useEffect(() => {
    if (location.state) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, []);

  const togglePremium = () => setProfile(p => ({ ...p, isPremium: !p.isPremium }));
  const handleLogout = () => navigate('/');

  const renderContent = () => {
    switch (activeView) {
      case AppView.DASHBOARD: return <Dashboard setActiveView={setActiveView} points={profile.points} />;
      case AppView.BIBLE: return <BibleReader />;
      case AppView.PRAYERS: return <PrayerWall />;
      case AppView.AI_PASTOR: return <AIChaplain />;
      case AppView.MANIFEST: return <ManifestationPlan />;
      case AppView.TRIVIA: return <BibleTrivia />;
      case AppView.CALENDAR: return <ChristianCalendar />;
      case AppView.MEDITATION: return <SleepMeditations />;
      case AppView.OCCASIONAL_PRAYERS: return <OccasionalPrayers isPremium={profile.isPremium} onSubscribe={togglePremium} userName={profile.name} />;
      case AppView.MEDIA_VAULT: return <MediaVault isPremium={profile.isPremium} onSubscribe={togglePremium} userName={profile.name} />;
      case AppView.COMMUNITY_HUB: return <CommunityHub />;
      case AppView.ESTORE: return <EStore userPoints={profile.points} />;
      case AppView.BIBLE_STRUCTURE: return <BibleStructure />;
      case AppView.SITUATION_SEARCH: return <BibleSituationSearch />;
      case AppView.PREMIUM_GUIDE: return <PremiumGuide isPremium={profile.isPremium} onSubscribe={togglePremium} />;
      case AppView.SETTINGS:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl serif font-bold px-2 text-white">Settings</h2>
            <div className="glass overflow-hidden bg-white/5">
              <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <span>Premium Membership</span>
                <button onClick={togglePremium} className={`text-[10px] font-bold px-3 py-1 rounded-full transition-all ${profile.isPremium ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500 text-black'}`}>
                  {profile.isPremium ? 'ACTIVE' : 'UPGRADE'}
                </button>
              </div>
              <div className="p-4 border-b border-white/10 flex justify-between items-center text-white/60 text-sm">
                <span>App Version</span>
                <span>v{APP_CONFIG.version} ({APP_CONFIG.buildTag})</span>
              </div>
            </div>
            
            <div className="glass p-6 text-center space-y-2 border border-white/5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Visual Checkpoint</p>
                <p className="text-xs text-white/60">Lumina {APP_CONFIG.edition}</p>
            </div>

            <div className="glass p-4 bg-red-500/10 border-red-500/20 text-red-400 text-center font-bold text-sm cursor-pointer hover:bg-red-500/20 transition-all" onClick={handleLogout}>Log Out</div>
          </div>
        );
      default: return <Dashboard setActiveView={setActiveView} points={profile.points} />;
    }
  };

  return (
    <Layout activeView={activeView} setActiveView={setActiveView}>
      <div key={activeView} className="animate-enter h-full w-full">
        {renderContent()}
      </div>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* The Website Instance */}
        <Route path="/" element={<LandingPage />} />
        
        {/* The App Instance */}
        <Route path="/app" element={<AppContent />} />
        
        {/* Catch-all redirect to Website */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
