import React, { useState } from 'react';
import { Atom, Braces, Code2, Database, Minus, X } from 'lucide-react';
import { projectSections } from '../../../data';

const SECTION_ICONS = {
  'html-css': Code2,
  'html-css-js': Braces,
  'react-js': Atom,
  'mern-stack': Database,
};

const SECTION_TAGS = {
  'html-css': ['HTML', 'CSS'],
  'html-css-js': ['HTML', 'CSS', 'JS'],
  'react-js': ['REACT', 'JSX'],
  'mern-stack': ['MONGO', 'EXPRESS', 'REACT', 'NODE.JS'],
};

const Projects = ({ activeSectionId, onSelectSection, onBack, isMinimized = false, onMinimize }) => {
  const [selectedSectionId, setSelectedSectionId] = useState(activeSectionId ?? projectSections[0].id);

  const handleOpenSection = (sectionId) => {
    setSelectedSectionId(sectionId);
    onSelectSection?.(sectionId);
  };

  const handleClose = () => {
    onBack?.();
  };

  if (isMinimized) {
    return null;
  }

  return (
    <div className="projects-desktop" aria-live="polite">
      <section className="projects-page">
        <div className="projects-page__glow" />

        <div className="projects-window">
          <header className="projects-window__header">
            <div className="projects-window__actions">
              <button
                className="window-btn window-btn--min"
                type="button"
                aria-label="Minimize Projects"
                onClick={onMinimize}
              >
                <Minus size={15} />
              </button>
              <button
                className="window-btn window-btn--close"
                type="button"
                aria-label="Close Projects"
                onClick={handleClose}
              >
                <X size={15} />
              </button>
            </div>
          </header>

          <div className="projects-window__body" data-lenis-prevent data-lenis-prevent-wheel>
              <div className="projects-overview">
                <div className="projects-overview__head">
                  <div className="projects-overview__number">02</div>
                  <div className="projects-overview__titlebox">
                    <h1>PROJECTS</h1>
                  </div>
                  <p>
                    <span aria-hidden="true">▶▶▶</span>
                    Things I&apos;ve built so far
                    <span aria-hidden="true">▶▶▶</span>
                  </p>
                </div>

                <div className="projects-overview__spine">
                  <span />
                </div>

                <div className="projects-overview__grid">
                  {projectSections.map((section) => {
                    const Icon = SECTION_ICONS[section.id] ?? Code2;
                    const chips = SECTION_TAGS[section.id] ?? [];
                    const previewProject = section.projects[0];

                    return (
                      <article
                        key={section.id}
                        className={`project-tile project-tile--${section.id}${selectedSectionId === section.id ? ' project-tile--active' : ''}`}
                      >
                        <button className="project-tile__badge" type="button" onClick={() => handleOpenSection(section.id)}>
                          <Icon size={19} />
                        </button>

                        <div className="project-tile__corner" aria-hidden>
                          <Icon size={12} />
                        </div>

                        <div className="project-tile__content">
                          <div className="project-tile__copy">
                            <h2>{section.label}</h2>
                            <p>{section.description}</p>
                            <div className="project-tile__mini-rule" />
                            <div className="project-tile__chips">
                              {chips.map((chip) => (
                                <span key={chip}>{chip}</span>
                              ))}
                            </div>
                          </div>

                          <button className="project-tile__preview" type="button" onClick={() => handleOpenSection(section.id)}>
                            <div className="preview-window">
                              <div className="preview-window__top">
                                <span className="dot dot--r" />
                                <span className="dot dot--y" />
                                <span className="dot dot--g" />
                              </div>
                              <img src={previewProject.image} alt={previewProject.title} />
                              <div className="preview-window__cta">
                                <button type="button" className="preview-cta">Click Me</button>
                              </div>
                            </div>
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Projects;
