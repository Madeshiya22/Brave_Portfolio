import React, { useState, useRef, useEffect } from 'react';
import { Settings, Sun, Moon } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import Clock from './Clock';
import CursorToggle from '../../../components/Cursor/CursorToggle';

const SOCIAL_LINKS = [
  { href: 'https://www.instagram.com/rahul851r?igsh=dGJnMDBkdHNza3hj', cls: 'icon-btn--instagram', Icon: FaInstagram, label: 'Instagram' },
  { href: 'https://www.linkedin.com/in/rahul-madeshiya-245950299?utm_source=share_via&utm_content=profile&utm_medium=member_android', cls: 'icon-btn--linkedin', Icon: FaLinkedin, label: 'LinkedIn' },
  { href: 'https://github.com/Madeshiya22', cls: 'icon-btn--github', Icon: FaGithub, label: 'GitHub' },
  { href: 'https://wa.me/917307179159', cls: 'icon-btn--whatsapp', Icon: FaWhatsapp, label: 'WhatsApp' },
];

const HeroTopBar = ({ theme, setTheme }) => {
  const [open, setOpen] = useState(false);
  const gearRef = useRef(null);

  // Close when clicking outside the gear block
  useEffect(() => {
    if (!open) return;
    const handleOutside = (e) => {
      if (gearRef.current && !gearRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  return (
    <div className="hero__top anim-fade-down">
      <div className="clock-block">
        <Clock />
      </div>

      <div className="social-cluster">
        <span className="social-label">Social Media</span>
        <div className="icons-row">
          {SOCIAL_LINKS.map(({ href, cls, Icon, label }, i) => (
            <div
              className="icon-item anim-icon"
              key={label}
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              <a href={href} target="_blank" rel="noopener noreferrer" className={`icon-btn ${cls}`}>
                <Icon size={32} />
              </a>
              <span className="icon-name">{label}</span>
            </div>
          ))}
        </div>
        <div className="dots">
          <span />
          <span className="active" />
          <span />
        </div>
      </div>

      <div className="gear-block" ref={gearRef}>
        {/* Settings gear — click to open/close */}
        <div
          className={`gear-wrap${open ? ' gear-wrap--open' : ''}`}
          onClick={() => setOpen((prev) => !prev)}
        >
          <Settings size={26} className="gear-icon" />

          <div className="theme-menu">
            <button
              className={`theme-btn theme-btn--day${theme === 'day' ? ' is-active' : ''}`}
              onClick={(e) => { e.stopPropagation(); setTheme('day'); setOpen(false); }}
            >
              <Sun size={15} />
              <span>Day</span>
            </button>

            <button
              className={`theme-btn theme-btn--night${theme === 'night' ? ' is-active' : ''}`}
              onClick={(e) => { e.stopPropagation(); setTheme('night'); setOpen(false); }}
            >
              <Moon size={15} />
              <span>Night</span>
            </button>
          </div>
        </div>

        {/* Cursor toggle — sits directly below gear icon */}
        <CursorToggle />
      </div>
    </div>
  );
};

export default HeroTopBar;