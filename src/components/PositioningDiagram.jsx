const orange = '#ff7900'
const muted = '#697174'
const blue = '#236b87'

function Arrow({ x1, y1, x2, y2, dashed = false, color = orange }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} className={`diagram-ray${dashed ? ' dashed' : ''}`} stroke={color} markerEnd="url(#ray-arrow)" />
}

function Label({ x, y, children, anchor = 'start', tone = muted }) {
  return <text x={x} y={y} textAnchor={anchor} fill={tone} className="diagram-svg-label">{children}</text>
}

function Person({ x = 250, y = 118, rotate = 0, compact = false, arms = 'down' }) {
  const scale = compact ? 0.78 : 1
  return <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`} className="diagram-person-svg">
    <circle cx="0" cy="-46" r="17" />
    <path d="M-22 -27 Q-28 8 -16 36 L-28 88 M22 -27 Q28 8 16 36 L28 88 M-16 36 L0 41 L16 36 M-18 -24 L-46 14 M18 -24 L46 14" />
    {arms === 'up' && <path d="M-18 -22 L-42 -60 M18 -22 L42 -60" />}
    {arms === 'forward' && <path d="M-18 -22 L-52 -2 M18 -22 L52 -2" />}
  </g>
}

function Receptor({ x, y, width = 20, height = 150, label = 'IMAGE RECEPTOR' }) {
  return <g><rect x={x} y={y} width={width} height={height} rx="2" className="diagram-receptor" /><Label x={x + width / 2} y={y + height + 18} anchor="middle">{label}</Label></g>
}

function Tube({ x, y, rotate = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rotate})`}><rect x="-20" y="-12" width="40" height="24" rx="4" className="diagram-tube" /><circle cx="0" cy="0" r="5" fill="#fff" /><Label x="0" y="-23" anchor="middle">X-RAY TUBE</Label></g>
}

function Frame({ title, children }) {
  return <div className="positioning-diagram"><svg viewBox="0 0 520 320" role="img" aria-label={`${title} positioning diagram`} preserveAspectRatio="xMidYMid meet">
    <defs><marker id="ray-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill={orange} /></marker></defs>
    <rect width="520" height="320" fill="#f7f8f8" />
    <path d="M0 285 H520" stroke="#d9ddde" />
    <text x="20" y="27" className="diagram-svg-title">{title}</text>
    {children}
  </svg></div>
}

export default function PositioningDiagram({ projectionId }) {
  switch (projectionId) {
    case 'pa-chest':
      return <Frame title="PA CHEST · ERECT"><Receptor x={394} y={72} height={190} /><Person x={365} y={183} arms="forward" /><Tube x={92} y={132} /><Arrow x1={116} y1={132} x2={350} y2={132} /><Label x={230} y={117} anchor="middle" tone={orange}>CENTRAL RAY →</Label><Label x={365} y={279} anchor="middle">patient faces receptor</Label><Label x={60} y={202}>erect</Label></Frame>
    case 'ap-chest':
      return <Frame title="AP CHEST · UPRIGHT / PORTABLE"><Receptor x={92} y={78} height={175} /><Person x={125} y={182} arms="up" /><Tube x={426} y={132} /><Arrow x1={403} y1={132} x2={154} y2={132} /><Label x={275} y={117} anchor="middle" tone={orange}>CENTRAL RAY ←</Label><Label x={102} y={278} anchor="middle">receptor behind patient</Label><Label x={428} y={202} anchor="middle">AP</Label></Frame>
    case 'lateral-chest':
      return <Frame title="LATERAL CHEST · LEFT SIDE AGAINST RECEPTOR"><Receptor x={405} y={72} height={190} /><Person x={365} y={183} arms="up" /><Tube x={87} y={132} /><Arrow x1={111} y1={132} x2={350} y2={132} /><Label x={228} y={117} anchor="middle" tone={orange}>CENTRAL RAY →</Label><Label x={365} y={279} anchor="middle">true lateral · arms clear</Label><path d="M352 180 H377" stroke={blue} strokeDasharray="3 3" /><Label x={362} y={170} anchor="middle" tone={blue}>side</Label></Frame>
    case 'ap-supine-chest':
      return <Frame title="AP SUPINE CHEST · BED / HORIZONTAL"><Receptor x={96} y={158} width={330} height={18} label="DETECTOR UNDER PATIENT" /><Person x={261} y={169} rotate={90} arms="up" /><Tube x={260} y={56} rotate={90} /><Arrow x1={260} y1={80} x2={260} y2={142} /><Label x={260} y={119} anchor="middle" tone={orange}>CENTRAL RAY ↓</Label><Label x={260} y={211} anchor="middle">patient supine · detector beneath thorax</Label><path d="M75 236 H447" stroke="#c6cbcc" strokeWidth="5" /><Label x={260} y={260} anchor="middle">bed</Label></Frame>
    case 'ap-semi-erect-chest':
      return <Frame title="AP SEMI-ERECT CHEST · ELEVATED"><Receptor x={101} y={83} height={177} /><path d="M86 257 H430" stroke="#c6cbcc" strokeWidth="5" /><Person x={145} y={188} rotate={-14} arms="up" /><Tube x={431} y={133} /><Arrow x1={407} y1={133} x2={170} y2={133} /><Label x={287} y={117} anchor="middle" tone={orange}>CENTRAL RAY ←</Label><path d="M205 257 Q280 220 345 257" fill="none" stroke={blue} strokeDasharray="4 4" /><Label x={275} y={238} anchor="middle" tone={blue}>head of bed elevated</Label></Frame>
    case 'right-lateral-decubitus-chest':
      return <Frame title="RIGHT LATERAL DECUBITUS · RIGHT SIDE DOWN"><Receptor x={88} y={153} width={18} height={108} label="VERTICAL RECEPTOR" /><Person x={270} y={160} rotate={90} compact /><Tube x={426} y={206} rotate={90} /><Arrow x1={402} y1={206} x2={324} y2={206} /><Label x={365} y={190} anchor="middle" tone={orange}>HORIZONTAL RAY ←</Label><path d="M102 271 H431" stroke="#c6cbcc" strokeWidth="5" /><Label x={270} y={289} anchor="middle">patient lies on RIGHT side · right side down</Label><Label x={70} y={142} tone={blue}>detector vertical</Label></Frame>
    case 'left-lateral-decubitus-chest':
      return <Frame title="LEFT LATERAL DECUBITUS · LEFT SIDE DOWN"><Receptor x={426} y={153} width={18} height={108} label="VERTICAL RECEPTOR" /><Person x={250} y={160} rotate={90} compact /><Tube x={91} y={206} rotate={-90} /><Arrow x1={115} y1={206} x2={198} y2={206} /><Label x={157} y={190} anchor="middle" tone={orange}>HORIZONTAL RAY →</Label><path d="M75 271 H432" stroke="#c6cbcc" strokeWidth="5" /><Label x={260} y={289} anchor="middle">patient lies on LEFT side · left side down</Label><Label x={450} y={142} anchor="end" tone={blue}>detector vertical</Label></Frame>
    case 'apical-lordotic-chest':
      return <Frame title="APICAL LORDOTIC CHEST · LEAN BACK"><Receptor x={395} y={72} height={190} /><Person x={345} y={184} rotate={-15} arms="up" /><Tube x={87} y={132} /><Arrow x1={111} y1={132} x2={330} y2={132} /><Label x={220} y={117} anchor="middle" tone={orange}>CENTRAL RAY →</Label><path d="M312 257 Q360 231 395 257" fill="none" stroke={blue} strokeDasharray="4 4" /><Label x={358} y={238} anchor="middle" tone={blue}>lordotic lean</Label><Label x={395} y={279} anchor="middle">clavicles project above apices</Label></Frame>
    case 'expiratory-chest':
      return <Frame title="EXPIRATORY CHEST · FRONTAL"><Receptor x={394} y={72} height={190} /><Person x={365} y={183} arms="forward" /><Tube x={90} y={132} /><Arrow x1={114} y1={132} x2={350} y2={132} /><Label x={232} y={117} anchor="middle" tone={orange}>CENTRAL RAY →</Label><path d="M300 252 q18 -13 36 0" fill="none" stroke={blue} /><Label x={318} y={273} anchor="middle" tone={blue}>exhale + hold</Label><Label x={365} y={292} anchor="middle">label breathing phase</Label></Frame>
    default:
      return null
  }
}
