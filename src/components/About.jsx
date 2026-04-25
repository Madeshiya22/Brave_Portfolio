import React from 'react';
import { Download, X, Code2, Server, Palette, Database } from 'lucide-react';

const SKILLS = [
  { label: 'React',     Icon: Code2    },
  { label: 'Node.js',   Icon: Server   },
  { label: 'SCSS',      Icon: Palette  },
  { label: 'MongoDB',   Icon: Database },
  { label: 'Vite',      Icon: Code2    },
  { label: 'Figma',     Icon: Palette  },
];

const STATS = [
  { value: '3+',  label: 'Years Exp'  },
  { value: '20+', label: 'Projects'   },
  { value: '5+',  label: 'Clients'    },
];

const About = ({ onClose }) => (
  <div className="about-overlay" onClick={onClose}>
    <section className="about-panel" onClick={(e) => e.stopPropagation()}>

      {/* Close button */}
      <button className="about-close" onClick={onClose} aria-label="Close">
        <X size={20} />
      </button>

      {/* ── LEFT — text content ── */}
      <div className="about-left">
        <div className="about-label">
          <span className="about-label__line" />
          <span>ABOUT ME</span>
        </div>

        <h2 className="about-name">Rahul<br />Madeshiya</h2>

        <p className="about-role">Full-Stack Developer &amp; UI Designer</p>

        <p className="about-bio">
          I craft high-performance web experiences where clean engineering meets
          bold design. Specialising in React ecosystems and Node.js backends, I
          turn complex problems into elegant, user-first solutions that are fast,
          scalable, and beautiful.
        </p>

        <div className="about-skills">
          {SKILLS.map(({ label, Icon }) => (
            <span className="skill-tag" key={label}>
              <Icon size={12} />
              {label}
            </span>
          ))}
        </div>

        <button className="about-cv-btn">
          <Download size={16} />
          Download CV
        </button>
      </div>

      {/* ── RIGHT — photo + stats ── */}
      <div className="about-right">
        {/* Dot-grid decoration */}
        <div className="about-dotgrid" aria-hidden="true">
          {Array.from({ length: 80 }).map((_, i) => (
            <span key={i} className="dot" />
          ))}
        </div>

        {/* Photo frame */}
        <div className="about-photo">
          <div className="about-photo__inner">
            <img
              src="https://api.dicebear.com/9.x/pixel-art/svg?seed=Rahul&backgroundColor=1a1a1a"
              alt="Rahul Madeshiya"
              draggable={false}
            />
            <div className="about-photo__grad" />
          </div>

          {/* Corner accents */}
          <span className="corner corner--tl" />
          <span className="corner corner--br" />
        </div>

        {/* Floating stat cards */}
        <div className="about-stats">
          {STATS.map(({ value, label }) => (
            <div className="stat-card" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  </div>
);

export default About;
