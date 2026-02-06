import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight,
  Zap,
  Smartphone,
  Globe,
  Instagram,
  Twitter,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';

// --- Theme Config ---
const ACCENT = "text-indigo-500"; // Change to 'text-blue-500' or 'text-emerald-500' for different vibes
const ACCENT_BG = "bg-indigo-600";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 w-full z-[60] transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer z-[70]">
            <div className={`w-6 h-6 ${ACCENT_BG} flex items-center justify-center`}>
              <span className="text-white font-black text-[10px]">A</span>
            </div>
            <span className="font-black tracking-[0.2em] text-sm uppercase text-white">Arcodic</span>
          </div>
          
          <div className="flex items-center gap-8">
            <button className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
              Start a Project
            </button>
            {/* Burger Icon */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="z-[70] p-2 text-white hover:opacity-70 transition-opacity"
            >
              {isOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Menu Overlay */}
      <div className={`fixed inset-0 z-[55] bg-zinc-950 transition-all duration-700 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="flex flex-col justify-center items-center h-full gap-8">
          {['Expertise', 'Work', 'Process', 'Contact'].map((item, i) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="text-5xl md:text-7xl font-black uppercase tracking-tighter hover:italic hover:text-indigo-500 transition-all duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {item}
            </a>
          ))}
          <div className="flex gap-6 mt-12 opacity-50">
            <Instagram size={20} />
            <Twitter size={20} />
          </div>
        </div>
      </div>
    </>
  );
};

const Hero = () => (
  <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20 overflow-hidden bg-black">
    {/* Dynamic Background Color Blobs */}
    <div className={`absolute top-1/4 -right-20 w-96 h-96 ${ACCENT_BG} opacity-[0.07] rounded-full blur-[120px]`} />
    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-600 opacity-[0.05] rounded-full blur-[100px]" />

    <div className="max-w-7xl mx-auto w-full relative z-10">
      <div className="flex items-center gap-3 mb-8">
        <span className={`text-[10px] font-bold uppercase tracking-[0.4em] ${ACCENT}`}>Based in SA</span>
        <div className="h-[1px] w-12 bg-zinc-800" />
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600 text-nowrap">Serving Globally</span>
      </div>
      
      <h1 className="text-[12vw] md:text-[8.5vw] font-black leading-[0.85] tracking-tighter mb-12 uppercase">
        Exceptional <br />
        <span className="text-transparent" style={{ WebkitTextStroke: '1.5px white' }}>Digital</span> <br />
        Foundations<span className={ACCENT}>.</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <p className="text-lg md:text-xl text-zinc-500 leading-relaxed max-w-md">
          Arcodic Studio partners with visionary founders to build <span className="text-white italic">high-conversion</span> digital platforms. No fluff, just performance.
        </p>
        <button className={`${ACCENT_BG} text-white px-10 py-5 font-bold uppercase tracking-widest text-[11px] flex items-center justify-between group hover:scale-105 transition-all max-w-[240px]`}>
          Let's talk <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </div>
  </section>
);

const Expertise = () => {
  const services = [
    { icon: Globe, title: "Strategy", color: "hover:border-blue-500" },
    { icon: Smartphone, title: "Design", color: "hover:border-indigo-500" },
    { icon: Zap, title: "Dev", color: "hover:border-purple-500" }
  ];

  return (
    <section className="py-32 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className={`p-10 bg-black border border-white/5 ${s.color} transition-all duration-500 group relative overflow-hidden`}>
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                <s.icon size={40} className={ACCENT} />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-600 mb-4">0{i+1}</h3>
              <h4 className="text-3xl font-black uppercase mb-4 tracking-tighter">{s.title}</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">Tailored technical solutions focused on your brand's unique growth metrics.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Work = () => {
  const projects = [
    { title: "Noir Atelier", img: "/salon-hero.webp", tag: "Hospitality" },
    { title: "Roast & Ritual", img: "/coffee-hero.webp", tag: "Commerce" }
  ];

  return (
    <section className="py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-5xl font-black uppercase tracking-tighter italic">Recent<br />Drops</h2>
          <button className={`text-[10px] font-bold uppercase tracking-widest border-b-2 border-current pb-1 ${ACCENT}`}>View all</button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((p, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[16/10] overflow-hidden bg-zinc-900 mb-6 relative">
                <img 
                  src={p.img} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070"; }}
                />
                <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-black uppercase tracking-tight">{p.title}</h3>
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{p.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="bg-black text-white selection:bg-indigo-500 font-sans antialiased overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Expertise />
        <Work />
      </main>
      <footer className="py-20 px-6 border-t border-white/5 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-700">Arcodic Studio — 2026</p>
      </footer>
    </div>
  );
}
