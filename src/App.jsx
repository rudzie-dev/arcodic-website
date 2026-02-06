import React, { useState, useEffect } from 'react';
import { 
  X, ArrowUpRight, Zap, Send, Layers, Layout, 
  Instagram, Twitter, ArrowRight, MessageCircle, Mail,
  Code, Cpu, Search, Globe, ChevronDown
} from 'lucide-react';

const App = () => {
  const [dispersed, setDispersed] = useState(false);
  const [activeBlock, setActiveBlock] = useState(null);
  const [currentDemo, setCurrentDemo] = useState(0);
  const [currentContact, setCurrentContact] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [statusTime, setStatusTime] = useState("");

  const demos = [
    { id: 1, name: 'Noir Atelier', tag: 'Luxury Hospitality', img: '/salon-hero.webp', color: 'from-orange-500/20' },
    { id: 2, name: 'Roast & Ritual', tag: 'Boutique Coffee', img: '/coffee-hero.webp', color: 'from-stone-500/20' },
    { id: 3, name: 'MG Installations', tag: 'Technical Services', img: '/installations-hero.webp', color: 'from-blue-500/20' }
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
        setStatusTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    }, 1000);

    const handleMouse = (e) => {
      if (window.innerWidth > 768) {
        setMousePos({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        });
      }
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
    { id: 'logo', label: 'ARCODIC.', pos: 'md:top-[4vh] md:left-[4vw] md:w-[38vw] md:h-[30vh]', isLogo: true },
    { id: 'work', label: 'WORK', pos: 'md:top-[4vh] md:right-[4vw] md:w-[50vw] md:h-[60vh]', isWork: true, title: "Portfolio Archive" },
    { id: 'cta', label: 'INQUIRY', pos: 'md:bottom-[4vh] md:right-[4vw] md:w-[50vw] md:h-[28vh]', isContact: true, title: "Direct Channels" },
    { id: 'service', label: 'EXPERTISE', pos: 'md:top-[38vh] md:left-[4vw] md:w-[38vw] md:h-[32vh]', icon: <Layers size={24}/>, title: 'Strategic Stack' },
    { id: 'speed', label: 'VELOCITY', pos: 'md:bottom-[4vh] md:left-[4vw] md:w-[18vw] md:h-[22vh]', icon: <Zap size={24}/>, title: 'The 24H Sprint' },
    { id: 'social', label: 'CONNECT', pos: 'md:bottom-[4vh] md:left-[24vw] md:w-[18vw] md:h-[22vh]', icon: <Instagram size={24}/>, title: 'Global Feed' },
  ];

  const renderPopupContent = () => {
    if (!activeBlock) return null;
    switch (activeBlock.id) {
      case 'work':
        return (
          <div className="space-y-4 w-full">
            {demos.map((d) => (
              <div key={d.id} className="group relative flex items-center justify-between p-5 bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden">
                <div className="flex gap-4 items-center relative z-10">
                  <img src={d.img} className="w-16 h-16 rounded-lg object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                  <div>
                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{d.tag}</p>
                    <h4 className="text-lg font-black uppercase text-white">{d.name}</h4>
                  </div>
                </div>
                <ArrowUpRight size={20} className="text-white/20 group-hover:text-white transition-colors" />
              </div>
            ))}
          </div>
        );
      case 'speed':
        return (
          <div className="space-y-4 w-full">
            <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
              <h4 className="text-amber-500 font-black uppercase tracking-widest mb-2">24H High-Impact</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">Specific slots reserved for emergency deployments. Brief to live in one sun-cycle.</p>
            </div>
            <button className="w-full py-4 bg-amber-500 text-black font-black uppercase text-[10px] tracking-widest rounded-xl">Claim Next Slot</button>
          </div>
        );
      case 'cta':
        return (
          <div className="space-y-3 w-full">
            {contacts.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-5 bg-white/[0.03] border border-white/5 rounded-xl group transition-all">
                <div className="flex items-center gap-4">
                  <div className={c.color}>{c.icon}</div>
                  <span className="font-bold text-sm">{c.value}</span>
                </div>
                <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-all" />
              </div>
            ))}
          </div>
        );
      case 'social':
        return (
          <div className="grid grid-cols-2 gap-4 w-full">
            <a href="#" className="p-8 bg-white/[0.03] rounded-2xl border border-white/5 flex flex-col items-center gap-2 hover:bg-pink-500/10 transition-all">
              <Instagram size={24} /> <span className="text-[10px] font-black uppercase tracking-widest">IG</span>
            </a>
            <a href="#" className="p-8 bg-white/[0.03] rounded-2xl border border-white/5 flex flex-col items-center gap-2 hover:bg-blue-500/10 transition-all">
              <Twitter size={24} /> <span className="text-[10px] font-black uppercase tracking-widest">X</span>
            </a>
          </div>
        );
      default:
        return <div className="p-6 text-zinc-500 text-center italic">Service protocols engaged.</div>;
    }
  };

  return (
    <div className="h-screen w-full bg-[#050505] text-white font-sans antialiased overflow-hidden flex flex-col">
      
      {/* Persistent System Header */}
      <div className="w-full px-6 py-4 flex justify-between items-center border-b border-white/5 bg-black/50 backdrop-blur-md z-[100]">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-60">System Ready</span>
        </div>
        <span className="text-[10px] font-black tracking-[0.2em] opacity-40">{statusTime} SAST</span>
      </div>

      {/* Main OS Canvas */}
      <div className="relative flex-1 p-4 md:p-0 overflow-y-auto md:overflow-hidden scrollbar-hide">
        <div className="flex flex-col md:block w-full h-full gap-4">
          {blocks.map((block) => {
            const isActive = activeBlock?.id === block.id;
            const anyActive = activeBlock !== null;

            return (
              <div
                key={block.id}
                onClick={() => !block.isLogo && setActiveBlock(block)}
                className={`
                  /* Layout Logic */
                  relative w-full min-h-[160px] md:absolute md:min-h-0
                  transition-all duration-[1000ms] cubic-bezier(0.19, 1, 0.22, 1) rounded-[32px] md:rounded-[2.5vw]
                  ${dispersed ? block.pos : 'opacity-0 translate-y-10'}
                  ${anyActive && !isActive ? 'md:scale-[0.96] md:opacity-10 md:blur-xl pointer-events-none' : 'scale-100 opacity-100'}
                  /* Aesthetic Logic */
                  ${block.isLogo ? 'bg-white text-black z-10 sticky top-0 md:relative' : 'bg-[#0d0d0d] border border-white/5 cursor-pointer hover:border-white/20'}
                  group overflow-hidden
                `}
                style={{
                  transform: (dispersed && !anyActive && window.innerWidth > 768) ? `perspective(1000px) rotateX(${mousePos.y * 0.05}deg) rotateY(${mousePos.x * -0.05}deg)` : '',
                }}
              >
                {/* Visual Layers */}
                {block.isWork && (
                  <div className="absolute inset-0 z-0 opacity-40">
                    {demos.map((d, idx) => (
                      <img key={d.id} src={d.img} className={`absolute inset-0 w-full h-full object-cover grayscale transition-all duration-1000 ${currentDemo === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`} />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  </div>
                )}

                {/* Content Container */}
                <div className="relative z-10 h-full w-full p-8 md:p-[2.5vw] flex flex-col justify-between pointer-events-none">
                  <div className="flex justify-between items-start">
                    <div className={block.isLogo ? 'text-black' : 'text-indigo-500'}>
                      {block.isWork ? <Layout size={24} /> : block.isContact ? <Send size={24} className="animate-pulse" /> : (block.icon || <div className="font-black text-2xl italic leading-none">AR</div>)}
                    </div>
                    {!block.isLogo && <ArrowUpRight size={18} className="opacity-40" />}
                  </div>

                  <div>
                    {block.isWork && <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">{demos[currentDemo].name}</p>}
                    {block.isContact && <p className={`text-[10px] font-black uppercase tracking-widest mb-1 transition-colors ${contacts[currentContact].color}`}>{contacts[currentContact].label}</p>}
                    <h2 className={`font-black tracking-tighter uppercase leading-[0.85] ${block.isLogo ? 'text-[12vw] md:text-[5vw] italic' : 'text-lg md:text-[1.2vw] opacity-60'}`}>
                      {block.label}
                    </h2>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Spacer for mobile scrolling */}
          <div className="h-8 md:hidden" />
        </div>
      </div>

      {/* Popup Viewport (Bottom Sheet on Mobile, Modal on Desktop) */}
      {activeBlock && (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-in fade-in duration-500" onClick={() => setActiveBlock(null)} />
            <div className="relative bg-[#0d0d0d] border-t md:border border-white/10 w-full max-w-4xl rounded-t-[40px] md:rounded-[3vw] shadow-3xl overflow-hidden animate-in slide-in-from-bottom-full md:slide-in-from-bottom-0 md:zoom-in-95 duration-500">
                
                {/* Mobile Handle */}
                <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mt-4 md:hidden" />

                <div className="flex flex-col md:flex-row min-h-[40vh] md:min-h-[50vh]">
                    <div className="w-full md:w-1/3 p-10 bg-black/20 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between">
                        <div>
                            <span className="text-[10px] font-black tracking-[0.5em] text-indigo-500 uppercase block mb-4 md:mb-8">{activeBlock.label}</span>
                            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">{activeBlock.title || "Archive"}</h3>
                        </div>
                        <button onClick={() => setActiveBlock(null)} className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 hover:text-white transition-colors">
                           <X size={14}/> Close
                        </button>
                    </div>
                    <div className="w-full md:w-2/3 p-10 flex items-center overflow-y-auto max-h-[60vh] md:max-h-none">
                        {renderPopupContent()}
                    </div>
                    <button onClick={() => setActiveBlock(null)} className="md:hidden w-full py-6 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 border-t border-white/5">
                        Dismiss
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default App;
