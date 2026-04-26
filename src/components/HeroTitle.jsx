import React from 'react';
/**
 * HeroTitle
 * Ye component mouse ki position receive karta hai → { x, y }
 * Jiski range -0.5 se 0.5 tak hoti hai.
 *
 * Iska use title par halka sa parallax / move effect dene ke liye hota hai,
 * taaki mouse move karne par title bhi thoda move kare aur interactive lage.
 *
 * "Portfolio" word ko alag-alag letter <span> me split kiya gaya hai,
 * taaki har letter par alag animation aur hover effect lag sake.
 *
 * • Har letter fixed order me ek ke baad ek animate hota hai
 *   (sequential stagger, random nahi).
 *
 * • Kisi ek letter par hover karne se sirf wahi letter white hota hai,
 *   baaki letters par koi effect nahi hota.
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
