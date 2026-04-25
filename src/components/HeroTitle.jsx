import React from 'react';

/**
 * HeroTitle
 * Receives `mouse` → { x, y } in range [-0.5, 0.5]
 * Uses it to apply a subtle parallax transform on the title.
 *
 * "Portfolio" is split into individual letter <span>s so that:
 *  • Each letter animates in with a fixed, sequential stagger (no randomness).
 *  • Hovering a letter turns ONLY that letter white — no sibling bleed.
 */

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
            {/* "2026" badge anchored to the last letter */}
            {i === LETTERS.length - 1 && (
              <span className="year-2026">2026</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HeroTitle;
