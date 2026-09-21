import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRightIcon, ArrowUpRightIcon, XIcon, PlusIcon, MinusIcon, ArrowsOutSimpleIcon, ListIcon } from '@phosphor-icons/react';
import { works, themes, profile } from './portfolio';
import '@fontsource/anton/latin-400.css';

const W = 1440, H = 1024;
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
// Phones (<=767px) and tablets (768-1199px) use the stacked flow layout so type and
// imagery keep a comfortable size; >=1200px keeps the original 1440x1024 spatial canvas.
const layoutFor = w => (w < 768 ? 'phone' : w < 1200 ? 'tablet' : 'desktop');

function Connections({ theme, hovered, active = true }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!active) return;
    const canvas = ref.current, ctx = canvas.getContext('2d'), ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * ratio; canvas.height = H * ratio; ctx.scale(ratio, ratio);
    const paths = [
      ['形态', ['flow', 'painting'], [390,259,508,153,500,415,986,212]],
      ['秩序', ['flow', 'fruit'], [295,470,292,567,-18,548,176,617]],
      ['色彩', ['fruit', 'photography'], [326,585,427,628,475,761,674,608]],
      ['色彩', ['photography', 'applications'], [860,615,961,657,928,768,1090,706]],
      ['秩序', ['fruit', 'applications'], [380,712,685,880,890,850,1030,719]],
    ];
    paths.forEach(([topic, ids, p]) => {
      const active = theme ? topic === theme : hovered ? ids.includes(hovered) : true;
      ctx.strokeStyle = active ? '#123df5' : '#d2d5ee'; ctx.lineWidth = (theme || hovered) && active ? 2 : .9;
      ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.bezierCurveTo(...p.slice(2)); ctx.stroke();
    });
  }, [theme, hovered, active]);
  return <canvas ref={ref} className="connections" aria-hidden="true" />;
}

function Modal({ title, children, onClose, large = false }) {
  const ref = useRef(null);
  const opener = useRef(document.activeElement);
  useEffect(() => {
    const dialog = ref.current;
    dialog.showModal(); document.body.style.overflow = 'hidden';
    return () => { dialog.close(); document.body.style.overflow = ''; opener.current?.focus(); };
  }, []);
  return <dialog ref={ref} className={`modal ${large ? 'work-modal' : ''}`} aria-labelledby="dialog-title" onCancel={onClose} onClick={e => { if (e.target === ref.current) onClose(); }}>
    <div className="modal-inner"><button className="close-button icon-button" onClick={onClose} aria-label="关闭"><XIcon size={25} weight="light" /></button><h2 id="dialog-title" className={large ? 'sr-only' : ''}>{title}</h2>{children}</div>
  </dialog>;
}

function WorkDetail({ work, onClose, onChoose }) {
  const [story, setStory] = useState('作品');
  const [imageIndex,setImageIndex] = useState(0);
  useEffect(() => {setStory('作品');setImageIndex(0);}, [work.id]);
  const selectedImage=work.gallery[Math.min(imageIndex,work.gallery.length-1)];
  const related = works.filter(w => w.id !== work.id && w.themes.some(t => work.themes.includes(t))).sort((a,b)=>Number(b.id==='fruit'&&work.id==='applications'||b.id==='applications'&&work.id==='fruit')-Number(a.id==='fruit'&&work.id==='applications'||a.id==='applications'&&work.id==='fruit')).slice(0, 2);
  return <Modal title={work.title} onClose={onClose} large>
    <div className="gallery-panel">
      <div className="detail-image"><a href={selectedImage.src} target="_blank" rel="noreferrer" aria-label={`查看大图：${selectedImage.label}`}><img src={selectedImage.src} alt={`${work.title} · ${selectedImage.label}`} decoding="async" /></a></div>
      <div className="gallery-toolbar"><button aria-label="上一张图片" disabled={imageIndex===0} onClick={()=>setImageIndex(i=>i-1)}><ArrowRightIcon size={19} style={{transform:'rotate(180deg)'}} /></button><p aria-live="polite">{imageIndex+1} / {work.gallery.length} <span>{selectedImage.label}</span></p><button aria-label="下一张图片" disabled={imageIndex===work.gallery.length-1} onClick={()=>setImageIndex(i=>i+1)}><ArrowRightIcon size={19} /></button></div>
      <div className="gallery-thumbnails" aria-label="作品图片">{work.gallery.map((img,i)=><button key={img.src} className={i===imageIndex?'selected':''} aria-pressed={i===imageIndex} aria-label={`查看图片：${img.label}`} onClick={()=>setImageIndex(i)}><img src={img.src} alt="" loading="lazy" decoding="async" /></button>)}</div>
      <a className="full-image-link" href={selectedImage.src} target="_blank" rel="noreferrer">查看大图 <ArrowUpRightIcon size={16} /></a>
    </div>
    <div className="detail-content"><span className="eyebrow">档案 {work.number} / {work.category}</span><h3>{work.title}</h3><p className="detail-subtitle">{work.subtitle}</p><p className="detail-intro">{work.intro}</p>
      <div className="detail-tabs" aria-label="作品内容">{['作品', '创作思路'].map(s => <button key={s} className={story === s ? 'active' : ''} aria-pressed={story === s} onClick={() => setStory(s)}>{s}</button>)}</div>
      <div className="story-text" aria-live="polite"><p>{story === '作品' ? work.description : work.process}</p></div>
      <div className="detail-tags">{work.themes.map(t => <span key={t}>{t}</span>)}</div><p className="artist-credit">{profile.name} / {work.gallery.length} 张作品图</p>
      <div className="related"><span className="eyebrow">继续沿着线索</span>{related.map(w => <button key={w.id} onClick={() => onChoose(w)}><span>{w.number} / {w.title}</span><ArrowRightIcon size={19} /></button>)}</div>
    </div>
  </Modal>;
}

export function App() {
  const [viewport, setViewport] = useState({ w: window.innerWidth, h: window.innerHeight });
  const layout = layoutFor(viewport.w), flow = layout !== 'desktop';
  const [menuOpen, setMenuOpen] = useState(false);
  const navToggle = useRef(null);
  const [mode, setMode] = useState('map'), [theme, setTheme] = useState(null), [hovered, setHovered] = useState(null);
  const [zoom, setZoom] = useState(1), [pan, setPan] = useState({ x: 0, y: 0 }), [dragging, setDragging] = useState(false);
  const [detail, setDetail] = useState(null), [panel, setPanel] = useState(null), [copied, setCopied] = useState(false);
  const drag = useRef(null), fit = Math.min(viewport.w / W, viewport.h / H);
  useEffect(() => {
    const resize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', resize);
    return () => { window.removeEventListener('resize', resize); window.removeEventListener('orientationchange', resize); };
  }, []);
  // Only the stacked layout has a collapsible menu; close it when the canvas takes over.
  useEffect(() => { if (!flow) setMenuOpen(false); }, [flow]);
  const closeMenu = useCallback(() => { setMenuOpen(false); if (flow) navToggle.current?.focus(); }, [flow]);
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = event => { if (event.key === 'Escape') closeMenu(); };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = previous; };
  }, [menuOpen, closeMenu]);
  const reset = () => { setPan({ x: 0, y: 0 }); setZoom(1); };
  const showWorks = () => { setPanel(null); setDetail(null); setTheme(null); reset(); };
  const selectTheme = t => { setTheme(theme === t ? null : t); setHovered(null); };
  const relevant = w => !theme || w.themes.includes(theme);
  // Hand focus back to the toggle so a dialog opened from the menu can restore it.
  const afterNav = () => { if (flow) { setMenuOpen(false); navToggle.current?.focus(); } };
  const startPan = e => {
    if (flow || e.button !== 0 || e.target.closest('button, a, article')) return;
    e.currentTarget.setPointerCapture(e.pointerId); drag.current = { x: e.clientX, y: e.clientY, origin: pan }; setDragging(true);
  };
  const movePan = e => { if (drag.current) setPan({ x: clamp(drag.current.origin.x + (e.clientX - drag.current.x) / fit, -580,580), y: clamp(drag.current.origin.y + (e.clientY - drag.current.y) / fit,-390,390) }); };
  const endPan = () => { drag.current = null; setDragging(false); };
  const mapKeys = e => {
    if (e.target !== e.currentTarget || flow) return;
    const delta = { ArrowLeft:[40,0], ArrowRight:[-40,0], ArrowUp:[0,40], ArrowDown:[0,-40] }[e.key];
    if (delta) { e.preventDefault(); setPan(p => ({ x:clamp(p.x+delta[0],-580,580), y:clamp(p.y+delta[1],-390,390) })); }
    if (e.key === 'Home') reset();
    if (e.key === '+' || e.key === '=') setZoom(z => clamp(z+.15,.7,1.6));
    if (e.key === '-') setZoom(z => clamp(z-.15,.7,1.6));
  };
  return <main className={`page layout-${layout} ${mode === 'index' ? 'index-mode' : ''}`}>
    <a className="skip-link" href="#works">跳到作品</a>
    <div className="composition" style={flow ? {} : { transform:`translate(-50%, -50%) scale(${fit})` }}>
      <header className="header"><button className="brand" onClick={showWorks}>{profile.name} <span>/ 关联档案</span></button><h1>FIELD NOTES</h1><p className="tagline">不同媒介，同一种好奇。</p>
        <span className="manifesto">LIU DANYU<br />CERAMICS<br />GRAPHICS<br />PAINTING<br />PHOTOGRAPHY<br /><br />—</span>
      </header>
      <button ref={navToggle} className={`nav-toggle ${menuOpen ? 'open' : ''}`} type="button" aria-expanded={menuOpen} aria-controls="site-nav" aria-label={menuOpen ? '关闭菜单' : '打开菜单'} onClick={() => setMenuOpen(open => !open)}>{menuOpen ? <XIcon size={24} weight="light" /> : <ListIcon size={24} weight="light" />}</button>
      <div className={`nav-layer ${menuOpen ? 'open' : ''}`}>
        <div className="nav-backdrop" aria-hidden="true" onClick={() => setMenuOpen(false)} />
        <nav id="site-nav" className="site-nav" aria-label="主导航"><button className={!panel ? 'active' : ''} onClick={() => { showWorks(); afterNav(); }}>作品</button><button onClick={() => { setPanel('about'); afterNav(); }}>关于</button><button onClick={() => { setPanel('contact'); afterNav(); }}>联系</button></nav>
      </div>
      <div className="mobile-themes" aria-label="按主题筛选">{['全部', ...themes.map(t => t.name)].map(t => <button className={(theme || '全部') === t ? 'active' : ''} key={t} aria-pressed={(theme || '全部') === t} onClick={() => setTheme(t === '全部' ? null : t)}>{t}</button>)}</div>
      {mode === 'map' ? <section id="works" className={`map-viewport ${dragging ? 'dragging' : ''}`} tabIndex={flow ? -1 : 0} aria-label="作品关联地图。方向键移动，加减键缩放，Home 键复位。" onPointerDown={startPan} onPointerMove={movePan} onPointerUp={endPan} onPointerCancel={endPan} onLostPointerCapture={endPan} onKeyDown={mapKeys}>
        <div className="map-content" style={flow ? {} : { transform:`translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
          <Connections theme={theme} hovered={hovered} active={!flow} />
          {works.map((work, index) => <article className={`artwork artwork-${work.id} ${!relevant(work) ? 'dimmed' : ''}`} key={work.id} onMouseEnter={() => setHovered(work.id)} onMouseLeave={() => setHovered(null)}>
            <div className="work-label"><span className="work-number">{work.number}</span><h2>{work.title}</h2><span>{work.category}</span></div>
            <button className="art-image" onClick={() => setDetail(work)} onFocus={() => setHovered(work.id)} onBlur={() => setHovered(null)} aria-label={`查看${work.title}`}><img src={work.image} alt={work.alt} draggable="false" loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : undefined} decoding="async" /><span className="image-cta">展开档案 <ArrowUpRightIcon size={20} /></span></button>
            <div className="work-caption"><p>{work.intro}</p>{work.caption && <p>{work.caption}</p>}{work.id === 'flow' && <button className="text-link" onClick={() => setDetail(work)}>查看详情 <ArrowRightIcon size={17} /></button>}</div>
          </article>)}
          {themes.map(t => <div key={t.name} className={`theme-node theme-${t.id}`}><button className={theme === t.name || (!theme && t.id === 'form') ? 'highlight' : ''} aria-pressed={theme === t.name} onClick={() => selectTheme(t.name)}>{t.name}</button><p>{t.description}</p></div>)}
        </div>
      </section> : <section id="works" className="index-content" aria-label="作品目录">
        <div className="index-heading"><h2>作品目录 <span>/{String(works.filter(relevant).length).padStart(2,'0')}</span></h2><div className="index-filters">{['全部', ...themes.map(t => t.name)].map(t => <button key={t} aria-pressed={(theme || '全部') === t} className={(theme || '全部') === t ? 'active' : ''} onClick={() => setTheme(t === '全部' ? null : t)}>{t}</button>)}</div></div>
        {works.filter(relevant).map((work, index) => <button key={work.id} className="index-row" onClick={() => setDetail(work)}><span className="index-number">{work.number}</span><img src={work.image} alt="" loading={index < 2 ? 'eager' : 'lazy'} decoding="async" /><h3>{work.title}</h3><span className="index-category">{work.category}</span><span className="index-tags">{work.themes.join(' / ')}</span><ArrowUpRightIcon size={25} weight="light" /></button>)}
      </section>}
      <div className="lower-note">A<br />CURIOSITY-DRIVEN<br />PRACTICE<br />ACROSS MEDIA.</div>
      <div className="explore-caption">{theme ? <button onClick={() => setTheme(null)}>清除「{theme}」筛选 <XIcon size={16} /></button> : <span>点击作品，展开故事 <ArrowRightIcon size={18} /></span>}</div>
      <footer className="footer"><div className="view-switch" aria-label="浏览方式"><button aria-pressed={mode === 'map'} className={mode === 'map' ? 'active' : ''} onClick={() => { setMode('map'); reset(); }}>漫游</button><span>/</span><button aria-pressed={mode === 'index'} className={mode === 'index' ? 'active' : ''} onClick={() => setMode('index')}>目录</button></div>
        <p className="footer-hint" aria-live="polite">{theme ? `沿着「${theme}」· ${works.filter(relevant).length} 件相关作品` : mode === 'map' ? '沿着线索，发现作品之间的联系。' : '每一件作品，都是一个新的起点。'}<span>—</span></p>
        {mode === 'map' && <div className="zoom-controls"><button className="icon-button" aria-label="缩小" disabled={zoom <= .7} onClick={() => setZoom(z => clamp(z-.15,.7,1.6))}><MinusIcon size={23} weight="light" /></button><button className="zoom-reset" aria-label="复位画布" title="复位画布" onClick={reset}>{zoom !== 1 || pan.x || pan.y ? `${Math.round(zoom*100)}%` : <ArrowsOutSimpleIcon size={18} weight="light" />}</button><button className="icon-button" aria-label="放大" disabled={zoom >= 1.6} onClick={() => setZoom(z => clamp(z+.15,.7,1.6))}><PlusIcon size={23} weight="light" /></button></div>}
      </footer>
    </div>
    {detail && <WorkDetail work={detail} onClose={() => setDetail(null)} onChoose={setDetail} />}
    {panel === 'about' && <Modal title={profile.name} onClose={() => setPanel(null)}><span className="eyebrow">ABOUT / {profile.romanized}</span><p className="about-lead">陶瓷、图像与日常观察。</p><p>{profile.bio}</p><div className="about-footnote"><strong>{profile.school} · {profile.major}</strong><p>{profile.education}</p><p>{profile.experience}</p></div><div className="profile-tools">{profile.tools.map(tool=><span key={tool}>{tool}</span>)}</div><p className="profile-certificates">{profile.certificates}</p><button className="solid-button" onClick={() => setPanel(null)}>回到作品 <ArrowRightIcon size={20} /></button></Modal>}
    {panel === 'contact' && <Modal title="从一个想法开始。" onClose={() => setPanel(null)}><span className="eyebrow">CONTACT / {profile.romanized}</span><p className="about-lead">交流、合作，<br />或者聊聊新的可能。</p><span className="contact-label">EMAIL</span><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRightIcon size={22} /></a><button className="text-link" onClick={async () => { try { await navigator.clipboard.writeText(profile.email); setCopied('邮箱已复制'); } catch { setCopied('未能复制，请长按或选中邮箱复制'); } }}>{copied || '复制邮箱'}</button><p className="contact-foot">{profile.name} · {profile.school}</p></Modal>}
  </main>;
}
