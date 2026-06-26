import React from 'react';
import { Code2, Cpu, Database, Gauge, Layers, Minus, Sparkles, X } from 'lucide-react';
import profileImage from '../../../assets/rahul.png';
import { ABOUT_CONTENT } from '../utils/aboutContent';
import { useWindowDrag } from '../../../hooks/useWindowDrag';

const ICONS = {
  Layers,
  Database,
  Gauge,
};

const About = ({ onClose, onMinimize, isMinimized = false }) => {
  const {
    windowRef,
    position,
    isDragging,
    startDragging,
    handleMinimize,
    handleClose,
  } = useWindowDrag({ onClose, onMinimize, isMinimized, defaultWidth: 860, defaultHeight: 620, defaultX: 120, defaultY: 90 });

  if (isMinimized) {
    return null;
  }

  const {
    windowTitle,
    intro,
    expertiseTitle,
    expertiseItems,
    mindsetTitle,
    mindsetPoints,
    stackTitle,
    stack,
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
                onClick={handleMinimize}
              >
                <Minus size={15} />
              </button>
              <button
                className="window-btn window-btn--close"
                type="button"
                aria-label="Close About Me"
                onClick={handleClose}
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

    </div>
  );
};

export default About;