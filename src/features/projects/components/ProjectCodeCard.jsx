import React from 'react';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const ProjectCodeCard = ({ project, defaultTools }) => {
  return (
    <div className="code-card">
      <div className="code-card__header">
        <div className="mac-dots">
          <span className="dot dot--r"></span>
          <span className="dot dot--y"></span>
          <span className="dot dot--g"></span>
        </div>
        <div className="code-card__title">{project.title}</div>
      </div>
      <div className="code-card__content">
        <pre>
          <code>
            <span className="keyword">const</span> <span className="variable">project</span> <span className="operator">=</span> {'{\n'}
            {'  '}<span className="property">name</span>: <span className="string">'{project.title}'</span>,<br/>
            {'  '}<span className="property">tools</span>: [{defaultTools.map((t, i) => <React.Fragment key={t}><span className="string">'{t}'</span>{i < defaultTools.length -1 ? ', ' : ''}</React.Fragment>)}],<br/>
            {'  '}<span className="property">myRole</span>: <span className="string">'Frontend Developer'</span>,<br/>
            {'  '}<span className="property">Description</span>: <span className="string">"{project.description}"</span><br/>
            {'}'};
          </code>
        </pre>
      </div>
      <div className="code-card__actions">
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-action btn-github">
          <FaGithub size={16} />
          GitHub Code
        </a>
        {project.liveUrl && project.liveUrl !== '#' && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-action btn-live">
            <ExternalLink size={16} />
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCodeCard;
