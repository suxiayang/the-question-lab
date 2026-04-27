/* Shared shell: i18n hook, hash router, header, footer, language toggle */

const LangCtx = React.createContext({ lang: 'en', t: window.I18N.en, setLang: () => {} });

function useI18N() {
  return React.useContext(LangCtx);
}

function LangProvider({ children }) {
  const detect = () => {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('tql-lang');
      if (stored === 'en' || stored === 'zh') return stored;
    }
    const nav = (typeof navigator !== 'undefined' && navigator.language) || 'en';
    return nav.toLowerCase().startsWith('zh') ? 'zh' : 'en';
  };
  const [lang, _setLang] = React.useState(detect);
  const setLang = (l) => {
    _setLang(l);
    try { localStorage.setItem('tql-lang', l); } catch (e) {}
    document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en';
  };
  React.useEffect(() => { document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'; }, [lang]);
  const t = window.I18N[lang];
  return (
    <LangCtx.Provider value={{ lang, t, setLang }}>{children}</LangCtx.Provider>
  );
}

/* ---------- Hash router ---------- */
function useRoute() {
  const parse = () => {
    const h = (typeof location !== 'undefined' ? location.hash : '#/') || '#/';
    const path = h.replace(/^#/, '') || '/';
    const parts = path.split('/').filter(Boolean);
    return { path, parts };
  };
  const [route, setRoute] = React.useState(parse);
  React.useEffect(() => {
    const onHash = () => {
      setRoute(parse());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

function navigate(path) {
  if (typeof location !== 'undefined') location.hash = path;
}

function Link({ to, children, style, className }) {
  const onClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={`#${to}`} onClick={onClick} style={style} className={className}>{children}</a>
  );
}

/* ---------- Header ---------- */
function Header({ accent }) {
  const { lang, t, setLang } = useI18N();
  const route = useRoute();
  const isActive = (path) => {
    if (path === '/') return route.path === '/' || route.path === '';
    return route.path.startsWith(path);
  };
  const navItems = [
    { path: '/', label: t.nav.home },
    { path: '/episodes', label: t.nav.episodes },
    { path: '/index', label: t.nav.index },
    { path: '/manifesto', label: t.nav.manifesto },
    { path: '/subscribe', label: t.nav.subscribe },
  ];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(11,11,15,0.85)', backdropFilter: 'blur(14px)', borderBottom: '1px solid var(--tql-line)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '18px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <TQLMark size={26} color={accent} />
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, letterSpacing: '-0.01em', lineHeight: 1 }}>THE QUESTION LAB</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', color: 'var(--tql-mid)', marginTop: 4 }}>EST. 2024 · BEIJING</div>
            </div>
          </div>
        </Link>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {navItems.map((it) => (
            <Link
              key={it.path}
              to={it.path}
              style={{
                padding: '8px 14px',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: isActive(it.path) ? '#fff' : 'var(--tql-mid)',
                borderBottom: isActive(it.path) ? `1px solid ${accent}` : '1px solid transparent',
                transition: 'color .25s',
              }}
            >{it.label}</Link>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <LangToggle accent={accent} />
          <Link to="/episodes/42" style={{
            background: accent, color: '#0B0B0F', padding: '10px 18px', textDecoration: 'none',
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', fontWeight: 600,
          }}>{t.cta_latest}</Link>
        </div>
      </div>
    </header>
  );
}

function LangToggle({ accent }) {
  const { lang, setLang } = useI18N();
  return (
    <div style={{ display: 'inline-flex', border: '1px solid var(--tql-line-2)', borderRadius: 0 }}>
      {['en', 'zh'].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          style={{
            background: lang === l ? accent : 'transparent',
            color: lang === l ? '#0B0B0F' : 'var(--tql-mid)',
            border: 'none',
            padding: '7px 11px',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.18em',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >{l === 'en' ? 'EN' : '中'}</button>
      ))}
    </div>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  const { t, lang } = useI18N();
  return (
    <footer style={{ borderTop: '1px solid var(--tql-line)', padding: '64px 56px 40px', background: '#08080B' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
          <div>
            <TQLMark size={32} />
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, marginTop: 14, letterSpacing: '-0.01em' }}>THE QUESTION LAB</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tql-mid)', marginTop: 8, letterSpacing: '0.15em' }}>{t.footer_recorded}</div>
          </div>
          {[
            { title: t.footer_episodes, items: [['→ ' + t.nav.home, '/'], ['→ ' + t.nav.episodes, '/episodes'], ['→ ' + t.nav.index, '/index']] },
            { title: t.footer_lab, items: [['→ ' + t.nav.manifesto, '/manifesto'], ['→ ' + t.nav.subscribe, '/subscribe']] },
            { title: t.footer_listen, items: [['→ Spotify', '/'], ['→ Apple Podcasts', '/'], ['→ YouTube', '/']] },
            { title: t.footer_reach, items: [['→ ask@questionlab.fm', '/'], ['→ Press', '/'], ['→ RSS', '/']] },
          ].map((col, i) => (
            <div key={i}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tql-mid)', letterSpacing: '0.18em', marginBottom: 14 }}>{col.title}</div>
              {col.items.map(([label, to], j) => (
                <Link key={j} to={to} style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 13, color: '#EDEDED', textDecoration: 'none', marginBottom: 8 }}>{label}</Link>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--tql-line)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tql-mid-2)', letterSpacing: '0.15em' }}>
          <span>{t.footer_rights}</span>
          <span>v2.4.1 · {lang === 'en' ? 'BUILT WITH FRICTION' : '以摩擦力建造'}</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { LangCtx, LangProvider, useI18N, useRoute, navigate, Link, Header, Footer, LangToggle });
