import React, { useMemo, useState } from 'react';
import { Atom, ArrowLeft, ArrowRight, Braces, Code2, Database, ExternalLink, FolderGit2 } from 'lucide-react';
import { projectSections } from '../../data';

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

const Projects = ({ activeSectionId, onSelectSection, onBack }) => {
  const [selectedSectionId, setSelectedSectionId] = useState(activeSectionId ?? null);

  const activeSection = useMemo(
    () => projectSections.find((section) => section.id === (selectedSectionId ?? activeSectionId)) ?? projectSections[0],
    [activeSectionId, selectedSectionId],
  );

  const handleOpenSection = (sectionId) => {
    setSelectedSectionId(sectionId);
    onSelectSection?.(sectionId);
  };

  const handleBackToOverview = () => {
    setSelectedSectionId(null);
  };

  const isOverview = !selectedSectionId;

  return (
    <section className="projects-page">
      <div className="projects-page__glow" />

      {isOverview ? (
        <div className="projects-overview">
          <div className="projects-overview__head">
            <div className="projects-overview__number">02</div>
            <div className="projects-overview__titlebox">
              <h1>PROJECTS</h1>
            </div>
            <p>Things I&apos;ve built so far</p>
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
                <article key={section.id} className={`project-tile project-tile--${section.id}`}>
                  <button className="project-tile__badge" type="button" onClick={() => handleOpenSection(section.id)}>
                    <Icon size={19} />
                  </button>

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
                      <img src={previewProject.image} alt={previewProject.title} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <button className="projects-overview__cta" type="button" onClick={() => handleOpenSection(projectSections[0].id)}>
            <span>View All Projects</span>
            <ArrowRight size={22} />
          </button>

          <button className="projects-overview__back-home" type="button" onClick={onBack}>
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </button>
        </div>
      ) : (
        <article className="project-section project-section--detail">
          <div className="project-section__hero">
            <button className="projects-page__back" type="button" onClick={handleBackToOverview}>
              <ArrowLeft size={18} />
              <span>Back to Projects</span>
            </button>

            <div className="project-section__intro">
              <div>
                <span className="project-section__eyebrow">{activeSection.eyebrow}</span>
                <h2>{activeSection.title}</h2>
                <p>{activeSection.description}</p>
              </div>

              <div className="project-section__meta">
                <span className="project-section__count">{activeSection.projects.length} projects</span>
                <span className="project-section__summary">{activeSection.summary}</span>
              </div>
            </div>

            <div className="projects-page__nav projects-page__nav--detail" role="tablist" aria-label="Project categories">
              {projectSections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  className={`projects-page__nav-item${section.id === activeSection.id ? ' is-active' : ''}`}
                  onClick={() => handleOpenSection(section.id)}
                >
                  <span>{section.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="project-grid project-grid--detail">
            {activeSection.projects.map((project) => (
              <article key={project.title} className="project-card">
                <div className="project-card__image-wrap">
                  <img src={project.image} alt={project.title} className="project-card__image" />
                </div>

                <div className="project-card__body">
                  <div>
                    <span className="project-card__eyebrow">Project</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>

                  <div className="project-card__actions">
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="project-card__btn">
                      <FolderGit2 size={16} />
                      <span>GitHub</span>
                    </a>
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-card__btn project-card__btn--primary">
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </article>
      )}
    </section>
  );
};

export default Projects;