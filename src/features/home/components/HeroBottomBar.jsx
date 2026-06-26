import React from 'react';
import { Download, FileText, Send } from 'lucide-react';

const HeroBottomBar = ({ onOpenModal }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Rahul_Madeshiya_Resume.pdf';
    link.download = 'Rahul_Madeshiya_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="hero__bottom anim-fade-up" style={{ animationDelay: '0.65s' }}>
      <button className="send-msg-btn" onClick={onOpenModal}>
        <Send size={18} className="send-msg-btn__icon" />
        <span>Send Message</span>
      </button>

      <div className="action-btns">
        <button className="glass-btn glass-btn--resume" onClick={() => window.open('/Rahul_Madeshiya_Resume.pdf', '_blank')}>
          <FileText size={19} /> Resume
        </button>
        <button className="glass-btn glass-btn--download" onClick={handleDownload} title="Download Resume">
          <Download size={22} />
        </button>
      </div>
    </div>
  );
};

export default HeroBottomBar;