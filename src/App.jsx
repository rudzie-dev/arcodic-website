import React, { useState, useEffect } from 'react';
import {
  X, ArrowUpRight, Zap, Send, Layers, Layout,
  ArrowRight, Code, Cpu, Search, ExternalLink
} from 'lucide-react';

const demos = [
  { id: 1, name: 'Noir Atelier',     tag: 'Luxury Hospitality', img: '/salon-hero.webp',  accent: '#c8a97a' },
  { id: 2, name: 'Roast & Ritual',   tag: 'Boutique Coffee',    img: '/coffee-hero.webp', accent: '#b87333' },
  { id: 3, name: 'MG Installations', tag: 'Technical Services', img: '/installations-hero.webp', accent: '#6ea8fe' },
];

const contacts = [
  {
    id: 'wa', label: 'WhatsApp', value: '+27 67 686 2733', color: '#25D366',
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.123.552 4.197 1.603 6.02L0 24l6.137-1.613a11.887 11.887 0 005.908 1.562h.005c6.635 0 12.05-5.414 12.05-12.051a11.82 11.82 0 00-3.483-8.52"
  },
  {
    id: 'ig', label: 'Instagram', value: '@arcodic.studio', color: '#e1306c',
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
  },
  {
    id: 'mail', label: 'Email', value: 'hello@arcodic.com', color: '#818cf8',
    path: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
  },
];

const services = [
  { icon: <Code size={18}/>, label: 'Full-Stack Dev',   desc: 'Next.js, TypeScript & high-performance API architecture.' },
  { icon: <Cpu size={18}/>,  label: 'UI Architecture',  desc: 'Design systems built for scale and frame-perfect motion.' },
  { icon: <Search size={18}/>, label: 'SEO Strategy',   desc: 'Technical optimisation that ensures your brand gets found.' },
];

export default function App() {
  const [dispersed,      setDispersed]      = useState(false);
  const [activeBlock,    setActiveBlock]    = useState(null);
  const [currentDemo,    setCurrentDemo]    = useState(0);
  const [currentContact, setCurrentContact] = useState(0);
  const [mousePos,       setMousePos]       = useState({ x: 0, y: 0 });
  const [statusTime,     setStatusTime]     = useState('');

  useEffect(() => {
    const t0 = setTimeout(() => setDispersed(true), 300);
    const t1 = setInterval(() => setCurrentDemo(p => (p + 1) % demos.length), 4000);
    const t2 = setInterval(() => setCurrentContact(p => (p + 1) % contacts.length), 3500);
    const t3 = setInterval(() => setStatusTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })), 1000);
    const onMouse = (e) => setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 14, y: (e.clientY / window.innerHeight - 0.5) * 14 });
    window.addEventListener('mousemove', onMouse);
    return () => { clearTimeout(t0); clearInterval(t1); clearInterval(t2); clearInterval(t3); window.removeEventListener('mousemove', onMouse); };
  }, []);

  const blocks = [
    { id: 'logo',    isLogo: true,    pos: { top:'3vh', left:'3vw', width:'34vw', height:'32vh' } },
    { id: 'work',    isWork: true,    pos: { top:'3vh', right:'3vw', width:'55vw', height:'62vh' },    label:'WORK',      title:'Portfolio' },
    { id: 'cta',     isContact: true, pos: { bottom:'3vh', right:'3vw', width:'55vw', height:'28vh' }, label:'CONTACT',   title:'Direct Channels' },
    { id: 'service',                  pos: { top:'39vh', left:'3vw', width:'34vw', height:'30vh' },    label:'EXPERTISE', title:'The Stack' },
    { id: 'speed',                    pos: { bottom:'3vh', left:'3vw', width:'16vw', height:'21vh' },  label:'24H',       title:'Sprint Delivery' },
    { id: 'social',                   pos: { bottom:'3vh', left:'21vw', width:'16vw', height:'21vh' }, label:'CONNECT',   title:'Global Feed' },
  ];

  const anyActive = activeBlock !== null;

  const renderPopup = () => {
    if (!activeBlock) return null;
    switch (activeBlock.id) {
      case 'work': return (
        <div style={{ display:'flex', flexDirection:'column', gap:12, width:'100%' }}>
          {demos.map((d) => (
            <div key={d.id}
              style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px', borderRadius:16, border:'1px solid rgba(255,255,255,0.05)', background:'rgba(255,255,255,0.02)', cursor:'pointer', overflow:'hidden', transition:'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.05)'; }}>
              <div style={{ display:'flex', gap:20, alignItems:'center' }}>
                <div style={{ width:64, height:64, borderRadius:12, overflow:'hidden', background:'rgba(255,255,255,0.05)', flexShrink:0 }}>
                  <img src={d.img} alt={d.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                </div>
                <div>
                  <p style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', color:d.accent, marginBottom:6, margin:'0 0 6px' }}>{d.tag}</p>
                  <h4 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, letterSpacing:'0.03em', color:'#fff', margin:0 }}>{d.name}</h4>
                </div>
              </div>
              <div style={{ width:32, height:32, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <ArrowUpRight size={14} />
              </div>
            </div>
          ))}
        </div>
      );
      case 'cta': return (
        <div style={{ display:'flex', flexDirection:'column', gap:12, width:'100%' }}>
          <div style={{ padding:'20px', borderRadius:16, border:'1px solid rgba(52,211,153,0.2)', background:'rgba(52,211,153,0.04)', marginBottom:4 }}>
            <p style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:'0.12em', textTransform:'uppercase', color:'#34d399', display:'flex', alignItems:'center', gap:8, margin:'0 0 8px' }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'#34d399', display:'inline-block' }} />
              Available — Q2 2025
            </p>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14, margin:0 }}>Direct responses within 2 hours. No agencies, no delays.</p>
          </div>
          {contacts.map((c) => (
            <div key={c.id}
              style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 20px', borderRadius:16, border:'1px solid rgba(255,255,255,0.05)', background:'rgba(255,255,255,0.02)', cursor:'pointer', transition:'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.05)'; }}>
              <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                <div style={{ width:36, height:36, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', background:`${c.color}14`, border:'1px solid rgba(255,255,255,0.05)', flexShrink:0 }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width:16, height:16, color:c.color }}>
                    <path d={c.path} />
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', margin:'0 0 2px' }}>{c.label}</p>
                  <p style={{ fontSize:14, fontWeight:500, color:'rgba(255,255,255,0.8)', margin:0 }}>{c.value}</p>
                </div>
              </div>
              <ArrowRight size={14} style={{ opacity:0.3, flexShrink:0 }} />
            </div>
          ))}
        </div>
      );
      case 'service': return (
        <div style={{ display:'flex', flexDirection:'column', gap:12, width:'100%' }}>
          {services.map((s, i) => (
            <div key={i} style={{ display:'flex', gap:16, padding:'20px', borderRadius:16, border:'1px solid rgba(255,255,255,0.05)', background:'rgba(255,255,255,0.02)' }}>
              <div style={{ width:36, height:36, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(200,241,53,0.1)', border:'1px solid rgba(200,241,53,0.15)', color:'#c8f135', flexShrink:0 }}>
                {s.icon}
              </div>
              <div>
                <h4 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, letterSpacing:'0.04em', color:'#fff', margin:'0 0 6px' }}>{s.label}</h4>
                <p style={{ fontSize:14, color:'rgba(255,255,255,0.4)', lineHeight:1.6, margin:0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      );
      case 'speed': return (
        <div style={{ display:'flex', flexDirection:'column', gap:16, width:'100%' }}>
          <div style={{ padding:'32px', borderRadius:16, border:'1px solid rgba(200,241,53,0.2)', background:'rgba(200,241,53,0.04)', textAlign:'center' }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:80, color:'#c8f135', lineHeight:1 }}>24H</div>
            <p style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:'0.16em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', margin:'8px 0 0' }}>Delivery Sprint</p>
          </div>
          <p style={{ fontSize:14, color:'rgba(255,255,255,0.4)', lineHeight:1.7, margin:0, padding:'0 4px' }}>
            From brief to live site in a single business day. No compromises on quality — we've built the systems to move fast without breaking things.
          </p>
        </div>
      );
      case 'social': return (
        <div style={{ display:'flex', flexDirection:'column', gap:12, width:'100%' }}>
          {contacts.slice(0,2).map(c => (
            <div key={c.id}
              style={{ display:'flex', alignItems:'center', gap:16, padding:'18px 20px', borderRadius:16, border:'1px solid rgba(255,255,255,0.05)', background:'rgba(255,255,255,0.02)', cursor:'pointer', transition:'all 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.02)'}>
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width:20, height:20, color:c.color, flexShrink:0 }}>
                <path d={c.path} />
              </svg>
              <span style={{ fontSize:14, color:'rgba(255,255,255,0.7)' }}>{c.value}</span>
              <ExternalLink size={12} style={{ marginLeft:'auto', opacity:0.3 }} />
            </div>
          ))}
        </div>
      );
      default: return null;
    }
  };

  return (
    <div style={{ height:'100vh', width:'100vw', overflow:'hidden', background:'#080808', color:'#fff', fontFamily:"'DM Sans', sans-serif" }}>

      {/* Status bar */}
      <div style={{ position:'fixed', top:20, left:'50%', transform:'translateX(-50%)', zIndex:50, display:'flex', alignItems:'center', gap:20, padding:'8px 20px', borderRadius:100, border:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.04)', backdropFilter:'blur(20px)', whiteSpace:'nowrap' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'#c8f135', display:'inline-block' }} />
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)' }}>System Ready</span>
        </div>
        <div style={{ width:1, height:12, background:'rgba(255,255,255,0.1)' }} />
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)' }}>{statusTime || '00:00:00'} SAST</span>
        <div style={{ width:1, height:12, background:'rgba(255,255,255,0.1)' }} />
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)' }}>CPT · ZA</span>
      </div>

      {/* Bento grid */}
      <div style={{ position:'relative', height:'100vh', width:'100%', perspective:'1200px' }}>
        {blocks.map((block) => {
          const isActive = activeBlock?.id === block.id;
          const dimmed   = anyActive && !isActive;

          return (
            <div
              key={block.id}
              onClick={() => !block.isLogo && setActiveBlock(block)}
              onMouseEnter={e => { if (!block.isLogo) { e.currentTarget.style.borderColor='rgba(255,255,255,0.14)'; e.currentTarget.style.boxShadow='0 24px 80px rgba(0,0,0,0.6)'; }}}
              onMouseLeave={e => { e.currentTarget.style.borderColor = block.isLogo ? 'transparent' : 'rgba(255,255,255,0.06)'; e.currentTarget.style.boxShadow='none'; }}
              style={{
                position: 'absolute',
                borderRadius: 20,
                overflow: 'hidden',
                cursor: block.isLogo ? 'default' : 'pointer',
                border: `1px solid ${block.isLogo ? 'transparent' : 'rgba(255,255,255,0.06)'}`,
                background: block.isLogo ? '#c8f135' : '#0f0f0f',
                ...block.pos,
                opacity: dispersed ? (dimmed ? 0 : 1) : 0,
                filter: dimmed ? 'blur(8px)' : 'none',
                transform: !anyActive && dispersed
                  ? `perspective(1200px) rotateX(${mousePos.y * 0.04}deg) rotateY(${mousePos.x * -0.04}deg)`
                  : dimmed ? 'scale(0.97)' : 'none',
                transition: 'opacity 0.6s ease, filter 0.5s ease, transform 1.2s cubic-bezier(0.19,1,0.22,1), border-color 0.3s ease, box-shadow 0.3s ease',
                pointerEvents: dimmed ? 'none' : 'auto',
              }}
            >
              {/* ── LOGO ── */}
              {block.isLogo && (
                <div style={{ height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'3vw' }}>
                  <div style={{ width:32, height:32, borderRadius:8, background:'rgba(0,0,0,0.15)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ fontFamily:"'Bebas Neue',sans-serif", color:'rgba(0,0,0,0.5)', fontSize:11, letterSpacing:'0.06em' }}>AR</span>
                  </div>
                  <div>
                    <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'5.5vw', color:'#000', lineHeight:1, margin:0 }}>ARCODIC.</h1>
                    <p style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.6vw', letterSpacing:'0.4em', color:'rgba(0,0,0,0.4)', textTransform:'uppercase', margin:'8px 0 0' }}>Web Studio · Since 2022</p>
                  </div>
                </div>
              )}

              {/* ── WORK ── */}
              {block.isWork && (
                <>
                  <div style={{ position:'absolute', inset:0, zIndex:0 }}>
                    {demos.map((d, idx) => (
                      <img key={d.id} src={d.img} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', transition:'opacity 1s ease, transform 1s ease', opacity: currentDemo===idx ? 0.45 : 0, transform: currentDemo===idx ? 'scale(1)' : 'scale(1.06)' }} />
                    ))}
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, #0f0f0f 0%, rgba(15,15,15,0.3) 50%, transparent 100%)' }} />
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(15,15,15,0.6), transparent)' }} />
                  </div>
                  <div style={{ position:'absolute', top:20, right:20, zIndex:10, display:'flex', gap:6 }}>
                    {demos.map((_, i) => (
                      <div key={i} style={{ height:6, borderRadius:3, background: currentDemo===i ? '#c8f135' : 'rgba(255,255,255,0.2)', width: currentDemo===i ? 20 : 6, transition:'all 0.5s ease' }} />
                    ))}
                  </div>
                  <div style={{ position:'relative', zIndex:10, height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'2.5vw' }}>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'3px 10px', borderRadius:100, border:'1px solid rgba(255,255,255,0.08)', fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.5)' }}>
                        <Layout size={8} /> Portfolio
                      </span>
                      <ArrowUpRight size={16} style={{ color:'rgba(255,255,255,0.3)' }} />
                    </div>
                    <div>
                      <p style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:8, color: demos[currentDemo].accent, transition:'color 0.7s', margin:'0 0 8px' }}>{demos[currentDemo].tag}</p>
                      <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'3.5vw', lineHeight:1, color:'#fff', margin:0 }}>{demos[currentDemo].name}</h2>
                      <p style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:'rgba(255,255,255,0.3)', margin:'8px 0 0', letterSpacing:'0.08em' }}>Click to explore all projects</p>
                    </div>
                  </div>
                </>
              )}

              {/* ── CONTACT ── */}
              {block.isContact && (
                <>
                  <div style={{ position:'absolute', top:-32, right:-32, pointerEvents:'none', zIndex:0 }}>
                    {contacts.map((c, idx) => (
                      <svg key={c.id} viewBox="0 0 24 24" fill="currentColor" style={{ position:'absolute', top:0, right:0, width:192, height:192, color:c.color, opacity: currentContact===idx ? 0.07 : 0, transform: currentContact===idx ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(8deg)', transition:'all 1s ease' }}>
                        <path d={c.path} />
                      </svg>
                    ))}
                  </div>
                  <div style={{ position:'relative', zIndex:10, height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'2.5vw' }}>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'3px 10px', borderRadius:100, border:'1px solid rgba(255,255,255,0.08)', fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.5)' }}>
                        <Send size={8} /> Contact
                      </span>
                      <ArrowUpRight size={16} style={{ color:'rgba(255,255,255,0.3)' }} />
                    </div>
                    <div>
                      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                        <span style={{ width:6, height:6, borderRadius:'50%', background:'#34d399', display:'inline-block' }} />
                        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:'0.12em', textTransform:'uppercase', color:'#34d399' }}>Available Q2</span>
                      </div>
                      <p style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase', color: contacts[currentContact].color, transition:'color 0.7s', margin:0 }}>{contacts[currentContact].value}</p>
                    </div>
                  </div>
                </>
              )}

              {/* ── SERVICE ── */}
              {block.id === 'service' && (
                <div style={{ height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'2.5vw' }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'3px 10px', borderRadius:100, border:'1px solid rgba(255,255,255,0.08)', fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.5)' }}>
                      <Layers size={8} /> Expertise
                    </span>
                    <ArrowUpRight size={16} style={{ color:'rgba(255,255,255,0.3)' }} />
                  </div>
                  <div>
                    {services.map((s, i) => (
                      <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderBottom: i < services.length-1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                        <span style={{ color:'#c8f135', flexShrink:0 }}>{s.icon}</span>
                        <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:16, letterSpacing:'0.05em', color:'rgba(255,255,255,0.7)' }}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── SPEED ── */}
              {block.id === 'speed' && (
                <div style={{ height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'2.5vw' }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <Zap size={16} style={{ color:'#c8f135' }} />
                    <ArrowUpRight size={14} style={{ color:'rgba(255,255,255,0.3)' }} />
                  </div>
                  <div>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'3.5vw', color:'#c8f135', lineHeight:1 }}>24H</div>
                    <p style={{ fontFamily:"'DM Mono',monospace", fontSize:8, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', margin:'4px 0 0' }}>Sprint</p>
                  </div>
                </div>
              )}

              {/* ── SOCIAL ── */}
              {block.id === 'social' && (
                <div style={{ height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'2.5vw' }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <ExternalLink size={16} style={{ color:'rgba(255,255,255,0.4)' }} />
                    <ArrowUpRight size={14} style={{ color:'rgba(255,255,255,0.3)' }} />
                  </div>
                  <div style={{ display:'flex', gap:10 }}>
                    {contacts.slice(0,2).map(c => (
                      <div key={c.id} style={{ width:36, height:36, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid rgba(255,255,255,0.06)', background:`${c.color}14` }}>
                        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width:16, height:16, color:c.color }}>
                          <path d={c.path} />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* ── POPUP ── */}
      {activeBlock && (
        <div style={{ position:'fixed', inset:0, zIndex:120, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.92)', backdropFilter:'blur(32px)' }} onClick={() => setActiveBlock(null)} />
          <div style={{ position:'relative', background:'#0a0a0a', border:'1px solid rgba(255,255,255,0.1)', borderRadius:28, width:'100%', maxWidth:900, maxHeight:'88vh', overflow:'hidden', boxShadow:'0 40px 120px rgba(0,0,0,0.8)', animation:'fadeUp 0.4s cubic-bezier(0.19,1,0.22,1) both' }}>
            <div style={{ display:'flex', minHeight:'55vh' }}>
              <div style={{ width:'38%', padding:40, borderRight:'1px solid rgba(255,255,255,0.06)', display:'flex', flexDirection:'column', justifyContent:'space-between', background:'rgba(0,0,0,0.3)', flexShrink:0 }}>
                <div>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:'0.5em', textTransform:'uppercase', color:'#c8f135', display:'block', marginBottom:24 }}>{activeBlock.label}</span>
                  <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:48, lineHeight:1, color:'#fff', margin:0 }}>{activeBlock.title || 'Details'}</h3>
                  <div style={{ width:32, height:2, background:'rgba(200,241,53,0.4)', marginTop:24 }} />
                </div>
                <button onClick={() => setActiveBlock(null)}
                  style={{ display:'flex', alignItems:'center', gap:12, fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', background:'none', border:'none', cursor:'pointer', padding:0 }}
                  onMouseEnter={e => e.currentTarget.style.color='rgba(255,255,255,0.8)'}
                  onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.3)'}>
                  <div style={{ width:28, height:28, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <X size={12} />
                  </div>
                  Close
                </button>
              </div>
              <div style={{ flex:1, padding:40, display:'flex', alignItems:'center', overflowY:'auto' }}>
                <div style={{ width:'100%' }}>{renderPopup()}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
