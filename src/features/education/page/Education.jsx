import { useEffect, useRef, useState } from 'react';
import { Minus, X, GraduationCap, Briefcase, Layers } from 'lucide-react';
import gsap from 'gsap';
import laptopImg from '../../../assets/laptop.png';
import '../../../styles/Education.scss';

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/* ── Education data ───────────────────────────────────────────── */
const CARDS = [
  {
    id: 'college',
    type: 'education',
    institution: 'Chandigarh Engineering College, Landran Mohali',
    degree: 'B.Tech',
    field: 'Information Technology',
    period: '( 2022-2026 )',
    meta: 'CGPA - 8.2',
    MetaIcon: GraduationCap,
    badge: null,
  },
  {
    id: 'thinknext',
    type: 'experience',
    duration: 'Experience - 2 Month',
    institution: 'ThinkNext Technology',
    badge: 'Learning - MERN',
    project: 'Build Project - Mentolink',
    ProjectIcon: Briefcase,
    description:
      'Mentolink is a platform which help to solve a problem or full-fill the gap between student and their carrier path',
  },
  {
    id: 'sheryians',
    type: 'experience',
    duration: 'Experience - 6 Month',
    institution: 'Sheryians coding school',
    badge: 'Learning - Full stack',
    items: [
      { Icon: Briefcase, text: 'Technology - MERN , DOCKER, AWS, Kubernetes' },
      { Icon: Briefcase, text: 'Build Project - Multiple Project' },
      { Icon: Layers,    text: 'INSTAGRAM , Pinterest, GEN_AI' },
    ],
  },
];

/* ── Neon energy wave — beneath laptop only ─────────────── */
const NeonWave = () => (
  <svg
    className="edu-wave"
    viewBox="0 0 520 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    preserveAspectRatio="none"
  >
    <defs>
      <filter id="waveBlur" x="-20%" y="-120%" width="140%" height="340%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="#ff5500" stopOpacity="0" />
        <stop offset="20%"  stopColor="#ff5500" stopOpacity="0.6" />
        <stop offset="50%"  stopColor="#ff8c00" stopOpacity="1" />
        <stop offset="80%"  stopColor="#ff5500" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#ff5500" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="waveBase" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="#ff5500" stopOpacity="0" />
        <stop offset="50%"  stopColor="#ff5500" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#ff5500" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Faint static base line */}
    <path
      d="M 20 40 Q 130 22 260 38 Q 390 54 500 32"
      stroke="url(#waveBase)"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />

    {/* Primary animated glow line */}
    <path
      className="edu-wave__line"
      d="M 20 40 Q 130 22 260 38 Q 390 54 500 32"
      stroke="url(#waveGrad)"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
      filter="url(#waveBlur)"
    />

    {/* Secondary wave for depth */}
    <path
      className="edu-wave__line edu-wave__line--b"
      d="M 20 48 Q 140 32 260 46 Q 380 60 500 40"
      stroke="url(#waveGrad)"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
      filter="url(#waveBlur)"
      opacity="0.45"
    />
  </svg>
);

/* ── Laptop Scene (real image + GSAP float + NeonWave grounded below) */
const LaptopScene = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!sceneRef.current) return;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(sceneRef.current, {
      y: -16,
      rotateZ: 0.8,
      duration: 3.4,
      ease: 'sine.inOut',
    });
    return () => tl.kill();
  }, []);

  return (
    // Outer wrapper is NOT floated — wave stays grounded
    <div className="edu-scene-wrap">
      {/* Laptop + glow float together */}
      <div className="edu-scene" ref={sceneRef}>
        <img
          src={laptopImg}
          alt="Laptop"
          className="edu-laptop-img"
          draggable={false}
        />
        <div className="edu-scene__glow" aria-hidden="true" />
      </div>

      {/* Wave stays beneath — outside floated ref */}
      <NeonWave />
    </div>
  );
};

/* ── Education card ───────────────────────────────────────────── */
const EducationCard = ({ card, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 32, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.55,
        delay: 0.15 + index * 0.12,
        ease: 'power3.out',
      }
    );
  }, [index]);

  if (card.type === 'education') {
    const MetaIcon = card.MetaIcon;
    return (
      <article ref={cardRef} className="edu-card edu-card--college">
        <p className="edu-card__inst">{card.institution}</p>
        <p className="edu-card__degree">
          <span className="edu-card__degree-name">{card.degree}</span>
          {' - '}{card.field}
          <span className="edu-card__period">{card.period}</span>
        </p>
        <div className="edu-card__meta">
          <MetaIcon size={15} className="edu-card__meta-icon" />
          <span>{card.meta}</span>
        </div>
      </article>
    );
  }

  /* experience cards */
  const ProjectIcon = card.ProjectIcon;
  return (
    <article ref={cardRef} className="edu-card edu-card--exp">
      <div className="edu-card__exp-top">
        <span className="edu-card__duration">{card.duration}</span>
        {card.badge && (
          <span className="edu-card__badge">
            <span className="edu-card__badge-dot" />
            {card.badge}
          </span>
        )}
      </div>
      <p className="edu-card__org">{card.institution}</p>

      {card.project && (
        <div className="edu-card__meta">
          {ProjectIcon && <ProjectIcon size={14} className="edu-card__meta-icon" />}
          <span>{card.project}</span>
        </div>
      )}
      {card.description && (
        <p className="edu-card__desc">{card.description}</p>
      )}

      {card.items && (
        <div className="edu-card__items">
          {card.items.map(({ Icon, text }) => (
            <div className="edu-card__meta" key={text}>
              <Icon size={14} className="edu-card__meta-icon" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      )}
    </article>
  );
};

/* ── Main Education window ────────────────────────────────────── */
const Education = ({ onClose, onMinimize, isMinimized = false }) => {
  const windowRef   = useRef(null);
  const dragOffRef  = useRef({ x: 0, y: 0 });
  const hasMounted  = useRef(false);
  const [isDragging, setIsDragging]       = useState(false);
  const [transitionState, setTransition]  = useState('enter');
  const [position, setPosition]           = useState({ x: 0, y: 0 });

  /* drag */
  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e) => {
      const w = windowRef.current?.offsetWidth  ?? 1100;
      const h = windowRef.current?.offsetHeight ?? 680;
      setPosition({
        x: clamp(e.clientX - dragOffRef.current.x, 0, Math.max(0, window.innerWidth  - w)),
        y: clamp(e.clientY - dragOffRef.current.y, 0, Math.max(0, window.innerHeight - h)),
      });
    };
    const stop = () => setIsDragging(false);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup',   stop);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup',   stop);
    };
  }, [isDragging]);

  /* resize clamp */
  useEffect(() => {
    const onResize = () => {
      const w = windowRef.current?.offsetWidth  ?? 1100;
      const h = windowRef.current?.offsetHeight ?? 680;
      setPosition(p => ({
        x: clamp(p.x, 0, Math.max(0, window.innerWidth  - w)),
        y: clamp(p.y, 0, Math.max(0, window.innerHeight - h)),
      }));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* enter → idle */
  useEffect(() => {
    const t = setTimeout(() => {
      setTransition('idle');
      hasMounted.current = true;
    }, 500);
    return () => clearTimeout(t);
  }, []);

  /* restore after minimize */
  useEffect(() => {
    if (!hasMounted.current || isMinimized) return;
    setTransition('restore');
    const t = setTimeout(() => setTransition('idle'), 500);
    return () => clearTimeout(t);
  }, [isMinimized]);

  const startDrag = (e) => {
    if (e.button !== 0 || e.target.closest('button')) return;
    const b = windowRef.current?.getBoundingClientRect();
    if (!b) return;
    dragOffRef.current = { x: e.clientX - b.left, y: e.clientY - b.top };
    setIsDragging(true);
  };

  const handleMinimize = () => {
    setTransition('minimize');
    setTimeout(() => onMinimize?.(), 400);
  };

  const handleClose = () => {
    setTransition('close');
    setTimeout(() => onClose?.(), 400);
  };

  if (isMinimized) return null;

  return (
    <div className="edu-desktop" aria-live="polite">
      <article
        ref={windowRef}
        className={`edu-window edu-window--${transitionState}${isDragging ? ' is-dragging' : ''}`}
        style={{ transform: `translate3d(${position.x}px,${position.y}px,0)` }}
      >
        {/* ── Title bar ── */}
        <header className="edu-window__header" onPointerDown={startDrag}>
          <h2 className="edu-window__title">Education</h2>
          <div className="edu-window__actions">
            <button className="window-btn window-btn--min"   type="button" aria-label="Minimize Education" onClick={handleMinimize}><Minus size={15}/></button>
            <button className="window-btn window-btn--close" type="button" aria-label="Close Education"    onClick={handleClose}><X size={15}/></button>
          </div>
        </header>

        {/* ── Body ── */}
        <div className="edu-window__body">

          {/* Hero title */}
          <div className="edu-hero-title">
            <div className="edu-hero-title__box">
              <h1>Education</h1>
            </div>
          </div>

          {/* Main layout */}
          <div className="edu-layout">
            {/* Left — laptop scene */}
            <div className="edu-layout__left">
              <LaptopScene />
            </div>

            {/* Right — cards */}
            <div className="edu-layout__right">
              {CARDS.map((card, i) => (
                <EducationCard key={card.id} card={card} index={i} />
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Education;
