import React, { useState, useRef, useEffect } from 'react';

import HeroParticles from './HeroParticles';
import HeroTopBar from './HeroTopBar';
import HeroSearch from './HeroSearch';
import HeroTitle from './HeroTitle';
import HeroBottomBar from './HeroBottomBar';
import ContactModal from './ContactModal';
import About from '../../about/page/About';

const Hero = ({
  aboutOpen,
  aboutMinimized,
  onOpenAbout,
  onMinimizeAbout,
  onRestoreAbout,
  onCloseAbout,
  onOpenProjects,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [theme, setTheme] = useState('night');
  const heroRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (!heroRef.current) return;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      setMouse({
        x: (e.clientX - left) / width - 0.5,
        y: (e.clientY - top) / height - 0.5,
      });
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <section className="hero" data-theme={theme} ref={heroRef}>
        <HeroParticles />
        <HeroTopBar theme={theme} setTheme={setTheme} />
        <div className="hero__center">
          <HeroSearch
            onOpenAbout={onOpenAbout}
            onOpenContact={() => setModalOpen(true)}
            onOpenProjects={onOpenProjects}
          />
          <HeroTitle mouse={mouse} />
        </div>
        <HeroBottomBar onOpenModal={() => setModalOpen(true)} />
      </section>

      {modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}
      {aboutOpen && (
        <About
          isMinimized={aboutMinimized}
          onMinimize={onMinimizeAbout}
          onRestore={onRestoreAbout}
          onClose={onCloseAbout}
        />
      )}
    </>
  );
};

export default Hero;