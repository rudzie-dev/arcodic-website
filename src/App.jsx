import React, { useState, useEffect } from 'react';
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
    setTimeout(() => setDispersed(true), 400);
    const workTimer = setInterval(() => setCurrentDemo((p) => (p + 1) % demos.length), 4000);
    const contactTimer = setInterval(() => setCurrentContact((p) => (p + 1) % contacts.length), 3500);
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

  // VIEWPOINT FIX: Using a combination of calc and vh/vw for perfect fit
  const blocks = [
    { id: 'logo', label: 'ARCODIC.', pos: 'top-[4vh] left-[4vw] w-[38vw] h-[30vh]', isLogo: true },
    { id: 'work', label: 'WORK', pos: 'top-[4vh] right-[4vw] w-[50vw] h-[60vh]', isWork: true },
    { id: 'cta', label: 'INQUIRY', pos: 'bottom-[4vh] right-[4vw] w-[50vw] h-[28vh]', isContact: true },
    { id: 'service', label: 'EXPERTISE', pos: 'top-[38vh] left-[4vw] w-[38vw] h-[32vh]', icon: <Layers size={28}/>, title: 'Strategic Stack', desc: 'React, SEO, and Performance Engineering.' },
    { id: 'speed', label: 'VELOCITY', pos: 'bottom-[4vh] left-[4vw] w-[18vw] h-[22vh]', icon: <Zap size={28}/>, title: '24H Sprints', desc: 'Rapid design execution for agile founders.' },
    { id: 'social', label: 'CONNECT', pos: 'bottom-[4vh] left-[24vw] w-[18vw] h-[22vh]', icon: <Instagram size={28}/>, title: 'Studio Social', desc: '@arcodic.design' },
  ];

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

      {/* Interactive Canvas */}
      <div className="relative h-full w-full">
        {blocks.map((block) => {
          const isActive = activeBlock?.id === block.id;
          const anyActive = activeBlock !== null;

          return (
            <div
              key={block.id}
              onClick={() => !block.isLogo && setActiveBlock(block)}
              className={`
                absolute transition-all duration-[1200ms] cubic-bezier(0.19, 1, 0.22, 1) rounded-[2.5vw]
                ${dispersed ? block.pos : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 opacity-0 scale-50'}
                ${anyActive && !isActive ? 'scale-[0.96] opacity-10 blur-xl pointer-events-none' : 'scale-100 opacity-100'}
                ${block.isLogo ? 'bg-white text-black z-10' : `${MATTE_BLOCK} cursor-pointer hover:border-white/20`}
                group overflow-hidden
              `}
              style={{
                transform: !anyActive ? `perspective(1000px) rotateX(${mousePos.y * 0.05}deg) rotateY(${mousePos.x * -0.05}deg)` : '',
              }}
            >
              {/* Demo Logic for Work Slab */}
              {block.isWork && (
                <div className="absolute inset-0 z-0">
                  {demos.map((demo, idx) => (
                    <div key={demo.id} className={`absolute inset-0 transition-opacity duration-1000 ${currentDemo === idx ? 'opacity-30' : 'opacity-0'}`}>
                      <img src={demo.img} className="w-full h-full object-cover grayscale" onError={(e) => e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200"} />
                    </div>
                  ))}
                </div>
              )}

              <div className="relative z-10 h-full w-full p-[2.5vw] flex flex-col justify-between">
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
                    <h2 className={`font-black tracking-tighter uppercase leading-[0.85] ${block.isLogo ? 'text-[5vw] italic' : 'text-[1.2vw] opacity-40 group-hover:opacity-100'}`}>
                      {block.label}
                    </h2>
                  </div>
                  {block.isLogo && <span className="text-[0.6vw] font-black tracking-[0.4em] opacity-30">OS V.26 / ZA</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Popup Viewport */}
      {activeBlock && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl" onClick={() => setActiveBlock(null)} />
            <div className="relative bg-[#0d0d0d] border border-white/10 w-full max-w-5xl rounded-[3vw] shadow-3xl overflow-hidden animate-in zoom-in-95 duration-500">
                <div className="flex flex-col md:flex-row min-h-[60vh]">
                    <div className="w-full md:w-1/2 p-12 flex flex-col justify-between bg-black/20 border-r border-white/5">
                        <div>
                            <span className="text-[10px] font-black tracking-[0.5em] text-indigo-500 uppercase block mb-8">{activeBlock.label}</span>
                            <h3 className="text-6xl font-black uppercase tracking-tighter mb-4 leading-none">{activeBlock.title || "Selected"}</h3>
                        </div>
                        <button onClick={() => setActiveBlock(null)} className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-700 hover:text-white transition-colors">Close Viewport</button>
                    </div>
                    <div className="w-full md:w-1/2 p-12 flex items-center justify-center">
                        {/* Dynamic content renders here based on ID as per previous blocks */}
                        <div className="w-full space-y-4">
                            <div className="p-6 bg-white/5 border border-white/5 rounded-2xl">
                                <p className="text-zinc-400 leading-relaxed italic">{activeBlock.desc || "Digital Architecture Studio focusing on performance and conversion."}</p>
                            </div>
                            <button className="w-full py-6 bg-indigo-600 rounded-xl font-black uppercase tracking-[0.2em] text-[10px]">Execute Action</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
