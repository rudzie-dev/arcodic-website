import React, { useState, useEffect, useRef } from 'react';
import {
  X, ArrowUpRight, Zap, Send, Layers, Layout,
  ArrowRight, Code, Cpu, Search, ExternalLink, Quote
} from 'lucide-react';

const C = {
  bg:      '#0a0a0a',
  surface: '#111111',
  logo:    '#f0ede8',
  textDim: 'rgba(255,255,255,0.28)',
  textMid: 'rgba(255,255,255,0.50)',
  textHi:  'rgba(255,255,255,0.88)',
  accent:  '#e8e4dc',
  glint:   '#c8a97a',
};

const BRAND = { wa:'#25D366', ig:'#E1306C', mail:'#818cf8' };

const demos = [
  { id:1, name:'Noir Atelier',     tag:'Luxury Hospitality', img:'/salon-hero.webp',         fallback:'linear-gradient(135deg,#2a1f14,#4a3520)' },
  { id:2, name:'Roast & Ritual',   tag:'Boutique Coffee',    img:'/coffee-hero.webp',         fallback:'linear-gradient(135deg,#1a1008,#3d2406)' },
  { id:3, name:'MG Installations', tag:'Technical Services', img:'/mg-installations.webp',    fallback:'linear-gradient(135deg,#0d1520,#1a2d45)' },
];

const contacts = [
  { id:'wa',   label:'WhatsApp', value:'+27 67 686 2733',    href:'https://wa.me/27676862733',         brandColor:BRAND.wa,
    path:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.123.552 4.197 1.603 6.02L0 24l6.137-1.613a11.887 11.887 0 005.908 1.562h.005c6.635 0 12.05-5.414 12.05-12.051a11.82 11.82 0 00-3.483-8.52" },
  { id:'ig',   label:'Instagram', value:'@arcodic.studio',   href:'https://instagram.com/arcodic.studio', brandColor:BRAND.ig,
    path:"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
  { id:'mail', label:'Email',     value:'hello@arcodic.com', href:'mailto:hello@arcodic.com',            brandColor:BRAND.mail,
    path:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" },
];

const services = [
  { icon:<Code size={16}/>,   label:'Full-Stack Dev',  desc:'Next.js, TypeScript & high-performance API architecture.' },
  { icon:<Cpu size={16}/>,    label:'UI Architecture', desc:'Design systems built for scale and frame-perfect motion.' },
  { icon:<Search size={16}/>, label:'SEO Strategy',    desc:'Technical optimisation that ensures your brand gets found.' },
];

const pill = {
  display:'inline-flex', alignItems:'center', gap:5,
  padding:'3px 10px', borderRadius:100,
  border:'1px solid rgba(255,255,255,0.07)',
  fontFamily:"'DM Mono',monospace", fontSize:8,
  letterSpacing:'0.13em', textTransform:'uppercase',
  color:'rgba(255,255,255,0.35)',
};

// Image with gradient fallback
function ProjectImg({ src, fallback, style }) {
  const [errored, setErrored] = useState(false);
  if (errored) return <div style={{ ...style, background: fallback }} />;
  return <img src={src} alt="" style={style} onError={() => setErrored(true)} />;
}

export default function App() {
  const [dispersed,      setDispersed]      = useState(false);
  const [activeBlock,    setActiveBlock]    = useState(null);
  const [expandedDemo,   setExpandedDemo]   = useState(null);
  const [currentDemo,    setCurrentDemo]    = useState(0);
  const [currentContact, setCurrentContact] = useState(0);
  const [mousePos,       setMousePos]       = useState({ x:0, y:0 });
  const [statusTime,     setStatusTime]     = useState('');
  const logoRef = useRef(null);

  // Mouse-reactive glint on logo
  const [logoGlint, setLogoGlint] = useState({ x:50, y:50 });

  useEffect(() => {
    const t0 = setTimeout(() => setDispersed(true), 300);
    const t1 = setInterval(() => setCurrentDemo(p => (p+1) % demos.length), 4000);
    const t2 = setInterval(() => setCurrentContact(p => (p+1) % contacts.length), 3500);
    const t3 = setInterval(() => setStatusTime(new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit', second:'2-digit' })), 1000);
    const onMouse = (e) => {
      setMousePos({ x:(e.clientX/window.innerWidth-0.5)*12, y:(e.clientY/window.innerHeight-0.5)*12 });
      if (logoRef.current) {
        const r = logoRef.current.getBoundingClientRect();
        setLogoGlint({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
      }
    };
    window.addEventListener('mousemove', onMouse);
    return () => { clearTimeout(t0); clearInterval(t1); clearInterval(t2); clearInterval(t3); window.removeEventListener('mousemove', onMouse); };
  }, []);

  // Desktop bento layout — 6 cells + about cell
  const blocks = [
    { id:'logo',    isLogo:true,    pos:{ top:'3vh',    left:'3vw',   width:'34vw', height:'32vh' } },
    { id:'work',    isWork:true,    pos:{ top:'3vh',    right:'3vw',  width:'55vw', height:'62vh' }, label:'WORK',      title:'Portfolio' },
    { id:'cta',     isContact:true, pos:{ bottom:'3vh', right:'3vw',  width:'55vw', height:'28vh' }, label:'CONTACT',   title:'Direct Channels' },
    { id:'service',                 pos:{ top:'39vh',   left:'3vw',   width:'22vw', height:'30vh' }, label:'EXPERTISE', title:'The Stack' },
    { id:'about',   isAbout:true,   pos:{ top:'39vh',   left:'27vw',  width:'11vw', height:'30vh' }, label:'ABOUT' },
    { id:'speed',                   pos:{ bottom:'3vh', left:'3vw',   width:'16vw', height:'21vh' }, label:'24H',       title:'Sprint Delivery' },
    { id:'social',                  pos:{ bottom:'3vh', left:'21vw',  width:'16vw', height:'21vh' }, label:'CONNECT',   title:'Global Feed' },
  ];

  const anyActive = activeBlock !== null;

  const rowStyle = {
    display:'flex', alignItems:'center', justifyContent:'space-between',
    padding:'18px 20px', borderRadius:16,
    border:'1px solid rgba(255,255,255,0.04)',
    background:'rgba(255,255,255,0.015)',
    cursor:'pointer', transition:'all 0.25s',
    textDecoration:'none', color:'inherit',
  };
  const rowHover = (e) => { e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.09)'; };
  const rowLeave = (e) => { e.currentTarget.style.background='rgba(255,255,255,0.015)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.04)'; };

  const renderPopup = () => {
    if (!activeBlock) return null;
    switch (activeBlock.id) {
      case 'work': return (
        <div style={{ display:'flex', flexDirection:'column', gap:10, width:'100%' }}>
          {demos.map(d => (
            <div key={d.id}>
              <div
                style={{ ...rowStyle, flexDirection:'column', alignItems:'stretch', padding:0, overflow:'hidden' }}
                onClick={() => setExpandedDemo(expandedDemo === d.id ? null : d.id)}
                onMouseEnter={rowHover} onMouseLeave={rowLeave}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 20px' }}>
                  <div style={{ display:'flex', gap:18, alignItems:'center' }}>
                    <div style={{ width:60, height:60, borderRadius:10, overflow:'hidden', flexShrink:0, background:d.fallback }}>
                      <ProjectImg src={d.img} fallback={d.fallback} style={{ width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(30%)' }} />
                    </div>
                    <div>
                      <p style={{ fontFamily:"'DM Mono',monospace", fontSize:8, letterSpacing:'0.14em', textTransform:'uppercase', color:C.textDim, margin:'0 0 5px' }}>{d.tag}</p>
                      <h4 style={{ fontFamily:"'Godber',sans-serif", fontSize:24, color:C.textHi, margin:0 }}>{d.name}</h4>
                    </div>
                  </div>
                  <div style={{ width:30, height:30, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'transform 0.3s', transform: expandedDemo===d.id ? 'rotate(45deg)' : 'none' }}>
                    <ArrowUpRight size={13} style={{ color:C.textMid }} />
                  </div>
                </div>
                {/* Expandable case study */}
                <div style={{ maxHeight: expandedDemo===d.id ? 120 : 0, overflow:'hidden', transition:'max-height 0.4s cubic-bezier(0.19,1,0.22,1)' }}>
                  <div style={{ padding:'0 20px 20px', borderTop:'1px solid rgba(255,255,255,0.04)' }}>
                    <p style={{ fontSize:13, color:C.textDim, lineHeight:1.7, margin:'14px 0 12px' }}>
                      A bespoke digital presence crafted for {d.name}. Focused on performance, conversion, and brand alignment from the ground up.
                    </p>
                    <a href="#" style={{ fontFamily:"'DM Mono',monospace", fontSize:8, letterSpacing:'0.14em', textTransform:'uppercase', color:C.glint, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:6 }}>
                      View live site <ExternalLink size={10}/>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );

      case 'cta': return (
        <div style={{ display:'flex', flexDirection:'column', gap:10, width:'100%' }}>
          <div style={{ padding:'18px 20px', borderRadius:16, border:'1px solid rgba(255,255,255,0.06)', background:'rgba(255,255,255,0.02)', marginBottom:4 }}>
            <p style={{ fontFamily:"'DM Mono',monospace", fontSize:8, letterSpacing:'0.13em', textTransform:'uppercase', color:C.textMid, display:'flex', alignItems:'center', gap:8, margin:'0 0 8px' }}>
              <span style={{ width:5, height:5, borderRadius:'50%', background:'rgba(255,255,255,0.5)', display:'inline-block' }} />
              Available — Q2 2025
            </p>
            <p style={{ color:C.textDim, fontSize:13, margin:0, lineHeight:1.6 }}>Direct responses within 2 hours. No agencies, no delays.</p>
          </div>
          {contacts.map(c => (
            <a key={c.id} href={c.href} target="_blank" rel="noopener noreferrer"
              style={rowStyle} onMouseEnter={rowHover} onMouseLeave={rowLeave}>
              <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                <div style={{ width:34, height:34, borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', background:`${c.brandColor}18`, border:`1px solid ${c.brandColor}30`, flexShrink:0 }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width:14, height:14, color:c.brandColor }}>
                    <path d={c.path} />
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily:"'DM Mono',monospace", fontSize:8, letterSpacing:'0.12em', textTransform:'uppercase', color:C.textDim, margin:'0 0 2px' }}>{c.label}</p>
                  <p style={{ fontSize:13, fontWeight:500, color:C.textHi, margin:0 }}>{c.value}</p>
                </div>
              </div>
              <ArrowRight size={13} style={{ opacity:0.2, flexShrink:0 }} />
            </a>
          ))}
        </div>
      );

      case 'service': return (
        <div style={{ display:'flex', flexDirection:'column', gap:10, width:'100%' }}>
          {services.map((s, i) => (
            <div key={i} style={{ display:'flex', gap:14, padding:'18px 20px', borderRadius:16, border:'1px solid rgba(255,255,255,0.04)', background:'rgba(255,255,255,0.015)' }}>
              <div style={{ width:34, height:34, borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', background:`${C.glint}14`, border:`1px solid ${C.glint}25`, color:C.glint, flexShrink:0 }}>
                {s.icon}
              </div>
              <div>
                <h4 style={{ fontFamily:"'Godber',sans-serif", fontSize:20, color:C.textHi, margin:'0 0 4px' }}>{s.label}</h4>
                <p style={{ fontSize:13, color:C.textDim, lineHeight:1.6, margin:0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      );

      case 'about': return (
        <div style={{ display:'flex', flexDirection:'column', gap:16, width:'100%' }}>
          <div style={{ padding:'28px', borderRadius:16, border:'1px solid rgba(255,255,255,0.05)', background:'rgba(255,255,255,0.02)', position:'relative', overflow:'hidden' }}>
            <Quote size={48} style={{ position:'absolute', top:16, right:16, color:'rgba(255,255,255,0.04)' }} />
            <p style={{ fontFamily:"'Godber',sans-serif", fontSize:32, color:C.textHi, lineHeight:1.2, margin:0, position:'relative', zIndex:1 }}>
              We build fast.<br/>We build right.<br/>That's it.
            </p>
          </div>
          <p style={{ fontSize:13, color:C.textDim, lineHeight:1.75, margin:0, padding:'0 4px' }}>
            Arcodic is a Cape Town–based web studio. We work with brands that care about craft — delivering precision-built digital experiences on timelines that don't waste anyone's time.
          </p>
        </div>
      );

      case 'speed': return (
        <div style={{ display:'flex', flexDirection:'column', gap:14, width:'100%' }}>
          <div style={{ padding:'32px', borderRadius:16, border:`1px solid ${C.glint}22`, background:`${C.glint}08`, textAlign:'center' }}>
            <div style={{ fontFamily:"'Godber',sans-serif", fontSize:80, color:C.glint, lineHeight:1 }}>24H</div>
            <p style={{ fontFamily:"'DM Mono',monospace", fontSize:8, letterSpacing:'0.16em', textTransform:'uppercase', color:C.textDim, margin:'10px 0 0' }}>Delivery Sprint</p>
          </div>
          <p style={{ fontSize:13, color:C.textDim, lineHeight:1.75, margin:0, padding:'0 4px' }}>
            From brief to live site in a single business day. No compromises on quality — we've built the systems to move fast without breaking things.
          </p>
        </div>
      );

      case 'social': return (
        <div style={{ display:'flex', flexDirection:'column', gap:10, width:'100%' }}>
          {contacts.slice(0,2).map(c => (
            <a key={c.id} href={c.href} target="_blank" rel="noopener noreferrer"
              style={rowStyle} onMouseEnter={rowHover} onMouseLeave={rowLeave}>
              <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                <div style={{ width:34, height:34, borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', background:`${c.brandColor}18`, border:`1px solid ${c.brandColor}30`, flexShrink:0 }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width:14, height:14, color:c.brandColor }}>
                    <path d={c.path} />
                  </svg>
                </div>
                <span style={{ fontSize:13, color:C.textHi }}>{c.value}</span>
              </div>
              <ExternalLink size={12} style={{ opacity:0.2 }} />
            </a>
          ))}
        </div>
      );

      default: return null;
    }
  };

  // ── Mobile layout (< 768px) ──────────────────────────────────────
  const MobileLayout = () => (
    <div style={{ height:'100vh', overflowY:'auto', padding:'16px', display:'flex', flexDirection:'column', gap:12, paddingTop:64 }}>
      {/* Logo */}
      <div style={{ borderRadius:16, background:C.logo, padding:'28px 24px', display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
        <div>
          <h1 style={{ fontFamily:"'Godber',sans-serif", fontSize:48, color:'#0a0a0a', lineHeight:1, margin:0 }}>ARCODIC.</h1>
          <p style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:'0.35em', color:'rgba(0,0,0,0.35)', textTransform:'uppercase', margin:'8px 0 0' }}>Web Studio · Est. 2025</p>
        </div>
        <div style={{ fontFamily:"'Godber',sans-serif", fontSize:13, color:'rgba(0,0,0,0.3)' }}>CPT</div>
      </div>

      {/* Manifesto */}
      <div style={{ borderRadius:16, background:C.surface, border:'1px solid rgba(255,255,255,0.05)', padding:'32px 28px', position:'relative', overflow:'hidden' }}>
        <Quote size={48} style={{ position:'absolute', top:14, right:14, color:'rgba(255,255,255,0.04)' }} />
        <p style={{ fontFamily:"'Godber',sans-serif", fontSize:36, color:C.textHi, lineHeight:1.2, margin:0 }}>
          We build fast.<br/>We build right.<br/>That's it.
        </p>
        <div style={{ width:20, height:1, background:`${C.glint}50`, marginTop:16 }} />
      </div>

      {/* Work */}
      <div style={{ borderRadius:16, background:C.surface, border:'1px solid rgba(255,255,255,0.05)', overflow:'hidden' }}>
        <div style={{ padding:'20px 20px 12px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={pill}><Layout size={7}/> Portfolio</span>
        </div>
        {demos.map((d, i) => (
          <div key={d.id} style={{ display:'flex', alignItems:'center', gap:14, padding:'12px 20px', borderTop:'1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ width:48, height:48, borderRadius:8, overflow:'hidden', flexShrink:0, background:d.fallback }}>
              <ProjectImg src={d.img} fallback={d.fallback} style={{ width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(30%)' }} />
            </div>
            <div style={{ flex:1 }}>
              <p style={{ fontFamily:"'DM Mono',monospace", fontSize:7, letterSpacing:'0.12em', textTransform:'uppercase', color:C.textDim, margin:'0 0 3px' }}>{d.tag}</p>
              <h4 style={{ fontFamily:"'Godber',sans-serif", fontSize:18, color:C.textHi, margin:0 }}>{d.name}</h4>
            </div>
            <ArrowUpRight size={14} style={{ color:'rgba(255,255,255,0.2)', flexShrink:0 }} />
          </div>
        ))}
      </div>

      {/* Services */}
      <div style={{ borderRadius:16, background:C.surface, border:'1px solid rgba(255,255,255,0.05)', padding:'20px' }}>
        <span style={{ ...pill, marginBottom:16, display:'inline-flex' }}><Layers size={7}/> Expertise</span>
        <div style={{ marginTop:12 }}>
          {services.map((s, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderBottom: i < services.length-1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <span style={{ color:`${C.glint}aa` }}>{s.icon}</span>
              <span style={{ fontFamily:"'Godber',sans-serif", fontSize:16, color:'rgba(255,255,255,0.65)' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Speed + Social row */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        <div style={{ borderRadius:16, background:C.surface, border:'1px solid rgba(255,255,255,0.05)', padding:'20px', display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:120 }}>
          <Zap size={14} style={{ color:`${C.glint}99` }} />
          <div>
            <div style={{ fontFamily:"'Godber',sans-serif", fontSize:36, color:C.glint, lineHeight:1 }}>24H</div>
            <p style={{ fontFamily:"'DM Mono',monospace", fontSize:7, letterSpacing:'0.12em', textTransform:'uppercase', color:C.textDim, margin:'4px 0 0' }}>Sprint</p>
          </div>
        </div>
        <div style={{ borderRadius:16, background:C.surface, border:'1px solid rgba(255,255,255,0.05)', padding:'20px', display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:120 }}>
          <ExternalLink size={14} style={{ color:'rgba(255,255,255,0.3)' }} />
          <div style={{ display:'flex', gap:8 }}>
            {contacts.slice(0,2).map(c => (
              <a key={c.id} href={c.href} target="_blank" rel="noopener noreferrer"
                style={{ width:34, height:34, borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', border:`1px solid ${c.brandColor}28`, background:`${c.brandColor}12` }}>
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width:14, height:14, color:c.brandColor }}>
                  <path d={c.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Contact */}
      <div style={{ borderRadius:16, background:C.surface, border:'1px solid rgba(255,255,255,0.05)', padding:'20px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <span style={pill}><Send size={7}/> Contact</span>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <span style={{ width:5, height:5, borderRadius:'50%', background:'rgba(255,255,255,0.4)', display:'inline-block' }} />
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:7, letterSpacing:'0.1em', textTransform:'uppercase', color:C.textDim }}>Available Q2</span>
          </div>
        </div>
        {contacts.map(c => (
          <a key={c.id} href={c.href} target="_blank" rel="noopener noreferrer"
            style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 0', borderBottom:'1px solid rgba(255,255,255,0.04)', textDecoration:'none', color:'inherit' }}>
            <div style={{ width:32, height:32, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', background:`${c.brandColor}18`, border:`1px solid ${c.brandColor}28`, flexShrink:0 }}>
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width:12, height:12, color:c.brandColor }}>
                <path d={c.path} />
              </svg>
            </div>
            <span style={{ fontSize:13, color:C.textHi }}>{c.value}</span>
            <ArrowRight size={12} style={{ marginLeft:'auto', opacity:0.2 }} />
          </a>
        ))}
      </div>
      <div style={{ height:16 }} />
    </div>
  );

  return (
    <div style={{ height:'100vh', width:'100vw', overflow:'hidden', background:C.bg, color:'#fff', fontFamily:"'DM Sans',sans-serif" }}>

      {/* Status bar */}
      <div style={{ position:'fixed', top:20, left:'50%', transform:'translateX(-50%)', zIndex:50, display:'flex', alignItems:'center', gap:18, padding:'7px 18px', borderRadius:100, border:'1px solid rgba(255,255,255,0.06)', background:'rgba(255,255,255,0.03)', backdropFilter:'blur(20px)', whiteSpace:'nowrap' }}>
        <div style={{ display:'flex', alignItems:'center', gap:7 }}>
          <span style={{ width:5, height:5, borderRadius:'50%', background:C.glint, display:'inline-block', boxShadow:`0 0 6px ${C.glint}80` }} />
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:8, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(255,255,255,0.32)' }}>System Ready</span>
        </div>
        <div style={{ width:1, height:10, background:'rgba(255,255,255,0.08)' }} />
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:8, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(255,255,255,0.32)' }}>{statusTime || '00:00:00'} SAST</span>
        <div style={{ width:1, height:10, background:'rgba(255,255,255,0.08)' }} />
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:8, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(255,255,255,0.32)' }}>CPT · ZA</span>
      </div>

      {/* Responsive: mobile vs desktop */}
      <div className="mobile-only"><MobileLayout /></div>

      {/* Desktop bento */}
      <div className="desktop-only" style={{ position:'relative', height:'100vh', width:'100%', perspective:'1200px' }}>
        {/* Subtle radial depth */}
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 60% at 62% 45%, rgba(200,169,122,0.03) 0%, transparent 70%)', pointerEvents:'none', zIndex:0 }} />

        {blocks.map((block) => {
          const isActive = activeBlock?.id === block.id;
          const dimmed   = anyActive && !isActive;

          return (
            <div
              key={block.id}
              ref={block.isLogo ? logoRef : null}
              className={!block.isLogo ? 'bento-cell' : ''}
              onClick={() => !block.isLogo && setActiveBlock(block)}
              onMouseEnter={e => { if (!block.isLogo) e.currentTarget.style.borderColor='rgba(255,255,255,0.11)'; }}
              onMouseLeave={e => { if (!block.isLogo) e.currentTarget.style.borderColor='rgba(255,255,255,0.05)'; }}
              style={{
                position:'absolute', borderRadius:20, overflow:'hidden', zIndex:1,
                cursor: block.isLogo ? 'default' : 'pointer',
                border:`1px solid ${block.isLogo ? 'transparent' : 'rgba(255,255,255,0.05)'}`,
                background: block.isLogo ? C.logo : C.surface,
                ...block.pos,
                opacity: dispersed ? (dimmed ? 0 : 1) : 0,
                filter: dimmed ? 'blur(6px)' : 'none',
                transform: !anyActive && dispersed
                  ? `perspective(1200px) rotateX(${mousePos.y*0.035}deg) rotateY(${mousePos.x*-0.035}deg)`
                  : dimmed ? 'scale(0.975)' : 'none',
                transition:'opacity 0.6s ease, filter 0.5s ease, transform 1.2s cubic-bezier(0.19,1,0.22,1), border-color 0.3s ease',
                pointerEvents: dimmed ? 'none' : 'auto',
              }}
            >
              {!block.isLogo && <div className="cell-glint" />}

              {/* ── LOGO ── */}
              {block.isLogo && (
                <>
                  {/* Mouse-reactive glint */}
                  <div style={{
                    position:'absolute', inset:0, pointerEvents:'none',
                    background:`radial-gradient(circle at ${logoGlint.x}% ${logoGlint.y}%, rgba(200,169,122,0.22) 0%, transparent 55%)`,
                    transition:'background 0.1s ease',
                  }} />
                  <div style={{ position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'3vw' }}>
                    <div style={{ width:30, height:30, borderRadius:7, background:'rgba(0,0,0,0.08)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <span style={{ fontFamily:"'Godber',sans-serif", color:'rgba(0,0,0,0.4)', fontSize:12 }}>AR</span>
                    </div>
                    <div>
                      <h1 style={{ fontFamily:"'Godber',sans-serif", fontSize:'5.2vw', color:'#0a0a0a', lineHeight:1, margin:0 }}>ARCODIC.</h1>
                      <p style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.55vw', letterSpacing:'0.42em', color:'rgba(0,0,0,0.35)', textTransform:'uppercase', margin:'10px 0 0' }}>Web Studio · Est. 2025</p>
                    </div>
                  </div>
                </>
              )}

              {/* ── WORK ── */}
              {block.isWork && (
                <>
                  <div style={{ position:'absolute', inset:0, zIndex:0 }}>
                    {demos.map((d, idx) => (
                      <div key={d.id} style={{ position:'absolute', inset:0, opacity: currentDemo===idx ? 1 : 0, transition:'opacity 1s ease' }}>
                        <div style={{ position:'absolute', inset:0, background:d.fallback }} />
                        <ProjectImg src={d.img} fallback={d.fallback} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(35%) brightness(0.6)', transform: currentDemo===idx ? 'scale(1)' : 'scale(1.05)', transition:'transform 1s ease' }} />
                      </div>
                    ))}
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, #111111 0%, rgba(17,17,17,0.4) 50%, transparent 100%)' }} />
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(17,17,17,0.7), transparent 60%)' }} />
                  </div>
                  <div style={{ position:'absolute', top:20, right:20, zIndex:10, display:'flex', gap:5 }}>
                    {demos.map((_, i) => (
                      <div key={i} style={{ height:2, borderRadius:2, background: currentDemo===i ? C.glint : 'rgba(255,255,255,0.15)', width: currentDemo===i ? 20 : 6, transition:'all 0.5s ease', boxShadow: currentDemo===i ? `0 0 6px ${C.glint}80` : 'none' }} />
                    ))}
                  </div>
                  <div style={{ position:'relative', zIndex:10, height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'2.5vw' }}>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <span style={pill}><Layout size={7}/> Portfolio</span>
                      <ArrowUpRight size={15} style={{ color:'rgba(255,255,255,0.25)' }} />
                    </div>
                    <div>
                      <p style={{ fontFamily:"'DM Mono',monospace", fontSize:8, letterSpacing:'0.14em', textTransform:'uppercase', color:C.textMid, margin:'0 0 7px' }}>{demos[currentDemo].tag}</p>
                      <h2 style={{ fontFamily:"'Godber',sans-serif", fontSize:'3.4vw', lineHeight:1.05, color:'rgba(255,255,255,0.92)', margin:0 }}>{demos[currentDemo].name}</h2>
                      <p style={{ fontFamily:"'DM Mono',monospace", fontSize:8, color:C.textDim, margin:'10px 0 0', letterSpacing:'0.08em' }}>Click to explore all projects</p>
                    </div>
                  </div>
                </>
              )}

              {/* ── CONTACT ── */}
              {block.isContact && (
                <>
                  <div style={{ position:'absolute', top:-24, right:-24, pointerEvents:'none', zIndex:0 }}>
                    {contacts.map((c, idx) => (
                      <svg key={c.id} viewBox="0 0 24 24" fill="currentColor"
                        style={{ position:'absolute', top:0, right:0, width:160, height:160, color:c.brandColor, opacity: currentContact===idx ? 0.07 : 0, transform: currentContact===idx ? 'scale(1) rotate(0deg)' : 'scale(0.85) rotate(6deg)', transition:'all 1s ease' }}>
                        <path d={c.path} />
                      </svg>
                    ))}
                  </div>
                  <div style={{ position:'relative', zIndex:10, height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'2.5vw' }}>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <span style={pill}><Send size={7}/> Contact</span>
                      <ArrowUpRight size={15} style={{ color:'rgba(255,255,255,0.25)' }} />
                    </div>
                    <div>
                      <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:6 }}>
                        <span style={{ width:5, height:5, borderRadius:'50%', background:'rgba(255,255,255,0.4)', display:'inline-block' }} />
                        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:8, letterSpacing:'0.12em', textTransform:'uppercase', color:C.textDim }}>Available Q2</span>
                      </div>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width:13, height:13, color:contacts[currentContact].brandColor, flexShrink:0, transition:'color 0.7s' }}>
                          <path d={contacts[currentContact].path} />
                        </svg>
                        <p style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:'0.1em', textTransform:'uppercase', color:C.textMid, margin:0 }}>
                          {contacts[currentContact].value}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* ── ABOUT ── */}
              {block.isAbout && (
                <div style={{ height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'1.8vw', position:'relative' }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <span style={{ ...pill, fontSize:7, padding:'2px 8px' }}><Quote size={6}/> About</span>
                    <ArrowUpRight size={13} style={{ color:'rgba(255,255,255,0.25)' }} />
                  </div>
                  <div>
                    <p style={{ fontFamily:"'Godber',sans-serif", fontSize:'1.45vw', color:C.textHi, lineHeight:1.25, margin:0 }}>
                      We build<br/>fast. We<br/>build right.<br/>That's it.
                    </p>
                    <div style={{ width:14, height:1, background:`${C.glint}50`, marginTop:10 }} />
                  </div>
                </div>
              )}

              {/* ── SERVICE ── */}
              {block.id === 'service' && (
                <div style={{ height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'2.5vw' }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <span style={pill}><Layers size={7}/> Expertise</span>
                    <ArrowUpRight size={15} style={{ color:'rgba(255,255,255,0.25)' }} />
                  </div>
                  <div>
                    {services.map((s, i) => (
                      <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 0', borderBottom: i < services.length-1 ? '1px solid rgba(255,255,255,0.035)' : 'none' }}>
                        <span style={{ color:`${C.glint}aa`, flexShrink:0 }}>{s.icon}</span>
                        <span style={{ fontFamily:"'Godber',sans-serif", fontSize:15, color:'rgba(255,255,255,0.6)' }}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── SPEED ── */}
              {block.id === 'speed' && (
                <div style={{ height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'2.5vw' }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <Zap size={14} style={{ color:`${C.glint}99` }} />
                    <ArrowUpRight size={13} style={{ color:'rgba(255,255,255,0.22)' }} />
                  </div>
                  <div>
                    <div style={{ fontFamily:"'Godber',sans-serif", fontSize:'3.2vw', color:C.glint, lineHeight:1, textShadow:`0 0 20px ${C.glint}40` }}>24H</div>
                    <p style={{ fontFamily:"'DM Mono',monospace", fontSize:7, letterSpacing:'0.14em', textTransform:'uppercase', color:C.textDim, margin:'5px 0 0' }}>Sprint</p>
                  </div>
                </div>
              )}

              {/* ── SOCIAL ── */}
              {block.id === 'social' && (
                <div style={{ height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'2.5vw' }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <ExternalLink size={14} style={{ color:'rgba(255,255,255,0.3)' }} />
                    <ArrowUpRight size={13} style={{ color:'rgba(255,255,255,0.22)' }} />
                  </div>
                  <div style={{ display:'flex', gap:8 }}>
                    {contacts.slice(0,2).map(c => (
                      <a key={c.id} href={c.href} target="_blank" rel="noopener noreferrer"
                        style={{ width:34, height:34, borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', border:`1px solid ${c.brandColor}28`, background:`${c.brandColor}12`, textDecoration:'none' }}>
                        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width:14, height:14, color:c.brandColor }}>
                          <path d={c.path} />
                        </svg>
                      </a>
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
        <div className="popup-overlay">
          <div className="popup-backdrop" onClick={() => { setActiveBlock(null); setExpandedDemo(null); }} />
          <div className="popup-panel">
            <div style={{ display:'flex', minHeight:'55vh' }}>
              <div style={{ width:'36%', padding:40, borderRight:'1px solid rgba(255,255,255,0.05)', display:'flex', flexDirection:'column', justifyContent:'space-between', background:'rgba(0,0,0,0.25)', flexShrink:0 }}>
                <div>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:8, letterSpacing:'0.5em', textTransform:'uppercase', color:C.textMid, display:'block', marginBottom:22 }}>{activeBlock.label}</span>
                  <h3 style={{ fontFamily:"'Godber',sans-serif", fontSize:48, lineHeight:1.05, color:C.textHi, margin:0 }}>{activeBlock.title || 'About'}</h3>
                  <div style={{ width:24, height:1, background:`${C.glint}60`, marginTop:22 }} />
                </div>
                <button onClick={() => { setActiveBlock(null); setExpandedDemo(null); }}
                  style={{ display:'flex', alignItems:'center', gap:10, fontFamily:"'DM Mono',monospace", fontSize:8, letterSpacing:'0.4em', textTransform:'uppercase', color:C.textDim, background:'none', border:'none', cursor:'pointer', padding:0, transition:'color 0.25s' }}
                  onMouseEnter={e => e.currentTarget.style.color='rgba(255,255,255,0.7)'}
                  onMouseLeave={e => e.currentTarget.style.color=C.textDim}>
                  <div style={{ width:26, height:26, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <X size={11} />
                  </div>
                  Close
                </button>
              </div>
              <div style={{ flex:1, padding:40, display:'flex', alignItems:'center', overflowY:'auto' }}>
                <div className="animate-fade-up" style={{ width:'100%' }}>{renderPopup()}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
