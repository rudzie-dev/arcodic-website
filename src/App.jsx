import React, { useState, useEffect } from 'react';
import { 
  X, ArrowUpRight, Zap, Send, Layers, Layout, 
  Instagram, Twitter, ArrowRight, MessageCircle, Mail,
  ChevronRight, Phone
} from 'lucide-react';

const App = () => {
  const [dispersed, setDispersed] = useState(false);
  const [activeBlock, setActiveBlock] = useState(null);
  const [currentDemo, setCurrentDemo] = useState(0);
  const [currentContact, setCurrentContact] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 1. Work Demos
  const demos = [
    { id: 1, name: 'Noir Atelier', tag: 'Luxury Hospitality', img: '/salon-hero.webp' },
    { id: 2, name: 'Roast & Ritual', tag: 'Boutique Coffee', img: '/coffee-hero.webp' },
    { id: 3, name: 'MG Installations', tag: 'Technical Services', img: '/installations-hero.webp' }
  ];

  // 2. Contact Channels for Inquiry Slab
  const contacts = [
    { id: 'wa', label: 'WhatsApp', value: '+27 67 686 2733', icon: <MessageCircle size={20} />, color: 'text-emerald-500' },
    { id: 'ig', label: 'Instagram', value: '@arcodic.studio', icon: <Instagram size={20} />, color: 'text-pink-500' },
    { id: 'mail', label: 'Email', value: 'hello@arcodic.com', icon: <Mail size={20} />, color: 'text-indigo-500' }
  ];

  // Auto-cycle Work
  useEffect(() => {
    const timer = setInterval(() => setCurrentDemo((p) => (p + 1) % demos.length), 4000);
    return () => clearInterval(timer);
  }, []);

  // Auto-cycle Inquiry Contacts (Subtle Flash)
  useEffect(() => {
    const timer = setInterval(() => setCurrentContact((p) => (p + 1) % contacts.length), 3500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setTimeout(() => setDispersed(true), 400);
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const blocks = [
    { id: 'logo', label: 'ARCODIC', pos: 'top-[4%] left-[4%] w-[38%] h-[30%]', isLogo: true },
    { id: 'work', label: 'WORK', pos: 'top-[4%] right-[4%] w-[52%] h-[60%]', isWork: true },
    { id: 'cta', label: 'INQUIRY', pos: 'bottom-[4%] right-[4%] w-[52%] h-[28%]', isContact: true },
    { id: 'service', label: 'EXPERTISE', pos: 'top-[38%] left-[4%] w-[38%] h-[32%]', icon: <Layers size={28}/>, title: 'Strategic Stack', desc: 'React, SEO, and Performance.' },
    { id: 'speed', label: 'VELOCITY', pos: 'bottom-[4%] left-[4%] w-[18%] h-[22%]', icon: <Zap size={28}/>, title: '24H Sprints', desc: 'Rapid execution.' },
    { id: 'social', label: 'CONNECT', pos: 'bottom-[4%] left-[24%] w-[18%] h-[22%]', icon: <Instagram size={28}/>, title: 'Studio Social', desc: '@arcodic.design' },
  ];

  return (
    <div className="h-screen w-full bg-[#050505] overflow-hidden text-white font-sans selection:bg-indigo-500 antialiased">
      
      {/* Background Mesh */}
      <div className="absolute inset-0 opacity-20 pointer-events-none transition-transform duration-1000 ease-out"
           style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)` }}>
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-800/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full" />
      </div>

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
                ${block.isLogo ? 'bg-white text-black z-10' : 'bg-[#0d0d0d] border border-white/5 shadow-2xl cursor-pointer hover:border-white/20'}
                group overflow-hidden
              `}
              style={{ transform: !anyActive ? `perspective(1000px) rotateX(${mousePos.y * 0.05}deg) rotateY(${mousePos.x * -0.05}deg)` : '' }}
            >
              {/* WORK BLOCK: Demo Showcase */}
              {block.isWork && (
                <div className="absolute inset-0 z-0">
                  {demos.map((demo, idx) => (
                    <div key={demo.id} className={`absolute inset-0 transition-opacity duration-1000 ${currentDemo === idx ? 'opacity-40' : 'opacity-0'}`}>
                      <img src={demo.img} alt="" className="w-full h-full object-cover grayscale" />
                    </div>
                  ))}
                  <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full">
                     <div className="h-full bg-indigo-600 transition-all duration-[4000ms] ease-linear" style={{ width: `${((currentDemo + 1) / demos.length) * 100}%` }} />
                  </div>
                </div>
              )}

              {/* INQUIRY BLOCK: Subtle Contact Flashing */}
              {block.isContact && (
                <div className="absolute inset-0 z-0 flex items-center justify-center">
                  {contacts.map((contact, idx) => (
                    <div key={contact.id} className={`absolute flex items-center gap-4 transition-all duration-1000 ${currentContact === idx ? 'opacity-10 scale-100 blur-none' : 'opacity-0 scale-110 blur-md'}`}>
                       {contact.icon}
                       <span className="text-4xl font-black uppercase tracking-tighter opacity-20">{contact.label}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="relative z-10 h-full w-full p-10 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className={`transition-all duration-700 ${block.isLogo ? 'text-black' : 'text-indigo-500'}`}>
                    {block.isContact ? <Send size={24} className="animate-pulse" /> : (block.icon || <div className="font-black text-xl">AR</div>)}
                  </div>
                  {!block.isLogo && <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-all" />}
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    {/* Dynamic Label for Inquiry */}
                    {block.isContact && (
                      <div className="mb-2 h-6 overflow-hidden">
                        <p className={`text-[10px] font-black tracking-[0.3em] uppercase transition-all duration-500 ${contacts[currentContact].color}`}>
                          {contacts[currentContact].value}
                        </p>
                      </div>
                    )}
                    <h2 className={`font-black tracking-tighter uppercase leading-[0.85] ${block.isLogo ? 'text-5xl md:text-7xl' : 'text-sm opacity-40 group-hover:opacity-100'}`}>
                      {block.label}
                    </h2>
                  </div>
                  
                  {/* Visual indicator for current active contact */}
                  {block.isContact && (
                    <div className="flex gap-1">
                      {contacts.map((_, i) => (
                        <div key={i} className={`w-1 h-1 rounded-full transition-all duration-500 ${currentContact === i ? 'bg-indigo-500 w-3' : 'bg-white/10'}`} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Popups */}
      {activeBlock && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 md:p-12">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl" onClick={() => setActiveBlock(null)} />
            <div className="relative bg-[#0d0d0d] border border-white/10 w-full max-w-4xl min-h-[500px] rounded-[48px] shadow-3xl overflow-hidden animate-in zoom-in-95 duration-500">
                <div className="flex h-full flex-col md:flex-row">
                    <div className="w-full md:w-1/2 p-12 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between bg-black/20 text-center md:text-left">
                        <div>
                            <span className="text-[10px] font-black tracking-[0.4em] text-indigo-500 uppercase block mb-6">{activeBlock.label}</span>
                            <h3 className="text-5xl font-black uppercase tracking-tighter mb-4 leading-none">{activeBlock.isContact ? "Get Connected" : activeBlock.title || "Archive"}</h3>
                            <p className="text-zinc-500 text-lg">Direct channels to the Arcodic design team.</p>
                        </div>
                        <button onClick={() => setActiveBlock(null)} className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-700 hover:text-white transition-colors">Close Window</button>
                    </div>
                    
                    <div className="w-full md:w-1/2 p-12 flex flex-col justify-center gap-4">
                        {activeBlock.isContact ? (
                           contacts.map((c) => (
                              <button key={c.id} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-indigo-500 group transition-all">
                                 <div className="flex items-center gap-4">
                                    <div className={c.color}>{c.icon}</div>
                                    <div className="text-left">
                                       <p className="text-[10px] font-bold text-zinc-500 uppercase">{c.label}</p>
                                       <p className="text-sm font-black">{c.value}</p>
                                    </div>
                                 </div>
                                 <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform"/>
                              </button>
                           ))
                        ) : (
                           <div className="text-center text-zinc-600 uppercase text-[10px] font-black tracking-widest">
                              Feature under construction
                           </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default App;
