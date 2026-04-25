import React, { useState, useEffect, useRef } from 'react';

const PHRASES = [
  'Ask anything, find anything...',
  'Explore my projects...',
  'Discover my skills...',
  "Let's build something great...",
  'Full-stack developer...',
];

const HeroSearch = () => {
  const [typedText, setTypedText] = useState('');
  const [active, setActive]       = useState(false);
  const [inputVal, setInputVal]   = useState('');
  const inputRef                  = useRef(null);
  const tickRef                   = useRef(null);

  // Typewriter — pauses while the bar is active
  useEffect(() => {
    if (active) return;
    let pi = 0, ci = 0, deleting = false;

    const tick = () => {
      const phrase = PHRASES[pi];
      if (!deleting) {
        setTypedText(phrase.slice(0, ci + 1));
        ci++;
        if (ci === phrase.length) {
          deleting = true;
          tickRef.current = setTimeout(tick, 1800);
          return;
        }
      } else {
        setTypedText(phrase.slice(0, ci - 1));
        ci--;
        if (ci === 0) { deleting = false; pi = (pi + 1) % PHRASES.length; }
      }
      tickRef.current = setTimeout(tick, deleting ? 45 : 80);
    };

    tickRef.current = setTimeout(tick, 700);
    return () => clearTimeout(tickRef.current);
  }, [active]);

  const handleActivate = () => {
    setActive(true);
    setTimeout(() => inputRef.current?.focus(), 20);
  };

  const handleDeactivate = () => {
    setActive(false);
    setInputVal('');
  };

  return (
    <div className="search-stack anim-fade-up" style={{ animationDelay: '0.25s' }}>
      <div
        className={`search-dark${active ? ' search-dark--active' : ''}`}
        onClick={!active ? handleActivate : undefined}
        style={{ cursor: active ? 'text' : 'pointer' }}
      >
        <div className="brave-icon" />

        {active ? (
          <input
            ref={inputRef}
            className="search-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && handleDeactivate()}
            onBlur={handleDeactivate}
            placeholder="Type to search..."
            autoComplete="off"
          />
        ) : (
          <span className="typed-text">{typedText}</span>
        )}

        <span className="typing-cursor" />
      </div>
    </div>
  );
};

export default HeroSearch;
