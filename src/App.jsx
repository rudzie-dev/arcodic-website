import React, { useState, useEffect } from 'react';
import { 
  X, ArrowUpRight, Zap, Send, Layers, Layout, 
  ArrowRight, MessageCircle, Mail, Clock, Globe, AtSign,
  Code, Cpu, Search, Twitter, Instagram
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

  const contacts = [
    { 
        id: 'wa', label: 'WhatsApp', value: '+27 67 686 2733', 
        color: 'text-[#25D366]', glint: 'bg-[#25D366]/10',
        path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.123.552 4.197 1.603 6.02L0 24l6.137-1.613a11.887 11.887 0 005.908 1.562h.005c6.635 0 12.05-5.414 12.05-12.051a11.82 11.82 0 00-3.483-8.52"
    },
    { 
        id: 'ig', label: 'Instagram', value: '@arcodic.studio', 
        color: 'text-pink-500', glint: 'bg-pink-500/10',
        path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
    },
    { 
        id: 'mail', label: 'Email', value: 'hello@arcodic.com', 
        color: 'text-indigo-500', glint: 'bg-indigo-500/10',
        path: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
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
    { id: 'logo', label: 'ARCODIC.', pos: 'top-[4vh] left-[4vw] w-[38vw] h-[30vh]', isLogo: true },
    { id: 'work', label: 'WORK', pos: 'top-[4vh] right-[4vw] w-[50vw] h-[60vh]', isWork: true, title: "Portfolio Archive" },
    { id: 'cta', label: 'INQUIRY', pos: 'bottom-[4vh] right-[4vw] w-[50vw] h-[28vh]', isContact: true, title: "Direct Channels" },
    { id: 'service', label: 'EXPERTISE', pos: 'top-[38vh] left-[4vw] w-[38vw] h-[32vh]', icon: <Layers size={28}/>, title: 'Strategic Stack' },
    { id: 'speed', label: 'VELOCITY', pos: 'bottom-[4vh] left-[4vw] w-[18vw] h-[22vh]', icon: <Zap size={28}/>, title: 'The 24H Sprint' },
    { id: 'social', label: 'CONNECT', pos: 'bottom-[4vh] left-[24vw] w-[18vw] h-[22vh]', icon: <Globe size={28}/>, title: 'Global Feed' },
  ];

  const renderPopupContent = () => {
    if (!activeBlock) return null;
    switch (activeBlock.id) {
      case 'work':
        return (
          <div className="grid grid-cols-1 gap-4 w-full animate-in fade-in duration-700">
            {demos.map((d) => (
              <div key={d.id} className="group flex items-center justify-between p-6 bg-white/[0.03] border border-white/5 rounded-[1.5vw] hover:border-indigo-500/50 transition-all overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${d.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="flex gap-6 items-center relative z-10">
                  <div className="w-20 h-20 bg-zinc-800 rounded-xl overflow-hidden grayscale-[0.4] group-hover:grayscale-0 transition-all duration-700">
                    <img src={d.img} className="w-full h-full object-cover" alt={d.name} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{d.tag}</p>
                    <h4 className="text-2xl font-black uppercase tracking-tighter">{d.name}</h4>
                  </div>
                </div>
                <ArrowUpRight size={24} className="relative z-10 opacity-20 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        );
      case 'cta':
        return (
          <div className="grid grid-cols-1 gap-3 w-full animate-in fade-in duration-700">
            <div className="mb-4 p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                <p className="text-emerald-500 text-[10px] font-black tracking-widest uppercase mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Available for Q2
                </p>
                <p className="text-zinc-400 text-sm">Direct responses within 2 hours.</p>
            </div>
            {contacts.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-6 bg-white/[0.03] border border-white/5 rounded-[1.5vw] group hover:border-white/20 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={c.color}><Send size={18}/></div>
                  <span className="font-bold text-sm">{c.value}</span>
                </div>
                <ArrowRight size={16} className="opacity-40 group-hover:opacity-100 transition-all"/>
              </div>
            ))}
          </div>
        );
      case 'service':
        return (
          <div className="grid grid-cols-1 gap-4 w-full">
            {[
              { icon: <Code size={20}/>, label: "Full-Stack Dev", desc: "Next.js, TypeScript, and high-performance API integration." },
              { icon: <Cpu size={20}/>, label: "UI Architecture", desc: "Design systems built for scale and frame-perfect motion." },
              { icon: <Search size={20}/>, label: "SEO Strategy", desc: "Technical optimization to ensure your brand is discovered." }
            ].map((s, i) => (
              <div key={i} className="p-6 bg-white/[0.03] border border-white/5 rounded-[1.5vw] flex gap-5">
                <div className="text-indigo-500 mt-1">{s.icon}</div>
                <div>
                    <h4 className="font-black uppercase tracking-tighter text-white mb-1">{s.label}</h4>
                    <p className="text-sm text-zinc-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-full bg-[#050505] overflow-hidden text-white font-sans selection:bg-indigo-500 antialiased">
      
      {/* System Status Tray */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] hidden md:flex items-center gap-6 px-6 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">System Ready</span>
        </div>
        <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">{statusTime || "00:00:00"} SAST</span>
      </div>

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
                ${block.isLogo ? 'bg-white text-black z-10' : 'bg-[#0d0d0d] border border-white/5 shadow-2xl cursor-pointer'}
                group overflow-hidden
              `}
              style={{
                transform: !anyActive ? `perspective(1000px) rotateX(${mousePos.y * 0.05}deg) rotateY(${mousePos.x * -0.05}deg)` : '',
              }}
            >
              {/* WORK BLOCK: Images restored */}
              {block.isWork && (
                <div className="absolute inset-0 z-0 opacity-40">
                  {demos.map((d, idx) => (
                    <img key={d.id} src={d.img} className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${currentDemo === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`} alt="" />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
                </div>
              )}

              {/* INQUIRY BLOCK: Official Logos anchored correctly */}
              {block.isContact && (
                <div className="absolute inset-0 z-0 pointer-events-none">
                  {contacts.map((c, idx) => (
                    <div key={c.id + 'g'} className={`absolute inset-0 transition-opacity duration-1000 ${c.glint} ${currentContact === idx ? 'opacity-100' : 'opacity-0'}`} />
                  ))}
                  <div className="absolute -top-12 -right-12">
                     {contacts.map((c, idx) => (
                        <svg 
                          key={c.id + 'l'} 
                          viewBox="0 0 24 24" 
                          fill="currentColor" 
                          className={`w-64 h-64 absolute top-0 right-0 transition-all duration-1000 text-white
                          ${currentContact === idx ? 'scale-100 opacity-[0.08] rotate-0' : 'scale-75 opacity-0 rotate-12'}`}
                        >
                            <path d={c.path} />
                        </svg>
                     ))}
                  </div>
                </div>
              )}

              {/* Content Layer (Labels/Icons) */}
              <div className="relative z-10 h-full w-full p-[2.5vw] flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start">
                  <div className={`transition-all duration-700 ${block.isLogo ? 'text-black' : 'text-indigo-500'}`}>
                    {block.isWork ? <Layout size={24} /> : block.isContact ? <Send size={24} /> : (block.icon || <div className="font-black text-2xl italic">AR</div>)}
                  </div>
                  {!block.isLogo && <ArrowUpRight size={18} className="opacity-40" />}
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    {block.isWork && <div className="mb-2"><p className="text-[10px] font-black tracking-[0.3em] text-indigo-500 uppercase">{demos[currentDemo].name}</p></div>}
                    {block.isContact && <div className="mb-2"><p className={`text-[10px] font-black tracking-[0.3em] uppercase transition-colors duration-700 ${contacts[currentContact].color}`}>{contacts[currentContact].value}</p></div>}
                    <h2 className={`font-black tracking-tighter uppercase leading-[0.85] ${block.isLogo ? 'text-[5vw] italic' : 'text-[1.2vw] opacity-80'}`}>
                      {block.label}
                    </h2>
                  </div>
                  {block.isLogo && <span className="text-[0.6vw] font-black tracking-[0.4em] opacity-30 uppercase">CPT / 26</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Popups (Restored Logic) */}
      {activeBlock && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl" onClick={() => setActiveBlock(null)} />
            <div className="relative bg-[#0d0d0d] border border-white/10 w-full max-w-4xl rounded-[3vw] shadow-3xl overflow-hidden animate-in zoom-in-95 duration-500 max-h-[90vh]">
                <div className="flex flex-col md:flex-row min-h-[50vh]">
                    <div className="w-full md:w-1/3 p-12 bg-black/40 border-r border-white/5 flex flex-col justify-between">
                        <div>
                            <span className="text-[10px] font-black tracking-[0.5em] text-indigo-500 uppercase block mb-8">{activeBlock.label}</span>
                            <h3 className="text-5xl font-black uppercase tracking-tighter leading-none">{activeBlock.title || "Selected"}</h3>
                        </div>
                        <button onClick={() => setActiveBlock(null)} className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 hover:text-white transition-colors">
                            <X size={14} /> Close
                        </button>
                    </div>
                    <div className="w-full md:w-2/3 p-12 flex items-center">{renderPopupContent()}</div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default App;
