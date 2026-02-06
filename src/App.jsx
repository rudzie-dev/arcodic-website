import React, { useState, useEffect, useRef } from 'react';
import { 
  X, ArrowUpRight, Zap, Send, Layers, Layout, 
  Instagram, Twitter, ArrowRight, MessageCircle, Mail,
  ChevronRight, Phone, Code, Cpu, Search, CheckCircle2,
  MousePointer2, Globe, Command
} from 'lucide-react';

// --- Configuration ---
const ACCENT = "bg-indigo-600";
const MATTE_BLOCK = "bg-[#0d0d0d] border border-white/5 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.7)]";

export default function App() {
  const [dispersed, setDispersed] = useState(false);
  const [activeBlock, setActiveBlock] = useState(null);
  const [currentDemo, setCurrentDemo] = useState(0);
  const [currentContact, setCurrentContact] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [statusTime, setStatusTime] = useState("");

  const demos = [
    { id: 1, name: 'Noir Atelier', tag: 'Luxury Hospitality', img: '/salon-hero.webp' },
    { id: 2, name: 'Roast & Ritual', tag: 'Boutique Coffee', img: '/coffee-hero.webp' },
    { id: 3, name: 'MG Installations', tag: 'Technical Services', img: '/installations-hero.webp' }
  ];

  const contacts = [
    { id: 'wa', label: 'WhatsApp', value: '+27 67 686 2733', icon: <MessageCircle size={20} />, color: 'text-emerald-500' },
    { id: 'ig', label: 'Instagram', value: '@arcodic.studio', icon: <Instagram size={20} />, color: 'text-pink-500' },
    { id: 'mail', label: 'Email', value: 'hello@arcodic.com', icon: <Mail size={20} />, color: 'text-indigo-500' }
  ];

  useEffect(() => {
    // Sequence the entry
    setTimeout(() => setDispersed(true), 400);
    
    // Interval for Work Demos
    const workTimer = setInterval(() => setCurrentDemo((p) => (p + 1) % demos.length), 4000);
    
    // Interval for Contact Flash
    const contactTimer = setInterval(() => setCurrentContact((p) => (p + 1) % contacts.length), 3500);

    // Clock update
    const clockTimer = setInterval(() => {
        setStatusTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouse);
    return () => {
      clearInterval(workTimer);
      clearInterval(contactTimer);
      clearInterval(clockTimer);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  const blocks = [
    { id: 'logo', label: 'ARCADIC', pos: 'top-[4%] left-[4%] w-[38%] h-[30%]', isLogo: true },
    { id: 'work', label: 'WORK', pos: 'top-[4%] right-[4%] w-[52%] h-[60%]', isWork: true },
    { id: 'cta', label: 'INQUIRY', pos: 'bottom-[4%] right-[4%] w-[52%] h-[28%]', isContact: true },
    { id: 'service', label: 'EXPERTISE', pos: 'top-[38%] left-[4%] w-[38%] h-[32%]', icon: <Layers size={28}/>, title: 'Strategic Stack', desc: 'React, SEO, and Performance Engineering.' },
    { id: 'speed', label: 'VELOCITY', pos: 'bottom-[4%] left-[4%] w-[18%] h-[22%]', icon: <Zap size={28}/>, title: '24H Sprints', desc: 'Rapid design execution for agile founders.' },
    { id: 'social', label: 'CONNECT', pos: 'bottom-[4%] left-[24%] w-[18%] h-[22%]', icon: <Instagram size={28}/>, title: 'Studio Social', desc: '@arcodic.design' },
  ];

  const renderPopupContent = () => {
    if (!activeBlock) return null;
    if (activeBlock.id === 'work') {
      return (
        <div className="space-y-4">
          {demos.map((d) => (
            <div key={d.id} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-indigo-500 group transition-all cursor-pointer">
              <div className="flex gap-4 items-center">
                 <div className="w-12 h-12 bg-zinc-800 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                    <img src={d.img} className="w-full h-full object-cover" />
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{d.tag}</p>
                    <h4 className="text-xl font-black uppercase tracking-tighter">{d.name}</h4>
                 </div>
              </div>
              <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform opacity-20 group-hover:opacity-100"/>
            </div>
          ))}
        </div>
      );
    }
    if (activeBlock.isContact) {
      return (
        <div className="space-y-4">
          {contacts.map((c) => (
            <a href="#" key={c.id} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-indigo-500 group transition-all">
              <div className="flex items-center gap-4">
                <div className={c.color}>{c.icon}</div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase">{c.label}</p>
                  <p className="text-sm font-black">{c.value}</p>
                </div>
              </div>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform"/>
            </a>
          ))}
        </div>
      );
    }
    return (
      <div className="space-y-6">
        <p className="text-zinc-400 text-lg leading-relaxed">{activeBlock.desc}</p>
        <button className="w-full py-6 bg-indigo-600 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:brightness-125 transition-all">
          Explore Section
        </button>
      </div>
    );
  };

  return (
    <div className="h-screen w-full bg-[#050505] overflow-hidden text-white font-sans selection:bg-indigo-500 antialiased">
      
      {/* System Status Tray */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] hidden md:flex items-center gap-6 px-6 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">System Ready</span>
        </div>
        <div className="w-[1px] h-3 bg-white/10" />
        <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">{statusTime || "12:00"} SAST</span>
        <div className="w-[1px] h-3 bg-white/10" />
        <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">Ping: 14ms</span>
      </div>

      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none transition-transform duration-1000 ease-out"
           style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)` }}>
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-800/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full" />
      </div>

      {/* The Slabs */}
      <div className="relative h-full w-full p-8 md:p-12">
        {blocks.map((block) => {
          const isActive = activeBlock?.id === block.id;
          const anyActive = activeBlock !== null;

          return (
            <div
              key={block.id}
              onClick={() => !block.isLogo && setActiveBlock(block)}
              className={`
                absolute transition-all duration-[1200ms] cubic-bezier(0.19, 1, 0.22, 1) rounded-[40px]
                ${dispersed ? block.pos : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 opacity-0 scale-50'}
                ${anyActive && !isActive ? 'scale-[0.94] opacity-10 blur-md pointer-events-none' : 'scale-100 opacity-100'}
                ${block.isLogo ? 'bg-white text-black z-10' : `${MATTE_BLOCK} cursor-pointer hover:border-white/20`}
                group overflow-hidden
              `}
              style={{
                transform: !anyActive ? `perspective(1000px) rotateX(${mousePos.y * 0.05}deg) rotateY(${mousePos.x * -0.05}deg)` : '',
                boxShadow: block.isLogo ? `${mousePos.x * -0.5}px ${mousePos.y * -0.5}px 50px rgba(0,0,0,0.3)` : ''
              }}
            >
              {/* Special Case: Work Showcase */}
              {block.isWork && (
                <div className="absolute inset-0 z-0">
                  {demos.map((demo, idx) => (
                    <div key={demo.id} className={`absolute inset-0 transition-opacity duration-1000 ${currentDemo === idx ? 'opacity-30 scale-100' : 'opacity-0 scale-105'}`}>
                      <img src={demo.img} className="w-full h-full object-cover grayscale" onError={(e) => e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200"} />
                    </div>
                  ))}
                  <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full"><div className="h-full bg-indigo-600 transition-all duration-[4000ms] ease-linear" style={{ width: `${((currentDemo + 1) / demos.length) * 100}%` }} /></div>
                </div>
              )}

              {/* Special Case: Inquiry Pulse */}
              {block.isContact && (
                <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                  {contacts.map((c, idx) => (
                    <div key={c.id} className={`absolute transition-all duration-1000 flex items-center gap-3 ${currentContact === idx ? 'opacity-10 scale-100' : 'opacity-0 scale-95 blur-sm'}`}>
                       {c.icon} <span className="text-5xl font-black uppercase tracking-tighter">{c.label}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="relative z-10 h-full w-full p-10 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className={`transition-all duration-700 ${block.isLogo ? 'text-black' : 'text-indigo-500'}`}>
                    {block.isWork ? <Layout size={24} /> : block.isContact ? <Send size={24} className="animate-pulse" /> : (block.icon || <div className="font-black text-2xl italic">AR</div>)}
                  </div>
                  {!block.isLogo && <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-all" />}
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    {block.isWork && <div className="mb-2"><p className="text-[10px] font-black tracking-[0.3em] text-indigo-500 uppercase">{demos[currentDemo].name}</p></div>}
                    {block.isContact && <div className="mb-2"><p className={`text-[10px] font-black tracking-[0.3em] uppercase transition-colors ${contacts[currentContact].color}`}>{contacts[currentContact].value}</p></div>}
                    <h2 className={`font-black tracking-tighter uppercase leading-[0.85] ${block.isLogo ? 'text-5xl md:text-7xl italic' : 'text-sm opacity-40 group-hover:opacity-100'}`}>
                      {block.label}
                    </h2>
                  </div>
                  {block.isLogo && <span className="text-[8px] font-black tracking-[0.4em] opacity-30">V.26 / ZA</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Popup Viewport */}
      {activeBlock && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 md:p-12">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl animate-in fade-in duration-500" onClick={() => setActiveBlock(null)} />
            <div className="relative bg-[#0d0d0d] border border-white/10 w-full max-w-4xl rounded-[48px] shadow-3xl overflow-hidden animate-in zoom-in-95 duration-500">
                <div className="flex h-full flex-col md:flex-row">
                    <div className="w-full md:w-1/2 p-12 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between bg-black/20">
                        <div>
                            <span className="text-[10px] font-black tracking-[0.5em] text-indigo-500 uppercase block mb-8">{activeBlock.label}</span>
                            <h3 className="text-5xl font-black uppercase tracking-tighter mb-4 leading-none">{activeBlock.title || "Archive"}</h3>
                        </div>
                        <button onClick={() => setActiveBlock(null)} className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-700 hover:text-white transition-colors">Close Viewport</button>
                    </div>
                    <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                        {renderPopupContent()}
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Footer Meta */}
      <div className="fixed bottom-12 left-12 z-[100] flex gap-10 items-center opacity-30 hover:opacity-100 transition-opacity">
        <div className="flex gap-6">
            <Instagram size={18} className="cursor-pointer" />
            <Twitter size={18} className="cursor-pointer" />
        </div>
        <div className="h-4 w-[1px] bg-white/10" />
        <span className="text-[9px] font-black tracking-[0.4em] uppercase">Arcodic Studio © 2026</span>
      </div>
    </div>
  );
}
