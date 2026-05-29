


import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Code2, BrainCircuit, Rocket, ShieldCheck, ArrowUpRight, Terminal, Cpu, Globe, Sparkles } from "lucide-react";

// ── Typewriter ───────────────────────────────────────────────────────────────
const Typewriter = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[index % words.length];
    let timeout;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else {
      setDeleting(false);
      setIndex(i => i + 1);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, words]);
  return (
    <span style={{ color: "#4ade80" }}>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        style={{ display: "inline-block", marginLeft: 2 }}
      >_</motion.span>
    </span>
  );
};

// ── Tilt Card ────────────────────────────────────────────────────────────────
const TiltCard = ({ children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(x, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set(((e.clientX - cx) / rect.width) * 10);
    y.set(-((e.clientY - cy) / rect.height) * 10);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
};

// ── Counter ──────────────────────────────────────────────────────────────────
const Counter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const numeric = parseInt(target);
  useEffect(() => {
    if (!inView || isNaN(numeric)) return;
    let n = 0;
    const step = Math.ceil(numeric / 40);
    const t = setInterval(() => {
      n += step;
      if (n >= numeric) { setCount(numeric); clearInterval(t); }
      else setCount(n);
    }, 35);
    return () => clearInterval(t);
  }, [inView, numeric]);
  return <span ref={ref}>{isNaN(numeric) ? target : count}{suffix}</span>;
};

// ── Skill Bar ────────────────────────────────────────────────────────────────
const SkillBar = ({ label, level, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "'JetBrains Mono',monospace" }}>{label}</span>
        <span style={{ fontSize: 12, color: "#4ade80", fontFamily: "'JetBrains Mono',monospace" }}>{level}%</span>
      </div>
      <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: "100%", background: "linear-gradient(90deg,#16a34a,#4ade80)", borderRadius: 2 }}
        />
      </div>
    </div>
  );
};

const cards = [
  { Icon: Code2,       title: "Full Stack",     desc: "Scalable MERN apps with clean architecture, secure APIs & production-ready deployment.", tag: "MERN" },
  { Icon: BrainCircuit,title: "AI & Automation",desc: "Agentic AI workflows, LLM integrations and next-gen intelligent web experiences.",       tag: "AI"   },
  { Icon: Rocket,      title: "Performance",    desc: "Fast-loading, pixel-perfect interfaces optimised for real-world production environments.", tag: "PERF" },
  { Icon: ShieldCheck, title: "Growth Mindset", desc: "Constantly learning modern tooling, system design and impactful engineering principles.",  tag: "GROW" },
];

const skills = [
  { label: "React / Next.js",      level: 88, delay: 0.1 },
  { label: "Node.js / Express",    level: 85, delay: 0.2 },
  { label: "MongoDB / Mongoose",   level: 80, delay: 0.3 },
  { label: "TypeScript",           level: 72, delay: 0.4 },
  { label: "AI / LLM Integration", level: 68, delay: 0.5 },
];

const stats = [
  { value: "5", suffix: "+", label: "Projects",   icon: "◈" },
  { value: "MERN", suffix: "", label: "Stack",      icon: "◉" },
  { value: "AI",   suffix: "", label: "Exploring",  icon: "◎" },
  { value: "2027", suffix: "", label: "Graduation", icon: "◐" },
];

// ── About ────────────────────────────────────────────────────────────────────
const About = () => {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <section style={{
      position: "relative", width: "100%", maxWidth: 1280,
      margin: "0 auto",
      padding: "clamp(64px,10vw,120px) clamp(20px,5vw,48px)",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap');
        *{box-sizing:border-box;}

        /* ── layout ── */
        .about-outer{
          display:grid;
          grid-template-columns:1fr 1fr 320px;
          gap:clamp(20px,3vw,44px);
          align-items:start;
        }
        @media(max-width:1024px){
          .about-outer{grid-template-columns:1fr 1fr;}
          .skills-col{display:none!important;}
        }
        @media(max-width:680px){
          .about-outer{grid-template-columns:1fr;}
          .cards-grid{grid-template-columns:1fr!important;}
          .stats-row{grid-template-columns:1fr 1fr!important;}
        }

        /* ── photo ── */
        .photo-wrap{
          position:relative;
          border-radius:28px;
          overflow:hidden;
          /* KEY FIX: let height be natural (aspect-ratio) instead of fixed px */
          width:100%;
          aspect-ratio:4/5;          /* portrait — adjust to taste */
          max-height:560px;
        }
        .photo-wrap img{
          position:absolute;
          inset:0;
          width:100%;
          height:100%;
          object-fit:cover;
          /* ↓ show upper-body / face — shift down slightly */
          object-position:center 15%;
          filter:contrast(1.05) saturate(1.1);
          display:block;
        }

        /* ── card hover ── */
        .feat-card{
          position:relative;
          background:rgba(255,255,255,0.02);
          border:1px solid rgba(255,255,255,0.07);
          border-radius:18px;
          padding:22px 20px;
          transition:background .3s,border-color .3s,transform .25s;
          cursor:default;
          overflow:hidden;
        }
        .feat-card:hover{
          background:rgba(34,197,94,0.04);
          border-color:rgba(34,197,94,0.22);
          transform:translateY(-6px);
        }

        /* ── stat ── */
        .stat-card{
          text-align:center;
          background:rgba(255,255,255,0.02);
          border:1px solid rgba(255,255,255,0.07);
          border-radius:14px;
          padding:18px 8px;
          transition:transform .3s;
        }
        .stat-card:hover{transform:translateY(-4px);}
        .stat-icon{transition:transform .4s cubic-bezier(.34,1.56,.64,1);}
        .stat-card:hover .stat-icon{transform:scale(1.25) rotate(15deg);}

        /* ── pulse ── */
        @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.5;transform:scale(1.5);}}
        .pulse{animation:pulse-dot 2s ease-in-out infinite;}

        /* ── float ── */
        @keyframes floatY{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
        .float{animation:floatY 4s ease-in-out infinite;}

        /* ── spin ── */
        @keyframes spin360{to{transform:rotate(360deg);}}
        .spin{animation:spin360 3s linear infinite;}

        /* ── cta btn ── */
        .cta-btn{
          display:flex;align-items:center;justify-content:center;gap:8px;
          padding:14px;border-radius:14px;
          background:linear-gradient(135deg,#16a34a,#22c55e);
          color:#fff;text-decoration:none;
          font-family:'Clash Display',sans-serif;font-weight:600;font-size:14px;
          transition:box-shadow .3s,transform .2s;
        }
        .cta-btn:hover{box-shadow:0 12px 32px rgba(34,197,94,.35);transform:translateY(-2px);}

        /* ── social ── */
        .soc{
          flex:1;padding:10px 0;text-align:center;border-radius:10px;
          background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.07);
          color:rgba(255,255,255,.35);text-decoration:none;font-size:10px;
          font-family:'JetBrains Mono',monospace;
          transition:color .2s,border-color .2s,transform .2s;
        }
        .soc:hover{color:#4ade80;border-color:rgba(34,197,94,.25);transform:translateY(-3px);}
      `}</style>

      {/* ambient orbs */}
      <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",filter:"blur(90px)",pointerEvents:"none",top:-100,left:-100,background:"radial-gradient(circle,rgba(34,197,94,.06) 0%,transparent 70%)"}}/>
      <div style={{position:"absolute",width:300,height:300,borderRadius:"50%",filter:"blur(80px)",pointerEvents:"none",bottom:80,right:-60,background:"radial-gradient(circle,rgba(96,165,250,.04) 0%,transparent 70%)"}}/>

      {/* ── HEADING ─────────────────────────────────────────────────────── */}
      <motion.div
        initial={{opacity:0,y:40}}
        whileInView={{opacity:1,y:0}}
        transition={{duration:.8,ease:[.22,1,.36,1]}}
        viewport={{once:true}}
        style={{textAlign:"center",marginBottom:"clamp(48px,8vw,88px)"}}
      >
        <motion.div
          initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}}
          transition={{duration:.5}} viewport={{once:true}}
          style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 16px",borderRadius:100,background:"rgba(34,197,94,.07)",border:"1px solid rgba(34,197,94,.18)",marginBottom:24}}
        >
          <Sparkles size={12} color="#4ade80"/>
          <span style={{fontSize:11,letterSpacing:".15em",color:"#4ade80",textTransform:"uppercase",fontFamily:"'JetBrains Mono',monospace"}}>About Me</span>
        </motion.div>

        {/* <h1 style={{fontFamily:"'Clash Display','Syne',sans-serif",fontWeight:700,fontSize:"clamp(34px,5.5vw,72px)",lineHeight:1.06,letterSpacing:"-.03em",color:"#fff",marginBottom:20}}>
          Building Digital{" "}
          <span style={{fontFamily:"'Instrument Serif',Georgia,serif",fontStyle:"italic",color:"#4ade80"}}>Experiences</span>
          <br/>
          <Typewriter words={["Beyond Just Code.","That Scale.","That Inspire.","That Matter."]}/>
        </h1> */}

        <h1
  style={{
    fontFamily: "'Clash Display','Syne',sans-serif",
    fontWeight: 700,
    fontSize: "clamp(34px,5.5vw,72px)",
    lineHeight: 1.06,
    letterSpacing: "-.03em",
    color: "#fff",
    marginBottom: 20,

    // 🔥 FIX: prevent layout shift
    minHeight: "220px",
    display: "block",
  }}
>
  Building Digital{" "}
  <span
    style={{
      fontFamily: "'Instrument Serif',Georgia,serif",
      fontStyle: "italic",
      color: "#4ade80",
    }}
  >
    Experiences
  </span>

  <br />

  {/* FIX WRAPPER */}
  <div style={{ minHeight: "60px", marginTop: "10px" }}>
    <Typewriter
      words={[
        "Beyond Just Code.",
        "That Scale.",
        "That Inspire.",
        "That Matter.",
      ]}
    />
  </div>
</h1>

        <p style={{maxWidth:540,margin:"0 auto",fontSize:"clamp(13px,1.8vw,16px)",color:"rgba(255,255,255,.4)",lineHeight:1.8,fontFamily:"'JetBrains Mono',monospace"}}>
          Full-stack developer · AI explorer · crafting scalable products with a designer's eye and an engineer's precision.
        </p>

        <motion.div
          initial={{width:0,opacity:0}} whileInView={{width:80,opacity:1}}
          transition={{duration:1,delay:.3,ease:[.22,1,.36,1]}} viewport={{once:true}}
          style={{height:2,background:"linear-gradient(90deg,transparent,#22c55e,transparent)",margin:"28px auto 0",borderRadius:1}}
        />
      </motion.div>

      {/* ── MAIN GRID ────────────────────────────────────────────────────── */}
      <div className="about-outer">

        {/* ── COL 1: Photo ─────────────────────────────────────────────── */}
        <motion.div
          initial={{opacity:0,x:-60}} whileInView={{opacity:1,x:0}}
          transition={{duration:.9,ease:[.22,1,.36,1]}} viewport={{once:true}}
        >
          <TiltCard>
            {/* photo wrapper — aspect-ratio controls height, NO fixed px */}
            <div className="photo-wrap">
              {/* subtle green border ring */}
              <div style={{position:"absolute",inset:-1,borderRadius:29,background:"linear-gradient(135deg,rgba(34,197,94,.25),transparent 50%,rgba(34,197,94,.1))",zIndex:0,pointerEvents:"none"}}/>

              <img src="/Rajanprofile1.jpeg" alt="Rajan Kumar Singh"/>

              {/* bottom fade */}
              <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,transparent 55%,rgba(2,4,8,.85) 100%)",zIndex:1,pointerEvents:"none"}}/>

              {/* availability badge — top left */}
              <div style={{position:"absolute",top:16,left:16,zIndex:3,display:"flex",alignItems:"center",gap:6,background:"rgba(10,14,20,.82)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,.08)",borderRadius:100,padding:"6px 14px"}}>
                <div className="pulse" style={{width:6,height:6,borderRadius:"50%",background:"#22c55e"}}/>
                <span style={{fontSize:10,color:"rgba(255,255,255,.5)",fontFamily:"'JetBrains Mono',monospace"}}>available for work</span>
              </div>

              {/* name / role badge — bottom right */}
              <div className="float" style={{position:"absolute",bottom:18,right:18,zIndex:3,background:"rgba(10,14,20,.85)",backdropFilter:"blur(20px)",border:"1px solid rgba(34,197,94,.18)",borderRadius:16,padding:"14px 20px"}}>
                <p style={{fontFamily:"'Clash Display',sans-serif",fontWeight:700,fontSize:15,color:"#4ade80",margin:0}}>MERN + AI</p>
                <p style={{fontSize:11,color:"rgba(255,255,255,.4)",margin:"3px 0 0",fontFamily:"'JetBrains Mono',monospace"}}>Full Stack Dev</p>
              </div>
            </div>
          </TiltCard>

          {/* terminal card */}
          <motion.div
            initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
            transition={{delay:.4,duration:.6}} viewport={{once:true}}
            style={{marginTop:14,background:"rgba(10,14,20,.9)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,padding:"16px 20px",fontFamily:"'JetBrains Mono',monospace"}}
          >
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:12}}>
              <Terminal size={12} color="rgba(255,255,255,.3)"/>
              <span style={{fontSize:10,color:"rgba(255,255,255,.25)",letterSpacing:".1em"}}>rajan@portfolio ~ %</span>
            </div>
            {[
              {delay:.0,color:"#4ade80",  text:"const dev = {"},
              {delay:.2,color:"rgba(255,255,255,.5)",text:'  name: "Rajan Kumar Singh",'},
              {delay:.4,color:"rgba(255,255,255,.5)",text:'  stack: ["MERN","AI","TS"],'},
              {delay:.6,color:"rgba(255,255,255,.5)",text:'  status: "open to work",'},
              {delay:.8,color:"#4ade80",  text:"}"},
            ].map((l,i)=>(
              <motion.p key={i} initial={{opacity:0,x:-8}} whileInView={{opacity:1,x:0}}
                transition={{delay:l.delay+.3,duration:.4}} viewport={{once:true}}
                style={{margin:"2px 0",fontSize:11,color:l.color,lineHeight:1.7}}>{l.text}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>

        {/* ── COL 2: Bio + Cards + Stats ──────────────────────────────── */}
        <motion.div
          initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}}
          transition={{duration:.8,delay:.1,ease:[.22,1,.36,1]}} viewport={{once:true}}
          style={{display:"flex",flexDirection:"column",gap:24}}
        >
          {/* bio */}
          <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.07)",borderRadius:20,padding:"26px 26px"}}>
            <p style={{fontSize:14,lineHeight:2,color:"rgba(255,255,255,.55)",fontFamily:"'JetBrains Mono',monospace",margin:"0 0 14px"}}>
              Hey, I'm{" "}<span style={{color:"#4ade80",fontWeight:600}}>Rajan Kumar Singh</span>{" "}
              — a passionate Full Stack Developer building scalable, modern, high-performance web applications with impactful user experiences and clean engineering principles.
            </p>
            <p style={{fontSize:14,lineHeight:2,color:"rgba(255,255,255,.42)",fontFamily:"'JetBrains Mono',monospace",margin:0}}>
              Primarily working with the{" "}<span style={{color:"#60a5fa",fontWeight:500}}>MERN Stack</span>
              {" "}and actively exploring{" "}<span style={{color:"#a78bfa",fontWeight:500}}>Agentic AI</span>
              {" "}— building intelligent products that redefine how people interact with the modern web.
            </p>
          </div>

          {/* feature cards */}
          <div className="cards-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {cards.map(({Icon,title,desc,tag},i)=>(
              <motion.div key={i} className="feat-card"
                initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
                transition={{delay:i*.1,duration:.6,ease:[.22,1,.36,1]}} viewport={{once:true}}
                onHoverStart={()=>setActiveCard(i)} onHoverEnd={()=>setActiveCard(null)}
              >
                <div style={{position:"absolute",top:12,right:14,fontSize:9,color:"rgba(34,197,94,.4)",fontFamily:"'JetBrains Mono',monospace",letterSpacing:".1em"}}>{tag}</div>
                <div style={{width:40,height:40,borderRadius:10,background:"rgba(34,197,94,.08)",border:"1px solid rgba(34,197,94,.12)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:14}}>
                  <Icon size={18} color="#4ade80"/>
                </div>
                <h3 style={{fontFamily:"'Clash Display',sans-serif",fontWeight:600,fontSize:14,color:"#fff",marginBottom:8,lineHeight:1.3}}>{title}</h3>
                <p style={{fontSize:12,color:"rgba(255,255,255,.38)",lineHeight:1.7,fontFamily:"'JetBrains Mono',monospace"}}>{desc}</p>
              </motion.div>
            ))}
          </div>

          {/* stats */}
          <div className="stats-row" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
            {stats.map(({value,suffix,label,icon},i)=>(
              <motion.div key={i} className="stat-card"
                initial={{opacity:0,scale:.8}} whileInView={{opacity:1,scale:1}}
                transition={{delay:i*.08,duration:.5,ease:[.34,1.56,.64,1]}} viewport={{once:true}}
              >
                <div className="stat-icon" style={{fontSize:16,marginBottom:6,color:"rgba(34,197,94,.4)"}}>{icon}</div>
                <p style={{fontFamily:"'Clash Display',sans-serif",fontWeight:700,fontSize:"clamp(15px,2.2vw,21px)",color:"#4ade80",margin:"0 0 4px"}}>
                  <Counter target={value} suffix={suffix}/>
                </p>
                <p style={{fontSize:9,color:"rgba(255,255,255,.3)",fontFamily:"'JetBrains Mono',monospace",letterSpacing:".08em",textTransform:"uppercase"}}>{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── COL 3: Skills sidebar ────────────────────────────────────── */}
        <motion.div className="skills-col"
          initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}}
          transition={{duration:.8,delay:.2,ease:[.22,1,.36,1]}} viewport={{once:true}}
          style={{display:"flex",flexDirection:"column",gap:14}}
        >
          {/* proficiency */}
          <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.07)",borderRadius:20,padding:"26px 22px"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:22}}>
              <Cpu size={13} color="#4ade80"/>
              <span style={{fontSize:10,letterSpacing:".15em",color:"#4ade80",textTransform:"uppercase",fontFamily:"'JetBrains Mono',monospace"}}>Proficiency</span>
            </div>
            {skills.map((s,i)=><SkillBar key={i} {...s}/>)}
          </div>

          {/* currently building */}
          <div style={{background:"rgba(34,197,94,.03)",border:"1px solid rgba(34,197,94,.12)",borderRadius:20,padding:"22px 20px"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
              <Globe size={13} color="#4ade80" className="spin"/>
              <span style={{fontSize:10,letterSpacing:".15em",color:"#4ade80",textTransform:"uppercase",fontFamily:"'JetBrains Mono',monospace"}}>Currently Building</span>
            </div>
            {["Agentic AI","Ecommerce web site","Job Portal","AI Interview Platform","AI Code Assistant"].map((item,i)=>(
              <motion.div key={i} initial={{opacity:0,x:-10}} whileInView={{opacity:1,x:0}}
                transition={{delay:i*.15}} viewport={{once:true}}
                style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:i<2?"1px solid rgba(255,255,255,.04)":"none"}}
              >
                <div style={{width:6,height:6,borderRadius:"50%",background:"#22c55e",flexShrink:0}}/>
                <span style={{fontSize:12,color:"rgba(255,255,255,.5)",fontFamily:"'JetBrains Mono',monospace"}}>{item}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <a href="#contact" className="cta-btn">
            Get In Touch <ArrowUpRight size={16}/>
          </a>

          {/* socials */}
          <div style={{display:"flex",gap:8}}>
            {["GitHub","LinkedIn","Twitter"].map((s,i)=>(
              <a key={i} href="#" className="soc">{s}</a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;