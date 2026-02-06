import React, { useState, useEffect } from 'react';
import { 
  X, ArrowUpRight, Zap, Send, Layers, Layout, 
  Instagram, Twitter, ArrowRight, MessageCircle, Mail,
  ChevronRight, Code, Cpu, Search, CheckCircle2, Clock, Globe
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
    { id: 'wa', label: 'WhatsApp', value: '+27 67 686 2733', icon: <MessageCircle size={20} />, color: 'text-emerald-500' },
    { id: 'ig', label: 'Instagram', value: '@arcodic.studio', icon: <Instagram size={20} />, color: 'text-pink-500' },
    { id: 'mail', label: 'Email', value: 'hello@arcodic.com', icon: <Mail size={20} />, color: 'text-indigo-500' }
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
    { id: 'social', label: 'CONNECT', pos: 'bottom-[4vh] left-[24vw] w-[18vw] h-[22vh]', icon: <Instagram size={28}/>, title: 'Global Feed' },
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

      case 'speed': // VELOCITY POPUP
        return (
          <div className="w-full space-y-6 animate-in slide-in-from-bottom-4 duration-700">
            <div className="p-8 bg-amber-500/5 border border-amber-500/20 rounded-[2vw] relative overflow-hidden">
                <Zap className="absolute -right-8 -top-8 w-40 h-40 text-amber-500 opacity-5 -rotate-12" />
                <h4 className="text-amber-500 text-[10px] font-black tracking-[0.4em] uppercase mb-4">Express Execution</h4>
                <p className="text-xl text-zinc-300 font-medium leading-relaxed mb-6">
                    We reserve specific slots for <span className="text-white font-bold">Rapid Deployment</span>. 
                    From brief to live URL in exactly 24 hours.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: 'Standard Web', time: '2-4 Weeks' },
                        { label: 'Arcodic Sprint', time: '24 Hours', highlight: true }
                    ].map(item => (
                        <div key={item.label} className={`p-4 rounded-xl border ${item.highlight ? 'border-amber-500/40 bg-amber-500/10' : 'border-white/5 bg-white/5'}`}>
                            <p className="text-[9px] uppercase tracking-widest opacity-50 mb-1">{item.label}</p>
                            <p className={`font-black ${item.highlight ? 'text-amber-500' : 'text-white'}`}>{item.time}</p>
                        </div>
                    ))}
                </div>
            </div>
            <button className="w-full py-6 bg-amber-500 text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-xl hover:scale-[1.02] transition-transform">
                Claim Next Available Slot
            </button>
          </div>
        );

      case 'social': // CONNECT POPUP
        return (
          <div className="w-full grid grid-cols-2 gap-4 animate-in zoom-in-95 duration-700">
            <div className="col-span-2 p-10 bg-white/[0.02] border border-white/5 rounded-[2vw] text-center">
                <Globe className="mx-auto mb-4 text-indigo-500 opacity-50" size={32} />
                <h4 className="text-xl font-black uppercase tracking-tighter">Global Presence</h4>
                <p className="text-zinc-500 text-sm mt-2">Based in ZA. Operating Worldwide.</p>
            </div>
            <a href="https://instagram.com" target="_blank" className="p-8 bg-white/[0.03] border border-white/5 rounded-[1.5vw] flex flex-col items-center gap-3 hover:bg-pink-500/10 hover:border-pink-500/50 transition-all group">
                <Instagram size={30} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">Instagram</span>
            </a>
            <a href="https://twitter.com" target="_blank" className="p-8 bg-white/[0.03] border border-white/5 rounded-[1.5vw] flex flex-col items-center gap-3 hover:bg-blue-500/10 hover:border-blue-500/50 transition-all group">
                <Twitter size={30} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">Twitter / X</span>
            </a>
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

      case 'cta':
        return (
          <div className="grid grid-cols-1 gap-3 w-full animate-in fade-in duration-700">
            <div className="mb-4 p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                <p className="text-emerald-500 text-[10px] font-black tracking-widest uppercase mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Available for Q2
                </p>
                <p className="text-zinc-400 text-sm">We take on 2 high-ticket builds per month to ensure quality.</p>
            </div>
            {contacts.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-6 bg-white/[0.03] border border-white/5 rounded-[1.5vw] group hover:border-white/20 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={c.color}>{c.icon}</div>
                  <span className="font-bold text-sm">{c.value}</span>
                </div>
                <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0"/>
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
        <div className="w-[1px] h-3 bg-white/10" />
        <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">{statusTime || "00:00:00"} SAST</span>
        <div className="w-[1px] h-3 bg-white/10" />
        <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">Latency: 12ms</span>
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
                ${block.isLogo ? 'bg-white text-black z-10' : 'bg-[#0d0d0d] border border-white/5 shadow-2xl cursor-pointer hover:border-white/20'}
                group overflow-hidden
              `}
              style={{
                transform: !anyActive ? `perspective(1000px) rotateX(${mousePos.y * 0.05}deg) rotateY(${mousePos.x * -0.05}deg)` : '',
                boxShadow: block.isLogo ? `${mousePos.x * -0.5}px ${mousePos.y * -0.5}px 50px rgba(0,0,0,0.2)` : ''
              }}
            >
              {/* Work Layer with Subtle Color */}
              {block.isWork && (
                <div className="absolute inset-0 z-0 opacity-40">
                  {demos.map((d, idx) => (
                    <img 
                        key={d.id} 
                        src={d.img} 
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 
                        ${currentDemo === idx ? 'opacity-100 grayscale-[0.6] group-hover:grayscale-0 scale-100' : 'opacity-0 scale-110'}`} 
                        alt="" 
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
                </div>
              )}

              {block.isContact && (
                <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none">
                  {contacts.map((c, idx) => (
                    <span key={c.id} className={`absolute text-5xl font-black uppercase tracking-tighter transition-all duration-1000 ${currentContact === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>{c.label}</span>
                  ))}
                </div>
              )}

              <div className="relative z-10 h-full w-full p-[2.5vw] flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start">
                  <div className={`transition-all duration-700 ${block.isLogo ? 'text-black' : 'text-indigo-500'}`}>
                    {block.isWork ? <Layout size={24} /> : block.isContact ? <Send size={24} className="animate-pulse" /> : (block.icon || <div className="font-black text-2xl italic leading-none">AR</div>)}
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
                  {block.isLogo && <span className="text-[0.6vw] font-black tracking-[0.4em] opacity-30 italic uppercase">Cape Town / 26</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Popup Viewport */}
      {activeBlock && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl" onClick={() => setActiveBlock(null)} />
            <div className="relative bg-[#0d0d0d] border border-white/10 w-full max-w-4xl rounded-[3vw] shadow-3xl overflow-hidden animate-in zoom-in-95 duration-500">
                <div className="flex flex-col md:flex-row min-h-[50vh]">
                    <div className="w-full md:w-1/3 p-12 bg-black/40 border-r border-white/5 flex flex-col justify-between">
                        <div>
                            <span className="text-[10px] font-black tracking-[0.5em] text-indigo-500 uppercase block mb-8">{activeBlock.label}</span>
                            <h3 className="text-5xl font-black uppercase tracking-tighter leading-none">{activeBlock.title || "Selected"}</h3>
                        </div>
                        <button onClick={() => setActiveBlock(null)} className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.5em] text-zinc-700 hover:text-white transition-colors">
                            <X size={14} /> Close
                        </button>
                    </div>
                    <div className="w-full md:w-2/3 p-12 flex items-center">
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
