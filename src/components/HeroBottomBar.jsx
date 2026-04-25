import React from 'react';
import { Send, FileText, Download } from 'lucide-react';

/**
 * HeroBottomBar
 * Props:
 *   onOpenModal – callback to open the contact modal
 */
const HeroBottomBar = ({ onOpenModal }) => (
  <div className="hero__bottom anim-fade-up" style={{ animationDelay: '0.65s' }}>

    {/* Send Message – bottom left */}
    <button className="send-msg-btn" onClick={onOpenModal}>
      <Send size={18} className="send-msg-btn__icon" />
      <span>Send Message</span>
    </button>

    {/* Resume + Download – bottom right */}
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
