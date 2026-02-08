
import React, { useState } from 'react';
import { CircleMember, PrayerCard } from '../types';

const MOCK_CIRCLE: CircleMember[] = [
  { id: 'f1', name: 'Sarah Wilson', progress: 75, lastActive: '2m ago', prayers: ['Healing for her cat', 'New job interview'] },
  { id: 'f2', name: 'Mark Thompson', progress: 42, lastActive: '1h ago', prayers: ['Financial peace'] },
  { id: 'f3', name: 'Anna Grace', progress: 90, lastActive: 'Now', prayers: ['Family reconciliation'] },
];

const CommunityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'CIRCLE' | 'CHAINS'>('CIRCLE');
  const [prayedIds, setPrayedIds] = useState<Set<string>>(new Set());

  const togglePrayed = (id: string) => {
    const newSet = new Set(prayedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setPrayedIds(newSet);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="glass p-6 text-center border-b border-white/10">
        <h2 className="text-2xl serif font-bold">Community Hub</h2>
        <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Circles & Prayer Chains</p>
        
        <div className="flex gap-4 justify-center mt-6">
          <button 
            onClick={() => setActiveTab('CIRCLE')}
            className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${activeTab === 'CIRCLE' ? 'bg-white text-black' : 'text-white/40'}`}
          >
            My Circle
          </button>
          <button 
            onClick={() => setActiveTab('CHAINS')}
            className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${activeTab === 'CHAINS' ? 'bg-white text-black' : 'text-white/40'}`}
          >
            Prayer Chains
          </button>
        </div>
      </div>

      {activeTab === 'CIRCLE' ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-sm font-bold opacity-60">Loved Ones' Progress</h3>
            <button className="text-[10px] text-blue-400 font-bold">+ Invite Member</button>
          </div>
          
          {MOCK_CIRCLE.map(member => (
            <div key={member.id} className="glass p-5 border border-white/5 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold">
                    {member.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{member.name}</h4>
                    <p className="text-[10px] text-white/40">Last active: {member.lastActive}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-indigo-400">{member.progress}% Complete</span>
                  <div className="w-24 h-1 bg-white/5 rounded-full mt-1">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${member.progress}%` }}></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                {member.prayers.map((p, idx) => (
                  <div key={idx} className="bg-white/5 p-3 rounded-xl flex justify-between items-center">
                    <span className="text-xs italic text-white/70">"{p}"</span>
                    <button 
                      onClick={() => togglePrayed(`${member.id}-${idx}`)}
                      className={`text-[10px] font-bold px-3 py-1 rounded-full border transition-all ${
                        prayedIds.has(`${member.id}-${idx}`) 
                          ? 'bg-blue-500 border-blue-400 text-white' 
                          : 'border-white/20 text-white/60 hover:border-white/40'
                      }`}
                    >
                      {prayedIds.has(`${member.id}-${idx}`) ? '✓ Prayed' : '🙏 Pray'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="glass p-6 bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 text-center space-y-3">
            <p className="text-xs text-yellow-400/80 font-medium">Earn Reward Points by encouraging your Circle members!</p>
            <button className="text-[10px] font-bold bg-yellow-500 text-black px-6 py-2 rounded-full uppercase">Gift a Reading Plan</button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 p-2">
          <div className="glass p-8 text-center space-y-4 bg-blue-600/10 border-blue-500/20">
            <div className="text-4xl">🔗</div>
            <h3 className="text-xl serif font-bold">Global Prayer Chain</h3>
            <p className="text-xs text-white/60 leading-relaxed">Join thousands in a continuous cycle of prayer for world peace and individual healing.</p>
            <div className="flex justify-center gap-2">
              <span className="bg-blue-500/20 px-3 py-1 rounded-full text-[10px] font-bold text-blue-400">14,204 PRRAYING NOW</span>
            </div>
            <button className="w-full bg-white text-black py-4 rounded-xl font-bold text-sm shadow-xl mt-4">Connect to the Chain</button>
          </div>
          
          <div className="glass p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">Share Request To</h4>
            <div className="grid grid-cols-3 gap-2">
              <button className="glass p-3 flex flex-col items-center gap-2 hover:bg-white/10">
                <span className="text-xl">💬</span>
                <span className="text-[9px] font-bold">WhatsApp</span>
              </button>
              <button className="glass p-3 flex flex-col items-center gap-2 hover:bg-white/10">
                <span className="text-xl">📱</span>
                <span className="text-[9px] font-bold">Contacts</span>
              </button>
              <button className="glass p-3 flex flex-col items-center gap-2 hover:bg-white/10">
                <span className="text-xl">✉️</span>
                <span className="text-[9px] font-bold">Email</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityHub;
