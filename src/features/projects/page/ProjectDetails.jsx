import React from 'react';
import { Minus, X } from 'lucide-react';
import { projectSections } from '../../../data';
import ProjectCodeCard from '../components/ProjectCodeCard';

const ProjectDetails = ({ sectionId, onClose, onMinimize }) => {
  const section = projectSections.find((sec) => sec.id === sectionId);

  if (!section) return null;

  return (
    <>
        <section className="projects-page projects-details-page">
          <div className="projects-page__glow" />

          <div className="projects-window details-window">
            <header className="projects-window__header">
              <div className="projects-window__title details-title">
                <span className="details-title-text">{section.label} Projects</span>
              </div>
              <div className="projects-window__actions">
                <button
                  className="window-btn window-btn--min"
                  type="button"
                  aria-label="Minimize Projects Details"
                  onClick={onMinimize}
                >
                  <Minus size={15} />
                </button>
                <button
                  className="window-btn window-btn--close"
                  type="button"
                  aria-label="Close Projects Details"
                  onClick={onClose}
                >
                  <X size={15} />
                </button>
              </div>
            </header>

            <div className="projects-window__body projects-details-body" data-lenis-prevent data-lenis-prevent-wheel>
                <div className="project-details-grid">
                  {section.projects.map((project, index) => {
                     // Determine tools based on section if not available
                     const defaultTools = sectionId === 'html-css' ? ['HTML', 'CSS'] :
                                          sectionId === 'html-css-js' ? ['HTML', 'CSS', 'JavaScript'] :
                                          sectionId === 'react-js' ? ['React.js', 'JavaScript', 'CSS'] :
                                          ['MongoDB', 'Express', 'React', 'Node.js'];
                                          
                    return (
                      <ProjectCodeCard key={index} project={project} defaultTools={defaultTools} />
                    );
                  })}
                </div>
            </div>
          </div>
        </section>
      </>
  );
};

export default ProjectDetails;
