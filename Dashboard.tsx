
import React, { useEffect, useState } from 'react';
import { AppView } from './types';
import { getDailyVerseInsights } from './geminiService';

interface DashboardProps {
  setActiveView: (view: AppView) => void;
  points: number;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveView, points }) => {
  const [insight, setInsight] = useState('Generating daily insight...');
  const dailyVerse = {
    ref: "Psalm 23:1",
    text: "The Lord is my shepherd; I shall not want."
  };

  useEffect(() => {
    getDailyVerseInsights(dailyVerse.text).then(setInsight).catch(() => setInsight("Grace be with you today."));
  }, []);

  const occasions = [
    { label: 'Meals', icon: '🍞' },
    { label: 'Morning', icon: '☀️' },
    { label: 'Family', icon: '👨‍👩‍👧' },
    { label: 'Travel', icon: '🚗' },
    { label: 'Bedtime', icon: '🛌' }
  ];

  return (
    <div className="space-y-6 pb-12">
      <section className="relative overflow-hidden glass p-8 shadow-2xl border-t border-white/30 bg-gradient-to-br from-indigo-900/40 to-purple-900/40">
        <div className="relative z-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 mb-4">Verse of the Day</p>
          <h2 className="text-3xl serif italic mb-4 text-white">"{dailyVerse.text}"</h2>
          <p className="text-sm font-bold opacity-80 mb-6 text-white">{dailyVerse.ref}</p>
          <div className="h-px w-12 bg-white/20 mx-auto mb-6"></div>
          <p className="text-sm italic text-white/60 max-w-xs mx-auto leading-relaxed">{insight}</p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4">
        <section onClick={() => setActiveView(AppView.BIBLE_STRUCTURE)} className="glass p-6 flex justify-between items-center cursor-pointer hover:bg-white/10 transition-all">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📜</span>
            <div>
              <h4 className="text-sm font-bold text-white">Bible Structure</h4>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">Chapters • Verses • History</p>
            </div>
          </div>
        </section>

        <section onClick={() => setActiveView(AppView.SITUATION_SEARCH)} className="glass p-6 border-l-4 border-indigo-500 flex justify-between items-center cursor-pointer hover:bg-indigo-500/10 transition-all">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌈</span>
            <div>
              <h4 className="text-sm font-bold text-white">Divine Motivation</h4>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">Situation Search</p>
            </div>
          </div>
        </section>
      </div>

      <section className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 px-2 flex justify-between">
          <span>Occasional Prayers</span>
          <button onClick={() => setActiveView(AppView.OCCASIONAL_PRAYERS)} className="text-blue-400">View All</button>
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {occasions.map((occ, idx) => (
            <button key={idx} onClick={() => setActiveView(AppView.OCCASIONAL_PRAYERS)} className="flex-shrink-0 w-24 h-24 glass flex flex-col items-center justify-center gap-2">
              <span className="text-2xl">{occ.icon}</span>
              <span className="text-[10px] font-bold text-white">{occ.label}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
export default Dashboard;
