import React from 'react';

const LETTERS = 'Portfolio'.split('');

const HeroTitle = ({ mouse = { x: 0, y: 0 } }) => {
  const parallax = {
    transform: `translate(${mouse.x * 20}px, ${mouse.y * 12}px)`,
    transition: 'transform 0.12s ease-out',
  };

  return (
    <div className="title-area">
      <span className="welcome">Welcome To</span>

      <div className="portfolio-title" style={parallax}>
        {LETTERS.map((letter, i) => (
          <span
            key={i}
            className="portfolio-letter"
            style={{ animationDelay: `${0.55 + i * 0.07}s` }}
          >
            {letter}
            {i === LETTERS.length - 1 && <span className="year-2026">2026</span>}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HeroTitle;