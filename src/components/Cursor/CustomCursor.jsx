import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import useCursorMode from '../../hooks/useCursorMode';
import '../../styles/cursor.scss';

// Elements that expand the cursor ring on hover
const HOVER_SELECTORS = 'a, button, [data-cursor-hover], input, textarea, select, label';

const CustomCursor = () => {
  const { cursorMode } = useCursorMode();
  const bigRef = useRef(null);
  const smallRef = useRef(null);
  const posRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const rafRef = useRef(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    if (cursorMode !== 'custom') return;

    const big = bigRef.current;
    const small = smallRef.current;
    if (!big || !small) return;

    // ── Immediate position snapshot (avoids jump-in from top-left)
    gsap.set([big, small], {
      x: posRef.current.x,
      y: posRef.current.y,
      xPercent: -50,
      yPercent: -50,
    });

    // ── Mouse tracking
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      // Small dot — snaps instantly
      gsap.to(small, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'none',
        overwrite: 'auto',
      });

      // Big ring — silky trailing follow
      gsap.to(big, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.55,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    // ── Hover expansion
    const onHoverIn = (e) => {
      if (!e.target.closest(HOVER_SELECTORS)) return;
      isHoveringRef.current = true;
      gsap.to(big, {
        scale: 1.75,
        borderColor: 'rgba(255, 47, 32, 0.9)',
        boxShadow: '0 0 22px 4px rgba(255, 47, 32, 0.35)',
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      gsap.to(small, {
        scale: 0.5,
        background: 'rgba(255, 47, 32, 0.9)',
        boxShadow: '0 0 12px 3px rgba(255, 47, 32, 0.5)',
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const onHoverOut = (e) => {
      if (!e.target.closest(HOVER_SELECTORS)) return;
      isHoveringRef.current = false;
      gsap.to(big, {
        scale: 1,
        borderColor: 'rgba(255, 255, 255, 0.75)',
        boxShadow: '0 0 12px 2px rgba(255, 255, 255, 0.12)',
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      gsap.to(small, {
        scale: 1,
        background: '#fff',
        boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.6)',
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    // ── Click pulse
    const onClick = () => {
      gsap.timeline()
        .to(big, { scale: 0.8, duration: 0.1, ease: 'power2.in', overwrite: 'auto' })
        .to(big, { scale: isHoveringRef.current ? 1.75 : 1, duration: 0.35, ease: 'elastic.out(1, 0.5)' });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onHoverIn, { passive: true });
    document.addEventListener('mouseout', onHoverOut, { passive: true });
    window.addEventListener('click', onClick, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onHoverIn);
      document.removeEventListener('mouseout', onHoverOut);
      window.removeEventListener('click', onClick);
      cancelAnimationFrame(rafRef.current);
      gsap.killTweensOf([big, small]);
    };
  }, [cursorMode]);

  if (cursorMode !== 'custom') return null;

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div ref={bigRef} className="custom-cursor__ring" />
      <div ref={smallRef} className="custom-cursor__dot" />
    </div>
  );
};

export default CustomCursor;
