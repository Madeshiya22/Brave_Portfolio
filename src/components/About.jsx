import React from 'react';
import { X, Target, Rocket, Zap } from 'lucide-react';

const DRIVES = [
  {
    Icon: Target,
    title: 'Building with Purpose',
    desc: 'I focus on building projects that solve real problems and create real value.',
  },
  {
    Icon: Rocket,
    title: 'Always Improving',
    desc: "I'm constantly learning, exploring new technologies, and leveling up myself.",
  },
  {
    Icon: Zap,
    title: 'Impact Over Everything',
    desc: "Clean code, great performance, and happy users — that's what I aim for.",
  },
];

const About = ({ onClose }) => (
  <div className="about-overlay" onClick={onClose}>
    <article className="about-panel" onClick={(e) => e.stopPropagation()}>

      <button className="about-close" onClick={onClose} aria-label="Close">
        <X size={18} />
      </button>

      {/* ══ HERO STRIP ══════════════════════════════════════ */}
      <div className="about-hero">

        {/* LEFT */}
        <div className="about-hero__left">
          <div className="about-topbar">
            <span className="about-handle">@rahulmadeshiya</span>
          </div>

          <p className="about-eyebrow">
            <span className="about-dot" /> ABOUT ME
          </p>

          <h1 className="about-heading">
            <span className="about-heading__hi">Hi, I'm</span>
            <span className="about-heading__name">Rahul<br />Madeshiya.</span>
          </h1>

          <p className="about-role">Full Stack Developer</p>

          <p className="about-bio">
            I build fast, scalable and user-focused web applications
            that solve real problems and create real impact.
          </p>

          <div className="about-quote-box">
            <span className="about-quote-box__ring" aria-hidden="true">◎</span>
            <p>
              I don't just write code,{' '}
              <em>I build solutions that make a difference.</em>
            </p>
          </div>
        </div>

        {/* RIGHT — photo */}
        <div className="about-hero__photo">
          <img
            src="../src/assets/rahul.png"
            alt="Rahul Madeshiya"
            draggable={false}
          />
          <div className="about-hero__photo-grad" />
        </div>
      </div>

      {/* ══ BODY ════════════════════════════════════════════ */}
      <div className="about-body">

        {/* LEFT — story */}
        <div className="about-story">
          <h2 className="about-story__heading">
            I'm a <span>problem solver</span> at heart<br />
            and a builder by habit.
          </h2>

          <ul className="about-bullets">
            <li>
              My journey as a developer started with curiosity and turned into a
              passion for building digital experiences that are clean, functional,
              and meaningful.
            </li>
            <li>
              I enjoy turning ideas into real-world products — whether it's
              crafting a smooth frontend experience or building a powerful backend
              that just works.
            </li>
            <li>
              I care about writing clean code, building scalable systems, and
              delivering value with every project I work on.
            </li>
          </ul>
        </div>

        {/* RIGHT — what drives me */}
        <div className="about-drives">
          <h3 className="about-drives__title">What drives me</h3>
          {DRIVES.map(({ Icon, title, desc }) => (
            <div className="drive-item" key={title}>
              <span className="drive-item__icon">
                <Icon size={18} />
              </span>
              <div>
                <strong>{title}</strong>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ FOOTER QUOTE ════════════════════════════════════ */}
      <div className="about-footer">
        <span className="about-footer__mark">"</span>
        <p>
          Code is how I build,{' '}
          <span>but impact is why I do it.</span>
        </p>
        <em className="about-footer__sig">Rahul</em>
      </div>

    </article>
  </div>
);

export default About;
