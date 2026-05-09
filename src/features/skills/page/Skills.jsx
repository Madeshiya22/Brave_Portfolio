import React, { useEffect, useRef, useState } from 'react';
import { Minus, X } from 'lucide-react';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaNodeJs,
  FaReact,
  FaSass,
  FaDocker,
  FaAws,
  FaFigma,
} from 'react-icons/fa';
import {
  SiExpress,
  SiMongodb,
  SiKubernetes,
  SiGreensock,
  SiFramer,
  SiCanva,
} from 'react-icons/si';
import '../../../styles/Skills.scss';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const SKILL_CARDS = [
  {
    id: 'basics',
    label: 'Basics Skills',
    skills: [
      { name: 'HTML', desc: 'Structure is the soul of creation.', icon: FaHtml5, color: '#FF5722' },
      { name: 'CSS', desc: 'Style turns logic into art.', icon: FaCss3Alt, color: '#2196F3' },
      { name: 'JavaScript', desc: 'Code that breathes life into ideas.', icon: FaJs, color: '#F7DF1E' },
    ],
    rotation: 0,
  },
  {
    id: 'mern',
    label: 'MERN',
    skills: [
      { name: 'Node.js', desc: 'Powering the unseen engine behind every experience.', icon: FaNodeJs, color: '#68A063' },
      { name: 'Express.js', desc: 'Simplicity that accelerates innovation.', icon: SiExpress, color: '#FFFFFF' },
      { name: 'React.js', desc: 'Dynamic minds build dynamic interfaces.', icon: FaReact, color: '#61DAFB' },
      { name: 'MongoDB', desc: 'Data with roots that grow possibilities.', icon: SiMongodb, color: '#13AA52' },
      { name: 'Sass', desc: 'Elegance in every layer of design.', icon: FaSass, color: '#CC6699' },
    ],
    rotation: -6,
  },
  {
    id: 'ecosystem',
    label: 'Developer Ecosystem Tools,\nAnimation',
    skills: [
      { name: 'Docker', desc: 'Containers that carry consistency.', icon: FaDocker, color: '#2496ED' },
      { name: 'AWS', desc: 'Cloud power that fuels innovation.', icon: FaAws, color: '#FF9900' },
      { name: 'Kubernetes', desc: 'Orchestration that scales imagination.', icon: SiKubernetes, color: '#326CE5' },
      { name: 'GSAP', desc: 'Performance meets precision in motion.', icon: SiGreensock, color: '#88CE02' },
      { name: 'Framer', desc: 'React components that breathe with life.', icon: SiFramer, color: '#0055FF' },
    ],
    rotation: 0,
  },
  {
    id: 'design',
    label: 'Design',
    skills: [
      { name: 'Figma', desc: 'Collaboration is the canvas of creativity.', icon: FaFigma, color: '#F24E1E' },
      { name: 'Canva', desc: 'Design made simple, impact made big.', icon: SiCanva, color: '#00D4FF' },
    ],
    rotation: 6,
  },
];

const Skills = ({ onClose, onMinimize, isMinimized = false }) => {
  const windowRef = useRef(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [transitionState, setTransitionState] = useState('enter');
  const [position, setPosition] = useState(() => {
    if (typeof window === 'undefined') return { x: 24, y: 120 };

    return {
      x: 24,
      y: Math.max(20, Math.round(window.innerHeight * 0.1)),
    };
  });

  useEffect(() => {
    if (!isDragging) return undefined;

    const handlePointerMove = (event) => {
      const panelWidth = windowRef.current?.offsetWidth ?? 1100;
      const panelHeight = windowRef.current?.offsetHeight ?? 700;
      const nextX = clamp(event.clientX - dragOffsetRef.current.x, 8, window.innerWidth - panelWidth - 8);
      const nextY = clamp(event.clientY - dragOffsetRef.current.y, 8, window.innerHeight - panelHeight - 8);
      setPosition({ x: nextX, y: nextY });
    };

    const stopDragging = () => setIsDragging(false);

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', stopDragging);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', stopDragging);
    };
  }, [isDragging]);

  useEffect(() => {
    const handleResize = () => {
      const panelWidth = windowRef.current?.offsetWidth ?? 1100;
      const panelHeight = windowRef.current?.offsetHeight ?? 700;

      setPosition((prev) => ({
        x: clamp(prev.x, 8, window.innerWidth - panelWidth - 8),
        y: clamp(prev.y, 8, window.innerHeight - panelHeight - 8),
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMinimized) return undefined;

    setTransitionState('restore');
    const timer = window.setTimeout(() => setTransitionState('idle'), 320);
    return () => window.clearTimeout(timer);
  }, [isMinimized]);

  const startDragging = (event) => {
    if (event.button !== 0) return;
    if (event.target.closest('button')) return;

    const bounds = windowRef.current?.getBoundingClientRect();
    if (!bounds) return;

    dragOffsetRef.current = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };
    setIsDragging(true);
  };

  const handleMinimize = () => {
    setTransitionState('minimize');
    window.setTimeout(() => onMinimize?.(), 220);
  };

  const handleClose = () => {
    setTransitionState('close');
    window.setTimeout(() => onClose?.(), 220);
  };

  if (isMinimized) {
    return null;
  }

  return (
    <div className="skills-desktop" aria-live="polite">
      {!isMinimized && (
        <article
          ref={windowRef}
          className={`skills-window skills-window--${transitionState}${isDragging ? ' is-dragging' : ''}`}
          style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
        >
          <header className="skills-window__header" onPointerDown={startDragging}>
            <h2 className="skills-window__title">Skills</h2>
            <div className="skills-window__actions">
              <button
                className="window-btn window-btn--min"
                type="button"
                aria-label="Minimize Skills"
                onClick={handleMinimize}
              >
                <Minus size={15} />
              </button>
              <button
                className="window-btn window-btn--close"
                type="button"
                aria-label="Close Skills"
                onClick={handleClose}
              >
                <X size={15} />
              </button>
            </div>
          </header>

          <div className="skills-window__body">
            <section className="skills-header">
              <div className="skills-header__glow" />
              <div className="skills-header__top">
                <p className="skills-header__subtitle">Future is deployable</p>
                <div className="skills-header__title-box">
                  <h1 className="skills-header__title">SKILL'S</h1>
                </div>
                <p className="skills-header__tagline">Build bridges, not walls</p>
              </div>
            </section>

            <section className="skills-grid">
              {SKILL_CARDS.map((card) => (
                <div
                  key={card.id}
                  className="skills-card"
                  style={{
                    transform: `rotate(${card.rotation}deg)`,
                  }}
                >
                  <div className="skills-card__holes">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <span key={index} className="skills-card__hole" />
                    ))}
                  </div>

                  <div className="skills-card__head">
                    <span className="skills-card__brand">Skills</span>
                    <span className="skills-card__label">{card.label}</span>
                  </div>

                  <div className="skills-card__content">
                    <div className="skills-card__items">
                      {card.skills.map((skill) => {
                        const Icon = skill.icon;
                        return (
                          <div key={skill.name} className="skill-item">
                            <span className="skill-item__icon" style={{ color: skill.color }} aria-hidden="true">
                              <Icon size={20} />
                            </span>
                            <div className="skill-item__copy">
                              <strong className="skill-item__name">{skill.name}</strong>
                              <p className="skill-item__desc">{skill.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="skills-card__glow-border" />
                </div>
              ))}
            </section>
          </div>
        </article>
      )}
    </div>
  );
};

export default Skills;
