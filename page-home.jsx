/* Home page — Lab Console / Cognitive Instrument */

function HomePage({ accent }) {
  const { lang } = useI18N();
  const marqueeItems = lang === 'en' ? [
    'PROGRAM v1 · 4 SEASONS · 48 EPISODES · 2026 — 2028',
    'CAN A MACHINE THINK?',
    'WHO IS RESPONSIBLE WHEN NO ONE DECIDED?',
    'WHAT IS LEFT OF BEING HUMAN?',
    'WE DO NOT PROVIDE ANSWERS',
    'WE PUT THE QUESTION BACK ON THE TABLE',
    'IS SUPERINTELLIGENCE A REAL THREAT?',
    'HONG KONG · BIWEEKLY · SUNDAY',
    'NO TRACKERS · NO ADS · NO ANSWERS',
  ] : [
    'V1 节目 · 4 季 · 48 集 · 2026 — 2028',
    '机器会思考吗？',
    '当没有人决定，谁来承担？',
    '人之为人，到底是什么？',
    '我们不提供答案',
    '我们把问题摆回桌面',
    '超级智能是真实威胁吗？',
    '香港 · 每两周 · 周日',
    '无追踪 · 无广告 · 无答案',
  ];
  return (
    <main>
      <ConsoleHero accent={accent} />
      <MarqueeBand items={marqueeItems} accent={accent} />
      <Reveal as="div"><TelemetryStrip accent={accent} /></Reveal>
      <Reveal as="div"><PrimaryReadout accent={accent} /></Reveal>
      <Reveal as="div"><SeasonArc accent={accent} /></Reveal>
      <Reveal as="div"><RecentLog accent={accent} /></Reveal>
      <Reveal as="div"><TerritoryGrid accent={accent} /></Reveal>
      <Reveal as="div"><InterrogationConsole accent={accent} /></Reveal>
      <Reveal as="div"><ManifestoCard accent={accent} /></Reveal>
      <Reveal as="div"><SubscribePanel accent={accent} /></Reveal>
    </main>
  );
}

/* ---------- Console hero ---------- */
function ConsoleHero({ accent }) {
  const { t, lang } = useI18N();
  const lines = lang === 'en' ? [
    { tag: 'BOOT', text: 'TQL.console v1.0 — initialising program…', delay: 0 },
    { tag: 'PRGM', text: 'program loaded · 4 seasons · 48 episodes · 2026 – 2028', delay: 250 },
    { tag: 'IDX',  text: 'question_index built · 9 territories of inquiry', delay: 500 },
    { tag: 'CURS', text: 'season 01 · HUMAN · in production', delay: 750 },
    { tag: 'OK',   text: 'lab open. Awaiting inquiry.', delay: 1000 },
  ] : [
    { tag: 'BOOT', text: 'TQL.console v1.0 — 节目启动中…', delay: 0 },
    { tag: 'PRGM', text: '节目加载 · 4 季 · 48 集 · 2026 – 2028', delay: 250 },
    { tag: 'IDX',  text: '问题索引已构建 · 九个疆域', delay: 500 },
    { tag: 'CURS', text: '第一季 · 人 · 制作中', delay: 750 },
    { tag: 'OK',   text: '实验室已开放，等待提问。', delay: 1000 },
  ];

  const questions = lang === 'en' ? [
    'Can a machine think?',
    'Does an AI understand what it does?',
    'You are not the fish — how do you know its joy?',
    'Is your choice really yours?',
    'Whose orders should an AI obey?',
    'Is superintelligence a real threat?',
    'How will we be remembered?',
  ] : [
    '机器会思考吗？',
    'AI 真的理解它在做的事吗？',
    '子非鱼，焉知鱼之乐？',
    '你的选择是真的吗？',
    'AI 应该听谁的？',
    '超级智能是真实威胁吗？',
    '我们将如何被记住？',
  ];

  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const i = setInterval(() => setIdx(v => (v + 1) % questions.length), 4200);
    return () => clearInterval(i);
  }, [questions.length]);

  const [shown, setShown] = React.useState(0);
  React.useEffect(() => {
    setShown(0);
    lines.forEach((l, i) => setTimeout(() => setShown(s => Math.max(s, i + 1)), l.delay));
  }, [lang]);

  return (
    <section style={{ position:'relative', borderBottom:'1px solid var(--tql-line)', overflow:'hidden' }} className="bg-grid-fine">
      <div className="scan-line" />
      <div style={{ maxWidth: 1440, margin:'0 auto', padding:'0 56px', position:'relative' }}>
        {/* Instrument header bar */}
        <div style={{ display:'grid', gridTemplateColumns:'auto 1fr auto', gap:24, alignItems:'center', padding:'14px 0', borderBottom:'1px solid var(--tql-line)', fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.15em', color:'var(--tql-mid)' }}>
          <span>● <span style={{color:accent}}>LIVE</span> · TQL/CONSOLE</span>
          <span style={{ textAlign:'center' }}>{t.season.toUpperCase()} · {t.indexed.toUpperCase()}</span>
          <span><Clock /></span>
        </div>

        {/* Two-column main */}
        <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:0, borderBottom:'1px solid var(--tql-line)' }}>
          {/* LEFT — primary panel */}
          <div style={{ padding:'56px 48px 56px 0', borderRight:'1px solid var(--tql-line)' }}>
            <div className="tql-eyebrow" style={{ marginBottom:24 }}>
              <span style={{ color:accent }}>▌</span> PANEL.01 / CURRENT INQUIRY
            </div>

            <div style={{ fontFamily:'var(--font-mono)', fontSize:12, color:accent, letterSpacing:'0.18em', marginBottom:18 }}>
              {`> SELECT question FROM /lab WHERE state = 'unresolved'`}
              <span className="caret" />
            </div>

            <h1 className="tql-h1" style={{
              fontSize: lang==='zh' ? 'clamp(40px, 5.6vw, 84px)' : 'clamp(52px, 7.6vw, 112px)',
              lineHeight: lang==='zh' ? 1.2 : 0.95,
              margin:'0 0 36px',
              maxWidth:'100%',
            }}>
              <span key={idx} style={{ display:'inline', animation:'fadeUp 700ms ease forwards' }}>{questions[idx]}</span>
            </h1>

            <div style={{ display:'flex', alignItems:'center', gap:20, marginBottom:48 }}>
              <div style={{ flex:1, height:1, background:'var(--tql-line-2)', position:'relative' }}>
                <div style={{ position:'absolute', left:0, top:-2, bottom:-2, width:`${((idx+1)/questions.length)*100}%`, background:accent, transition:'width .6s ease' }} />
              </div>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.15em', color:'var(--tql-mid)' }}>
                {String(idx+1).padStart(2,'0')} / {String(questions.length).padStart(2,'0')}
              </span>
            </div>

            <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
              <Link to="/episodes/1" className="btn-lift" style={{
                padding:'18px 26px', background:accent, color:'#0B0B0F', textDecoration:'none',
                fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.18em', fontWeight:600,
                display:'inline-flex', alignItems:'center', gap:10,
              }}>
                <span>▶</span>{t.watch_latest.toUpperCase()}
              </Link>
              <Link to="/episodes" className="btn-lift" style={{
                padding:'18px 26px', border:'1px solid var(--tql-line-2)', color:'#EDEDED', textDecoration:'none',
                fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.18em',
              }}>
                {t.browse_all.toUpperCase()} <span className="arrow-shift" style={{ color: accent }}>→</span>
              </Link>
            </div>
          </div>

          {/* RIGHT — boot terminal + meta */}
          <div style={{ padding:'56px 0 56px 48px', display:'flex', flexDirection:'column', gap:32 }}>
            <div>
              <div className="tql-eyebrow" style={{ marginBottom:18 }}>
                <span style={{ color:accent }}>▌</span> PANEL.02 / SYSTEM LOG
              </div>
              <div style={{ background:'#08080B', border:'1px solid var(--tql-line)', padding:'18px 18px 22px', fontFamily:'var(--font-mono)', fontSize:12, lineHeight:1.85, minHeight:200 }}>
                {lines.slice(0, shown).map((l, i) => (
                  <div key={i} style={{ display:'grid', gridTemplateColumns:'56px 1fr', gap:14 }}>
                    <span style={{ color: l.tag==='OK' ? accent : 'var(--tql-mid)' }}>[{l.tag}]</span>
                    <span style={{ color: l.tag==='OK' ? '#fff' : 'var(--tql-cool)' }}>{l.text}{i===shown-1 ? <span className="caret" /> : null}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="tql-eyebrow" style={{ marginBottom:14 }}>
                <span style={{ color:accent }}>▌</span> PANEL.03 / OPERATING TENET
              </div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:22, lineHeight:1.3, fontWeight:500 }}>
                {t.tagline}
              </div>
              <div style={{ marginTop:10, color:'var(--tql-mid)', fontSize:14, lineHeight:1.55, fontFamily: lang==='zh' ? 'Noto Sans SC, sans-serif' : 'inherit' }}>
                {t.sub_tagline}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes fadeUp { 0% { opacity:0; transform: translateY(10px); filter: blur(6px); } 100% { opacity:1; transform: translateY(0); filter: blur(0); } }`}</style>
    </section>
  );
}

function Clock() {
  const [t, setT] = React.useState(() => new Date());
  React.useEffect(() => { const i = setInterval(() => setT(new Date()), 1000); return () => clearInterval(i); }, []);
  const pad = n => String(n).padStart(2,'0');
  return <span>{t.getUTCFullYear()}.{pad(t.getUTCMonth()+1)}.{pad(t.getUTCDate())} · {pad(t.getUTCHours())}:{pad(t.getUTCMinutes())}:{pad(t.getUTCSeconds())} UTC</span>;
}

/* ---------- Telemetry strip ---------- */
function TelemetryStrip({ accent }) {
  const { lang } = useI18N();
  /* Each item: [label, render-fn]. Render-fn lets us drop in animated <CountUp> nodes for numeric cells. */
  const items = lang === 'en' ? [
    ['PROGRAM',     () => <><CountUp value={48} duration={900} /> EP</>],
    ['SEASONS',     () => <CountUp value={4} duration={500} format={(n) => String(n).padStart(2, '0')} />],
    ['THEMES',      () => <CountUp value={9} duration={700} format={(n) => String(n).padStart(2, '0')} />],
    ['ACTIVE',      () => 'S01 · 2026'],
    ['SCOPE',       () => '2026 – 2028'],
    ['CADENCE',     () => 'BIWEEKLY · SUN'],
    ['LANG',        () => 'EN / 中文'],
  ] : [
    ['节目',       () => <><CountUp value={48} duration={900} /> 集</>],
    ['季',         () => <CountUp value={4} duration={500} format={(n) => String(n).padStart(2, '0')} />],
    ['议题',       () => <CountUp value={9} duration={700} format={(n) => String(n).padStart(2, '0')} />],
    ['当前',       () => '第一季 · 2026'],
    ['周期',       () => '2026 – 2028'],
    ['频率',       () => '每两周日'],
    ['语言',       () => 'EN / 中文'],
  ];
  return (
    <section style={{ borderBottom:'1px solid var(--tql-line)', background:'#08080B', position:'relative', overflow:'hidden' }}>
      <span className="sweep-line" />
      <div style={{ maxWidth:1440, margin:'0 auto', padding:'0 56px', display:'grid', gridTemplateColumns:`repeat(${items.length}, 1fr)` }}>
        {items.map(([k, render], i) => (
          <div key={i} style={{ padding:'18px 16px', borderRight: i<items.length-1 ? '1px solid var(--tql-line)' : 'none' }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.2em', color:'var(--tql-mid)', marginBottom:6 }}>{k}</div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:13, fontWeight:500, color: i===0 ? accent : '#EDEDED', letterSpacing:'0.08em' }}>{render()}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Primary readout (latest + featured) ---------- */
function PrimaryReadout({ accent }) {
  const { t, lang } = useI18N();
  const latest = window.EPS_DATA.find(e => e.ep === 1);
  const featured = window.EPS_DATA.find(e => e.ep === 3);
  if (!latest || !featured) return null;
  const fmt = (e) => ({
    title: e[lang].t1, accent: e[lang].t2, theme: lang==='en'?e.theme_en:e.theme_zh, dur: e.dur, ep: e.ep, tpl: e.tpl, season: e.season,
  });
  const L = fmt(latest), F = fmt(featured);

  return (
    <section style={{ borderBottom:'1px solid var(--tql-line)' }}>
      <div style={{ maxWidth:1440, margin:'0 auto', padding:'0 56px' }}>
        <SectionHead num="04" label={lang==='en' ? 'PRIMARY READOUT' : '主信号读出'} accent={accent} />
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:0, borderTop:'1px solid var(--tql-line)' }}>
          {[
            { e: L, tag: lang==='en' ? 'EPISODE 001 · OPENING' : '第 001 集 · 开篇', status: 'LIVE', src: latest },
            { e: F, tag: lang==='en' ? 'EPISODE 003 · CONSCIOUSNESS' : '第 003 集 · 意识', status: 'PINNED', src: featured },
          ].map((row, i) => (
            <Link key={i} to={`/episodes/${row.e.ep}`} style={{ textDecoration:'none', color:'inherit', padding:'40px 40px 40px 0', paddingLeft: i===1 ? 40 : 0, borderRight: i===0 ? '1px solid var(--tql-line)' : 'none' }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.2em', color:'var(--tql-mid)', marginBottom:18 }}>
                <span>{row.tag.toUpperCase()}</span>
                <span style={{ color:accent }}>● {row.status}</span>
              </div>
              <div style={{ position:'relative', width:'100%', aspectRatio:'10/7', overflow:'hidden', border:'1px solid var(--tql-line)' }}>
                <div style={{ position:'absolute', inset:0 }}>
                  <EpisodeCardLocalized ep={row.src} size="lg" />
                </div>
                {/* console overlay corners */}
                <Corners color={accent} />
              </div>
              <div style={{ marginTop:18, display:'grid', gridTemplateColumns:'1fr auto', gap:24, alignItems:'baseline' }}>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.16em', color:'var(--tql-mid)' }}>
                  {row.e.season} · EP.{String(row.e.ep).padStart(3,'0')} · {row.e.theme.toUpperCase()} · {row.e.dur}{t.min.toUpperCase()}
                </div>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:accent, letterSpacing:'0.18em' }}>OPEN <span className="arrow-shift">↗</span></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Corners({ color }) {
  const sz = 14, sw = 1.5;
  const C = ({ style }) => <div style={{ position:'absolute', width:sz, height:sz, ...style }} />;
  return (
    <>
      <C style={{ top:8, left:8, borderTop:`${sw}px solid ${color}`, borderLeft:`${sw}px solid ${color}` }} />
      <C style={{ top:8, right:8, borderTop:`${sw}px solid ${color}`, borderRight:`${sw}px solid ${color}` }} />
      <C style={{ bottom:8, left:8, borderBottom:`${sw}px solid ${color}`, borderLeft:`${sw}px solid ${color}` }} />
      <C style={{ bottom:8, right:8, borderBottom:`${sw}px solid ${color}`, borderRight:`${sw}px solid ${color}` }} />
    </>
  );
}

function SectionHead({ num, label, accent, right }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'24px 0 14px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:14, fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.2em', color:'var(--tql-mid)' }}>
        <span style={{ color:accent }}>§{num}</span>
        <span style={{ width:32, height:1, background:'var(--tql-line-2)' }} />
        <span style={{ color:'#EDEDED' }}>{label}</span>
      </div>
      {right}
    </div>
  );
}

/* ---------- Season arc (the four-season program map) ---------- */
function SeasonArc({ accent }) {
  const { t, lang } = useI18N();
  const seasons = window.SEASONS;
  return (
    <section style={{ borderBottom:'1px solid var(--tql-line)' }}>
      <div style={{ maxWidth:1440, margin:'0 auto', padding:'0 56px' }}>
        <SectionHead num="05" label={lang==='en' ? 'PROGRAM ARC' : '节目弧'} accent={accent}
          right={<Link to="/seasons" className="link-line" style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.18em', color:'var(--tql-cool)', textDecoration:'none' }}>{lang==='en'?'OPEN PROGRAM MAP →':'打开节目地图 →'}</Link>}
        />
        <div style={{ marginBottom:32, maxWidth:880 }}>
          <h2 className="tql-h2" style={{ fontSize:'clamp(36px, 4.4vw, 64px)', margin:'0 0 16px' }}>{t.seasons_title}</h2>
          <div style={{ color:'var(--tql-mid)', fontSize:15, lineHeight:1.6, fontFamily: lang==='zh' ? 'Noto Sans SC, sans-serif' : 'inherit' }}>{t.seasons_sub}</div>
        </div>
        <SpotlightGrid style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:1, background:'var(--tql-line)', border:'1px solid var(--tql-line)', marginBottom:48 }}>
          {seasons.map((s, i) => (
            <Link key={s.id} to={`/seasons#${s.id.toLowerCase()}`} style={{ textDecoration:'none', color:'inherit' }}>
              <div className="terr-cell" style={{ background:'#0B0B0F', padding:'28px 24px 24px', minHeight:280, position:'relative', display:'flex', flexDirection:'column' }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.2em', color:'var(--tql-mid)', marginBottom:18 }}>
                  <span style={{ color:accent }}>{s.id}</span>
                  <span>{s.span}</span>
                </div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.3em', color:accent, marginBottom:10 }}>{lang==='en'?s.name_en:s.name_zh}</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:28, letterSpacing:'-0.02em', lineHeight:1.1, marginBottom:14 }}>{lang==='en'?s.title_en:s.title_zh}</div>
                <div style={{ color:'var(--tql-cool)', fontSize:13, lineHeight:1.5, marginBottom:'auto', maxWidth:'100%', fontFamily: lang==='zh' ? 'Noto Sans SC, sans-serif' : 'inherit' }}>{lang==='en'?s.tagline_en:s.tagline_zh}</div>
                <div style={{ marginTop:18, paddingTop:14, borderTop:'1px solid var(--tql-line)', display:'flex', justifyContent:'space-between', fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.18em', color:'var(--tql-mid)' }}>
                  <span>{lang==='en'?s.lens_en:s.lens_zh}</span>
                  <span>{s.range[1]-s.range[0]+1} {lang==='en'?'EP':'集'}</span>
                </div>
                <div className="arrow-shift" style={{ position:'absolute', bottom:18, right:20, color:accent, fontFamily:'var(--font-mono)', fontSize:12 }}>↗</div>
              </div>
            </Link>
          ))}
        </SpotlightGrid>
      </div>
    </section>
  );
}

/* ---------- Recent log (table) — first 7 of season 1 ---------- */
function RecentLog({ accent }) {
  const { t, lang } = useI18N();
  const eps = window.EPS_DATA.filter(e => e.season === 'S01' && e.ep !== 1 && e.ep !== 3).slice(0, 7);
  return (
    <section style={{ borderBottom:'1px solid var(--tql-line)', background:'#08080B' }}>
      <div style={{ maxWidth:1440, margin:'0 auto', padding:'0 56px' }}>
        <SectionHead num="06" label={lang==='en' ? 'SEASON 01 · TRANSMISSION LOG' : '第一季 · 信号日志'} accent={accent}
          right={<Link to="/episodes" style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.18em', color:'var(--tql-cool)', textDecoration:'none' }}>{t.view_all.toUpperCase()} →</Link>}
        />
        <div style={{ borderTop:'1px solid var(--tql-line)', borderBottom:'1px solid var(--tql-line)' }}>
          <div style={{ display:'grid', gridTemplateColumns:'100px 160px 1fr 100px 90px', gap:24, padding:'12px 0', fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.2em', color:'var(--tql-mid)', borderBottom:'1px solid var(--tql-line)' }}>
            <span>{t.col_ep}</span><span>{t.col_frame}</span><span>{t.col_question}</span><span>{t.col_duration}</span><span style={{ textAlign:'right' }}>OPEN</span>
          </div>
          {eps.map((e) => (
            <Link key={e.ep} to={`/episodes/${e.ep}`} className="log-row" style={{ display:'grid', gridTemplateColumns:'100px 160px 1fr 100px 90px', gap:24, padding:'18px 0', borderBottom:'1px solid var(--tql-line)', textDecoration:'none', color:'inherit', alignItems:'baseline' }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:13, color:accent, letterSpacing:'0.1em' }}>#{String(e.ep).padStart(3,'0')}</span>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.16em', color:'var(--tql-mid)' }}>{(lang==='en'?e.theme_en:e.theme_zh).toUpperCase()}</span>
              <span style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:500, lineHeight:1.3 }}>
                {e[lang].t1} <span style={{ color:'var(--tql-mid)' }}>{e[lang].t2}</span>
              </span>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--tql-mid)' }}>{e.dur} {t.min}</span>
              <span className="arrow-shift" style={{ fontFamily:'var(--font-mono)', fontSize:12, color:accent, textAlign:'right' }}>↗</span>
            </Link>
          ))}
        </div>
      </div>
      <style>{`.log-row:hover { background: rgba(255,255,255,0.02); }`}</style>
    </section>
  );
}

/* ---------- Territory grid ---------- */
function TerritoryGrid({ accent }) {
  const { t, lang } = useI18N();
  return (
    <section style={{ borderBottom:'1px solid var(--tql-line)' }}>
      <div style={{ maxWidth:1440, margin:'0 auto', padding:'0 56px' }}>
        <SectionHead num="07" label={lang==='en' ? 'INSTRUMENT INDEX · 9 TERRITORIES' : '议题索引 · 九个疆域' } accent={accent} />
        <div style={{ marginBottom:32, maxWidth:880 }}>
          <h2 className="tql-h2" style={{ fontSize:'clamp(36px, 4.4vw, 64px)', margin:'0 0 16px' }}>{t.index_title}</h2>
          <div style={{ color:'var(--tql-mid)', fontSize:15, lineHeight:1.6, fontFamily: lang==='zh' ? 'Noto Sans SC, sans-serif' : 'inherit' }}>{t.index_sub}</div>
        </div>
        <SpotlightGrid style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:1, background:'var(--tql-line)', border:'1px solid var(--tql-line)', marginBottom:48 }}>
          {window.THEMES.map((th, i) => {
            const slug = th.en.toLowerCase().replace(/\s+/g,'-');
            const epCount = window.EPS_DATA.filter(e => e.theme_en === th.en).length;
            return (
              <Link key={i} to={`/index/${slug}`} style={{ textDecoration:'none', color:'inherit' }}>
                <div className="terr-cell" style={{ background:'#0B0B0F', padding:'26px 24px 24px', minHeight:220, position:'relative' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.18em', color:'var(--tql-mid)', marginBottom:18 }}>
                    <span style={{ color:accent }}>§ {String(i+1).padStart(2,'0')} / 09</span>
                    <span>{epCount} {t.eps.toUpperCase()}</span>
                  </div>
                  <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:26, letterSpacing:'-0.02em', marginBottom:14, lineHeight:1.05 }}>{lang==='en'?th.en:th.zh}</div>
                  <div style={{ color:'var(--tql-mid)', fontSize:13, lineHeight:1.5, fontFamily: lang==='zh' ? 'Noto Sans SC, sans-serif' : 'inherit' }}>{lang==='en'?th.q_en:th.q_zh}</div>
                  <div className="arrow-shift" style={{ position:'absolute', bottom:18, right:20, color:accent, fontFamily:'var(--font-mono)', fontSize:12 }}>↗</div>
                </div>
              </Link>
            );
          })}
        </SpotlightGrid>
      </div>
      <style>{`.terr-cell { transition: background .25s; } .terr-cell:hover { background: #101015 !important; }`}</style>
    </section>
  );
}

/* ---------- Interrogation console ---------- */
function InterrogationConsole({ accent }) {
  const { t, lang } = useI18N();
  const [q, setQ] = React.useState('');
  const [out, setOut] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [streamingLine, setStreamingLine] = React.useState(0);

  const samples = lang === 'en' ? [
    'Will AI replace creativity?',
    'Is consciousness computable?',
    'Can machines understand meaning?',
  ] : [
    'AI 会取代创造力吗？',
    '意识可以被计算吗？',
    '机器能理解意义吗？',
  ];

  const interrogate = async (question) => {
    if (!question.trim()) return;
    setLoading(true); setOut(null); setStreamingLine(0);

    /* Resolution order:
       1. window.TQL_INTERROGATE_URL — Cloudflare Worker proxy (set in index.html)
       2. window.claude.complete   — Claude.ai's hosted preview bridge (only present in Claude.ai)
       3. canned fallback           — final degradation, makes the UI still demoable */
    const workerUrl = (typeof window !== 'undefined' && window.TQL_INTERROGATE_URL) || null;
    const langInstr = lang === 'en' ? 'Reply in English only.' : '只用简体中文回答。';
    const prompt = `You are an analytical philosopher hosting a podcast called The Question Lab. ${langInstr} A user submits the question: "${question}".\n\nReturn ONLY a JSON object with this exact shape (no prose, no markdown fences):\n{\n  "assumption": "<one sentence (under 18 words) naming the hidden assumption inside the user's question>",\n  "reposed_a": "<a sharper philosophical question (under 14 words)>",\n  "reposed_b": "<a different sharper philosophical question (under 14 words)>"\n}`;

    try {
      let parsed = null;
      if (workerUrl) {
        const resp = await fetch(workerUrl, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ question, lang }),
        });
        if (!resp.ok) throw new Error('worker ' + resp.status);
        parsed = await resp.json();
        if (parsed.error) throw new Error(parsed.error);
      } else if (typeof window !== 'undefined' && window.claude && window.claude.complete) {
        const text = await window.claude.complete(prompt);
        const m = text.match(/\{[\s\S]*\}/);
        parsed = JSON.parse(m ? m[0] : text);
      } else {
        throw new Error('no backend');
      }
      setOut(parsed);
    } catch (e) {
      setOut({
        assumption: lang === 'en' ? 'That "intelligence" and "the human" are commensurate categories.' : '人类与"智能"是同一个范畴。',
        reposed_a:  lang === 'en' ? 'What in us is not intelligence?' : '我们身上有什么不是"智能"？',
        reposed_b:  lang === 'en' ? 'When did we equate thinking with output?' : '我们何时把思考等同于产出？',
        _fallback: true,
      });
    } finally { setLoading(false); }
  };

  React.useEffect(() => {
    if (!out) return;
    setStreamingLine(0);
    const t1 = setTimeout(() => setStreamingLine(1), 200);
    const t2 = setTimeout(() => setStreamingLine(2), 700);
    const t3 = setTimeout(() => setStreamingLine(3), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [out]);

  return (
    <section style={{ borderBottom:'1px solid var(--tql-line)', background:'#08080B' }} className="bg-grid-fine">
      <div style={{ maxWidth:1440, margin:'0 auto', padding:'0 56px' }}>
        <SectionHead num="08" label={lang==='en' ? 'INTERROGATION ENGINE' : '提问审讯引擎'} accent={accent} />
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.2fr', gap:48, padding:'12px 0 80px', borderTop:'1px solid var(--tql-line)' }}>
          {/* LEFT */}
          <div style={{ paddingTop:32 }}>
            <h2 className="tql-h2" style={{ fontSize:'clamp(40px, 5vw, 76px)', margin:'0 0 24px', lineHeight:1.0 }}>
              {t.ask_title_a}<br />
              <span style={{ color:'var(--tql-mid)' }}>{t.ask_title_b}</span>
            </h2>
            <div style={{ color:'var(--tql-mid)', fontSize:15, lineHeight:1.55, marginBottom:24, maxWidth:480, fontFamily: lang==='zh' ? 'Noto Sans SC, sans-serif' : 'inherit' }}>{t.ask_sub}</div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--tql-mid)', letterSpacing:'0.18em' }}>
              <div style={{ marginBottom:6 }}>I/O · {lang==='en' ? 'Powered by Claude · Haiku 4.5' : '由 Claude · Haiku 4.5 驱动'}</div>
              <div>SCHEMA · assumption × 2 reposed</div>
            </div>
          </div>
          {/* RIGHT — terminal */}
          <div style={{ background:'#05050A', border:'1px solid var(--tql-line-2)', position:'relative' }}>
            {/* terminal title bar */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 16px', borderBottom:'1px solid var(--tql-line)', fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.18em', color:'var(--tql-mid)' }}>
              <span style={{ display:'flex', gap:6 }}>
                <span style={{ width:8, height:8, borderRadius:'50%', background:'#3a3a40' }} />
                <span style={{ width:8, height:8, borderRadius:'50%', background:'#3a3a40' }} />
                <span style={{ width:8, height:8, borderRadius:'50%', background:accent }} />
              </span>
              <span>tql.console / interrogate.sh</span>
              <span style={{ color: loading ? accent : 'var(--tql-mid)' }}>● {loading ? 'PROCESSING' : 'IDLE'}</span>
            </div>

            {/* prompt */}
            <div style={{ padding:'20px 20px 12px' }}>
              <label className="tql-prompt" htmlFor="tql-q-input"
                onClick={() => { const el = document.getElementById('tql-q-input'); if (el) el.focus(); }}
                style={{ display:'flex', alignItems:'center', gap:10, fontFamily:'var(--font-mono)', fontSize:14, padding:'14px 16px', border:'1px solid var(--tql-line-2)', background:'rgba(198,255,0,0.02)', cursor:'text', transition:'border-color .2s, box-shadow .2s, background .2s' }}>
                <span style={{ color:accent, fontWeight:600 }}>$</span>
                <input
                  id="tql-q-input"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && interrogate(q)}
                  placeholder={t.placeholder_q}
                  maxLength={500}
                  autoComplete="off"
                  spellCheck="false"
                  style={{ flex:1, minWidth:0, background:'transparent', border:'none', outline:'none', color:'#fff', fontFamily:'var(--font-mono)', fontSize:14, letterSpacing:0, caretColor: accent, padding:'4px 0' }}
                />
                <button onClick={() => interrogate(q)} disabled={loading || !q.trim()} className="btn-lift" style={{ background: q.trim() && !loading ? accent : 'var(--tql-line-2)', color: q.trim() && !loading ? '#0B0B0F' : 'var(--tql-mid)', border:'none', padding:'10px 16px', fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.18em', fontWeight:600, cursor: q.trim() && !loading ? 'pointer' : 'not-allowed', whiteSpace:'nowrap' }}>
                  {loading ? t.parsing : '↵ ' + t.interrogate}
                </button>
              </label>
              <div style={{ display:'flex', gap:8, marginTop:14, flexWrap:'wrap', alignItems:'center', fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.15em', color:'var(--tql-mid)' }}>
                <span>// {t.try.toLowerCase()}:</span>
                {samples.map(s => (
                  <button key={s} onClick={() => { setQ(s); interrogate(s); }} style={{ background:'transparent', border:'1px solid var(--tql-line-2)', color:'var(--tql-cool)', padding:'4px 9px', cursor:'pointer', fontFamily:'var(--font-mono)', fontSize:10, transition:'border-color .15s, color .15s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--tql-line-2)'; e.currentTarget.style.color = 'var(--tql-cool)'; }}
                  >{s}</button>
                ))}
              </div>
            </div>
            <style>{`
              .tql-prompt:hover { border-color: var(--tql-mid-2); background: rgba(198,255,0,0.03); }
              .tql-prompt:focus-within { border-color: ${accent}; box-shadow: 0 0 0 1px ${accent}; background: rgba(198,255,0,0.05); }
            `}</style>

            {/* output */}
            <div style={{ borderTop:'1px solid var(--tql-line)', padding:'18px 20px 24px', minHeight:200, fontFamily:'var(--font-mono)', fontSize:13, lineHeight:1.7 }}>
              {!out && !loading && <div style={{ color:'var(--tql-mid)' }}>// {lang==='en' ? 'Awaiting input. Type a question and press ↵' : '等待输入。请输入问题并按 ↵'}<span className="caret" /></div>}
              {loading && <div style={{ color:accent }}>{lang==='en'?'parsing assumption tree…':'正在解析假设树…'}<span className="caret" /></div>}
              {out && out._fallback && (
                <div style={{ color:'var(--tql-mid)', fontSize:10, letterSpacing:'0.15em', marginBottom:14, paddingBottom:10, borderBottom:'1px solid var(--tql-line)' }}>
                  // {lang==='en' ? 'BACKEND OFFLINE · showing canned demo response' : '后端离线 · 显示示例响应'}
                </div>
              )}
              {out && (
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  {streamingLine >= 1 && (
                    <div style={{ opacity: streamingLine>=1?1:0, transition:'opacity .3s' }}>
                      <span style={{ color:'var(--tql-mid)' }}>[1/3] {t.hidden_assumption}:</span>
                      <div style={{ color:'#EDEDED', marginTop:4, fontFamily:'var(--font-display)', fontSize:18, lineHeight:1.35, fontWeight:500 }}>{out.assumption}</div>
                    </div>
                  )}
                  {streamingLine >= 2 && (
                    <div style={{ borderLeft:`2px solid ${accent}`, paddingLeft:14 }}>
                      <span style={{ color:accent }}>[2/3] {t.reposed_a}:</span>
                      <div style={{ color:'#fff', marginTop:4, fontFamily:'var(--font-display)', fontSize:20, lineHeight:1.3, fontWeight:600 }}>{out.reposed_a}</div>
                    </div>
                  )}
                  {streamingLine >= 3 && (
                    <div style={{ borderLeft:'2px solid #fff', paddingLeft:14 }}>
                      <span style={{ color:'#fff' }}>[3/3] {t.reposed_b}:</span>
                      <div style={{ color:'#fff', marginTop:4, fontFamily:'var(--font-display)', fontSize:20, lineHeight:1.3, fontWeight:600 }}>{out.reposed_b}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Manifesto card ---------- */
function ManifestoCard({ accent }) {
  const { t, lang } = useI18N();
  return (
    <section style={{ borderBottom:'1px solid var(--tql-line)' }}>
      <div style={{ maxWidth:1440, margin:'0 auto', padding:'0 56px' }}>
        <SectionHead num="09" label={lang==='en' ? 'OPERATING DOCTRINE' : '操作原则'} accent={accent} />
        <div style={{ display:'grid', gridTemplateColumns:'200px 1fr', gap:48, padding:'40px 0 80px', borderTop:'1px solid var(--tql-line)' }}>
          <div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.2em', color:'var(--tql-mid)', marginBottom:8 }}>{t.manifesto_eyebrow}</div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.2em', color:'var(--tql-mid)' }}>{lang==='en' ? 'EXCERPT' : '节选'}</div>
            <Link to="/manifesto" style={{ display:'inline-block', marginTop:24, fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.18em', color:accent, textDecoration:'none' }}>
              {lang==='en' ? '→ READ FULL' : '→ 阅读完整'}
            </Link>
          </div>
          <div style={{ fontFamily:'var(--font-display)', fontWeight:400, fontSize:'clamp(24px, 2.8vw, 38px)', lineHeight:1.4, letterSpacing:'-0.005em', maxWidth:1100 }}>
            <p style={{ margin:'0 0 24px', whiteSpace:'pre-line' }}>{t.manifesto_body_1}</p>
            <p style={{ margin:'0 0 24px', color:'var(--tql-mid)', whiteSpace:'pre-line' }}>{t.manifesto_body_2}</p>
            <p style={{ margin:'0 0 24px', whiteSpace:'pre-line' }}>{t.manifesto_body_3}</p>
            <p style={{ margin:0, color:accent, fontWeight:500, whiteSpace:'pre-line' }}>{t.manifesto_body_4}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Subscribe panel ---------- */
function SubscribePanel({ accent }) {
  const { t, lang } = useI18N();
  return (
    <section style={{ borderBottom:'1px solid var(--tql-line)', background:'#08080B' }}>
      <div style={{ maxWidth:1440, margin:'0 auto', padding:'0 56px' }}>
        <SectionHead num="10" label={lang==='en' ? 'CHANNEL · SUBSCRIBE' : '频道 · 订阅'} accent={accent} />
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, padding:'40px 0 80px', alignItems:'start', borderTop:'1px solid var(--tql-line)' }}>
          <div>
            <h2 className="tql-h2" style={{ fontSize:'clamp(40px, 4.8vw, 72px)', margin:'0 0 18px', lineHeight:1.0 }}>{t.sub_title}</h2>
            <div style={{ color:'var(--tql-mid)', fontSize:15, lineHeight:1.55, maxWidth:460, fontFamily: lang==='zh' ? 'Noto Sans SC, sans-serif' : 'inherit' }}>{t.sub_body}</div>
          </div>
          <SubForm accent={accent} />
        </div>
      </div>
    </section>
  );
}

function SubForm({ accent }) {
  const { t, lang } = useI18N();
  const [email, setEmail] = React.useState('');
  const [done, setDone] = React.useState(false);
  return (
    <div>
      <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.18em', color:'var(--tql-mid)', marginBottom:14 }}>
        // {lang==='en' ? 'enter address to register' : '输入邮箱以登记'}
      </div>
      {!done ? (
        <form onSubmit={(e) => { e.preventDefault(); if (email.includes('@')) setDone(true); }}>
          <div style={{ display:'flex', border:'1px solid var(--tql-line-2)', background:'#05050A' }}>
            <span style={{ padding:'18px 14px 18px 18px', color:accent, fontFamily:'var(--font-mono)', fontSize:14 }}>$</span>
            <input
              type="email" required value={email} onChange={(e)=>setEmail(e.target.value)}
              placeholder={t.sub_email}
              style={{ flex:1, background:'transparent', border:'none', outline:'none', padding:'18px 8px', color:'#fff', fontFamily:'var(--font-mono)', fontSize:14 }}
            />
            <button type="submit" style={{ background:accent, color:'#0B0B0F', border:'none', padding:'0 28px', fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.18em', fontWeight:600, cursor:'pointer' }}>↵ {t.sub_btn}</button>
          </div>
        </form>
      ) : (
        <div style={{ border:`1px solid ${accent}`, padding:'20px 24px', color:accent, fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.1em', background:'rgba(198,255,0,0.04)' }}>
          ✓ {lang==='zh' ? '已订阅 — 周日见。' : 'Subscribed — see you Sunday.'}
        </div>
      )}
      <div style={{ marginTop:16, fontFamily:'var(--font-mono)', fontSize:10, color:'var(--tql-mid)', letterSpacing:'0.15em' }}>{t.sub_meta}</div>
    </div>
  );
}

/* Localized EpisodeCard wrapper */
function EpisodeCardLocalized({ ep, size = 'md' }) {
  const { lang } = useI18N();
  const txt = ep[lang];
  return (
    <EpisodeCard
      ep={ep.ep}
      title={txt.t1}
      titleAccent={txt.t2}
      template={ep.tpl}
      size={size}
      label={lang === 'en' ? 'AFTER AI' : '后AI时代'}
    />
  );
}

Object.assign(window, { HomePage, EpisodeCardLocalized, SubForm });
