/* Episodes archive + Episode detail + Question Index + Manifesto + Subscribe pages */

/* ---------- EpisodesPage ---------- */
function EpisodesPage({ accent }) {
  const { t, lang } = useI18N();
  const [sort, setSort] = React.useState('newest');
  const [view, setView] = React.useState('table');
  const [filter, setFilter] = React.useState('all');

  const themes = ['all', ...new Set(window.EPS_DATA.map(e => lang === 'en' ? e.theme_en : e.theme_zh))];
  let eps = [...window.EPS_DATA];
  if (filter !== 'all') eps = eps.filter(e => (lang === 'en' ? e.theme_en : e.theme_zh) === filter);
  eps.sort((a, b) => sort === 'newest' ? b.ep - a.ep : a.ep - b.ep);

  return (
    <main>
      <section style={{ borderBottom: '1px solid var(--tql-line)', padding: '80px 56px 48px' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div className="tql-eyebrow" style={{ marginBottom: 16 }}>// {t.nav.episodes} · {window.EPS_DATA.length} {t.eps}</div>
          <h1 className="tql-h1" style={{ fontSize: 'clamp(56px, 8vw, 112px)', margin: '0 0 16px' }}>{t.archive_title}</h1>
          <div style={{ color: 'var(--tql-mid)', fontSize: 18, maxWidth: 640 }}>{t.archive_sub}</div>
        </div>
      </section>

      <section style={{ borderBottom: '1px solid var(--tql-line)', padding: '20px 56px' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 24, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', alignItems: 'center' }}>
            <FilterGroup label={t.sort} value={sort} onChange={setSort} options={[['newest', t.newest], ['oldest', t.oldest]]} accent={accent} />
            <FilterGroup label={t.filter} value={filter} onChange={setFilter} options={themes.map(th => [th, th === 'all' ? t.all : th])} accent={accent} compact />
          </div>
          <FilterGroup label={t.view} value={view} onChange={setView} options={[['table', t.table], ['grid', t.grid]]} accent={accent} />
        </div>
      </section>

      <section style={{ padding: view === 'table' ? '0' : '48px 56px' }}>
        {view === 'table' ? (
          <EpsTable eps={eps} accent={accent} />
        ) : (
          <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {eps.map(ep => (
              <Link key={ep.ep} to={`/episodes/${ep.ep}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ width: '100%', aspectRatio: '10/7', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <EpisodeCardLocalized ep={ep} size="md" />
                  </div>
                </div>
                <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tql-mid)', letterSpacing: '0.15em' }}>
                  <span>EP.{String(ep.ep).padStart(2, '0')} · {lang === 'en' ? ep.theme_en : ep.theme_zh}</span>
                  <span>{ep.dur} {t.min}</span>
                </div>
              </Link>
            ))}
          </div>
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
          <th style={{ padding: '16px 56px', textAlign: 'left', width: 80 }}>{t.col_ep}</th>
          <th style={{ padding: '16px 16px', textAlign: 'left', width: 140 }}>{t.col_frame}</th>
          <th style={{ padding: '16px 16px', textAlign: 'left' }}>{t.col_question}</th>
          <th style={{ padding: '16px 56px', textAlign: 'right', width: 120 }}>{t.col_duration}</th>
        </tr>
      </thead>
      <tbody>
        {eps.map(ep => {
          const txt = ep[lang];
          return (
            <tr key={ep.ep} style={{ borderBottom: '1px solid var(--tql-line)', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = '#0f0f13'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                onClick={() => navigate(`/episodes/${ep.ep}`)}>
              <td style={{ padding: '24px 56px', fontFamily: 'var(--font-mono)', color: accent, fontSize: 13 }}>{String(ep.ep).padStart(2, '0')}</td>
              <td style={{ padding: '24px 16px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--tql-mid)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{lang === 'en' ? ep.theme_en : ep.theme_zh}</td>
              <td style={{ padding: '24px 16px', fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em' }}>
                {txt.t1} <span style={{ color: accent }}>{txt.t2}</span>
              </td>
              <td style={{ padding: '24px 56px', textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--tql-mid)', fontSize: 12 }}>{ep.dur}:00</td>
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
  const related = window.EPS_DATA.filter(e => e.ep !== ep.ep && (lang === 'en' ? e.theme_en : e.theme_zh) === (lang === 'en' ? ep.theme_en : ep.theme_zh)).slice(0, 3);
  const fallbackRelated = window.EPS_DATA.filter(e => e.ep !== ep.ep).slice(0, 3);
  const rel = related.length ? related : fallbackRelated;

  const ts = lang === 'en' ? [
    ['00:00', 'Cold open'],
    ['02:14', 'The unstated frame'],
    ['11:42', 'A counter-text from 1843'],
    ['22:30', 'Re-posing the question'],
    [`${String(Math.floor(ep.dur * 0.85)).padStart(2,'0')}:00`, 'Closing thoughts'],
  ] : [
    ['00:00', '冷开场'],
    ['02:14', '未言明的框架'],
    ['11:42', '一段来自 1843 年的反向文本'],
    ['22:30', '重新提出问题'],
    [`${String(Math.floor(ep.dur * 0.85)).padStart(2,'0')}:00`, '结语'],
  ];

  return (
    <main>
      <section style={{ borderBottom: '1px solid var(--tql-line)' }}>
        <div style={{ position: 'relative', height: '70vh', minHeight: 540, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, transform: 'scale(2.2)', transformOrigin: 'center' }}>
            <EpisodeCardLocalized ep={ep} size="xl" />
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 0%, rgba(11,11,15,0.4) 50%, #0B0B0F 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, padding: '56px', maxWidth: 1440, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div className="tql-eyebrow" style={{ marginBottom: 16, color: accent }}>EP.{String(ep.ep).padStart(2, '0')} · {lang === 'en' ? ep.theme_en : ep.theme_zh} · {ep.dur} {t.min}</div>
            <h1 className="tql-h1" style={{ fontSize: 'clamp(48px, 7vw, 96px)', margin: '0 0 24px', maxWidth: 1100 }}>
              {txt.t1} <span style={{ color: accent }}>{txt.t2}</span>
            </h1>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 56px', borderBottom: '1px solid var(--tql-line)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 64 }}>
          <div>
            <div className="tql-eyebrow" style={{ marginBottom: 20 }}>{t.episode_notes}</div>
            <div style={{ fontSize: 21, lineHeight: 1.55, color: '#dfdfdf', fontFamily: lang === 'zh' ? 'Noto Sans SC, sans-serif' : 'inherit' }}>
              {lang === 'en' ? (
                <>
                  <p>This episode opens by accepting the question at face value, then refusing it. We do not ask whether the answer is yes or no. We ask <em style={{color: accent, fontStyle:'normal'}}>which assumption</em> the question is smuggling in.</p>
                  <p>From there the conversation moves through three centuries of philosophy of mind — not as history, but as a tool kit. We test which of those tools survive contact with current AI, and which break.</p>
                  <p>The episode ends without a thesis. It ends with a sharper question.</p>
                </>
              ) : (
                <>
                  <p>本期从接受这个问题表面入手，再去拒绝它。我们不问答案是肯定还是否定。我们问，这个问题<em style={{color: accent, fontStyle:'normal'}}>偷偷夹带了哪个假设</em>。</p>
                  <p>由此对话穿过三个世纪的心智哲学——不是作为历史，而是作为一套工具。我们检验其中哪些工具在与当代 AI 接触后仍然有效，哪些断裂。</p>
                  <p>本期没有论点。它以一个更锋利的问题结束。</p>
                </>
              )}
            </div>

            <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <ReadingCol label={t.primary_text} accent={accent} title={lang === 'en' ? 'Wittgenstein, Philosophical Investigations §244' : '维特根斯坦《哲学研究》§244'} body={lang === 'en' ? 'On the relationship between private experience and public language.' : '论私人经验与公共语言的关系。'} />
              <ReadingCol label={t.counter_text} accent="#fff" title={lang === 'en' ? 'Borges, "The Library of Babel" (1941)' : '博尔赫斯《巴别图书馆》（1941）'} body={lang === 'en' ? 'A library that contains every possible book — including this one.' : '一座包含所有可能之书的图书馆——包括这一本。'} />
            </div>
          </div>
          <aside>
            <div className="tql-eyebrow" style={{ marginBottom: 20 }}>{t.timestamps}</div>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0, fontFamily: 'var(--font-mono)', fontSize: 13 }}>
              {ts.map(([time, label], i) => (
                <li key={i} style={{ display: 'flex', gap: 16, padding: '12px 0', borderBottom: '1px solid var(--tql-line)' }}>
                  <span style={{ color: accent, minWidth: 56 }}>{time}</span>
                  <span style={{ color: '#dfdfdf', fontFamily: 'var(--font-display)', fontSize: 14 }}>{label}</span>
                </li>
              ))}
            </ol>
            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button style={{ padding: '14px 18px', background: accent, color: '#0B0B0F', border: 'none', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', fontWeight: 600, cursor: 'pointer' }}>{lang === 'en' ? '▶ PLAY EPISODE' : '▶ 播放本期'}</button>
              <button style={{ padding: '14px 18px', background: 'transparent', color: 'var(--tql-cool)', border: '1px solid var(--tql-line-2)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', cursor: 'pointer' }}>{t.transcript} ↗</button>
              <button style={{ padding: '14px 18px', background: 'transparent', color: 'var(--tql-cool)', border: '1px solid var(--tql-line-2)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', cursor: 'pointer' }}>{t.notes} ↗</button>
            </div>
          </aside>
        </div>
      </section>

      <section style={{ padding: '64px 56px' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div className="tql-eyebrow" style={{ marginBottom: 24 }}>{t.related_eps}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {rel.map(e => (
              <Link key={e.ep} to={`/episodes/${e.ep}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ width: '100%', aspectRatio: '10/7', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <EpisodeCardLocalized ep={e} size="md" />
                  </div>
                </div>
                <div style={{ marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tql-mid)', letterSpacing: '0.15em' }}>EP.{String(e.ep).padStart(2, '0')} · {lang === 'en' ? e.theme_en : e.theme_zh}</div>
              </Link>
            ))}
          </div>
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
        <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: 'var(--tql-line)', border: '1px solid var(--tql-line)' }}>
          {window.THEMES.map((th, i) => {
            const epsForTheme = window.EPS_DATA.filter(e => (lang === 'en' ? e.theme_en : e.theme_zh).toLowerCase() === (lang === 'en' ? th.en : th.zh).toLowerCase()).slice(0, 4);
            return (
              <div key={i} style={{ background: '#0B0B0F', padding: '40px 32px', minHeight: 280 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tql-mid)', letterSpacing: '0.18em' }}>
                  <span>§ 0{i + 1}</span><span>{th.count} {t.eps}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 40, letterSpacing: '-0.025em', marginBottom: 12 }}>{lang === 'en' ? th.en : th.zh}</div>
                <div style={{ color: '#dfdfdf', fontSize: 18, lineHeight: 1.4, marginBottom: 24, maxWidth: 540, fontFamily: lang === 'zh' ? 'Noto Sans SC, sans-serif' : 'inherit' }}>{lang === 'en' ? th.q_en : th.q_zh}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, borderTop: '1px solid var(--tql-line)', paddingTop: 16 }}>
                  {epsForTheme.length ? epsForTheme.map(e => (
                    <Link key={e.ep} to={`/episodes/${e.ep}`} style={{ display: 'flex', justifyContent: 'space-between', textDecoration: 'none', color: 'var(--tql-cool)', fontFamily: 'var(--font-mono)', fontSize: 12, padding: '4px 0' }}>
                      <span>EP.{String(e.ep).padStart(2, '0')} · {e[lang].t1}</span>
                      <span style={{ color: accent }}>↗</span>
                    </Link>
                  )) : <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--tql-mid)' }}>{lang === 'en' ? '— upcoming season' : '— 即将到来'}</span>}
                </div>
              </div>
            );
          })}
        </div>
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
          <div className="tql-eyebrow" style={{ marginBottom: 24 }}>// {t.nav.manifesto}</div>
          <h1 className="tql-h1" style={{ fontSize: 'clamp(64px, 9vw, 132px)', margin: '0 0 40px' }}>{lang === 'en' ? 'A lab,' : '一间实验室，'}<br /><span style={{ color: accent }}>{lang === 'en' ? 'not a clinic.' : '不是诊所。'}</span></h1>
          <div style={{ color: 'var(--tql-mid)', fontSize: 19, lineHeight: 1.55, maxWidth: 720, fontFamily: lang === 'zh' ? 'Noto Sans SC, sans-serif' : 'inherit' }}>
            {lang === 'en' ? 'Five propositions on what we are, what we are not, and the work we are trying to do.' : '关于"我们是什么、不是什么、在尝试做什么"的五条主张。'}
          </div>
        </div>
      </section>
      <section style={{ padding: '64px 56px 120px' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          {t.sections.map((s, i) => (
            <div key={i} style={{ borderTop: '1px solid var(--tql-line)', padding: '56px 0', display: 'grid', gridTemplateColumns: '120px 1fr', gap: 32 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: accent, letterSpacing: '0.18em' }}>§ {s.id}</div>
              <div>
                <h2 className="tql-h2" style={{ fontSize: 44, margin: '0 0 24px' }}>{s.title}</h2>
                <div style={{ fontSize: 19, lineHeight: 1.6, whiteSpace: 'pre-line', color: '#dfdfdf', fontFamily: lang === 'zh' ? 'Noto Sans SC, sans-serif' : 'inherit' }}>{s.body}</div>
              </div>
            </div>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: 'var(--tql-line)', border: '1px solid var(--tql-line)' }}>
            {t.sub_items.map(([title, body], i) => (
              <div key={i} style={{ background: '#0B0B0F', padding: '40px 32px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: accent, letterSpacing: '0.18em', marginBottom: 16 }}>0{i + 1} / 04</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, letterSpacing: '-0.02em', marginBottom: 12 }}>{title}</div>
                <div style={{ color: 'var(--tql-mid)', fontSize: 16, lineHeight: 1.5, fontFamily: lang === 'zh' ? 'Noto Sans SC, sans-serif' : 'inherit' }}>{body}</div>
              </div>
            ))}
          </div>
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

Object.assign(window, { EpisodesPage, EpisodeDetailPage, IndexPage, ManifestoPage, SubscribePage, NotFound });
