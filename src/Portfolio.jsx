import { useEffect, useRef, useState } from 'react';
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, XIcon, CopyIcon, CheckIcon } from '@phosphor-icons/react';
import { works, profile } from './portfolio';

const image = name => `${import.meta.env.BASE_URL}assets/works/${name}`;
const categories = ['全部', '陶瓷', '平面', '摄影', '绘画'];
const categoryOf = { flow: '陶瓷', fruit: '平面', applications: '平面', photography: '摄影', painting: '绘画' };
const heroCards = [
  { id: 'painting', src: image('painting-2.webp'), caption: '绘画 / PAINTING', x: -370, y: 72, rotate: -17 },
  { id: 'photography', src: image('photo-25.webp'), caption: '摄影 / PHOTOGRAPHY', x: -192, y: 14, rotate: -10 },
  { id: 'fruit', src: image('fruit-2.webp'), caption: '平面 / GRAPHIC DESIGN', x: 0, y: -9, rotate: 3 },
  { id: 'flow', src: image('flow-3.webp'), caption: '陶瓷 / CERAMICS', x: 198, y: 27, rotate: 12 },
  { id: 'applications', src: image('applications-3.webp'), caption: '视觉应用 / APPLICATION', x: 374, y: 78, rotate: 20 },
];

function useReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const items = [...document.querySelectorAll('[data-reveal]')];
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    items.forEach(item => { item.classList.add('will-reveal'); observer.observe(item); });
    return () => { observer.disconnect(); items.forEach(item => item.classList.remove('will-reveal')); };
  }, []);
}

function Hero({ onOpen }) {
  const stack = useRef(null);
  const move = event => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    stack.current?.style.setProperty('--drift', `${((event.clientX - box.left) / box.width - 0.5) * 22}px`);
  };
  return <section className="hero" aria-labelledby="hero-title" onPointerMove={move} onPointerLeave={() => stack.current?.style.setProperty('--drift', '0px')}>
    <div className="hero-copy">
      <p className="eyebrow hero-enter">LIU DANYU · SELECTED WORKS</p>
      <h1 id="hero-title" className="hero-enter">把日常的好奇，<br />做成看得见的作品<span className="title-stop">。</span></h1>
      <p className="hero-description hero-enter">陶瓷、平面、绘画与摄影。<br className="phone-break" /> 在不同媒介里，留下自己的观察。</p>
      <a className="pill hero-enter" href="#works">浏览作品 <ArrowDownIcon size={17} /></a>
    </div>
    <div className="art-stack" ref={stack} aria-label="作品速览">
      {heroCards.map((card, i) => <div key={card.id} className={`stack-slot stack-${i}`} style={{ '--x': `${card.x}px`, '--y': `${card.y}px`, '--rotation': `${card.rotate}deg`, '--delay': `${i * 90 + 240}ms`, '--float-delay': `${i * -1.1}s` }}>
        <button className="stack-card" onClick={() => onOpen(works.find(work => work.id === card.id))} aria-label={`查看${works.find(work => work.id === card.id).title}`}>
          <img src={card.src} alt={card.caption} fetchPriority={i === 2 ? 'high' : undefined} decoding="async" />
          <span>{card.caption}<ArrowUpRightIcon size={14} /></span>
        </button>
      </div>)}
    </div>
    <div className="hero-bottom"><span>不同媒介，同一种好奇。</span><span>向下探索 <ArrowDownIcon size={13} /></span><span>{works.length} 个系列 / {works.reduce((sum, work) => sum + work.gallery.length, 0)} 张作品图</span></div>
  </section>;
}

function WorkCollection({ onOpen }) {
  const [category, setCategory] = useState('全部');
  const [edges, setEdges] = useState({ start: true, end: false });
  const rail = useRef(null);
  const filtered = works.filter(work => category === '全部' || categoryOf[work.id] === category);
  const syncEdges = () => {
    const el = rail.current;
    if (el) setEdges({ start: el.scrollLeft <= 3, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 3 });
  };
  useEffect(() => {
    rail.current?.scrollTo({ left: 0, behavior: 'instant' });
    syncEdges();
    const observer = new ResizeObserver(syncEdges);
    if (rail.current) observer.observe(rail.current);
    return () => observer.disconnect();
  }, [category]);
  const scroll = direction => {
    const el = rail.current;
    const step = el.querySelector('.project-card')?.getBoundingClientRect().width || 380;
    el.scrollBy({ left: direction * (step + 24), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  return <section id="works" className="works-section" aria-labelledby="works-title" data-reveal>
    <div className="section-heading content-width"><div><p className="eyebrow">01 / SELECTED WORKS</p><h2 id="works-title">让作品，自己说话。</h2></div><p className="section-aside">从一个图形，到一件器物，<br />再到生活里的一个瞬间。</p></div>
    <div className="collection-controls content-width">
      <div className="filters" aria-label="作品分类">{categories.map(item => <button key={item} className={category === item ? 'active' : ''} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}{item === '全部' && <span>05</span>}</button>)}</div>
      <div className="rail-arrows"><button className="round-button" aria-label="向左浏览作品" disabled={edges.start} onClick={() => scroll(-1)}><ArrowLeftIcon size={20} /></button><button className="round-button" aria-label="向右浏览作品" disabled={edges.end} onClick={() => scroll(1)}><ArrowRightIcon size={20} /></button></div>
    </div>
    <div className="work-rail" ref={rail} onScroll={syncEdges} aria-label={`${category}作品`} tabIndex={0}>
      {filtered.map(work => <button className={`project-card project-${work.id}`} key={work.id} onClick={() => onOpen(work)} aria-label={`打开${work.title}作品集`}>
        <div className="project-art"><img src={work.image} alt={work.alt} loading="lazy" decoding="async" /><span className="project-open"><ArrowUpRightIcon size={22} /></span></div>
        <div className="project-info"><span className="project-number">{work.number}</span><div><h3>{work.title}</h3><p>{work.subtitle}</p></div><span className="project-count">{work.gallery.length} 张</span></div>
        <div className="project-meta"><span>{work.category}</span><ArrowUpRightIcon size={16} /></div>
      </button>)}
    </div>
    <div className="collection-foot content-width"><span aria-live="polite">{String(filtered.length).padStart(2, '0')} 个作品系列</span><span>左右滑动，慢慢看 <ArrowRightIcon size={15} /></span></div>
  </section>;
}

function WorkDialog({ work, onClose }) {
  const dialog = useRef(null), opener = useRef(document.activeElement), thumbnails = useRef(null);
  const [index, setIndex] = useState(0), [tab, setTab] = useState('作品');
  const selected = work.gallery[index];
  useEffect(() => {
    const el = dialog.current, previousOverflow = document.body.style.overflow;
    el.showModal(); document.body.style.overflow = 'hidden';
    return () => { el.close(); document.body.style.overflow = previousOverflow; opener.current?.focus(); };
  }, []);
  useEffect(() => {
    const rail = thumbnails.current, selectedButton = rail?.children[index];
    if (selectedButton) rail.scrollTo({ left: selectedButton.offsetLeft - (rail.clientWidth - selectedButton.clientWidth) / 2, behavior: 'instant' });
  }, [index]);
  const keyDown = event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowRight') { event.preventDefault(); setIndex(i => Math.min(i + 1, work.gallery.length - 1)); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); setIndex(i => Math.max(i - 1, 0)); }
  };
  return <dialog className="work-dialog" ref={dialog} aria-labelledby="work-dialog-title" onCancel={onClose} onKeyDown={keyDown} onClick={event => { if (event.target === dialog.current) onClose(); }}>
    <div className="dialog-shell">
      <button className="dialog-close round-button" onClick={onClose} aria-label="关闭作品详情" autoFocus><XIcon size={23} /></button>
      <div className="gallery-side">
        <div className="gallery-image"><a href={selected.src} target="_blank" rel="noreferrer" aria-label={`查看大图：${selected.label}`}><img key={selected.src} src={selected.src} alt={`${work.title} · ${selected.label}`} decoding="async" /></a></div>
        <div className="gallery-controls"><button className="round-button" aria-label="上一张图片" disabled={index === 0} onClick={() => setIndex(i => i - 1)}><ArrowLeftIcon size={20} /></button><p aria-live="polite"><span>{String(index + 1).padStart(2, '0')} / {String(work.gallery.length).padStart(2, '0')}</span>{selected.label}</p><button className="round-button" aria-label="下一张图片" disabled={index === work.gallery.length - 1} onClick={() => setIndex(i => i + 1)}><ArrowRightIcon size={20} /></button></div>
        <div className="gallery-thumbnails" ref={thumbnails} aria-label="作品图片">{work.gallery.map((item, i) => <button key={item.src} className={i === index ? 'selected' : ''} aria-pressed={i === index} aria-label={`查看图片：${item.label}`} onClick={() => setIndex(i)}><img src={item.thumbnail || item.src} alt="" loading="lazy" decoding="async" /></button>)}</div>
        <a className="image-link" href={selected.src} target="_blank" rel="noreferrer">查看大图 <ArrowUpRightIcon size={15} /></a>
      </div>
      <div className="gallery-story"><p className="eyebrow">{work.number} / {work.category}</p><h2 id="work-dialog-title">{work.title}</h2><p className="story-subtitle">{work.subtitle}</p><p className="story-intro">{work.intro}</p>
        <div className="story-tabs" aria-label="作品内容">{['作品', '创作思路'].map(item => <button key={item} className={tab === item ? 'active' : ''} aria-pressed={tab === item} onClick={() => setTab(item)}>{item}</button>)}</div>
        <p className="story-description">{tab === '作品' ? work.description : work.process}</p><div className="story-tags">{work.themes.map(theme => <span key={theme}>{theme}</span>)}</div><div className="story-credit"><span>{profile.name}</span><span>{work.gallery.length} 张作品图</span></div>
      </div>
    </div>
  </dialog>;
}

export function App() {
  const [detail, setDetail] = useState(null), [copyStatus, setCopyStatus] = useState('');
  const copyTimer = useRef(null);
  useReveal();
  useEffect(() => () => window.clearTimeout(copyTimer.current), []);
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopyStatus('邮箱已复制'); }
    catch { setCopyStatus('请选中邮箱地址复制'); }
    window.clearTimeout(copyTimer.current); copyTimer.current = window.setTimeout(() => setCopyStatus(''), 3500);
  };
  return <>
    <a className="skip-link" href="#works">跳到作品</a>
    <header className="site-header"><a className="wordmark" href="#top" aria-label="刘丹钰，回到首页"><span>刘丹钰</span><span>LIU DANYU</span></a><nav aria-label="主导航"><a href="#works">作品</a><a href="#about">关于</a><a className="nav-contact" href="#contact">联系 <ArrowUpRightIcon size={15} /></a></nav></header>
    <main id="top"><Hero onOpen={setDetail} /><WorkCollection onOpen={setDetail} />
      <section id="about" className="about-section content-width" aria-labelledby="about-title" data-reveal>
        <div className="about-heading"><p className="eyebrow">02 / A LITTLE ABOUT ME</p><h2 id="about-title">在不同媒介之间，<br />寻找自己的表达。</h2><span className="about-signature">{profile.name}<span>LIU DANYU</span></span></div>
        <div className="about-body"><p className="about-bio">{profile.bio}</p><div className="about-education"><span>{profile.school} · {profile.major}</span><span>{profile.education}</span></div><p className="about-experience">{profile.experience}</p><div className="tool-list" aria-label="创作工具">{profile.tools.map(tool => <span key={tool}>{tool}</span>)}</div><p className="certificates">{profile.certificates}</p></div>
      </section>
      <section id="contact" className="contact-section content-width" aria-labelledby="contact-title" data-reveal><p className="eyebrow">03 / LET’S TALK</p><div className="contact-top"><h2 id="contact-title">聊聊下一个想法。</h2><a className="contact-arrow" href={`mailto:${profile.email}`} aria-label="发送邮件给刘丹钰"><ArrowUpRightIcon size={48} weight="light" /></a></div><p className="contact-description">关于设计、合作，或一个新的可能。</p><div className="contact-email"><a href={`mailto:${profile.email}`}>{profile.email}</a><button className="round-button" onClick={copyEmail} aria-label="复制邮箱">{copyStatus === '邮箱已复制' ? <CheckIcon size={19} /> : <CopyIcon size={19} />}</button><span role="status">{copyStatus}</span></div></section>
    </main>
    <footer className="site-footer content-width"><span>© {new Date().getFullYear()} {profile.romanized}</span><span>保持好奇，继续创作。</span><a href="#top">回到顶部 <ArrowUpRightIcon size={14} /></a></footer>
    {detail && <WorkDialog key={detail.id} work={detail} onClose={() => setDetail(null)} />}
  </>;
}
