import React, { useState, useRef, useEffect } from 'react';

import HeroParticles from '../components/HeroParticles';
import HeroTopBar    from '../components/HeroTopBar';
import HeroSearch    from '../components/HeroSearch';
import HeroTitle     from '../components/HeroTitle';
import HeroBottomBar from '../components/HeroBottomBar';
import ContactModal  from '../components/ContactModal';
import About         from '../components/About';

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mouse, setMouse]         = useState({ x: 0, y: 0 });
  const [theme, setTheme]         = useState('night');
  const heroRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (!heroRef.current) return;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      setMouse({
        x: (e.clientX - left) / width  - 0.5,
        y: (e.clientY - top)  / height - 0.5,
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
            onOpenAbout={() => setAboutOpen(true)}
            onOpenContact={() => setModalOpen(true)}
          />
          <HeroTitle mouse={mouse} />
        </div>
        <HeroBottomBar onOpenModal={() => setModalOpen(true)} />
      </section>

      {modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}
      {aboutOpen && (
        <About onClose={() => setAboutOpen(false)} />
      )}
    </>
  );
};

export default Hero;
