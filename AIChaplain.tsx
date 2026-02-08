
import React, { useState, useRef, useEffect } from 'react';
import { getAIChaplainAdvice } from '../services/geminiService';

const AIChaplain: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'Peace be with you. I am your Lumina Spiritual Guide. How can I help you walk closer with the Lord today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input || loading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await getAIChaplainAdvice(userMsg);
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: "I'm having trouble connecting right now. Let's pray together instead." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[75vh] flex flex-col glass p-4 shadow-2xl overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-4 p-2 custom-scrollbar">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-blue-600/40 border border-blue-400/20 text-white shadow-lg' 
                : 'bg-white/10 border border-white/10 text-white/90'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/5 p-3 rounded-2xl animate-pulse text-xs text-white/40 italic">
              Pastor is reflecting on scripture...
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 flex gap-2">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask a question..."
          className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-white/30 outline-none"
        />
        <button 
          onClick={handleSend}
          disabled={loading}
          className="bg-white text-black w-12 h-12 rounded-xl flex items-center justify-center text-xl hover:bg-white/90 disabled:opacity-50"
        >
          ➔
        </button>
      </div>
    </div>
  );
};

export default AIChaplain;
