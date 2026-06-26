import React from 'react';
import { Minus, X } from 'lucide-react';
import { SKILL_CARDS } from '../utils/skillsData';
import { useWindowDrag } from '../../../hooks/useWindowDrag';
import '../../../styles/Skills.scss';

const Skills = ({ onClose, onMinimize, isMinimized = false }) => {
  const {
    windowRef,
    position,
    isDragging,
    transitionState,
    startDragging,
    handleMinimize,
    handleClose,
  } = useWindowDrag({ onClose, onMinimize, isMinimized, defaultWidth: 1100, defaultHeight: 700 });

  if (isMinimized) {
    return null;
  }

  return (
    <div className="skills-desktop" aria-live="polite">
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
                  '--card-rotate': `${card.rotation}deg`,
                  '--card-shift': card.id === 'basics' ? '14px' : card.id === 'mern' ? '2px' : card.id === 'ecosystem' ? '0px' : '16px',
                  '--card-scale': card.id === 'design' ? '0.94' : '1',
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
    </div>
  );
};

export default Skills;
