import React from "react";
import {
  ArrowUpRight,
  Code,
  Layers,
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
      "Brand-led eCommerce experience designed for storytelling and growth.",
    img: "/coffee-hero.webp"
  },
  {
    id: 3,
    name: "MG Installations",
    tag: "Technical Services",
    description:
      "Lead-generation system engineered for credibility and scale.",
    img: "/installations-hero.webp"
  }
];

export default function App() {
  return (
    <div className="bg-[#0a0a0f] text-white font-sans selection:bg-indigo-500 overflow-x-hidden">

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">

        {/* Neon background glow */}
        <div className="absolute w-[700px] h-[700px] bg-indigo-600/20 blur-[200px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <h1 className="relative text-[8vw] font-black tracking-tight leading-none">
          ARCODIC
          <span className="text-indigo-500 drop-shadow-[0_0_18px_rgba(99,102,241,0.9)]">
            .
          </span>
        </h1>

        <p className="relative mt-8 text-zinc-400 text-lg max-w-2xl">
          Design-led engineering studio building high-performance
          digital systems for ambitious brands.
        </p>

        <div className="relative mt-12 flex gap-6 flex-wrap justify-center">
          <a
            href="#work"
            className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 transition rounded-full font-bold uppercase text-xs tracking-widest shadow-[0_0_25px_rgba(99,102,241,0.6)]"
          >
            View Work
          </a>

          <a
            href="#contact"
            className="px-10 py-4 border border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10 transition rounded-full font-bold uppercase text-xs tracking-widest"
          >
            Start Project
          </a>
        </div>
      </section>

      {/* ================= WORK ================= */}
      <section id="work" className="px-[8vw] py-32 border-t border-white/10">
        <h2 className="text-4xl font-black mb-20 tracking-tight">
          Selected Work
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {demos.map((demo) => (
            <div
              key={demo.id}
              className="group bg-[#111117] border border-white/5 rounded-3xl overflow-hidden hover:border-indigo-500/40 transition"
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

      {/* ================= CAPABILITIES ================= */}
      <section className="px-[8vw] py-32 border-t border-white/10">
        <h2 className="text-4xl font-black mb-20 tracking-tight">
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
              desc: "Scalable design systems with frame-perfect motion."
            },
            {
              icon: <Search size={24} />,
              title: "SEO & Performance",
              desc: "Technical optimization engineered for visibility and growth."
            }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#111117] p-10 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition"
            >
              <div className="text-indigo-500 mb-6">{item.icon}</div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-zinc-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="px-[8vw] py-32 border-t border-white/10">
        <h2 className="text-4xl font-black mb-20 tracking-tight">
          Process
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              step: "01",
              title: "Strategy",
              desc: "We define positioning, structure and conversion flow."
            },
            {
              step: "02",
              title: "Design",
              desc: "We craft premium digital experiences aligned with brand."
            },
            {
              step: "03",
              title: "Engineering",
              desc: "We build scalable systems optimized for performance."
            }
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

      {/* ================= CTA ================= */}
      <section
        id="contact"
        className="px-[8vw] py-32 border-t border-white/10 text-center relative overflow-hidden"
      >
        <div className="absolute w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full left-1/2 -translate-x-1/2 top-0" />

        <h2 className="relative text-4xl font-black mb-6 tracking-tight">
          Let’s build something powerful.
        </h2>

        <p className="relative text-zinc-400 mb-10">
          Available for new projects. Response within 24 hours.
        </p>

        <a
          href="mailto:hello@arcodic.com"
          className="relative inline-flex items-center gap-3 px-12 py-5 bg-indigo-600 hover:bg-indigo-500 transition rounded-full font-bold uppercase text-xs tracking-widest shadow-[0_0_25px_rgba(99,102,241,0.6)]"
        >
          <Send size={16} />
          Start a Project
        </a>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="px-[8vw] py-12 border-t border-white/10 text-zinc-500 text-sm flex justify-between flex-wrap gap-4">
        <span>© 2026 ARCODIC Studio</span>
        <span>Cape Town / Global</span>
      </footer>
    </div>
  );
}
