
import React, { useState } from 'react';
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

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.LANDING);
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Faithful Soul',
    familyDetails: '',
    isPremium: false,
    points: 750
  });

  const togglePremium = () => {
    setProfile(p => ({ ...p, isPremium: !p.isPremium }));
  };

  const renderContent = () => {
    switch (activeView) {
      case AppView.LANDING:
        return <LandingPage onStart={() => setActiveView(AppView.DASHBOARD)} />;
      case AppView.DASHBOARD:
        return <Dashboard setActiveView={setActiveView} points={profile.points} />;
      case AppView.BIBLE:
        return <BibleReader />;
      case AppView.PRAYERS:
        return <PrayerWall />;
      case AppView.AI_PASTOR:
        return <AIChaplain />;
      case AppView.MANIFEST:
        return <ManifestationPlan />;
      case AppView.TRIVIA:
        return <BibleTrivia />;
      case AppView.CALENDAR:
        return <ChristianCalendar />;
      case AppView.MEDITATION:
        return <SleepMeditations />;
      case AppView.OCCASIONAL_PRAYERS:
        return (
          <OccasionalPrayers 
            isPremium={profile.isPremium} 
            onSubscribe={togglePremium}
            userName={profile.name}
          />
        );
      case AppView.MEDIA_VAULT:
        return (
          <MediaVault 
            isPremium={profile.isPremium} 
            onSubscribe={togglePremium}
            userName={profile.name}
          />
        );
      case AppView.COMMUNITY_HUB:
        return <CommunityHub />;
      case AppView.ESTORE:
        return <EStore userPoints={profile.points} />;
      case AppView.BIBLE_STRUCTURE:
        return <BibleStructure />;
      case AppView.SITUATION_SEARCH:
        return <BibleSituationSearch />;
      case AppView.PREMIUM_GUIDE:
        return (
          <PremiumGuide 
            isPremium={profile.isPremium} 
            onSubscribe={togglePremium} 
          />
        );
      case AppView.COMMUNITY:
        return <CommunityHub />;
      case AppView.SETTINGS:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl serif font-bold px-2">Settings</h2>
            <div className="glass overflow-hidden">
              <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <span>Premium Membership</span>
                <button 
                  onClick={togglePremium}
                  className={`text-[10px] font-bold px-3 py-1 rounded-full transition-all ${
                    profile.isPremium ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500 text-black'
                  }`}
                >
                  {profile.isPremium ? 'ACTIVE' : 'UPGRADE'}
                </button>
              </div>
              <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <span>Notifications</span>
                <div className="w-10 h-5 bg-green-500/50 rounded-full relative">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <span>Bible Version</span>
                <span className="text-xs text-white/40">KJV (Default)</span>
              </div>
            </div>
            <div className="glass p-4 bg-red-500/10 border-red-500/20 text-red-400 text-center font-bold text-sm">
              Log Out
            </div>
            <div className="text-center">
              <button 
                onClick={() => setActiveView(AppView.LANDING)}
                className="text-[10px] text-white/20 hover:text-white/40 uppercase tracking-widest"
              >
                View Marketing Landing
              </button>
            </div>
          </div>
        );
      default:
        return <Dashboard setActiveView={setActiveView} points={profile.points} />;
    }
  };

  return (
    <Layout activeView={activeView} setActiveView={setActiveView}>
      {renderContent()}
    </Layout>
  );
};

export default App;
