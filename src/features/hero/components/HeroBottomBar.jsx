import React from 'react';
import { ArrowRight, Download, FileText, Send } from 'lucide-react';

const HeroBottomBar = ({ onOpenModal, onOpenProjects }) => (
  <div className="hero__bottom anim-fade-up" style={{ animationDelay: '0.65s' }}>
    <button className="send-msg-btn" onClick={onOpenModal}>
      <Send size={18} className="send-msg-btn__icon" />
      <span>Send Message</span>
    </button>

    <button className="projects-cta" onClick={onOpenProjects}>
      <span>View All Projects</span>
      <ArrowRight size={20} />
    </button>

    <div className="action-btns">
      <button className="glass-btn glass-btn--resume">
        <FileText size={19} /> Resume
      </button>
      <button className="glass-btn glass-btn--download">
        <Download size={22} />
      </button>
    </div>
  </div>
);

export default HeroBottomBar;
