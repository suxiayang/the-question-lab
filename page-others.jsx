/* Episodes archive + Episode detail + Question Index + Manifesto + Subscribe pages */

/* ---------- EpisodesPage ---------- */
function EpisodesPage({ accent }) {
  const { t, lang } = useI18N();
  const [sort, setSort] = React.useState('oldest');
  const [view, setView] = React.useState('table');
  const [season, setSeason] = React.useState('all');
  const [filter, setFilter] = React.useState('all');

  const themeNames = window.THEMES.map(th => lang === 'en' ? th.en : th.zh);
  const themes = ['all', ...themeNames];

  let eps = [...window.EPS_DATA];
  if (season !== 'all') eps = eps.filter(e => e.season === season);
  if (filter !== 'all') eps = eps.filter(e => (lang === 'en' ? e.theme_en : e.theme_zh) === filter);
  eps.sort((a, b) => sort === 'newest' ? b.ep - a.ep : a.ep - b.ep);

  const recordedCount = window.EPS_DATA.filter(e => e.recorded).length;

  return (
    <main>
      <section style={{ borderBottom: '1px solid var(--tql-line)', padding: '80px 56px 48px' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div className="tql-eyebrow" style={{ marginBottom: 16 }}>// {t.nav.episodes} · {window.EPS_DATA.length} {t.eps} · {recordedCount} {lang==='en'?'recorded':'已发布'}</div>
          <h1 className="tql-h1" style={{ fontSize: 'clamp(56px, 8vw, 112px)', margin: '0 0 16px' }}>{t.archive_title}</h1>
          <div style={{ color: 'var(--tql-mid)', fontSize: 18, maxWidth: 720, lineHeight: 1.55, fontFamily: lang==='zh' ? 'Noto Sans SC, sans-serif' : 'inherit' }}>{t.archive_sub}</div>
        </div>
      </section>

      <section style={{ borderBottom: '1px solid var(--tql-line)', padding: '20px 56px' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 20, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', alignItems: 'center', flexWrap:'wrap' }}>
            <FilterGroup label={t.by_season} value={season} onChange={setSeason}
              options={[['all', t.all], ...window.SEASONS.map(s => [s.id, s.id])]} accent={accent} />
            <FilterGroup label={t.by_theme} value={filter} onChange={setFilter}
              options={themes.map(th => [th, th === 'all' ? t.all : th])} accent={accent} compact />
            <FilterGroup label={t.sort} value={sort} onChange={setSort} options={[['oldest', t.oldest], ['newest', t.newest]]} accent={accent} />
          </div>
          <FilterGroup label={t.view} value={view} onChange={setView} options={[['table', t.table], ['grid', t.grid]]} accent={accent} />
        </div>
      </section>

      <section style={{ padding: view === 'table' ? '0' : '48px 56px' }}>
        {view === 'table' ? (
          <Reveal><EpsTable eps={eps} accent={accent} /></Reveal>
        ) : (
          <Reveal stagger style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {eps.map(ep => (
              <Link key={ep.ep} to={`/episodes/${ep.ep}`} className="ep-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ width: '100%', aspectRatio: '10/7', position: 'relative', overflow:'hidden' }}>
                  <div className="ep-img" style={{ position: 'absolute', inset: 0 }}>
                    <EpisodeCardLocalized ep={ep} size="md" />
                  </div>
                  {!ep.recorded && (
                    <div style={{ position:'absolute', top:8, right:8, fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.18em', color:'var(--tql-mid)', background:'rgba(11,11,15,0.7)', border:'1px solid var(--tql-line-2)', padding:'3px 7px' }}>
                      {ep.finale ? t.status_finale : t.status_upcoming}
                    </div>
                  )}
                </div>
                <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tql-mid)', letterSpacing: '0.15em' }}>
                  <span>{ep.season} · #{String(ep.ep).padStart(3, '0')} · {(lang === 'en' ? ep.theme_en : ep.theme_zh).toUpperCase()}</span>
                  <span>{ep.dur} {t.min}</span>
                </div>
              </Link>
            ))}
          </Reveal>
        )}
      </section>
    </main>
  );
}

function FilterGroup({ label, value, onChange, options, accent, compact }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <span style={{ color: 'var(--tql-mid)' }}>{label}:</span>
      {options.map(([v, l]) => (
        <button key={v} onClick={() => onChange(v)} style={{
          background: value === v ? accent : 'transparent',
          color: value === v ? '#0B0B0F' : 'var(--tql-cool)',
          border: '1px solid ' + (value === v ? accent : 'var(--tql-line-2)'),
          padding: compact ? '4px 8px' : '6px 12px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em',
          cursor: 'pointer', textTransform: 'uppercase',
        }}>{l}</button>
      ))}
    </div>
  );
}

function EpsTable({ eps, accent }) {
  const { t, lang } = useI18N();
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-display)' }}>
      <thead>
        <tr style={{ borderBottom: '1px solid var(--tql-line)', color: 'var(--tql-mid)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em' }}>
          <th style={{ padding: '16px 56px', textAlign: 'left', width: 90 }}>{t.col_ep}</th>
          <th style={{ padding: '16px 12px', textAlign: 'left', width: 70 }}>{t.col_season}</th>
          <th style={{ padding: '16px 12px', textAlign: 'left', width: 130 }}>{t.col_frame}</th>
          <th style={{ padding: '16px 16px', textAlign: 'left' }}>{t.col_question}</th>
          <th style={{ padding: '16px 12px', textAlign: 'left', width: 110 }}>{t.col_status}</th>
          <th style={{ padding: '16px 56px', textAlign: 'right', width: 90 }}>{t.col_duration}</th>
        </tr>
      </thead>
      <tbody>
        {eps.map(ep => {
          const txt = ep[lang];
          const status = ep.recorded ? t.status_recorded : (ep.finale ? t.status_finale : t.status_upcoming);
          const statusColor = ep.recorded ? accent : 'var(--tql-mid)';
          return (
            <tr key={ep.ep} style={{ borderBottom: '1px solid var(--tql-line)', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = '#0f0f13'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                onClick={() => navigate(`/episodes/${ep.ep}`)}>
              <td style={{ padding: '22px 56px', fontFamily: 'var(--font-mono)', color: accent, fontSize: 13, letterSpacing:'0.05em' }}>#{String(ep.ep).padStart(3, '0')}</td>
              <td style={{ padding: '22px 12px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--tql-cool)', letterSpacing: '0.12em' }}>{ep.season}</td>
              <td style={{ padding: '22px 12px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--tql-mid)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{lang === 'en' ? ep.theme_en : ep.theme_zh}</td>
              <td style={{ padding: '22px 16px', fontSize: 20, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.25 }}>
                {txt.t1} <span style={{ color: accent }}>{txt.t2}</span>
              </td>
              <td style={{ padding: '22px 12px', fontFamily: 'var(--font-mono)', fontSize: 10, color: statusColor, letterSpacing: '0.18em' }}>● {status}</td>
              <td style={{ padding: '22px 56px', textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--tql-mid)', fontSize: 12 }}>{ep.dur} {t.min}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/* ---------- EpisodeDetail ---------- */
function EpisodeDetailPage({ id, accent }) {
  const { t, lang } = useI18N();
  const ep = window.EPS_DATA.find(e => e.ep === Number(id));
  if (!ep) return <NotFound />;
  const txt = ep[lang];
  const themeName = lang === 'en' ? ep.theme_en : ep.theme_zh;
  const thinkers = lang === 'en' ? (ep.thinkers_en || []) : (ep.thinkers_zh || []);
  const epCase = lang === 'en' ? ep.case_en : ep.case_zh;
  const seasonObj = (window.SEASONS || []).find(s => s.id === ep.season);
  const seasonName = seasonObj ? (lang === 'en' ? seasonObj.title_en : seasonObj.title_zh) : ep.season;
  const related = window.EPS_DATA.filter(e => e.ep !== ep.ep && (lang === 'en' ? e.theme_en : e.theme_zh) === themeName).slice(0, 3);
  const sameSeasonNeighbor = window.EPS_DATA.filter(e => e.ep !== ep.ep && e.season === ep.season).slice(0, 3);
  const rel = related.length ? related : sameSeasonNeighbor.length ? sameSeasonNeighbor : window.EPS_DATA.filter(e => e.ep !== ep.ep).slice(0, 3);
  const beats = t.beats || [];
  const status = ep.recorded ? t.status_recorded : (ep.finale ? t.status_finale : t.status_upcoming);

  return (
    <main>
      <section style={{ borderBottom: '1px solid var(--tql-line)' }}>
        <div style={{ position: 'relative', height: '70vh', minHeight: 540, overflow: 'hidden' }}>
          <div className="ken-burns" style={{ position: 'absolute', inset: 0, transformOrigin: 'center' }}>
            <EpisodeCardLocalized ep={ep} size="xl" />
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 0%, rgba(11,11,15,0.4) 50%, #0B0B0F 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, padding: '56px', maxWidth: 1440, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div className="tql-eyebrow" style={{ marginBottom: 16, color: accent }}>{ep.season} · #{String(ep.ep).padStart(3, '0')} · {themeName.toUpperCase()} · {ep.dur} {t.min} · ● {status}</div>
            <h1 className="tql-h1" style={{ fontSize: 'clamp(48px, 7vw, 96px)', margin: '0 0 24px', maxWidth: 1100 }}>
              {txt.t1} <span style={{ color: accent }}>{txt.t2}</span>
            </h1>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.18em', color:'rgba(255,255,255,0.6)' }}>
              {t.season_link}: <Link to="/seasons" style={{ color:'#fff', textDecoration:'none', borderBottom:`1px solid ${accent}` }}>{seasonName}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Episode meta strip */}
      <section style={{ borderBottom: '1px solid var(--tql-line)', background: '#08080B' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 56px', display:'grid', gridTemplateColumns:'1.2fr 1.5fr 1fr', gap: 0 }}>
          <div style={{ padding:'24px 32px 24px 0', borderRight:'1px solid var(--tql-line)' }}>
            <div className="tql-eyebrow" style={{ marginBottom: 8, color: accent }}>{t.core_question}</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:500, lineHeight:1.4 }}>
              {txt.t1}<span style={{ color: accent }}> {txt.t2}</span>
            </div>
          </div>
          <div style={{ padding:'24px 32px', borderRight:'1px solid var(--tql-line)' }}>
            <div className="tql-eyebrow" style={{ marginBottom: 8 }}>{t.key_thinkers}</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:16, lineHeight:1.5, color:'#dfdfdf' }}>
              {thinkers.length ? thinkers.join(' · ') : '—'}
            </div>
          </div>
          <div style={{ padding:'24px 0 24px 32px' }}>
            <div className="tql-eyebrow" style={{ marginBottom: 8 }}>{t.counter_text}</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:16, lineHeight:1.5, color:'#dfdfdf' }}>
              {epCase || '—'}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 56px', borderBottom: '1px solid var(--tql-line)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 64 }}>
          <div>
            <div className="tql-eyebrow" style={{ marginBottom: 20 }}>{t.episode_notes}</div>
            <div style={{ fontSize: 21, lineHeight: 1.6, color: '#dfdfdf', fontFamily: lang === 'zh' ? 'Noto Sans SC, sans-serif' : 'inherit' }}>
              {lang === 'en' ? (
                <>
                  <p>This episode follows the program's seven-beat structure. It opens with a disturbing concrete scene — not a thesis. It crosses two-to-four historical thinkers as a toolkit, not as history. It lands on a real, current AI-era case. And it ends not with "so we should…" — but with a fact that gives you a chill.</p>
                  <p>The thought-history beat for this episode crosses {thinkers.slice(0, 3).join(', ')}{thinkers.length > 3 ? ', and others' : ''}. The contemporary case is <em style={{ color: accent, fontStyle: 'normal' }}>{epCase}</em>.</p>
                  <p>The aim is not to settle the question. It is to put it back on the table — re-posed, sharper, in the language of someone who is not a philosopher and is choosing what to do tomorrow.</p>
                </>
              ) : (
                <>
                  <p>本期遵循本节目统一的七段式结构。它从一个让人不安的具体场景开始——而不是从一个论点。它穿越 2–4 位历史思想家——作为工具箱，不是作为历史。它落到一个真实的、当代的 AI 案例。结尾不是"所以我们应该……"——而是一个让人脊背发凉的事实。</p>
                  <p>本期的思想史穿越涉及 {thinkers.slice(0, 3).join('、')}{thinkers.length > 3 ? ' 等' : ''}。当代切入点是<em style={{ color: accent, fontStyle: 'normal' }}> {epCase}</em>。</p>
                  <p>目的不是平息这个问题。目的是把它重新摆回桌面——更锋利、用一个不是哲学家、明天就要做选择的人能听懂的语言。</p>
                </>
              )}
            </div>

            <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <ReadingCol label={t.primary_text} accent={accent}
                title={thinkers[0] || (lang === 'en' ? 'Thought-history anchor' : '思想史锚点')}
                body={lang === 'en'
                  ? `Cross-reference: ${thinkers.slice(0, 4).join(', ')}. The episode treats the historical positions as a toolkit, not as a survey.`
                  : `交叉对照：${thinkers.slice(0, 4).join('、')}。本期把这些立场当作工具箱使用，不作通史介绍。`} />
              <ReadingCol label={t.counter_text} accent="#fff"
                title={epCase || (lang === 'en' ? 'Contemporary AI case' : '当代 AI 案例')}
                body={lang === 'en'
                  ? `The contemporary anchor for this episode. We test which of the historical tools survive contact with this case, and which break.`
                  : '本期的当代锚点。我们检验哪些历史工具在与这个案例接触后仍然有效，哪些断裂。'} />
            </div>
          </div>
          <aside>
            <div className="tql-eyebrow" style={{ marginBottom: 20 }}>{t.timestamps}</div>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0, fontFamily: 'var(--font-mono)', fontSize: 13 }}>
              {beats.map((b, i) => (
                <li key={i} style={{ display: 'grid', gridTemplateColumns:'58px 18px 1fr', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--tql-line)' }}>
                  <span style={{ color: accent }}>{b.tag}</span>
                  <span style={{ color: 'var(--tql-mid)', fontSize:10 }}>[{i + 1}]</span>
                  <span style={{ color: '#dfdfdf', fontFamily: 'var(--font-display)', fontSize: 14, lineHeight:1.4 }}>{b.label}</span>
                </li>
              ))}
            </ol>
            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {ep.recorded ? (
                <button className="btn-lift" style={{ padding: '14px 18px', background: accent, color: '#0B0B0F', border: 'none', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', fontWeight: 600, cursor: 'pointer' }}>{lang === 'en' ? '▶ PLAY EPISODE' : '▶ 播放本期'}</button>
              ) : (
                <div style={{ padding: '14px 18px', border: `1px dashed ${accent}`, color: accent, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textAlign:'center' }}>
                  ◷ {lang === 'en' ? 'IN PRODUCTION' : '制作中'}
                </div>
              )}
              <button className="btn-lift" style={{ padding: '14px 18px', background: 'transparent', color: 'var(--tql-cool)', border: '1px solid var(--tql-line-2)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', cursor: 'pointer' }}>{t.transcript} <span className="arrow-shift">↗</span></button>
              <button className="btn-lift" style={{ padding: '14px 18px', background: 'transparent', color: 'var(--tql-cool)', border: '1px solid var(--tql-line-2)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', cursor: 'pointer' }}>{t.notes} <span className="arrow-shift">↗</span></button>
            </div>
          </aside>
        </div>
      </section>

      <section style={{ padding: '64px 56px' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div className="tql-eyebrow" style={{ marginBottom: 24 }}>{t.related_eps}</div>
          <Reveal stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {rel.map(e => (
              <Link key={e.ep} to={`/episodes/${e.ep}`} className="ep-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ width: '100%', aspectRatio: '10/7', position: 'relative', overflow:'hidden' }}>
                  <div className="ep-img" style={{ position: 'absolute', inset: 0 }}>
                    <EpisodeCardLocalized ep={e} size="md" />
                  </div>
                </div>
                <div style={{ marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tql-mid)', letterSpacing: '0.15em' }}>{e.season} · #{String(e.ep).padStart(3, '0')} · {(lang === 'en' ? e.theme_en : e.theme_zh).toUpperCase()}</div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function ReadingCol({ label, title, body, accent }) {
  return (
    <div style={{ borderLeft: `2px solid ${accent}`, paddingLeft: 16 }}>
      <div className="tql-eyebrow" style={{ marginBottom: 8, color: accent }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, marginBottom: 6 }}>{title}</div>
      <div style={{ color: 'var(--tql-mid)', fontSize: 13, lineHeight: 1.5 }}>{body}</div>
    </div>
  );
}

/* ---------- Index page ---------- */
function IndexPage({ slug, accent }) {
  const { t, lang } = useI18N();
  return (
    <main>
      <section style={{ borderBottom: '1px solid var(--tql-line)', padding: '80px 56px 56px' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div className="tql-eyebrow" style={{ marginBottom: 16 }}>// {t.nav.index}</div>
          <h1 className="tql-h1" style={{ fontSize: 'clamp(56px, 8vw, 112px)', margin: '0 0 16px' }}>{t.index_title}</h1>
          <div style={{ color: 'var(--tql-mid)', fontSize: 18, maxWidth: 720 }}>{t.index_sub}</div>
        </div>
      </section>
      <section style={{ padding: '0 56px 96px' }}>
        <Reveal stagger>
          <SpotlightGrid style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--tql-line)', border: '1px solid var(--tql-line)' }}>
            {window.THEMES.map((th, i) => {
              const epsForTheme = window.EPS_DATA.filter(e => e.theme_en === th.en);
              const intro = (t.theme_intro && t.theme_intro[th.en]) || (lang === 'en' ? th.q_en : th.q_zh);
              return (
                <div key={i} className="terr-cell" style={{ background: '#0B0B0F', padding: '32px 28px', minHeight: 320, display:'flex', flexDirection:'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tql-mid)', letterSpacing: '0.18em' }}>
                    <span style={{ color: accent }}>§ {String(i + 1).padStart(2,'0')} / 09</span>
                    <span>{epsForTheme.length} {t.eps}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, letterSpacing: '-0.025em', marginBottom: 10, lineHeight:1.05 }}>{lang === 'en' ? th.en : th.zh}</div>
                  <div style={{ color: 'var(--tql-mid)', fontSize: 13, lineHeight: 1.5, marginBottom: 18, fontFamily: lang === 'zh' ? 'Noto Sans SC, sans-serif' : 'inherit' }}>{intro}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, borderTop: '1px solid var(--tql-line)', paddingTop: 14, marginTop:'auto' }}>
                    {epsForTheme.length ? epsForTheme.map(e => (
                      <Link key={e.ep} to={`/episodes/${e.ep}`} style={{ display: 'grid', gridTemplateColumns:'42px 32px 1fr 14px', gap:10, alignItems:'baseline', textDecoration: 'none', color: 'var(--tql-cool)', fontFamily: 'var(--font-mono)', fontSize: 11, padding: '4px 0' }}>
                        <span style={{ color: accent }}>#{String(e.ep).padStart(3, '0')}</span>
                        <span style={{ color: 'var(--tql-mid)', fontSize: 9, letterSpacing:'0.15em' }}>{e.season}</span>
                        <span style={{ fontFamily:'var(--font-display)', fontSize: 13, fontWeight: 500, lineHeight:1.3, color:'#dfdfdf' }}>{e[lang].t1}<span style={{ color:'var(--tql-mid)' }}> {e[lang].t2}</span></span>
                        <span className="arrow-shift" style={{ color: accent }}>↗</span>
                      </Link>
                    )) : <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--tql-mid)' }}>{lang === 'en' ? '— no episodes filed yet' : '— 暂无归类'}</span>}
                  </div>
                </div>
              );
            })}
          </SpotlightGrid>
        </Reveal>
      </section>
    </main>
  );
}

/* ---------- Manifesto page ---------- */
function ManifestoPage({ accent }) {
  const { t, lang } = useI18N();
  return (
    <main>
      <section style={{ borderBottom: '1px solid var(--tql-line)', padding: '120px 56px 80px' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <div className="tql-eyebrow" style={{ marginBottom: 24 }}>// {t.nav.manifesto} · {lang === 'en' ? 'PROGRAM v1.0' : '节目体系 v1.0'}</div>
          <h1 className="tql-h1" style={{ fontSize: 'clamp(56px, 8vw, 124px)', margin: '0 0 40px' }}>
            {lang === 'en' ? 'AI is not a new technology.' : 'AI 不是一项新技术。'}<br />
            <span style={{ color: accent }}>{lang === 'en' ? 'It is a mirror.' : '它是一面镜子。'}</span>
          </h1>
          <div style={{ color: 'var(--tql-mid)', fontSize: 19, lineHeight: 1.6, maxWidth: 760, fontFamily: lang === 'zh' ? 'Noto Sans SC, sans-serif' : 'inherit' }}>
            {lang === 'en'
              ? 'Five sections on why this program exists, where it stands among adjacent channels, the three principles that govern every episode, the seven-beat structure each episode follows, and the mission we hold to.'
              : '五条主张：我们为什么存在、在相邻频道之间的位置、每一集都遵守的三条原则、每一集 14–18 分钟所遵循的七段结构、以及我们要守住的使命。'}
          </div>
        </div>
      </section>
      <section style={{ padding: '64px 56px 120px' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          {t.sections.map((s, i) => (
            <Reveal key={i} threshold={0.18}>
              <div style={{ borderTop: '1px solid var(--tql-line)', padding: '56px 0', display: 'grid', gridTemplateColumns: '120px 1fr', gap: 32 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: accent, letterSpacing: '0.18em' }}>§ {s.id}</div>
                <div>
                  <h2 className="tql-h2" style={{ fontSize: 44, margin: '0 0 24px' }}>{s.title}</h2>
                  <div style={{ fontSize: 19, lineHeight: 1.6, whiteSpace: 'pre-line', color: '#dfdfdf', fontFamily: lang === 'zh' ? 'Noto Sans SC, sans-serif' : 'inherit' }}>{s.body}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}

/* ---------- Subscribe page ---------- */
function SubscribePage({ accent }) {
  const { t, lang } = useI18N();
  return (
    <main>
      <section style={{ padding: '120px 56px 80px', borderBottom: '1px solid var(--tql-line)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div className="tql-eyebrow" style={{ marginBottom: 24 }}>// {t.nav.subscribe}</div>
            <h1 className="tql-h1" style={{ fontSize: 'clamp(56px, 8vw, 104px)', margin: '0 0 24px' }}>{t.sub_page_title}<br /><span style={{ color: accent }}>{t.sub_page_title_2}</span></h1>
            <div style={{ color: 'var(--tql-mid)', fontSize: 18, lineHeight: 1.5, maxWidth: 460, fontFamily: lang === 'zh' ? 'Noto Sans SC, sans-serif' : 'inherit' }}>{t.sub_page_body}</div>
          </div>
          <SubForm accent={accent} />
        </div>
      </section>
      <section style={{ padding: '80px 56px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="tql-eyebrow" style={{ marginBottom: 32 }}>{t.sub_what}</div>
          <Reveal stagger>
            <SpotlightGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: 'var(--tql-line)', border: '1px solid var(--tql-line)' }}>
              {t.sub_items.map(([title, body], i) => (
                <div key={i} className="terr-cell" style={{ background: '#0B0B0F', padding: '40px 32px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: accent, letterSpacing: '0.18em', marginBottom: 16 }}>0{i + 1} / 04</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, letterSpacing: '-0.02em', marginBottom: 12 }}>{title}</div>
                  <div style={{ color: 'var(--tql-mid)', fontSize: 16, lineHeight: 1.5, fontFamily: lang === 'zh' ? 'Noto Sans SC, sans-serif' : 'inherit' }}>{body}</div>
                </div>
              ))}
            </SpotlightGrid>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

/* ---------- Seasons hub ---------- */
function SeasonsPage({ accent }) {
  const { t, lang } = useI18N();
  return (
    <main>
      <section style={{ borderBottom: '1px solid var(--tql-line)', padding: '120px 56px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="tql-eyebrow" style={{ marginBottom: 24 }}>// {t.nav.seasons} · {t.seasons_eyebrow}</div>
          <h1 className="tql-h1" style={{ fontSize: 'clamp(56px, 8vw, 116px)', margin: '0 0 32px' }}>
            {t.seasons_title}
          </h1>
          <div style={{ color: 'var(--tql-mid)', fontSize: 19, lineHeight: 1.6, maxWidth: 820, fontFamily: lang === 'zh' ? 'Noto Sans SC, sans-serif' : 'inherit' }}>{t.seasons_sub}</div>
        </div>
      </section>

      <section style={{ padding: '0 56px 96px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          {window.SEASONS.map((s, i) => {
            const eps = window.EPS_DATA.filter(e => e.season === s.id);
            return (
              <Reveal key={s.id} threshold={0.1}>
                <div id={s.id.toLowerCase()} style={{ borderTop: '1px solid var(--tql-line)', padding: '56px 0' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 32, marginBottom: 32 }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: accent, letterSpacing: '0.2em', marginBottom: 6 }}>{s.id}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--tql-mid)', letterSpacing: '0.18em' }}>{s.span}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--tql-mid)', letterSpacing: '0.18em', marginTop: 8 }}>{lang === 'en' ? s.lens_en : s.lens_zh}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: accent, letterSpacing: '0.3em', marginBottom: 8 }}>{lang === 'en' ? s.name_en : s.name_zh}</div>
                      <h2 className="tql-h2" style={{ fontSize: 'clamp(40px, 5vw, 72px)', margin: '0 0 20px', lineHeight: 1.0 }}>{lang === 'en' ? s.title_en : s.title_zh}</h2>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.45, color: '#dfdfdf', maxWidth: 760, marginBottom: 12, fontFamily: lang === 'zh' ? 'Noto Sans SC, sans-serif' : 'inherit' }}>{lang === 'en' ? s.tagline_en : s.tagline_zh}</div>
                    </div>
                  </div>

                  {/* episode grid for the season — 4 columns × 3 rows */}
                  <SpotlightGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--tql-line)', border: '1px solid var(--tql-line)' }}>
                    {eps.map(e => (
                      <Link key={e.ep} to={`/episodes/${e.ep}`} className="terr-cell" style={{ display:'block', textDecoration: 'none', color: 'inherit', background: '#0B0B0F', padding: '20px 18px', minHeight: 160, position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--tql-mid)', marginBottom: 12 }}>
                          <span style={{ color: accent }}>#{String(e.ep).padStart(3, '0')}</span>
                          <span>{(lang === 'en' ? e.theme_en : e.theme_zh).toUpperCase()}</span>
                        </div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, lineHeight: 1.25, marginBottom: 8 }}>
                          {e[lang].t1}<span style={{ color: accent }}> {e[lang].t2}</span>
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tql-mid)', letterSpacing: '0.12em' }}>
                          {(lang === 'en' ? e.thinkers_en : e.thinkers_zh)?.slice(0, 2).join(' · ')}
                        </div>
                        {e.recorded && (
                          <div style={{ position:'absolute', bottom:14, right:14, fontFamily:'var(--font-mono)', fontSize:9, color:accent, letterSpacing:'0.18em' }}>● {t.status_recorded}</div>
                        )}
                        {e.finale && (
                          <div style={{ position:'absolute', bottom:14, right:14, fontFamily:'var(--font-mono)', fontSize:9, color:'#fff', letterSpacing:'0.18em' }}>◇ {t.status_finale}</div>
                        )}
                      </Link>
                    ))}
                  </SpotlightGrid>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </main>
  );
}

/* ---------- 404 ---------- */
function NotFound() {
  const { t, lang } = useI18N();
  return (
    <main style={{ padding: '160px 56px', textAlign: 'center' }}>
      <div className="tql-eyebrow" style={{ marginBottom: 16 }}>404 / SIGNAL LOST</div>
      <h1 className="tql-h1" style={{ fontSize: 96, margin: '0 0 24px' }}>{lang === 'en' ? 'No transmission here.' : '此处无信号。'}</h1>
      <Link to="/" className="link-line" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.18em', color: 'var(--tql-cool)', textDecoration: 'none' }}>
        {lang === 'en' ? '← RETURN TO HOME' : '← 返回首页'}
      </Link>
    </main>
  );
}

Object.assign(window, { EpisodesPage, EpisodeDetailPage, IndexPage, ManifestoPage, SubscribePage, SeasonsPage, NotFound });
