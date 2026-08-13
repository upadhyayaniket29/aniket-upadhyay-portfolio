"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const PLAYLIST = [
  { title: "Hope",       artist: "NEFFEX", url: "https://soundcloud.com/neffex/hope" },
  { title: "Rivalry",   artist: "NEFFEX", url: "https://soundcloud.com/neffex/rivalry" },
  { title: "Fight Back",artist: "NEFFEX", url: "https://soundcloud.com/neffex/fight-back" },
  { title: "Soldier",   artist: "NEFFEX", url: "https://soundcloud.com/neffex/soldier" },
  { title: "Grateful",  artist: "NEFFEX", url: "https://soundcloud.com/neffex/grateful" },
];

declare global { interface Window { SC: any } }

/* ─── Rotary Knob ─── */
function Knob({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  const isDragging = useRef(false);
  const startY     = useRef(0);
  const startVal   = useRef(0);
  // map value (0-100) → rotation (-135 → +135)
  const angle = (value / 100) * 270 - 135;

  const onDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startY.current = e.clientY;
    startVal.current = value;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const delta = (startY.current - e.clientY) * 0.7;   // drag up = increase
    const next  = Math.min(100, Math.max(0, startVal.current + delta));
    onChange(next);
  };
  const onUp = () => { isDragging.current = false; };

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"5px", userSelect:"none" }}>
      {/* Outer ring */}
      <div style={{
        width:"54px", height:"54px", borderRadius:"50%",
        background:"radial-gradient(circle at 38% 30%, #6b3800, #3b1c00, #1a0900)",
        border:"2px solid rgba(218,165,32,0.4)",
        boxShadow:"0 4px 14px rgba(0,0,0,0.8), inset 0 1px 0 rgba(218,165,32,0.15)",
        display:"flex", alignItems:"center", justifyContent:"center",
        position:"relative",
      }}>
        {/* Tick marks arc */}
        {[...Array(11)].map((_,i)=>{
          const a = -135 + i*27;
          const r = 22;
          const x = 27 + r*Math.sin(a*Math.PI/180);
          const y = 27 - r*Math.cos(a*Math.PI/180);
          return <div key={i} style={{
            position:"absolute", width:"2px", height:"4px",
            background: i <= Math.round(value/10) ? "rgba(218,165,32,0.8)" : "rgba(100,60,10,0.6)",
            left:`${x}px`, top:`${y}px`,
            transform:`rotate(${a}deg)`,
            transformOrigin:"50% 0",
            borderRadius:"1px",
          }}/>;
        })}
        {/* Knob face */}
        <div
          onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp}
          style={{
            width:"36px", height:"36px", borderRadius:"50%",
            background:"radial-gradient(circle at 35% 28%, #e8a020, #c07010, #6b3800, #3b1800)",
            boxShadow:"0 3px 10px rgba(0,0,0,0.9), inset 0 1px 2px rgba(255,220,80,0.3)",
            cursor:"grab",
            transform:`rotate(${angle}deg)`,
            transition:"transform 0.05s",
            position:"relative",
          }}
        >
          {/* Indicator dot */}
          <div style={{
            position:"absolute", top:"3px", left:"50%",
            transform:"translateX(-50%)",
            width:"5px", height:"5px", borderRadius:"50%",
            background:"#FFD700",
            boxShadow:"0 0 6px rgba(255,215,0,0.9)",
          }}/>
        </div>
      </div>
      <span style={{
        fontFamily:"'Courier New',monospace", fontSize:"8px",
        letterSpacing:"0.2em", color:"rgba(218,165,32,0.7)",
        textTransform:"uppercase",
      }}>{label}</span>
    </div>
  );
}

/* ─── Gramophone Horn SVG ─── */
const Horn = ({ isPlaying }: { isPlaying: boolean }) => (
  <svg width="110" height="110" viewBox="0 0 110 110" fill="none"
    style={{ position:"absolute", top:"-95px", left:"10px", zIndex:20, filter:"drop-shadow(0 4px 12px rgba(0,0,0,0.8))" }}>
    {/* Tube stem */}
    <path d="M 62 108 Q 66 88 70 72 Q 75 52 58 36" stroke="url(#tubGrad)" strokeWidth="9" fill="none" strokeLinecap="round"/>
    {/* Bell outer */}
    <ellipse cx="38" cy="24" rx="34" ry="24" fill="url(#bellOuter)" transform="rotate(-10 38 24)"/>
    {/* Bell petal effect */}
    {[0,45,90,135,180,225,270,315].map((a,i)=>(
      <ellipse key={i} cx={38+16*Math.cos(a*Math.PI/180)} cy={24+11*Math.sin(a*Math.PI/180)}
        rx="12" ry="9" fill="url(#petalGrad)" transform={`rotate(${a} ${38+16*Math.cos(a*Math.PI/180)} ${24+11*Math.sin(a*Math.PI/180)})`}
        opacity="0.6"/>
    ))}
    {/* Bell rim shine */}
    <ellipse cx="38" cy="22" rx="34" ry="24" fill="none" stroke="rgba(255,220,100,0.5)" strokeWidth="1.5" transform="rotate(-10 38 22)"/>
    {/* Bell inner dark */}
    <ellipse cx="38" cy="26" rx="18" ry="13" fill="url(#innerDark)" transform="rotate(-10 38 26)"/>
    {/* Sound waves when playing */}
    {isPlaying && [20,28,36].map((r,i)=>(
      <ellipse key={i} cx="38" cy="24" rx={r} ry={r*0.6} fill="none"
        stroke="rgba(249,115,22,0.3)" strokeWidth="1"
        transform="rotate(-10 38 24)"
        style={{ animation:`wavePulse ${0.8+i*0.3}s ease-out infinite`, opacity:0 }}/>
    ))}
    {/* Needle on turntable */}
    <line x1="62" y1="108" x2="64" y2="102" stroke="#FFD700" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="64" cy="101" r="3" fill="#FFD700"/>
    <defs>
      <linearGradient id="tubGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#c87820"/>
        <stop offset="50%" stopColor="#f0b030"/>
        <stop offset="100%" stopColor="#a06010"/>
      </linearGradient>
      <radialGradient id="bellOuter" cx="35%" cy="30%">
        <stop offset="0%" stopColor="#f8d060"/>
        <stop offset="40%" stopColor="#c88020"/>
        <stop offset="80%" stopColor="#8b5010"/>
        <stop offset="100%" stopColor="#5a3008"/>
      </radialGradient>
      <radialGradient id="petalGrad" cx="50%" cy="40%">
        <stop offset="0%" stopColor="#e8a830"/>
        <stop offset="100%" stopColor="#8b5010"/>
      </radialGradient>
      <radialGradient id="innerDark" cx="50%" cy="40%">
        <stop offset="0%" stopColor="#1a0800"/>
        <stop offset="100%" stopColor="#0a0400"/>
      </radialGradient>
    </defs>
  </svg>
);

/* ─── Main Widget ─── */
export default function RetroRadioWidget() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<any>(null);
  const ivRef     = useRef<any>(null);

  const [trackIdx,  setTrackIdx]  = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress,  setProgress]  = useState(0);
  const [duration,  setDuration]  = useState(0);
  const [position,  setPosition]  = useState(0);
  const [volume,    setVolume]    = useState(70);
  const [tuning,    setTuning]    = useState(50);
  const [ready,     setReady]     = useState(false);
  const [scrollX,   setScrollX]   = useState(0);
  const scrollIv = useRef<any>(null);

  const track = PLAYLIST[trackIdx];
  const fmt = (ms:number) => { const s=Math.floor(ms/1000); return `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`; };

  /* scrolling display */
  useEffect(()=>{
    clearInterval(scrollIv.current);
    if(!isPlaying){setScrollX(0);return;}
    const txt = `${track.title}  ·  ${track.artist}     `;
    const px  = txt.length*10;
    scrollIv.current = setInterval(()=>setScrollX(x=>(x+1)%px),80);
    return ()=>clearInterval(scrollIv.current);
  },[isPlaying,trackIdx]);

  /* volume sync */
  useEffect(()=>{
    const w=widgetRef.current as any;
    if(!w||!ready) return;
    try{ w.setVolume(volume/100); }catch(e){}
  },[volume,ready]);

  const loadTrack = useCallback((idx:number)=>{
    const w=widgetRef.current as any;
    if(!w) return;
    w.load(`https://w.soundcloud.com/player/?url=${encodeURIComponent(PLAYLIST[idx].url)}&color=%23f97316&auto_play=true`,{
      callback:()=>{ setTrackIdx(idx);setIsPlaying(true);setProgress(0);setPosition(0); }
    });
  },[]);

  useEffect(()=>{
    const init=()=>{
      if(!iframeRef.current) return;
      const widget=(window as any).SC.Widget(iframeRef.current);
      widgetRef.current=widget;
      widget.bind((window as any).SC.Widget.Events.READY,()=>{
        setReady(true);
        widget.getDuration((d:number)=>setDuration(d));
        widget.setVolume(volume/100);
      });
      widget.bind((window as any).SC.Widget.Events.PLAY,()=>{
        setIsPlaying(true);
        widget.getDuration((d:number)=>setDuration(d));
        clearInterval(ivRef.current);
        ivRef.current=setInterval(()=>{
          widget.getPosition((p:number)=>{
            setPosition(p);
            widget.getDuration((d:number)=>{setDuration(d);setProgress(d>0?(p/d)*100:0);});
          });
        },500);
      });
      widget.bind((window as any).SC.Widget.Events.PAUSE,()=>{ setIsPlaying(false);clearInterval(ivRef.current); });
      widget.bind((window as any).SC.Widget.Events.FINISH,()=>{ setIsPlaying(false);clearInterval(ivRef.current);loadTrack((trackIdx+1)%PLAYLIST.length); });
    };
    if((window as any).SC){init();return;}
    const s=document.createElement("script");s.src="https://w.soundcloud.com/player/api.js";s.async=true;s.onload=init;document.body.appendChild(s);
  },[]);

  const togglePlay=()=>{
    const w=widgetRef.current as any;
    if(!w||!ready) return;
    isPlaying?w.pause():w.play();
  };

  const LABEL = `${track.title}  ·  ${track.artist}     `.repeat(3);

  return (
    <>
      <iframe ref={iframeRef} id="retro-sc-iframe"
        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(track.url)}&color=%23f97316&auto_play=false`}
        allow="autoplay"
        style={{width:0,height:0,border:"none",position:"absolute",visibility:"hidden"}}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
        @keyframes vinylSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes hornGlow  { 0%,100%{filter:brightness(1)} 50%{filter:brightness(1.25)} }
        @keyframes wavePulse { 0%{opacity:.6;transform:rotate(-10deg) scale(1)} 100%{opacity:0;transform:rotate(-10deg) scale(1.8)} }
        @keyframes ledBlink  { 0%,100%{opacity:1} 50%{opacity:.6} }
        .retro-radio-widget * { box-sizing:border-box; }
      `}</style>

      <div className="retro-radio-widget" style={{
        position:"fixed",
        bottom:"92px",
        left:"22px",
        zIndex:9999,
        width:"290px",
      }}>
        {/* ── Cabinet ── */}
        <div style={{
          position:"relative",
          background:"linear-gradient(160deg, #7a1f0a 0%, #5c1508 25%, #3d0e04 50%, #6b1a08 75%, #4a1005 100%)",
          borderRadius:"16px 16px 12px 12px",
          border:"2px solid rgba(218,165,32,0.5)",
          boxShadow:"0 0 0 1px rgba(120,50,10,0.8), 0 20px 60px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,210,80,0.15)",
          overflow:"visible",
          paddingTop:"20px",
        }}>

          {/* Wood grain */}
          <div style={{
            position:"absolute",inset:0,borderRadius:"inherit",pointerEvents:"none",
            background:"repeating-linear-gradient(88deg,transparent,transparent 3px,rgba(0,0,0,0.06) 3px,rgba(0,0,0,0.06) 4px)",
            zIndex:1,
          }}/>

          {/* Gramophone horn */}
          <Horn isPlaying={isPlaying}/>

          {/* ── TOP: Vinyl turntable area ── */}
          <div style={{
            position:"relative",
            margin:"0 auto 0 120px",
            width:"90px",height:"90px",
            borderRadius:"50%",
            background:"radial-gradient(circle at 35% 30%, #3a3a3a, #111)",
            border:"3px solid rgba(218,165,32,0.4)",
            boxShadow:"0 4px 20px rgba(0,0,0,0.9)",
            zIndex:2,
            flexShrink:0,
          }}>
            {/* Vinyl grooves */}
            <div style={{
              width:"100%",height:"100%",borderRadius:"50%",
              background:`repeating-radial-gradient(circle, #222 0px,#111 2px,#1e1e1e 3px,#111 4px)`,
              animation: isPlaying?"vinylSpin 2.5s linear infinite":"none",
              position:"relative",
            }}>
              {/* Label */}
              <div style={{
                position:"absolute",top:"50%",left:"50%",
                width:"32px",height:"32px",borderRadius:"50%",
                background:"radial-gradient(circle,#c00,#800)",
                border:"1px solid rgba(255,100,100,0.5)",
                transform:"translate(-50%,-50%)",
              }}>
                <div style={{
                  position:"absolute",top:"50%",left:"50%",
                  width:"6px",height:"6px",borderRadius:"50%",
                  background:"#222",border:"1px solid #555",
                  transform:"translate(-50%,-50%)",
                }}/>
              </div>
            </div>
          </div>

          {/* ── Gold top border / ornate trim ── */}
          <div style={{
            margin:"12px 10px 0",
            height:"6px",
            background:"linear-gradient(90deg, rgba(120,60,0,0.2), #DAA520, #FFD700, #c8922a, #FFD700, #DAA520, rgba(120,60,0,0.2))",
            borderRadius:"3px",
            boxShadow:"0 0 12px rgba(218,165,32,0.5)",
            position:"relative",zIndex:2,
          }}/>

          {/* ── Speaker grille ── */}
          <div style={{
            margin:"8px 10px",
            height:"80px",
            background:"rgba(0,0,0,0.35)",
            borderRadius:"8px",
            border:"1px solid rgba(218,165,32,0.25)",
            position:"relative",
            overflow:"hidden",
            zIndex:2,
            display:"flex",alignItems:"stretch",
          }}>
            {/* Vertical bars */}
            {[...Array(18)].map((_,i)=>(
              <div key={i} style={{
                flex:1,
                borderRight: i<17?"1px solid rgba(0,0,0,0.6)":undefined,
                background:`linear-gradient(to bottom, rgba(218,165,32,0.15), rgba(218,165,32,0.05), rgba(218,165,32,0.12))`,
                position:"relative",
              }}>
                {isPlaying && <div style={{
                  position:"absolute",bottom:0,left:0,right:0,
                  background:`linear-gradient(to top, rgba(249,115,22,${0.1+0.08*Math.abs(Math.sin(i*0.7))}), transparent)`,
                  height:`${30+Math.abs(Math.sin(i*0.9))*40}%`,
                  transition:"height 0.3s ease",
                  animation:`ledBlink ${0.4+i*0.05}s ease-in-out infinite alternate`,
                }}/>}
              </div>
            ))}
            {/* Ornate corner motifs */}
            {["topleft","topright","bottomleft","bottomright"].map(pos=>(
              <div key={pos} style={{
                position:"absolute",
                top: pos.includes("top")?"3px":"auto",
                bottom: pos.includes("bottom")?"3px":"auto",
                left: pos.includes("left")?"3px":"auto",
                right: pos.includes("right")?"3px":"auto",
                width:"14px",height:"14px",
                border:"1.5px solid rgba(218,165,32,0.5)",
                borderRadius: pos==="topleft"?"6px 0 0 0":pos==="topright"?"0 6px 0 0":pos==="bottomleft"?"0 0 0 6px":"0 0 6px 0",
              }}/>
            ))}
          </div>

          {/* Bottom gold trim */}
          <div style={{
            margin:"0 10px 8px",
            height:"3px",
            background:"linear-gradient(90deg, rgba(120,60,0,0.2), #DAA520, #FFD700, #c8922a, #FFD700, #DAA520, rgba(120,60,0,0.2))",
            borderRadius:"2px",
            boxShadow:"0 0 8px rgba(218,165,32,0.4)",
            position:"relative",zIndex:2,
          }}/>

          {/* ── Frequency band strip ── */}
          <div style={{
            margin:"0 10px 6px",
            height:"24px",
            background:"linear-gradient(90deg,#0a0400,#120600,#0a0400)",
            borderRadius:"4px",
            border:"1px solid rgba(218,165,32,0.3)",
            display:"flex",alignItems:"center",
            padding:"0 8px",
            overflow:"hidden",
            position:"relative",zIndex:2,
          }}>
            {/* Scrolling song title */}
            <div style={{
              fontFamily:"'VT323',monospace",
              fontSize:"15px",
              color: isPlaying?"#FFD700":"rgba(218,165,32,0.5)",
              whiteSpace:"nowrap",
              transform:`translateX(-${scrollX}px)`,
              textShadow: isPlaying?"0 0 10px rgba(255,215,0,0.8)":undefined,
              letterSpacing:"0.05em",
            }}>
              {isPlaying ? LABEL : "◈ AM · 98.5 FM · RETRO RADIO ◈ AM · 98.5 FM ◈"}
            </div>
            {/* LED dot */}
            <div style={{
              position:"absolute",right:"8px",
              width:"6px",height:"6px",borderRadius:"50%",
              background: isPlaying?"#f97316":"rgba(100,50,0,0.5)",
              boxShadow: isPlaying?"0 0 8px rgba(249,115,22,0.9)":undefined,
              animation: isPlaying?"ledBlink 1s infinite":undefined,
            }}/>
          </div>

          {/* ── Progress bar ── */}
          <div style={{ margin:"0 10px 6px", position:"relative", zIndex:2 }}>
            <div
              onClick={(e)=>{
                const w=widgetRef.current as any;
                if(!w||!ready||duration===0)return;
                const r=e.currentTarget.getBoundingClientRect();
                w.seekTo(((e.clientX-r.left)/r.width)*duration);
              }}
              style={{
                height:"4px",borderRadius:"999px",
                background:"rgba(218,165,32,0.15)",cursor:"pointer",overflow:"hidden",
              }}
            >
              <div style={{
                height:"100%",borderRadius:"999px",
                background:"linear-gradient(90deg,#c87820,#FFD700,#f97316)",
                width:`${progress}%`,transition:"width 0.4s linear",
                boxShadow:"0 0 6px rgba(249,115,22,0.6)",
              }}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:"3px"}}>
              <span style={{fontFamily:"'VT323',monospace",fontSize:"11px",color:"rgba(218,165,32,0.5)"}}>{fmt(position)}</span>
              <span style={{fontFamily:"'VT323',monospace",fontSize:"11px",color:"rgba(218,165,32,0.5)"}}>{fmt(duration)}</span>
            </div>
          </div>

          {/* ── Controls row: [KNOB] [prev] [PLAY] [next] [KNOB] ── */}
          <div style={{
            margin:"0 10px 10px",
            display:"flex",alignItems:"center",justifyContent:"space-between",
            position:"relative",zIndex:2,
          }}>
            <Knob label="VOL" value={volume} onChange={setVolume}/>

            {/* Center controls */}
            <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
              {/* Prev */}
              <button onClick={()=>loadTrack((trackIdx-1+PLAYLIST.length)%PLAYLIST.length)} style={{
                width:"28px",height:"28px",borderRadius:"6px",cursor:"pointer",
                background:"radial-gradient(circle at 35% 28%,#c87820,#8b5010)",
                border:"1px solid rgba(218,165,32,0.4)",
                color:"#FFD700",fontSize:"10px",
                boxShadow:"0 3px 8px rgba(0,0,0,0.6)",
                display:"flex",alignItems:"center",justifyContent:"center",
                transition:"all 0.2s",
              }}>◀◀</button>

              {/* Play/Pause */}
              <button onClick={togglePlay} style={{
                width:"50px",height:"50px",borderRadius:"50%",cursor:"pointer",
                background:isPlaying
                  ?"radial-gradient(circle at 38% 32%,#f97316,#c2410c,#7c2d12)"
                  :"radial-gradient(circle at 38% 32%,#e8a020,#c87010,#7b3a08)",
                border:"3px solid rgba(218,165,32,0.6)",
                boxShadow:isPlaying
                  ?"0 0 24px rgba(249,115,22,0.7), 0 4px 16px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,220,80,0.2)"
                  :"0 4px 16px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,220,80,0.2)",
                display:"flex",alignItems:"center",justifyContent:"center",
                color:"#fff",fontSize:"18px",
                transition:"all 0.25s",
              }}>
                {isPlaying?"⏸":"▶"}
              </button>

              {/* Next */}
              <button onClick={()=>loadTrack((trackIdx+1)%PLAYLIST.length)} style={{
                width:"28px",height:"28px",borderRadius:"6px",cursor:"pointer",
                background:"radial-gradient(circle at 35% 28%,#c87820,#8b5010)",
                border:"1px solid rgba(218,165,32,0.4)",
                color:"#FFD700",fontSize:"10px",
                boxShadow:"0 3px 8px rgba(0,0,0,0.6)",
                display:"flex",alignItems:"center",justifyContent:"center",
                transition:"all 0.2s",
              }}>▶▶</button>
            </div>

            <Knob label="TUNE" value={tuning} onChange={setTuning}/>
          </div>

          {/* ── Playlist tabs ── */}
          <div style={{
            display:"flex",gap:"5px",
            padding:"8px 10px",
            borderTop:"1px solid rgba(218,165,32,0.15)",
            background:"rgba(0,0,0,0.4)",
            borderRadius:"0 0 10px 10px",
            overflowX:"auto",
            scrollbarWidth:"none",
            position:"relative",zIndex:2,
          }}>
            {PLAYLIST.map((t,i)=>(
              <button key={i} onClick={()=>loadTrack(i)} style={{
                flexShrink:0,
                padding:"4px 10px",
                borderRadius:"6px",
                border:`1px solid ${i===trackIdx?"rgba(218,165,32,0.7)":"rgba(100,50,0,0.5)"}`,
                background: i===trackIdx
                  ?"linear-gradient(135deg,rgba(218,165,32,0.25),rgba(180,100,10,0.15))"
                  :"rgba(0,0,0,0.3)",
                color: i===trackIdx?"#FFD700":"rgba(180,130,50,0.6)",
                fontFamily:"'VT323',monospace",fontSize:"13px",
                letterSpacing:"0.05em",cursor:"pointer",
                boxShadow: i===trackIdx?"0 0 8px rgba(218,165,32,0.2)":undefined,
                transition:"all 0.2s",
                whiteSpace:"nowrap",
              }}>
                {i===trackIdx && isPlaying?"▶ ":""}{t.title}
              </button>
            ))}
          </div>

          {/* Cabinet feet */}
          <div style={{display:"flex",justifyContent:"space-around",padding:"0 20px 0",position:"relative",zIndex:2}}>
            {[0,1,2,3].map(i=>(
              <div key={i} style={{
                width:"14px",height:"8px",borderRadius:"0 0 5px 5px",
                background:"linear-gradient(to bottom,#3b1800,#1a0900)",
                border:"1px solid rgba(218,165,32,0.2)",borderTop:"none",
              }}/>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
