import React, { useState, useEffect } from 'react';
import { 
  ArrowRight,
  Calendar,
  Zap,
  Sparkles,
  Check,
  MessageSquare
} from 'lucide-react';

// Premium Button Component
const PremiumButton = ({ children, primary = false, className = "", onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`
      px-6 py-3.5 rounded-full font-semibold transition-all duration-300 active:scale-95
      ${primary 
        ? 'bg-white text-black hover:bg-gray-100 shadow-lg hover:shadow-xl' 
        : 'bg-white/10 text-white border border-white/20 hover:bg-white/15 backdrop-blur-sm'}
      ${className}
    `}>
      <span className="flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

// Navigation
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Logo */}
      <div className="fixed top-4 left-4 lg:top-8 lg:left-10 z-50">
        <button 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          className="group flex items-center gap-2 lg:gap-3"
        >
          {/* AR Monogram Logo */}
          <div className="w-9 h-9 lg:w-10 lg:h-10 bg-white rounded-lg flex items-center justify-center transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-blue-500 group-hover:scale-110">
            <span className="text-lg lg:text-xl font-black text-black group-hover:text-white transition-colors duration-500 tracking-tighter">
              AR
            </span>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-lg lg:text-xl font-bold tracking-tight text-white">Arcodic</span>
            <span className="text-[8px] lg:text-[9px] font-semibold uppercase tracking-wider text-white/40">Web Design</span>
          </div>
        </button>
      </div>

      {/* Desktop Nav */}
      <nav className={`
        hidden md:flex
        fixed top-4 lg:top-8 right-4 lg:right-10 z-50
        items-center gap-2 px-4 py-2 rounded-full 
        bg-black/40 backdrop-blur-xl border border-white/10
        transition-all duration-500
        ${scrolled ? 'bg-black/60' : ''}
      `}>
        <button 
          onClick={() => scrollTo('work')}
          className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
        >
          Work
        </button>
        <button 
          onClick={() => scrollTo('process')}
          className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
        >
          Process
        </button>
        <button 
          onClick={() => scrollTo('contact')}
          className="px-5 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors"
        >
          Start Project
        </button>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed top-4 right-4 z-50 w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg flex items-center justify-center"
      >
        <div className="flex flex-col gap-1.5">
          <span className={`w-5 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-5 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-5 h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`
        md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl
        transition-all duration-300
        ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}>
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
          <button 
            onClick={() => scrollTo('work')}
            className="text-3xl font-bold text-white hover:text-purple-400 transition-colors"
          >
            Work
          </button>
          <button 
            onClick={() => scrollTo('process')}
            className="text-3xl font-bold text-white hover:text-purple-400 transition-colors"
          >
            Process
          </button>
          <button 
            onClick={() => scrollTo('contact')}
            className="px-8 py-4 bg-white text-black text-lg font-semibold rounded-full hover:bg-gray-100 transition-colors"
          >
            Start Project
          </button>
        </div>
      </div>
    </>
  );
};

// Hero Section
const Hero = () => {
  return (
    <section className="relative min-h-screen w-full bg-gradient-to-b from-black via-zinc-900 to-black flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-12">
      {/* Ambient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 lg:w-96 lg:h-96 bg-purple-500/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 lg:w-96 lg:h-96 bg-blue-500/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 border border-white/10 rounded-full mb-6 sm:mb-8 backdrop-blur-sm">
          <Sparkles size={12} className="text-purple-400" />
          <span className="text-[10px] sm:text-xs font-medium text-white/80">Available for new projects</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white leading-[1.1] mb-6 sm:mb-8 px-4">
          Premium websites.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            Delivered in days.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed px-4">
          The luxury website your business deserves—without the agency timeline or price tag. 
          <span className="text-white font-medium"> Real projects completed in 5-7 days.</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4">
          <PremiumButton primary onClick={() => window.open('https://wa.me/27676862733?text=Hi%2C%20I%20want%20to%20start%20a%20project%20with%20Arcodic', '_blank')} className="w-full sm:w-auto">
            Start Your Project
            <ArrowRight size={16} />
          </PremiumButton>
          <PremiumButton onClick={() => document.getElementById('work').scrollIntoView({behavior:'smooth'})} className="w-full sm:w-auto">
            View Our Work
          </PremiumButton>
        </div>

        {/* Social Proof Stats */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-12 text-sm px-4">
          <div className="flex flex-col items-center">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">5-7</div>
            <div className="text-xs sm:text-sm text-gray-500 font-medium">Day Delivery</div>
          </div>
          <div className="w-px h-10 sm:h-12 bg-white/10"></div>
          <div className="flex flex-col items-center">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">3</div>
            <div className="text-xs sm:text-sm text-gray-500 font-medium">Live Demos</div>
          </div>
          <div className="w-px h-10 sm:h-12 bg-white/10"></div>
          <div className="flex flex-col items-center">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">100%</div>
            <div className="text-xs sm:text-sm text-gray-500 font-medium">Custom Built</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Work Showcase
const Work = () => {
  const projects = [
    {
      name: "Noir Atelier",
      category: "Luxury Salon",
      description: "Premium booking experience with WhatsApp integration. No backend required.",
      highlight: "Built in 5 days",
      features: ["Online Booking", "WhatsApp Notifications", "Service Gallery", "Mobile Optimized"],
      gradient: "from-rose-500/20 to-pink-500/20",
      image: "/salon-hero.webp",
      liveUrl: "https://salon-website-lime.vercel.app/"
    },
    {
      name: "Roast & Ritual",
      category: "Coffee Shop",
      description: "Immersive brand experience with menu showcase and location details.",
      highlight: "Delivered in 4 days",
      features: ["Interactive Menu", "Location Finder", "Brand Story", "Instagram Feed"],
      gradient: "from-amber-500/20 to-orange-500/20",
      image: "/coffee-hero.webp",
      liveUrl: "https://ritual-coffee111.vercel.app/"
    },
    {
      name: "MG Installations",
      category: "Installation Services",
      description: "Professional service showcase with lead capture and project portfolio.",
      highlight: "Live in 6 days",
      features: ["Service Pages", "Quote Requests", "Portfolio Gallery", "Contact Forms"],
      gradient: "from-blue-500/20 to-cyan-500/20",
      image: "/installations-hero.webp",
      liveUrl: "https://mg-installations.vercel.app/"
    }
  ];

  return (
    <section id="work" className="relative w-full bg-black px-4 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 lg:mb-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-4">
            Recent Work
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl">
            Real projects showcasing what we can build for your business. 
            Each site built from scratch—no templates, no shortcuts.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {projects.map((project, idx) => (
            <div 
              key={idx}
              className="group relative"
            >
              {/* Project Card */}
              <div className="relative bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 h-full flex flex-col">
                
                {/* Image Preview */}
                <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] bg-zinc-950 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={`${project.name} preview`}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      // Fallback gradient if image fails to load
                      e.target.style.display = 'none';
                      e.target.parentElement.style.background = `linear-gradient(135deg, ${project.gradient.includes('rose') ? '#f43f5e, #ec4899' : project.gradient.includes('amber') ? '#f59e0b, #f97316' : '#3b82f6, #06b6d4'})`;
                    }}
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-500`}></div>
                  
                  {/* Live Demo Button Overlay */}
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-sm"
                    >
                      <div className="px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-black text-sm sm:text-base font-semibold rounded-full flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform">
                        View Live Demo
                        <ArrowRight size={16} />
                      </div>
                    </a>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  {/* Category Badge */}
                  <div className="inline-flex items-center gap-2 self-start mb-3 sm:mb-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  {/* Project Name */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                    {project.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  {/* Highlight */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full self-start mb-4 sm:mb-6">
                    <Zap size={12} className="text-yellow-400" />
                    <span className="text-[10px] sm:text-xs font-semibold text-white">{project.highlight}</span>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {project.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check size={14} className="text-green-400 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-500">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 px-4">
            Your business could be next. <span className="text-white font-semibold">Let's build something exceptional.</span>
          </p>
          <PremiumButton primary onClick={() => window.open('https://wa.me/27676862733?text=Hi%2C%20I%20want%20to%20start%20a%20project%20with%20Arcodic', '_blank')} className="w-full sm:w-auto">
            Start Your Project
            <ArrowRight size={16} />
          </PremiumButton>
        </div>
      </div>
    </section>
  );
};

// Why Choose Section
const WhyChoose = () => {
  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "5-7 day turnaround. Most agencies take 6-12 weeks for the same result.",
      stat: "10x faster"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Premium Quality",
      description: "Luxury-level design and performance that rivals $20k+ agency work.",
      stat: "Agency-grade"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Smart Solutions",
      description: "WhatsApp booking, no-backend forms, and modern tech that just works.",
      stat: "Zero maintenance"
    }
  ];

  return (
    <section className="relative w-full bg-gradient-to-b from-black via-zinc-900 to-black px-6 lg:px-12 py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Why businesses choose us
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Skip the bloated agency process. Get a premium website that's delivered fast and works flawlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {benefits.map((benefit, idx) => (
            <div 
              key={idx}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-500 h-full">
                
                {/* Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>

                {/* Stat Badge */}
                <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-4">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    {benefit.stat}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Process Section
const Process = () => {
  const steps = [
    {
      day: "Day 1",
      title: "Discovery Call",
      description: "We discuss your vision, brand, and goals. Share examples of sites you love."
    },
    {
      day: "Days 2-4",
      title: "Design & Build",
      description: "We create your custom site. Daily updates so you see progress in real-time."
    },
    {
      day: "Day 5",
      title: "Review & Refine",
      description: "You provide feedback. We make adjustments until it's perfect."
    },
    {
      day: "Days 6-7",
      title: "Launch",
      description: "Final polish, testing, and deployment. Your site goes live."
    }
  ];

  return (
    <section id="process" className="relative w-full bg-black px-6 lg:px-12 py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-16 lg:mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            How it works
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl">
            A transparent, collaborative process. No surprises, no delays, no corporate bureaucracy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              {/* Connector Line */}
              {idx !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[calc(100%+1rem)] w-8 h-px bg-gradient-to-r from-white/20 to-transparent"></div>
              )}

              <div className="relative">
                {/* Day Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full mb-4">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    {step.day}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Box */}
        <div className="mt-16 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-8 lg:p-10">
          <div className="flex items-start gap-4">
            <MessageSquare className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-xl font-bold text-white mb-2">
                The Arcodic Advantage: Smart Tech
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Our signature feature? <span className="text-white font-semibold">WhatsApp-integrated booking systems</span> that 
                send appointments straight to your phone—no expensive backend, no monthly fees, no complexity. 
                Your clients book, you get notified instantly. It's that simple.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What if I don't like the design?",
      answer: "We include unlimited revisions during the review phase (Day 5). We work with you until you're 100% happy with the result. Our goal is to create something you love."
    },
    {
      question: "Do you offer revisions after launch?",
      answer: "Yes! We include 2 weeks of post-launch support for minor tweaks and adjustments. Need ongoing updates? We offer maintenance packages starting at $200/month."
    },
    {
      question: "What's included in the price?",
      answer: "Everything: custom design, mobile optimization, fast hosting setup, SEO basics, and our signature WhatsApp integration (where applicable). No hidden fees."
    },
    {
      question: "How does payment work?",
      answer: "50% upfront to begin work, 50% upon completion before launch. We accept bank transfer, PayPal, or crypto. Payment plans available for projects over $3000."
    },
    {
      question: "Can you integrate with my existing tools?",
      answer: "Absolutely. We can integrate with booking systems, payment processors, CRMs, and most third-party tools. Just let us know what you need during the discovery call."
    },
    {
      question: "What happens after the 7 days?",
      answer: "Your site is live and fully yours. We provide all source code and documentation. You can manage it yourself or hire us for ongoing support—totally your choice."
    },
    {
      question: "Do you work with businesses outside South Africa?",
      answer: "Yes! We work with clients globally. All communication happens via WhatsApp, Zoom, and email. Time zones have never been an issue."
    },
    {
      question: "What if I need my site faster?",
      answer: "We can do rush projects in 3-4 days for an additional 50% fee. Message us to discuss your timeline and we'll make it work."
    }
  ];

  return (
    <section className="relative w-full bg-gradient-to-b from-black via-zinc-900 to-black px-4 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-gray-400">
            Everything you need to know about working with us
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left group"
              >
                <span className="text-base sm:text-lg font-semibold text-white pr-4">
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}>
                  <ArrowRight size={14} className="text-white transform rotate-90" />
                </div>
              </button>
              
              <div className={`transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-6 pb-5 text-sm sm:text-base text-gray-400 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-gray-400 mb-4">
            Still have questions?
          </p>
          <button 
            onClick={() => window.open('https://wa.me/27676862733?text=Hi%2C%20I%20have%20a%20question%20about%20Arcodic', '_blank')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-colors"
          >
            <MessageSquare size={18} />
            Chat on WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};

// Contact CTA
const ContactCTA = () => {
  return (
    <section id="contact" className="relative w-full bg-gradient-to-b from-black via-zinc-900 to-black px-6 lg:px-12 py-32 lg:py-40 border-t border-white/5 overflow-hidden">
      
      {/* Ambient Glow */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/20 blur-[150px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-8">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-green-400">Taking new projects now</span>
        </div>

        {/* Headline */}
        <h2 className="text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
          Ready to launch your<br />premium website?
        </h2>

        {/* Description */}
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Let's build something exceptional together. Fast turnaround, premium quality, 
          transparent pricing.
        </p>

        {/* CTA Button */}
        <PremiumButton primary className="text-base px-8 py-4" onClick={() => window.open('https://wa.me/27676862733?text=Hi%2C%20I%20want%20to%20start%20a%20project%20with%20Arcodic', '_blank')}>
          Start Your Project
          <ArrowRight size={18} />
        </PremiumButton>

        {/* Contact Info */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
          <span>WhatsApp: +27 67 686 2733</span>
          <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
          <span>Response time: Within 24 hours</span>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="relative w-full bg-black px-6 lg:px-12 py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="text-sm font-bold text-white">Arcodic</span>
          <span className="text-xs text-gray-600">Premium Web Design</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-8 text-sm text-gray-500">
          <a href="#work" className="hover:text-white transition-colors">Work</a>
          <a href="#process" className="hover:text-white transition-colors">Process</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-600">
          © 2026 Arcodic. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

// Main App
export default function App() {
  return (
    <div className="bg-black min-h-screen font-sans antialiased text-white selection:bg-purple-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Work />
        <WhyChoose />
        <Process />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
