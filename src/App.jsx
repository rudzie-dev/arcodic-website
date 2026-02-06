import React, { useState, useEffect } from 'react';
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
  Contrast
} from 'lucide-react';

// --- Theme Wrapper & Logic ---

export default function App() {
  const [theme, setTheme] = useState('dark'); // 'light' | 'dark' | 'mixed'

  const toggleTheme = () => {
    const modes = ['light', 'dark', 'mixed'];
    const nextMode = modes[(modes.indexOf(theme) + 1) % modes.length];
    setTheme(nextMode);
  };

  // Define theme-specific classes
  const themeClasses = {
    dark: "bg-black text-white",
    light: "bg-zinc-50 text-zinc-950",
    mixed: "bg-zinc-100 text-zinc-900" // Mixed will use dark Nav/Footer but light Body
  };

  return (
    <div className={`${themeClasses[theme]} min-h-screen selection:bg-zinc-500 selection:text-white font-sans antialiased transition-colors duration-700`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero theme={theme} />
        <Expertise theme={theme} />
        <Work theme={theme} />
        <Methodology theme={theme} />
      </main>
      <Footer theme={theme} />
    </div>
  );
}

// --- Components ---

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // In 'mixed' mode, Navbar remains dark for that "pro" look
  const navBg = theme === 'light' ? 'bg-white/90 text-zinc-950' : 'bg-black/90 text-white';
  const borderColor = theme === 'light' ? 'border-zinc-200' : 'border-zinc-900';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? `${navBg} backdrop-blur-lg py-4 border-b ${borderColor}` : 'bg-transparent py-10'}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className={`w-7 h-7 flex items-center justify-center transition-transform group-hover:rotate-90 duration-500 ${theme === 'light' ? 'bg-zinc-950 text-white' : 'bg-white text-black'}`}>
            <span className="font-black text-[10px]">AR</span>
          </div>
          <span className="font-bold tracking-tighter text-lg uppercase italic">Arcodic</span>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-10">
            {['Expertise', 'Work', 'Method'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 hover:opacity-100 transition-opacity">
                {item}
              </a>
            ))}
          </div>

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full border border-zinc-500/20 hover:bg-zinc-500/10 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : theme === 'light' ? 'Mixed' : 'Dark'} mode`}
          >
            {theme === 'dark' && <Moon size={16} />}
            {theme === 'light' && <Sun size={16} />}
            {theme === 'mixed' && <Contrast size={16} />}
          </button>

          <a href="https://wa.me/27676862733" className={`hidden sm:block text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-3 rounded-full transition-all ${theme === 'light' ? 'bg-zinc-900 text-white hover:bg-zinc-700' : 'bg-white text-black hover:bg-zinc-200'}`}>
            Inquire
          </a>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ theme }) => (
  <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12">
    <div className="max-w-[1400px] mx-auto w-full pt-20">
      <div className="flex items-center gap-2 mb-8">
        <div className={`w-1.5 h-1.5 rounded-full ${theme === 'light' ? 'bg-zinc-950' : 'bg-white'}`} />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">South Africa / Worldwide</span>
      </div>
      <h1 className="text-[13vw] md:text-[9vw] font-medium leading-[0.85] tracking-tighter mb-16">
        Digital <br />
        <span className={`italic font-serif ${theme === 'light' ? 'text-zinc-400' : 'text-zinc-600'}`}>Experience</span> <br />
        Design.
      </h1>
      <p className="text-lg md:text-xl opacity-60 leading-relaxed max-w-md">
        Arcodic is a boutique studio specializing in high-performance web interfaces. We bridge the gap between pure aesthetics and technical excellence.
      </p>
    </div>
  </section>
);

const Work = ({ theme }) => {
  const projects = [
    { name: "Noir Atelier", category: "Luxury Hospitality", image: "/salon-hero.webp", year: "2025" },
    { name: "Roast & Ritual", category: "Boutique Commerce", image: "/coffee-hero.webp", year: "2024" },
    { name: "MG Installations", category: "Technical Services", image: "/installations-hero.webp", year: "2024" }
  ];

  return (
    <section id="work" className="py-32 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 mb-12">Selected Commissions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className={`relative aspect-[10/12] overflow-hidden mb-8 rounded-sm ${theme === 'light' ? 'bg-zinc-200' : 'bg-zinc-900'}`}>
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
                  <span className="text-[10px] uppercase tracking-widest opacity-50 font-bold">{project.category}</span>
                </div>
                <span className="text-[10px] font-mono opacity-40">{project.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Methodology = ({ theme }) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { title: "Discovery", desc: "Deep-dive into business goals and target audience." },
    { title: "Architecture", desc: "Technical requirements and user journey mapping." },
    { title: "Design", desc: "Bespoke visual language and interface crafting." },
    { title: "Launch", desc: "Precision deployment and optimization." }
  ];

  const borderClass = theme === 'light' ? 'border-zinc-200' : 'border-zinc-800';

  return (
    <section id="method" className={`py-32 px-6 md:px-12 transition-colors duration-700 ${theme === 'mixed' ? 'bg-zinc-950 text-white' : ''}`}>
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 mb-12">Our Method</h2>
        <div className="space-y-4">
          {steps.map((step, i) => (
            <div 
              key={i} 
              className={`border-t ${borderClass} py-10 cursor-pointer transition-all duration-500 ${activeStep === i ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}
              onClick={() => setActiveStep(i)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-8">
                  <span className="text-xs font-mono opacity-40">0{i + 1}</span>
                  <h3 className="text-3xl md:text-5xl font-medium tracking-tighter">{step.title}</h3>
                </div>
                {activeStep === i ? <Minus size={24} /> : <Plus size={24} />}
              </div>
              {activeStep === i && (
                <p className="mt-8 text-lg opacity-60 max-w-xl ml-0 md:ml-16 leading-relaxed">{step.desc}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Expertise = ({ theme }) => {
    const services = [
      { icon: <Layers size={18} />, title: "Brand Identity" },
      { icon: <Smartphone size={18} />, title: "Interface Design" },
      { icon: <Command size={18} />, title: "Development" }
    ];
  
    return (
      <section id="expertise" className={`py-32 px-6 md:px-12 border-y ${theme === 'light' ? 'border-zinc-200' : 'border-zinc-900'}`}>
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-3 gap-12">
          {services.map((s, i) => (
            <div key={i} className="group">
              <div className="mb-6 opacity-40 group-hover:opacity-100 transition-opacity">{s.icon}</div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4">{s.title}</h3>
              <p className="text-xs opacity-50 leading-relaxed">High-performance solutions tailored to your technical and aesthetic needs.</p>
            </div>
          ))}
        </div>
      </section>
    );
  };

const Footer = ({ theme }) => {
  // Footer is ALWAYS dark in 'mixed' mode for high-end aesthetic
  const footerBg = theme === 'light' ? 'bg-white border-t border-zinc-200 text-zinc-950' : 'bg-black text-white';

  return (
    <footer className={`pt-32 pb-12 px-6 md:px-12 transition-colors duration-700 ${footerBg}`}>
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-5xl md:text-8xl font-medium tracking-tighter leading-[0.9] mb-12">
          Let's create <br />something <span className="italic font-serif opacity-40">meaningful.</span>
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 pt-12 border-t border-current/10">
          <a href="mailto:hello@arcodic.com" className="text-xl md:text-2xl border-b border-current pb-2">hello@arcodic.com</a>
          <div className="flex gap-8 opacity-50 text-[10px] font-bold uppercase tracking-widest">
            <Instagram size={18} />
            <Twitter size={18} />
            <span>© 2026 Arcodic Studio</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
