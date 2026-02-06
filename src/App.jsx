import React, { useState, useEffect } from 'react';
import { 
  X, ArrowUpRight, Zap, Send, Layers, Layout, 
  Instagram, Twitter, ArrowRight, MessageCircle, Mail,
  ChevronRight, Code, Cpu, Search, CheckCircle2, Clock, Globe,
  MessageSquare, AtSign, Smartphone
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
    { id: 2, name: 'Roast & Ritual', tag: 'Boutique Coffee', img: '/coffee-hero.webp', color: 'from-brown-500/20' },
    { id: 3, name: 'MG Installations', tag: 'Technical Services', img: '/installations-hero.webp', color: 'from-blue-500/20' }
  ];

  // Using Lucide Components directly for the large corner visuals
  const contacts = [
    { 
        id: 'wa', label: 'WhatsApp', value: '+27 67 686 2733', icon: <MessageCircle size={20} />, 
        color: 'text-emerald-500', glint: 'bg-emerald-500/10', 
        Visual: MessageSquare
    },
    { 
        id: 'ig', label: 'Instagram', value: '@arcodic.studio', icon: <Instagram size={20} />, 
        color: 'text-pink-500', glint: 'bg-pink-500/10',
        Visual: Instagram
    },
    { 
        id: 'mail', label: 'Email', value: 'hello@arcodic.com', icon: <Mail size={20} />, 
        color: 'text-indigo-500', glint: 'bg-indigo-500/10',
        Visual: AtSign
    }
  ];

  useEffect(() => {
    setTimeout(() => setDispersed(true), 400);
    const workTimer = setInterval(() => setCurrentDemo((p) => (p + 1) % demos.length), 4000);
    const contactTimer = setInterval(() => setCurrentContact((p) => (p + 1) % contacts.length), 3500);
    const clockTimer = setInterval(() => {
        setStatusTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
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
    { id: 'service', label: 'EXPERTISE', pos: 'md:top-[38vh] md:left-[4vw] md:w-[38vw] md:h-[32vh]', icon: <Layers size={28}/>, title: 'Strategic Stack' },
    { id: 'speed', label: 'VELOCITY', pos: 'md:bottom-[4vh] md:left-[4vw] md:w-[18vw] md:h-[22vh]', icon: <Zap size={28}/>, title: 'The 24H Sprint' },
    { id: 'social', label: 'CONNECT', pos: 'md:bottom-[4vh] md:left-[24vw] md:w-[18vw] md:h-[22vh]', icon: <Instagram size={28}/>, title: 'Global Feed' },
  ];

  const renderPopupContent = () => {
    if (!activeBlock) return null;
    switch (activeBlock.id) {
      case 'work':
        return (
          <div className="grid grid-cols-1 gap-4 w-full animate-in fade-in duration-700">
            {demos.map((d) => (
              <div key={d.id} className="group flex items-center justify-between p-4 md:p-6 bg-white/[0.03] border border-white/5 rounded-2xl md:rounded-[1.5vw] hover:border-indigo-500/50 transition-all overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${d.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="flex gap-4 md:gap-6 items-center relative z-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-zinc-800 rounded-xl overflow-hidden grayscale-[0.4] group-hover:grayscale-0 transition-all duration-700">
                    <img src={d.img} className="w-full h-full object-cover" alt={d.name} />
                  </div>
                  <div>
                    <p className="text-[9px] md:text-[10px] font-black text-indigo-500 uppercase tracking-widest">{d.tag}</p>
                    <h4 className="text-xl md:text-2xl font-black uppercase tracking-tighter">{d.name}</h4>
                  </div>
                </div>
                <ArrowUpRight size={20} className="relative z-10 opacity-20 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        );
      case 'cta':
        return (
          <div className="grid grid-cols-1 gap-3 w-full animate-in fade-in duration-700">
            <div className="mb-2 p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                <p className="text-emerald-500 text-[9px] font-black tracking-widest uppercase mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Available for Q2
                </p>
                <p className="text-zinc-400 text-xs">Direct responses within 2 hours.</p>
            </div>
            {contacts.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-5 bg-white/[0.03] border border-white/5 rounded-2xl group hover:border-white/20 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={c.color}>{c.icon}</div>
                  <span className="font-bold text-xs md:text-sm">{c.value}</span>
                </div>
                <ArrowRight size={16} className="opacity-40 group-hover:opacity-100 transition-all"/>
              </div>
            ))}
          </div>
        );
      default:
        return <div className="text-zinc-500 italic">Module content coming soon...</div>;
    }
  };

  return (
    <div className="h-screen w-full bg-[#050505] overflow-x-hidden md:overflow-hidden text-white font-sans selection:bg-indigo-500 antialiased">
      
      {/* Tray */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] hidden md:flex items-center gap-6 px-6 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">System Ready</span>
        </div>
        <div className="w-[1px] h-3 bg-white/10" />
        <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">{statusTime || "00:00:00"} SAST</span>
        <div className="w-[1px] h-3 bg-white/10" />
        <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">Latency: 12ms</span>
      </div>

      <div className="relative h-full w-full flex flex-col md:block p-4 md:p-0 overflow-y-auto md:overflow-visible gap-4">
        {blocks.map((block) => {
          const isActive = activeBlock?.id === block.id;
          const anyActive = activeBlock !== null;

          return (
            <div
              key={block.id}
              onClick={() => !block.isLogo && setActiveBlock(block)}
              className={`
                transition-all duration-[1200ms] cubic-bezier(0.19, 1, 0.22, 1) rounded-3xl md:rounded-[2.5vw]
                md:absolute ${dispersed ? block.pos : 'md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-16 md:h-16 md:opacity-0 md:scale-50'}
                relative w-full h-[25vh] min-h-[180px]
                ${block.isLogo ? 'h-[15vh] min-h-[120px] bg-white text-black z-10' : 'bg-[#0d0d0d] border border-white/5 shadow-2xl cursor-pointer'}
                ${anyActive && !isActive ? 'md:scale-[0.96] md:opacity-10 md:blur-xl pointer-events-none' : 'scale-100 opacity-100'}
                group overflow-hidden
              `}
              style={{
                transform: (!anyActive && window.innerWidth > 768) ? `perspective(1000px) rotateX(${mousePos.y * 0.05}deg) rotateY(${mousePos.x * -0.05}deg)` : '',
              }}
            >
              {/* Background Work Images */}
              {block.isWork && (
                <div className="absolute inset-0 z-0 opacity-40">
                  {demos.map((d, idx) => (
                    <img 
                        key={d.id} 
                        src={d.img} 
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 
                        ${currentDemo === idx ? 'opacity-100 grayscale-[0.6] scale-100' : 'opacity-0 scale-110'}`} 
                        alt="" 
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
                </div>
              )}

              {/* INQUIRY BLOCK: Lucide Visuals & Glint */}
              {block.isContact && (
                <>
                  {/* Color Glint */}
                  {contacts.map((c, idx) => (
                    <div 
                      key={c.id + '_glint'}
                      className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${c.glint} ${currentContact === idx ? 'opacity-100' : 'opacity-0'}`} 
                    />
                  ))}

                  {/* Corner Lucide Icons */}
                  <div className="absolute -top-6 -right-6 z-0 pointer-events-none">
                    {contacts.map((c, idx) => {
                        const VisualIcon = c.Visual;
                        const active = currentContact === idx;
                        return (
                          <div key={c.id + '_vis'} className="relative">
                            {/* Ghost Icon (Larger, lower opacity) */}
                            <VisualIcon 
                                size={180} 
                                strokeWidth={0.5} 
                                className={`absolute -top-12 -right-12 transition-all duration-1000 text-white
                                ${active ? 'opacity-[0.07] scale-100 rotate-0' : 'opacity-0 scale-75 rotate-12'}`}
                            />
                            {/* Focus Icon (Smaller, slightly brighter) */}
                            <VisualIcon 
                                size={100} 
                                strokeWidth={1} 
                                className={`absolute top-4 right-4 transition-all duration-1000 text-white
                                ${active ? 'opacity-20 scale-100 translate-x-0' : 'opacity-0 scale-90 translate-x-10'}`}
                            />
                          </div>
                        );
                    })}
                  </div>
                </>
              )}

              <div className="relative z-10 h-full w-full p-6 md:p-[2.5vw] flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start">
                  <div className={`transition-all duration-700 ${block.isLogo ? 'text-black' : 'text-indigo-500'}`}>
                    {block.isWork ? <Layout size={20} /> : block.isContact ? <Send size={20} /> : (block.icon || <div className="font-black text-xl italic leading-none">AR</div>)}
                  </div>
                  {!block.isLogo && <ArrowUpRight size={18} className="opacity-40 md:opacity-0 md:group-hover:opacity-100 transition-all" />}
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    {block.isWork && <div className="mb-2"><p className="text-[9px] font-black tracking-[0.3em] text-indigo-500 uppercase">{demos[currentDemo].name}</p></div>}
                    {block.isContact && <div className="mb-2"><p className={`text-[9px] font-black tracking-[0.3em] uppercase transition-colors duration-700 ${contacts[currentContact].color}`}>{contacts[currentContact].value}</p></div>}
                    <h2 className={`font-black tracking-tighter uppercase leading-[0.85] ${block.isLogo ? 'text-4xl md:text-[5vw] italic' : 'text-xl md:text-[1.2vw] opacity-80 md:opacity-40 md:group-hover:opacity-100'}`}>
                      {block.label}
                    </h2>
                  </div>
                  {block.isLogo && <span className="text-[10px] md:text-[0.6vw] font-black tracking-[0.4em] opacity-30 italic uppercase">Cape Town / 26</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Popup Viewport */}
      {activeBlock && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl" onClick={() => setActiveBlock(null)} />
            <div className="relative bg-[#0d0d0d] border border-white/10 w-full max-w-4xl rounded-3xl md:rounded-[3vw] shadow-3xl overflow-y-auto md:overflow-hidden animate-in zoom-in-95 duration-500 max-h-[90vh]">
                <div className="flex flex-col md:flex-row min-h-[50vh]">
                    <div className="w-full md:w-1/3 p-8 md:p-12 bg-black/40 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between gap-8">
                        <div>
                            <span className="text-[9px] font-black tracking-[0.5em] text-indigo-500 uppercase block mb-4 md:mb-8">{activeBlock.label}</span>
                            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">{activeBlock.title || "Selected"}</h3>
                        </div>
                        <button onClick={() => setActiveBlock(null)} className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 hover:text-white transition-colors">
                            <X size={14} /> Close
                        </button>
                    </div>
                    <div className="w-full md:w-2/3 p-8 md:p-12 flex items-center">
                        {renderPopupContent()}
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default App;
