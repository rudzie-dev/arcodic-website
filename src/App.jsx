import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Globe, 
  Layers, 
  Command, 
  Smartphone,
  Instagram,
  Twitter,
  Plus,
  Minus
} from 'lucide-react';

// --- Global UI Components ---

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-2 mb-8">
    <div className="w-1.5 h-1.5 bg-white rounded-full" />
    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">{children}</span>
  </div>
);

// --- Sections ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'bg-black/90 backdrop-blur-lg py-4 border-b border-zinc-900' : 'bg-transparent py-10'}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-7 h-7 bg-white flex items-center justify-center transition-transform group-hover:rotate-90 duration-500">
            <span className="text-black font-black text-[10px]">AR</span>
          </div>
          <span className="font-bold tracking-tighter text-lg uppercase italic">Arcodic</span>
        </div>
        
        <div className="hidden md:flex items-center gap-12">
          {['Expertise', 'Work', 'Method'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors">
              {item}
            </a>
          ))}
          <a 
            href="https://wa.me/27676862733"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold uppercase tracking-[0.2em] bg-white text-black px-6 py-3 rounded-full hover:bg-zinc-200 transition-all"
          >
            Inquire
          </a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12">
    <div className="max-w-[1400px] mx-auto w-full pt-20">
      <SectionLabel>South Africa / Worldwide</SectionLabel>
      <h1 className="text-[13vw] md:text-[9vw] font-medium leading-[0.85] tracking-tighter mb-16">
        Digital <br />
        <span className="italic font-serif text-zinc-600">Experience</span> <br />
        Design.
      </h1>
      
      <div className="grid md:grid-cols-2 gap-16 items-end">
        <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-md">
          Arcodic is a boutique studio specializing in high-performance web interfaces. We bridge the gap between pure aesthetics and technical excellence.
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <button 
            onClick={() => document.getElementById('work').scrollIntoView({behavior:'smooth'})} 
            className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest"
          >
            View Commissions
            <div className="w-12 h-12 border border-zinc-800 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all group-hover:border-white">
              <ArrowUpRight size={18} />
            </div>
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Expertise = () => {
  const services = [
    { icon: <Layers size={18} />, title: "Brand Identity", desc: "Establishing visual systems that resonate across all digital touchpoints." },
    { icon: <Smartphone size={18} />, title: "Interface Design", desc: "User-centric layouts optimized for clarity, speed, and conversion." },
    { icon: <Command size={18} />, title: "Development", desc: "Bespoke, performant codebases built for longevity and scalability." },
    { icon: <Globe size={18} />, title: "SEO Strategy", desc: "Ensuring your digital presence is discoverable and authority-driven." }
  ];

  return (
    <section id="expertise" className="py-32 px-6 md:px-12 border-t border-zinc-900 bg-zinc-950/30">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <SectionLabel>Expertise</SectionLabel>
            <h2 className="text-3xl font-medium tracking-tight leading-snug">
              We help founders build digital products that feel as good as they function.
            </h2>
          </div>
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-x-12 gap-y-16">
            {services.map((s, i) => (
              <div key={i} className="group border-l border-zinc-900 pl-8 hover:border-white transition-colors duration-500">
                <div className="mb-6 text-zinc-600 group-hover:text-white transition-colors">
                  {s.icon}
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4">{s.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Work = () => {
  const projects = [
    { name: "Noir Atelier", category: "Luxury Hospitality", image: "/salon-hero.webp", year: "2025" },
    { name: "Roast & Ritual", category: "Boutique Commerce", image: "/coffee-hero.webp", year: "2024" },
    { name: "MG Installations", category: "Technical Services", image: "/installations-hero.webp", year: "2024" }
  ];

  return (
    <section id="work" className="py-32 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <SectionLabel>Selected Commissions</SectionLabel>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {projects.map((project, idx) => (
            <div key={idx} className="group flex flex-col cursor-pointer">
              <div className="relative aspect-[10/12] overflow-hidden bg-zinc-900 mb-8 rounded-sm">
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800"; }}
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium tracking-tight mb-1">{project.name}</h3>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">{project.category}</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-600">{project.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Methodology = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { title: "Discovery", desc: "We dive deep into your business goals, target audience, and market positioning to establish a solid foundation." },
    { title: "Architecture", desc: "Mapping out the user journey and technical requirements to ensure a seamless, logical flow." },
    { title: "Design", desc: "Crafting a unique visual language that balances modern aesthetics with functional usability." },
    { title: "Launch", desc: "Rigorous testing and optimization followed by a precision deployment to the live environment." }
  ];

  return (
    <section id="method" className="py-32 px-6 md:px-12 bg-zinc-950">
      <div className="max-w-[1400px] mx-auto">
        <SectionLabel>Our Method</SectionLabel>
        <div className="space-y-4">
          {steps.map((step, i) => (
            <div 
              key={i} 
              className={`border-t border-zinc-900 py-10 cursor-pointer transition-all duration-500 ${activeStep === i ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
              onClick={() => setActiveStep(i)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-8">
                  <span className="text-xs font-mono text-zinc-600">0{i + 1}</span>
                  <h3 className="text-3xl md:text-5xl font-medium tracking-tighter">{step.title}</h3>
                </div>
                {activeStep === i ? <Minus size={24} /> : <Plus size={24} />}
              </div>
              {activeStep === i && (
                <p className="mt-8 text-lg text-zinc-400 max-w-xl ml-0 md:ml-16 leading-relaxed">
                  {step.desc}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer id="contact" className="bg-black pt-32 pb-12 px-6 md:px-12">
    <div className="max-w-[1400px] mx-auto">
      <div className="grid lg:grid-cols-2 gap-24 mb-32">
        <div>
          <h2 className="text-5xl md:text-8xl font-medium tracking-tighter leading-[0.9] mb-12">
            Let's create <br />something <span className="italic font-serif text-zinc-500">meaningful.</span>
          </h2>
          <a 
            href="mailto:hello@arcodic.com" 
            className="text-xl md:text-2xl border-b border-zinc-800 pb-2 hover:border-white transition-all inline-block mt-8"
          >
            hello@arcodic.com
          </a>
        </div>
        
        <div className="flex flex-col justify-between pt-4">
          <div className="grid sm:grid-cols-2 gap-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4">Location</p>
              <p className="text-sm text-zinc-400">Cape Town, South Africa<br />Remote Worldwide</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4">Social</p>
              <div className="flex gap-6">
                <Instagram size={18} className="text-zinc-500 hover:text-white transition-colors cursor-pointer" />
                <Twitter size={18} className="text-zinc-500 hover:text-white transition-colors cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 pt-12 border-t border-zinc-900/50">
             <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-700">© 2026 ARCODIC STUDIO — ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="bg-black text-white selection:bg-white selection:text-black font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <Expertise />
        <Work />
        <Methodology />
      </main>
      <Footer />
    </div>
  );
}
