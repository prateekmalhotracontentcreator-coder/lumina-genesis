
import React from 'react';
import { AppView } from '../types';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#0f1018] text-white selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass rounded-none border-x-0 border-t-0 border-white/5 px-6 py-4 flex justify-between items-center bg-black/20">
        <div className="text-2xl font-bold serif flex items-center gap-2">
          <span className="text-indigo-500">✨</span> Lumina
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest text-white/60">
          <a href="#vision" className="hover:text-white transition-colors">The Vision</a>
          <a href="#features" className="hover:text-white transition-colors">Experience</a>
          <a href="#pricing" className="hover:text-white transition-colors">Plan</a>
        </div>
        <button 
          onClick={onStart}
          className="px-6 py-2 bg-white text-black rounded-full font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
        >
          Open Web App
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">
        <div className="absolute top-[-20%] left-[-20%] w-[120vw] h-[120vw] bg-indigo-500/10 rounded-full blur-[150px] animate-pulse"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-300 mb-8">
            Lumina Genesis Edition (v0.1.0)
          </div>
          <h1 className="text-6xl md:text-8xl serif font-bold mb-8 leading-[1.1]">
            Walk in the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-400 to-purple-500">Divine Light.</span>
          </h1>
          <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed">
            The world's first AI-integrated spiritual sanctuary. Deepen your faith through scriptural simulations, private circles, and personalized guidance.
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center mb-16">
            <button className="flex items-center gap-3 bg-black border border-white/20 px-6 py-3 rounded-2xl hover:bg-white/5 transition-all opacity-50 cursor-not-allowed">
              <span className="text-2xl">🍎</span>
              <div className="text-left">
                <p className="text-[8px] uppercase font-bold opacity-40">Coming to</p>
                <p className="text-sm font-bold">App Store</p>
              </div>
            </button>
            <button className="flex items-center gap-3 bg-black border border-white/20 px-6 py-3 rounded-2xl hover:bg-white/5 transition-all opacity-50 cursor-not-allowed">
              <span className="text-2xl">🤖</span>
              <div className="text-left">
                <p className="text-[8px] uppercase font-bold opacity-40">Coming to</p>
                <p className="text-sm font-bold">Google Play</p>
              </div>
            </button>
          </div>

          <button 
            onClick={onStart}
            className="group relative px-16 py-6 bg-indigo-600 text-white rounded-full font-bold text-lg hover:scale-105 transition-all shadow-[0_20px_40px_rgba(79,70,229,0.3)]"
          >
            Launch Genesis Web App
          </button>
        </div>
      </section>

      {/* Features & Roadmap */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl serif font-bold mb-4">The Spiritual Roadmap</h2>
          <p className="text-white/40 text-sm">Harnessing Gemini AI & Veo for a new era of devotion.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-10 space-y-6">
            <h3 className="text-xl font-bold">Divine Logic</h3>
            <p className="text-sm text-white/50">Situation-based search that cross-references scripture with modern testimonies.</p>
          </div>
          <div className="glass p-10 space-y-6">
            <h3 className="text-xl font-bold">Private Circles</h3>
            <p className="text-sm text-white/50">Shared prayer chains with end-to-end privacy for your trusted group.</p>
          </div>
          <div className="glass p-10 space-y-6">
            <h3 className="text-xl font-bold">AI Pastor</h3>
            <p className="text-sm text-white/50">Personalized guidance and theological insight based on your life's context.</p>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 px-6 bg-black/40 text-center">
        <div className="text-[10px] text-white/20 tracking-[0.5em] uppercase">
          Checkpoint Alpha • Lumina Genesis v0.1.0
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
