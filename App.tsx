
import React, { useState } from 'react';
import Layout from './Layout';
import Dashboard from './Dashboard';
import BibleReader from './BibleReader';
import PrayerWall from './PrayerWall';
import AIChaplain from './AIChaplain';
import ManifestationPlan from './ManifestationPlan';
import PremiumGuide from './PremiumGuide';
import BibleTrivia from './BibleTrivia';
import ChristianCalendar from './ChristianCalendar';
import SleepMeditations from './SleepMeditations';
import OccasionalPrayers from './OccasionalPrayers';
import MediaVault from './MediaVault';
import CommunityHub from './CommunityHub';
import EStore from './EStore';
import LandingPage from './LandingPage';
import BibleStructure from './BibleStructure';
import BibleSituationSearch from './BibleSituationSearch';
import { AppView, UserProfile } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.LANDING);
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Faithful Soul',
    familyDetails: '',
    isPremium: false,
    points: 750
  });

  const togglePremium = () => setProfile(p => ({ ...p, isPremium: !p.isPremium }));

  const renderContent = () => {
    switch (activeView) {
      case AppView.LANDING: return <LandingPage onStart={() => setActiveView(AppView.DASHBOARD)} />;
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
            </div>
            <div className="glass p-4 bg-red-500/10 border-red-500/20 text-red-400 text-center font-bold text-sm cursor-pointer" onClick={() => setActiveView(AppView.LANDING)}>Log Out</div>
          </div>
        );
      default: return <Dashboard setActiveView={setActiveView} points={profile.points} />;
    }
  };

  return <Layout activeView={activeView} setActiveView={setActiveView}>{renderContent()}</Layout>;
};

export default App;
