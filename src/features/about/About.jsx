import React, { useEffect, useRef, useState } from 'react';
import { Code2, Cpu, Database, Gauge, Layers, Minus, Sparkles, User, X } from 'lucide-react';
import profileImage from '../../assets/rahul.png';
import { ABOUT_CONTENT } from './aboutContent';

const ICONS = {
  Layers,
  Database,
  Gauge,
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const About = ({ onClose }) => {
  const windowRef = useRef(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(() => {
    if (typeof window === 'undefined') return { x: 120, y: 90 };

    return {
      x: Math.max(20, Math.round(window.innerWidth * 0.14)),
      y: Math.max(20, Math.round(window.innerHeight * 0.08)),
    };
  });

  useEffect(() => {
    if (!isDragging) return undefined;

    const handlePointerMove = (event) => {
      const panelWidth = windowRef.current?.offsetWidth ?? 860;
      const panelHeight = windowRef.current?.offsetHeight ?? 620;
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
      const panelWidth = windowRef.current?.offsetWidth ?? 860;
      const panelHeight = windowRef.current?.offsetHeight ?? 620;

      setPosition((prev) => ({
        x: clamp(prev.x, 8, window.innerWidth - panelWidth - 8),
        y: clamp(prev.y, 8, window.innerHeight - panelHeight - 8),
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const {
    windowTitle,
    intro,
    expertiseTitle,
    expertiseItems,
    mindsetTitle,
    mindsetPoints,
    stackTitle,
    stack,
    preview,
  } = ABOUT_CONTENT;

  return (
    <div className="about-desktop" aria-live="polite">
      {!isMinimized && (
        <article
          ref={windowRef}
          className={`about-window${isDragging ? ' is-dragging' : ''}`}
          style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
        >
          <header className="about-window__header" onPointerDown={startDragging}>
            <h2 className="about-window__title">{windowTitle}</h2>
            <div className="about-window__actions">
              <button
                className="window-btn window-btn--min"
                type="button"
                aria-label="Minimize About Me"
                onClick={() => setIsMinimized(true)}
              >
                <Minus size={15} />
              </button>
              <button
                className="window-btn window-btn--close"
                type="button"
                aria-label="Close About Me"
                onClick={onClose}
              >
                <X size={15} />
              </button>
            </div>
          </header>

          <div className="about-window__body">
            <section className="about-intro">
              <div className="about-intro__copy">
                <p className="about-intro__eyebrow">{intro.role}</p>
                <h3>{intro.heading}</h3>
                {intro.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="about-intro__image-wrap">
                <img src={profileImage} alt="Rahul Madeshiya" draggable={false} />
                <div className="about-intro__badge">
                  <Sparkles size={14} />
                  <span>{intro.badge}</span>
                </div>
              </div>
            </section>

            <section className="about-grid">
              <div className="about-card">
                <h4>
                  <Code2 size={17} /> {expertiseTitle}
                </h4>
                <div className="about-card__items">
                  {expertiseItems.map(({ icon, title, desc }) => {
                    const Icon = ICONS[icon];

                    return (
                      <article key={title} className="about-expertise-item">
                        <span className="about-expertise-item__icon">
                          <Icon size={16} />
                        </span>
                        <div>
                          <strong>{title}</strong>
                          <p>{desc}</p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>

              <div className="about-card">
                <h4>
                  <Cpu size={17} /> {mindsetTitle}
                </h4>
                <ul className="about-mindset-list">
                  {mindsetPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                <p className="about-stack-title">{stackTitle}</p>
                <div className="about-stack-chips">
                  {stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </article>
      )}

      {isMinimized && (
        <div className="about-taskbar" role="toolbar" aria-label="Desktop windows">
          <div className="about-taskbar__slot">
            <button
              type="button"
              className="about-taskbar__item is-active"
              onClick={() => setIsMinimized(false)}
              aria-label="Restore About Me"
              title={windowTitle}
            >
              <User size={13} />
              <span>{windowTitle}</span>
            </button>

            <div className="about-taskbar__preview" role="dialog" aria-label="About Me preview">
              <div className="about-taskbar__preview-head">
                <span>
                  <User size={14} />
                  {windowTitle}
                </span>
                <button
                  type="button"
                  className="about-taskbar__preview-close"
                  onClick={onClose}
                  aria-label="Close About Me"
                >
                  <X size={14} />
                </button>
              </div>

              <button
                type="button"
                className="about-taskbar__preview-body"
                onClick={() => setIsMinimized(false)}
                aria-label="Open About Me"
              >
                <img src={profileImage} alt="About preview" draggable={false} />
                <div className="about-taskbar__preview-copy">
                  <strong>{preview.title}</strong>
                  <p>{preview.subtitle}</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
