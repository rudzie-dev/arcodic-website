import React from "react";
import {
  ArrowUpRight,
  Zap,
  Layers,
  Code,
  Cpu,
  Search,
  Send
} from "lucide-react";

const demos = [
  {
    id: 1,
    name: "Noir Atelier",
    tag: "Luxury Hospitality",
    description:
      "High-conversion booking platform built with performance-first architecture.",
    img: "/salon-hero.webp"
  },
  {
    id: 2,
    name: "Roast & Ritual",
    tag: "Boutique Coffee",
    description:
      "Brand-led eCommerce experience designed for growth and storytelling.",
    img: "/coffee-hero.webp"
  },
  {
    id: 3,
    name: "MG Installations",
    tag: "Technical Services",
    description:
      "Lead-generation system engineered for trust and scalability.",
    img: "/installations-hero.webp"
  }
];

export default function App() {
  return (
    <div className="bg-[#050505] text-white font-sans selection:bg-indigo-500">
      
      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center px-[8vw]">
        <p className="text-indigo-500 text-xs tracking-[0.3em] uppercase mb-6">
          ARCODIC STUDIO
        </p>

        <h1 className="text-[5vw] font-black leading-[0.9] tracking-tight max-w-5xl">
          We design and engineer digital systems that convert.
        </h1>

        <p className="mt-8 text-zinc-400 text-lg max-w-2xl">
          A startup digital agency building high-performance websites for
          ambitious brands. Strategy-led. Design-driven. Engineered for growth.
        </p>

        <div className="mt-12 flex gap-6">
          <a
            href="#work"
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 transition rounded-full font-bold uppercase text-xs tracking-widest"
          >
            View Work
          </a>

          <a
            href="#contact"
            className="px-8 py-4 border border-white/20 hover:border-white transition rounded-full font-bold uppercase text-xs tracking-widest"
          >
            Start a Project
          </a>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="px-[8vw] py-32 border-t border-white/10">
        <h2 className="text-4xl font-black mb-16 tracking-tight">
          Selected Work
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {demos.map((demo) => (
            <div
              key={demo.id}
              className="group bg-[#0d0d0d] border border-white/5 rounded-3xl overflow-hidden hover:border-indigo-500/50 transition"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={demo.img}
                  alt={demo.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>

              <div className="p-8">
                <p className="text-indigo-500 text-xs uppercase tracking-widest mb-2">
                  {demo.tag}
                </p>

                <h3 className="text-2xl font-bold mb-4">
                  {demo.name}
                </h3>

                <p className="text-zinc-400 text-sm mb-6">
                  {demo.description}
                </p>

                <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/70 group-hover:text-white transition">
                  View Case
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="px-[8vw] py-32 border-t border-white/10">
        <h2 className="text-4xl font-black mb-16 tracking-tight">
          Capabilities
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              icon: <Code size={24} />,
              title: "Full-Stack Development",
              desc: "Next.js, TypeScript and API-driven systems built for speed."
            },
            {
              icon: <Layers size={24} />,
              title: "UI Architecture",
              desc: "Scalable design systems and motion-focused interfaces."
            },
            {
              icon: <Search size={24} />,
              title: "SEO & Performance",
              desc: "Technical optimization engineered for discoverability."
            }
          ].map((item, i) => (
            <div key={i} className="bg-[#0d0d0d] p-10 rounded-3xl border border-white/5">
              <div className="text-indigo-500 mb-6">{item.icon}</div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-zinc-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-[8vw] py-32 border-t border-white/10">
        <h2 className="text-4xl font-black mb-16 tracking-tight">
          Process
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            { step: "01", title: "Strategy", desc: "We define positioning, structure and user flow." },
            { step: "02", title: "Design", desc: "We craft high-impact interfaces aligned with brand." },
            { step: "03", title: "Engineering", desc: "We build scalable systems optimized for growth." }
          ].map((item, i) => (
            <div key={i}>
              <p className="text-indigo-500 text-sm font-bold mb-4">
                {item.step}
              </p>
              <h3 className="text-xl font-bold mb-3">
                {item.title}
              </h3>
              <p className="text-zinc-400 text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="px-[8vw] py-32 border-t border-white/10 text-center"
      >
        <h2 className="text-4xl font-black mb-6 tracking-tight">
          Let’s build something powerful.
        </h2>

        <p className="text-zinc-400 mb-10">
          Available for new projects. Response within 24 hours.
        </p>

        <a
          href="mailto:hello@arcodic.com"
          className="inline-flex items-center gap-3 px-10 py-5 bg-indigo-600 hover:bg-indigo-500 transition rounded-full font-bold uppercase text-xs tracking-widest"
        >
          <Send size={16} />
          Start a Project
        </a>
      </section>

      {/* FOOTER */}
      <footer className="px-[8vw] py-12 border-t border-white/10 text-zinc-500 text-sm flex justify-between">
        <span>© 2026 ARCODIC Studio</span>
        <span>Cape Town / Global</span>
      </footer>
    </div>
  );
}
