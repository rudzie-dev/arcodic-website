import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight,
  Zap,
  Shield,
  Smartphone,
  Globe,
  Plus,
  ArrowRight,
  Instagram,
  Twitter
} from 'lucide-react';

// --- Reusable Premium Components ---

const ActionButton = ({ children, primary = false, onClick, className = "" }) => (
  <button 
    onClick={onClick}
    className={`
      group relative px-8 py-4 overflow-hidden transition-all duration-500
      ${primary 
        ? 'bg-white text-black hover:pr-12' 
        : 'bg-transparent text-white border border-white/10 hover:bg-white/5 hover:border-white/30'}
      ${className}
    `}
  >
    <span className="relative z-10 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[10px]">
      {children}
      <ArrowUpRight size={14} className={`transition-all duration-500 ${primary ? 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0' : ''}`} />
    </span>
  </button>
);

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="group p-8 bg-zinc-900/40 border border-white/5 hover:border-white/20 transition-all duration-500 backdrop-blur-sm relative overflow-hidden">
    <div className="absolute top-0 left-0 w-1 h-0 bg-white transition-all duration-500 group-hover:h-full" />
    <div className="mb-6 text-zinc-500 group-hover:text-white transition-colors duration-500">
      <Icon size={24} strokeWidth={1.5} />
    </div>
    <h3 className="text-xl font-bold mb-3 tracking-tight">{title}</h3>
    <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">
      {desc}
    </p>
  </div>
);

// --- Main App Sections ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white flex items-center justify-center">
            <span className="text-black font-black text-[10px]">A</span>
          </div>
          <span className="font-black tracking-[0.2em] text-sm uppercase">Arcodic</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {['Expertise', 'Work', 'Method'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors">
              {item}
            </a>
          ))}
          <ActionButton primary className="!py-2.5 !px-6">Inquire</ActionButton>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20 overflow-hidden">
    {/* Animated Background Depth */}
    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-zinc-800/20 rounded-full blur-[120px] animate-pulse" />
    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-zinc-700/10 rounded-full blur-[120px]" />

    <div className="max-w-7xl mx-auto w-full relative z-10">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Available for Q2 2026</span>
      </div>
      
      <h1 className="text-[11vw] md:text-[7.5vw] font-black leading-[0.9] tracking-tighter mb-10 uppercase">
        Digital <br />
        <span className="text-transparent border-t-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>Architecture</span> <br />
        Studio.
      </h1>

      <div className="grid md:grid-cols-2 gap-12 items-end max-w-5xl">
        <p className="text-xl text-zinc-400 leading-relaxed italic font-serif">
          Specializing in high-performance web experiences for brands that demand technical excellence and visual distinction.
        </p>
        <div className="flex gap-4">
          <ActionButton primary onClick={() => window.open('https://wa.me/27676862733')}>Get Started</ActionButton>
          <ActionButton>View Our Work</ActionButton>
        </div>
      </div>
    </div>
  </section>
);

const Expertise = () => (
  <section id="expertise" className="py-32 px-6 border-t border-white/5 bg-zinc-950/50">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 block mb-4">Core Capabilities</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Engineered for <br /> Performance.</h2>
        </div>
        <p className="max-w-xs text-zinc-500 text-sm leading-relaxed">
          We combine artistic intuition with technical rigor to build websites that aren't just pretty—they convert.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-1">
        <FeatureCard 
          icon={Globe} 
          title="Digital Strategy" 
          desc="Aligning your brand goals with a technical roadmap that scales as you grow." 
        />
        <FeatureCard 
          icon={Smartphone} 
          title="Product Design" 
          desc="Interface design with a focus on user psychology and conversion optimization." 
        />
        <FeatureCard 
          icon={Zap} 
          title="Web Development" 
          desc="Clean, performant React and Framer builds optimized for SEO and speed." 
        />
      </div>
    </div>
  </section>
);

const WorkGrid = () => {
  const projects = [
    { title: "Noir Atelier", cat: "Lifestyle", img: "/salon-hero.webp" },
    { title: "Roast & Ritual", cat: "Commerce", img: "/coffee-hero.webp" },
    { title: "MG Installations", cat: "Industrial", img: "/installations-hero.webp" }
  ];

  return (
    <section id="work" className="py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 block mb-4">Portfolio</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Selected Works</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <div key={i} className={`group cursor-pointer relative overflow-hidden ${i === 2 ? 'md:col-span-2' : ''}`}>
              <div className="aspect-video overflow-hidden bg-zinc-900 border border-white/5">
                <img 
                  src={p.img} 
                  alt={p.title} 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070"; }}
                />
              </div>
              <div className="mt-6 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tighter">{p.title}</h3>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{p.cat}</span>
                </div>
                <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-zinc-950 pt-32 pb-12 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-20 mb-32">
        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
          Let's <br /> Build.
        </h2>
        <div className="flex flex-col justify-end gap-12">
          <p className="text-2xl text-zinc-400 font-serif italic">A project in mind? Let's discuss the possibilities.</p>
          <div className="flex flex-col sm:flex-row gap-8">
            <a href="mailto:hello@arcodic.com" className="text-sm font-bold border-b border-white pb-2 hover:text-zinc-400 transition-colors">hello@arcodic.com</a>
            <div className="flex gap-6 items-center">
              <Instagram size={18} className="text-zinc-600 hover:text-white cursor-pointer" />
              <Twitter size={18} className="text-zinc-600 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center pt-12 border-t border-white/5 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-700">
        <span>© 2026 Arcodic</span>
        <span>Cape Town, ZA</span>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="bg-[#050505] text-white selection:bg-white selection:text-black font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <Expertise />
        <WorkGrid />
      </main>
      <Footer />
    </div>
  );
}
