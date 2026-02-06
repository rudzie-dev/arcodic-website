import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowUpRight, 
  Layers, 
  Command, 
  Smartphone,
  Instagram,
  Twitter,
  Plus,
  Minus,
  Sun,
  Moon,
  Contrast,
  Menu,
  X
} from 'lucide-react';

// --- Animated Grain Overlay Component ---
const GrainOverlay = () => (
  <div className="fixed inset-0 z-[99] pointer-events-none opacity-[0.03] contrast-150 brightness-100">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

// --- Background "Aura" Blobs ---
const BackgroundAura = ({ theme }) => (
  <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
    <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] transition-colors duration-1000 
      ${theme === 'dark' ? 'bg-zinc-800/20' : 'bg-zinc-300/30'}`} />
    <div className={`absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] rounded-full blur-[120px] transition-colors duration-1000 
      ${theme === 'dark' ? 'bg-zinc-900/40' : 'bg-zinc-200/50'}`} />
  </div>
);

export default function App() {
  const [theme, setTheme] = useState('mixed');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleTheme = () => {
    const modes = ['light', 'dark', 'mixed'];
    setTheme(modes[(modes.indexOf(theme) + 1) % modes.length]);
  };

  return (
    <div className={`transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#0a0a0a] text-zinc-100' : 'bg-[#fcfcfc] text-zinc-900'}`}>
      <GrainOverlay />
      <BackgroundAura theme={theme} />
      
      {/* Custom Cursor Circle (The "Thoughtful" touch) */}
      <div 
        className="fixed w-8 h-8 border border-zinc-500 rounded-full pointer-events-none z-[100] transition-transform duration-150 ease-out hidden md:block"
        style={{ transform: `translate(${mousePos.x - 16}px, ${mousePos.y - 16}px)` }}
      />

      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main className="relative z-10">
        <Hero theme={theme} />
        <FeaturedWork theme={theme} />
        <Services theme={theme} />
        <Methodology theme={theme} />
      </main>

      <Footer theme={theme} />
    </div>
  );
}

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const scrollHandler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 backdrop-blur-md border-b border-zinc-500/10' : 'py-10'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-4 group">
          <div className={`w-8 h-8 flex items-center justify-center font-black text-[10px] transition-all duration-500 group-hover:scale-110 ${theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'}`}>
            AR
          </div>
          <span className="font-bold tracking-[0.2em] text-xs uppercase italic">Arcodic Studio</span>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={toggleTheme} className="hover:rotate-45 transition-transform duration-500 p-2">
            {theme === 'dark' ? <Moon size={18} /> : theme === 'light' ? <Sun size={18} /> : <Contrast size={18} />}
          </button>
          <div className="h-4 w-[1px] bg-zinc-500/20" />
          <button className="text-[10px] font-bold uppercase tracking-[0.2em] border border-zinc-500/30 px-5 py-2 hover:bg-zinc-500/10 transition-colors">
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ theme }) => (
  <section className="min-h-screen flex flex-col justify-center px-6 pt-20">
    <div className="max-w-7xl mx-auto w-full">
      <div className="overflow-hidden mb-6">
        <span className="block text-[10px] font-bold uppercase tracking-[0.5em] opacity-40 animate-fade-in-up">
          Est. 2024 / South Africa
        </span>
      </div>
      
      <h1 className="text-[14vw] md:text-[10vw] font-light leading-[0.8] tracking-tighter mb-12">
        We craft <br />
        <span className="italic font-serif opacity-40 pr-4">memorable</span>
        digital art.
      </h1>

      <div className="grid md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-5">
          <p className="text-xl md:text-2xl font-light leading-relaxed opacity-70">
            A strategic design partner for brands who value precision over speed. We build interfaces that command attention.
          </p>
        </div>
        <div className="md:col-start-9 md:col-span-4">
          <div className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-widest opacity-40">
            <div className="flex justify-between border-b border-zinc-500/20 pb-2">
              <span>Focus</span>
              <span>Visual Design / WebGL / UX</span>
            </div>
            <div className="flex justify-between border-b border-zinc-500/20 pb-2">
              <span>Availability</span>
              <span>Available Q3 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FeaturedWork = ({ theme }) => {
  const projects = [
    { name: "Noir Atelier", cat: "Luxury", img: "/salon-hero.webp", span: "md:col-span-7" },
    { name: "Roast Ritual", cat: "Culture", img: "/coffee-hero.webp", span: "md:col-span-5" },
    { name: "MG Installations", cat: "Tech", img: "/installations-hero.webp", span: "md:col-span-12" }
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl font-serif italic">Case Studies</h2>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">01 — Selected Work</span>
        </div>
        
        <div className="grid md:grid-cols-12 gap-6">
          {projects.map((p, i) => (
            <div key={i} className={`${p.span} group relative overflow-hidden bg-zinc-900 aspect-video md:aspect-auto md:h-[600px]`}>
              <img 
                src={p.img} 
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1 opacity-80 group-hover:opacity-100"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-10 flex flex-col justify-end">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-2 text-white/60">{p.cat}</span>
                <h3 className="text-4xl text-white font-serif italic">{p.name}</h3>
                <div className="mt-4 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ theme }) => (
  <footer className={`py-20 px-6 border-t ${theme === 'light' ? 'border-zinc-200' : 'border-zinc-900'}`}>
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
      <div className="text-center md:text-left">
        <h3 className="text-2xl font-serif italic mb-2">Let's build the future.</h3>
        <p className="text-xs opacity-40 uppercase tracking-widest font-bold">hello@arcodic.com</p>
      </div>
      <div className="flex gap-8">
        {['Instagram', 'LinkedIn', 'Dribbble'].map(link => (
          <a key={link} href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity">
            {link}
          </a>
        ))}
      </div>
      <p className="text-[10px] opacity-20 uppercase tracking-[0.2em]">© 2026 Arcodic Studio</p>
    </div>
  </footer>
);

// ... (Expertise, Methodology components remain conceptually same but with refined typography from Hero) ...
function Services({theme}) { return <div className="h-20" /> } // Spacer for demo
function Methodology({theme}) { return <div className="h-20" /> } // Spacer for demo
