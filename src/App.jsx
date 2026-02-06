// Replace the existing renderPopupContent and Popup Viewport section with this:

const renderPopupContent = () => {
  if (!activeBlock) return null;

  switch (activeBlock.id) {
    case 'work':
      return (
        <div className="grid grid-cols-1 gap-4 w-full animate-in fade-in slide-in-from-right-8 duration-700">
          {demos.map((d) => (
            <div key={d.id} className="group relative flex items-center justify-between p-6 bg-white/[0.03] border border-white/5 rounded-[2vw] hover:bg-white/[0.07] hover:border-indigo-500/50 transition-all cursor-pointer overflow-hidden">
              <div className="flex gap-6 items-center z-10">
                <div className="w-20 h-20 bg-zinc-800 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl">
                  <img src={d.img} className="w-full h-full object-cover" alt={d.name} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-1">{d.tag}</p>
                  <h4 className="text-2xl font-black uppercase tracking-tighter text-white">{d.name}</h4>
                </div>
              </div>
              <div className="flex items-center gap-4 z-10">
                <span className="text-[9px] font-bold opacity-0 group-hover:opacity-40 transition-opacity uppercase tracking-widest">View Case Study</span>
                <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-white/20 group-hover:text-white"/>
              </div>
              {/* Subtle background text for depth */}
              <span className="absolute right-10 top-1/2 -translate-y-1/2 text-7xl font-black opacity-[0.02] pointer-events-none uppercase italic">{d.name}</span>
            </div>
          ))}
          <button className="mt-4 w-full py-8 border border-white/10 rounded-[2vw] text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all">
            Enter Full Archive [08]
          </button>
        </div>
      );

    case 'service':
      return (
        <div className="grid grid-cols-1 gap-3 w-full animate-in fade-in zoom-in-95 duration-700">
          {[
            { icon: <Code size={20}/>, label: "Core Engineering", techs: "Next.js / TypeScript / GSAP", desc: "Building high-performance, frame-perfect web applications." },
            { icon: <Cpu size={20}/>, label: "Interface Design", techs: "Figma / Interaction / 3D", desc: "Aesthetic systems designed for conversion and retention." },
            { icon: <Search size={20}/>, label: "Search Presence", techs: "Technical SEO / Performance", desc: "Optimizing the fundamental layer for maximum visibility." }
          ].map((s, i) => (
            <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-[2vw] group hover:border-indigo-500/30 transition-all">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-indigo-600/10 text-indigo-500 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  {s.icon}
                </div>
                <div>
                  <h4 className="text-xl font-black uppercase tracking-tighter mb-1">{s.label}</h4>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">{s.techs}</p>
                  <p className="text-sm text-zinc-400 leading-relaxed font-light">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );

    case 'speed':
      return (
        <div className="flex flex-col gap-6 w-full animate-in slide-in-from-bottom-8 duration-700">
          <div className="bg-amber-500/10 border border-amber-500/20 p-10 rounded-[2.5vw] relative overflow-hidden">
            <Zap className="absolute -right-4 -top-4 w-32 h-32 opacity-10 text-amber-500 -rotate-12" />
            <div className="relative z-10">
              <h4 className="text-3xl font-black uppercase tracking-tighter mb-4 text-amber-500">The 24H Sprint</h4>
              <p className="text-zinc-400 leading-relaxed mb-6">High-impact design execution for founders who can't afford to wait. Fixed scope, maximum quality, delivered in a single sun-cycle.</p>
              <div className="flex items-center gap-4 text-[10px] font-black tracking-widest uppercase">
                <span className="flex items-center gap-2"><CheckCircle2 size={14}/> One Page</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={14}/> Mobile First</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={14}/> Launch Ready</span>
              </div>
            </div>
          </div>
          <button className="w-full py-8 bg-amber-500 text-black rounded-[2vw] font-black uppercase tracking-[0.3em] text-[10px] hover:scale-[1.02] transition-all shadow-xl shadow-amber-500/10">
            Check Slot Availability
          </button>
        </div>
      );

    case 'social':
      return (
        <div className="grid grid-cols-2 gap-4 w-full animate-in fade-in duration-700">
          <a href="#" className="flex flex-col items-center justify-center aspect-square bg-pink-500/5 border border-white/5 rounded-[2vw] group hover:border-pink-500 transition-all">
            <Instagram size={40} className="text-pink-500 mb-4 group-hover:scale-110 transition-transform"/>
            <span className="text-[10px] font-black uppercase tracking-widest">Instagram</span>
          </a>
          <a href="#" className="flex flex-col items-center justify-center aspect-square bg-blue-500/5 border border-white/5 rounded-[2vw] group hover:border-blue-500 transition-all">
            <Twitter size={40} className="text-blue-500 mb-4 group-hover:scale-110 transition-transform"/>
            <span className="text-[10px] font-black uppercase tracking-widest">Twitter / X</span>
          </a>
          <div className="col-span-2 p-8 bg-white/[0.02] rounded-[2vw] text-center border border-white/5">
             <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600">Arcodic Studio Feed</p>
             <p className="text-sm text-zinc-400 mt-2">Connecting global innovators through design.</p>
          </div>
        </div>
      );

    case 'cta':
      return (
        <div className="space-y-6 w-full animate-in zoom-in-95 duration-700">
          <div className="p-10 border border-emerald-500/20 bg-emerald-500/5 rounded-[3vw]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Currently Booking Q2 2026</span>
            </div>
            <h4 className="text-4xl font-black uppercase tracking-tighter mb-4">Start the conversation</h4>
            <p className="text-zinc-400 leading-relaxed mb-8 text-lg">Every great architecture begins with a consultation. Let's map out your digital infrastructure.</p>
            
            <div className="grid grid-cols-1 gap-3">
              {contacts.map((c) => (
                <button key={c.id} className="flex items-center justify-between p-6 bg-black/40 border border-white/5 rounded-[1.5vw] hover:border-white/20 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className={c.color}>{c.icon}</div>
                    <span className="font-bold text-sm tracking-tight">{c.value}</span>
                  </div>
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all"/>
                </button>
              ))}
            </div>
          </div>
          <button className="w-full py-8 bg-white text-black rounded-[2vw] font-black uppercase tracking-[0.4em] text-[10px] hover:bg-emerald-500 hover:text-white transition-all shadow-2xl">
            Book Discovery Call [15min]
          </button>
        </div>
      );

    default:
      return null;
  }
};
