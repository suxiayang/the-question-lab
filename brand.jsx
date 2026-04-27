/* Shared brand atoms for The Question Lab */

// TQL Logo — the Q glyph from brand mark
function TQLMark({ size = 28, color = 'var(--tql-accent)' }) {
  // Outer Q ring + inner dot connected by a curving stem; tail of Q descends to lower-right.
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'block' }}>
      {/* Outer ring */}
      <circle cx="50" cy="48" r="33" fill="none" stroke={color} strokeWidth="9" />
      {/* Tail of Q — diagonal stroke from inside lower-right of ring */}
      <path d="M 64 66 L 80 84" stroke={color} strokeWidth="9" strokeLinecap="butt" fill="none" />
      {/* Inner pendant: small circle near top-center, curving stem down to ring */}
      <circle cx="46" cy="44" r="7" fill={color} />
      <path d="M 47 51 C 49 56, 54 58, 53 64 C 52 68, 56 70, 60 67" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function TQLLogo({ size = 18 }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <TQLMark size={size + 6} />
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: size, letterSpacing: '-0.02em' }}>TQL</span>
    </div>
  );
}

// Episode covers — six template variants based on brand guide
// Each is rendered as a synthetic black-and-white "image" using SVG so we don't need real assets
// They share the same chrome (TQL logo top-left, EP number top-right, footer label)

function EpChrome({ ep, label = 'AFTER AI', accent }) {
  return (
    <>
      <div style={{ position: 'absolute', top: 18, left: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
        <TQLMark size={20} color={accent || 'var(--tql-accent)'} />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, letterSpacing: '-0.02em', color: '#fff' }}>TQL</span>
      </div>
      <div style={{ position: 'absolute', top: 22, right: 22, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.7)' }}>
        EP.{String(ep).padStart(2, '0')}
      </div>
      <div style={{ position: 'absolute', bottom: 18, left: 20, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
        <div>THE QUESTION LAB:</div>
        <div style={{ color: accent || 'var(--tql-accent)' }}>{label}</div>
      </div>
    </>
  );
}

// Background generators — one per template

function BgPortrait({ seed = 1 }) {
  // template A — fragmented glitch portrait
  const id = `bg-p-${seed}`;
  return (
    <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id={`${id}-g`} cx="60%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#3a3a3a" />
          <stop offset="60%" stopColor="#16161a" />
          <stop offset="100%" stopColor="#0B0B0F" />
        </radialGradient>
        <filter id={`${id}-noise`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0" />
        </filter>
      </defs>
      <rect width="400" height="280" fill={`url(#${id}-g)`} />
      {/* implied portrait silhouette */}
      <ellipse cx="240" cy="150" rx="80" ry="100" fill="rgba(255,255,255,0.06)" />
      <ellipse cx="240" cy="120" rx="50" ry="60" fill="rgba(255,255,255,0.08)" />
      <ellipse cx="240" cy="110" rx="35" ry="38" fill="rgba(255,255,255,0.05)" />
      {/* horizontal scan slices */}
      {[40, 90, 145, 175, 210, 255].map((y, i) => (
        <rect key={i} x={i % 2 ? 0 : 100} y={y} width={i % 2 ? 400 : 220} height={i === 2 ? 4 : 2} fill="rgba(0,0,0,0.7)" />
      ))}
      <rect x="0" y="120" width="400" height="14" fill="rgba(255,255,255,0.04)" />
      <rect width="400" height="280" fill="black" filter={`url(#${id}-noise)`} opacity="0.35" />
    </svg>
  );
}

function BgEye({ seed = 2 }) {
  // template B — close-up eye / face fragment
  const id = `bg-e-${seed}`;
  return (
    <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id={`${id}-g`} cx="40%" cy="55%" r="50%">
          <stop offset="0%" stopColor="#2a2a2e" />
          <stop offset="80%" stopColor="#0B0B0F" />
        </radialGradient>
        <radialGradient id={`${id}-iris`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" />
          <stop offset="40%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#454545" />
        </radialGradient>
      </defs>
      <rect width="400" height="280" fill={`url(#${id}-g)`} />
      {/* eye */}
      <ellipse cx="160" cy="140" rx="170" ry="55" fill="#1a1a1c" />
      <ellipse cx="160" cy="140" rx="55" ry="55" fill={`url(#${id}-iris)`} />
      <circle cx="160" cy="140" r="22" fill="#000" />
      <circle cx="170" cy="130" r="6" fill="rgba(255,255,255,0.5)" />
      {/* lashes */}
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={i} x1={70 + i * 13} y1={88} x2={72 + i * 13} y2={75} stroke="rgba(0,0,0,0.7)" strokeWidth="1.5" />
      ))}
      <rect width="400" height="280" fill="black" opacity="0.15" />
    </svg>
  );
}

function BgWireframe({ seed = 3 }) {
  // template C — system / topographic mesh
  const id = `bg-w-${seed}`;
  return (
    <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0e0e12" />
          <stop offset="100%" stopColor="#050507" />
        </linearGradient>
      </defs>
      <rect width="400" height="280" fill={`url(#${id}-g)`} />
      {/* mountain mesh */}
      <g stroke="rgba(255,255,255,0.3)" fill="none" strokeWidth="0.6">
        {Array.from({ length: 14 }).map((_, row) => {
          const y = 180 + row * 8;
          const amp = 6 + row * 4;
          const path = Array.from({ length: 26 }).map((_, i) => {
            const x = i * 16;
            const dy = Math.sin((i + row * 2) * 0.7) * amp + Math.sin((i - row) * 1.3) * amp * 0.5;
            return `${i === 0 ? 'M' : 'L'} ${x} ${y - dy}`;
          }).join(' ');
          return <path key={row} d={path} opacity={0.15 + row * 0.05} />;
        })}
        {/* vertical struts */}
        {Array.from({ length: 26 }).map((_, i) => {
          const x = i * 16;
          const path = Array.from({ length: 14 }).map((_, row) => {
            const y = 180 + row * 8;
            const amp = 6 + row * 4;
            const dy = Math.sin((i + row * 2) * 0.7) * amp + Math.sin((i - row) * 1.3) * amp * 0.5;
            return `${row === 0 ? 'M' : 'L'} ${x} ${y - dy}`;
          }).join(' ');
          return <path key={`v${i}`} d={path} opacity={0.1} />;
        })}
      </g>
      <rect width="400" height="280" fill="black" opacity="0.1" />
    </svg>
  );
}

function BgDoorway({ seed = 4 }) {
  // template D — silhouette in doorway / threshold
  const id = `bg-d-${seed}`;
  return (
    <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id={`${id}-g`} cx="50%" cy="60%" r="60%">
          <stop offset="0%" stopColor="#5a5a60" />
          <stop offset="40%" stopColor="#1d1d22" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>
      </defs>
      <rect width="400" height="280" fill="#000" />
      {/* doorway frame */}
      <rect x="120" y="40" width="160" height="220" fill={`url(#${id}-g)`} />
      <rect x="120" y="40" width="160" height="220" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      {/* perspective lines */}
      <line x1="0" y1="0" x2="120" y2="40" stroke="rgba(255,255,255,0.04)" />
      <line x1="0" y1="280" x2="120" y2="260" stroke="rgba(255,255,255,0.04)" />
      <line x1="400" y1="0" x2="280" y2="40" stroke="rgba(255,255,255,0.04)" />
      <line x1="400" y1="280" x2="280" y2="260" stroke="rgba(255,255,255,0.04)" />
      {/* silhouette figure */}
      <ellipse cx="200" cy="135" rx="14" ry="18" fill="#000" />
      <path d="M 184 150 L 184 230 L 196 240 L 196 230 L 204 230 L 204 240 L 216 230 L 216 150 Z" fill="#000" />
    </svg>
  );
}

function BgVortex({ seed = 5 }) {
  // template E — concentric / cosmic vortex
  const id = `bg-v-${seed}`;
  return (
    <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id={`${id}-g`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.15" />
          <stop offset="20%" stopColor="#0B0B0F" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>
      </defs>
      <rect width="400" height="280" fill="#000" />
      <rect width="400" height="280" fill={`url(#${id}-g)`} />
      {/* concentric rings */}
      {Array.from({ length: 24 }).map((_, i) => (
        <circle
          key={i}
          cx="200" cy="140"
          r={6 + i * 10}
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={0.8 + (i % 4) * 0.3}
          opacity={0.9 - i * 0.03}
        />
      ))}
      {/* radial dots */}
      {Array.from({ length: 60 }).map((_, i) => {
        const a = (i / 60) * Math.PI * 2;
        const r = 30 + (i % 5) * 30;
        const x = 200 + Math.cos(a) * r;
        const y = 140 + Math.sin(a) * r;
        return <circle key={`d${i}`} cx={x} cy={y} r="0.8" fill="rgba(255,255,255,0.4)" />;
      })}
    </svg>
  );
}

function BgTunnel({ seed = 6 }) {
  // template F — figure walking into tunnel of light
  const id = `bg-t-${seed}`;
  return (
    <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id={`${id}-g`} cx="50%" cy="55%" r="35%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="20%" stopColor="#aaa" stopOpacity="0.2" />
          <stop offset="60%" stopColor="#0B0B0F" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>
      </defs>
      <rect width="400" height="280" fill="#000" />
      <rect width="400" height="280" fill={`url(#${id}-g)`} />
      {/* tunnel rings */}
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse
          key={i}
          cx="200" cy="155"
          rx={20 + i * 18}
          ry={14 + i * 11}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.8"
        />
      ))}
      {/* figure */}
      <ellipse cx="200" cy="170" rx="6" ry="9" fill="#000" />
      <path d="M 192 178 L 192 230 L 200 234 L 208 230 L 208 178 Z" fill="#000" />
    </svg>
  );
}

const COVER_BGS = [BgPortrait, BgEye, BgWireframe, BgDoorway, BgVortex, BgTunnel];

// Episode card — full template
function EpisodeCard({ ep, title, titleAccent, template = 0, label = 'AFTER AI', size = 'md' }) {
  const Bg = COVER_BGS[template % COVER_BGS.length];
  const sizes = {
    sm: { w: 280, h: 196, title: 18 },
    md: { w: 400, h: 280, title: 26 },
    lg: { w: 600, h: 420, title: 38 },
    xl: { w: 760, h: 530, title: 50 },
  };
  const s = sizes[size];
  return (
    <div className="ep-card" style={{ position: 'relative', width: s.w, height: s.h, overflow: 'hidden', background: '#0B0B0F', cursor: 'pointer' }}>
      <div className="ep-img" style={{ position: 'absolute', inset: 0 }}>
        <Bg seed={ep} />
      </div>
      <EpChrome ep={ep} label={label} />
      <div style={{ position: 'absolute', left: 22, top: '40%', transform: 'translateY(-50%)', maxWidth: '70%' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: s.title, lineHeight: 1.02, letterSpacing: '-0.025em', color: '#fff' }}>
          {title}
        </div>
        {titleAccent && (
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: s.title * 0.85, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--tql-accent)', marginTop: 4 }}>
            {titleAccent}
          </div>
        )}
      </div>
    </div>
  );
}

// Sample episodes
const EPISODES = [
  { ep: 1, title: 'What does it mean', accent: 'to think?', template: 1, theme: 'Cognition' },
  { ep: 17, title: 'What is still human in the age of', accent: 'intelligent machines?', template: 1, theme: 'Identity' },
  { ep: 23, title: "What if AI doesn't replace us,", accent: 'but rewrites us?', template: 0, theme: 'Selfhood' },
  { ep: 28, title: 'If AI makes the decision,', accent: 'who is responsible?', template: 3, theme: 'Ethics' },
  { ep: 31, title: 'The system is thinking for us.', accent: '— And we don\u2019t even notice.', template: 2, theme: 'Agency' },
  { ep: 34, title: 'Can a machine', accent: 'lie?', template: 1, theme: 'Truth' },
  { ep: 36, title: 'Where does meaning', accent: 'come from?', template: 4, theme: 'Meaning' },
  { ep: 38, title: 'Is freedom', accent: 'computable?', template: 3, theme: 'Free Will' },
  { ep: 40, title: 'The future is not Artificial Intelligence.', accent: '— It is reorganized intelligence.', template: 4, theme: 'Future' },
  { ep: 42, title: 'The question is the only thing left that is', accent: 'still human.', template: 5, theme: 'Inquiry' },
];

Object.assign(window, {
  TQLMark, TQLLogo,
  BgPortrait, BgEye, BgWireframe, BgDoorway, BgVortex, BgTunnel,
  COVER_BGS, EpisodeCard, EPISODES,
});
