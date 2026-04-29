import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, FolderOpen, Code2, Home } from 'lucide-react';

const PHRASES = [
  'Ask anything, find anything...',
  'Explore my projects...',
  'Discover my skills...',
  "Let's build something great...",
  'Full-stack developer...',
];

const COMMANDS = [
  {
    id: 'about',
    keywords: ['about', 'aboutme', 'about me', 'who', 'rahul'],
    label: 'About Me',
    Icon: User,
    hint: "View Rahul's story",
  },
  {
    id: 'contact',
    keywords: ['contact', 'message', 'email', 'send', 'hire'],
    label: 'Contact',
    Icon: Mail,
    hint: 'Send a message',
  },
  {
    id: 'projects',
    keywords: ['project', 'work', 'portfolio', 'build', 'app'],
    label: 'Projects',
    Icon: FolderOpen,
    hint: 'See my work',
  },
  {
    id: 'skills',
    keywords: ['skill', 'tech', 'stack', 'react', 'node'],
    label: 'Skills',
    Icon: Code2,
    hint: 'My tech stack',
  },
  {
    id: 'home',
    keywords: ['home', 'back', 'start'],
    label: 'Home',
    Icon: Home,
    hint: 'Back to start',
  },
];

const getMatches = (value) => {
  const query = value.toLowerCase().trim();
  if (!query) return [];

  return COMMANDS.filter(({ keywords }) => keywords.some((kw) => kw.includes(query) || query.includes(kw)));
};

const HeroSearch = ({ onOpenAbout, onOpenContact, onOpenProjects }) => {
  const [typedText, setTypedText] = useState('');
  const [active, setActive] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef(null);
  const tickRef = useRef(null);
  const clickingRef = useRef(false);

  useEffect(() => {
    if (active) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      const phrase = PHRASES[phraseIndex];

      if (!deleting) {
        setTypedText(phrase.slice(0, charIndex + 1));
        charIndex += 1;

        if (charIndex === phrase.length) {
          deleting = true;
          tickRef.current = setTimeout(tick, 1800);
          return;
        }
      } else {
        setTypedText(phrase.slice(0, charIndex - 1));
        charIndex -= 1;

        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % PHRASES.length;
        }
      }

      tickRef.current = setTimeout(tick, deleting ? 45 : 80);
    };

    tickRef.current = setTimeout(tick, 700);
    return () => clearTimeout(tickRef.current);
  }, [active]);

  const handleChange = (event) => {
    const value = event.target.value;
    setInputVal(value);
    setHighlighted(0);
    setSuggestions(getMatches(value));
  };

  const handleDeactivate = () => {
    setActive(false);
    setInputVal('');
    setSuggestions([]);
    setHighlighted(0);
  };

  const runCommand = (id) => {
    handleDeactivate();
    if (id === 'about') onOpenAbout?.();
    if (id === 'contact') onOpenContact?.();
    if (id === 'projects') onOpenProjects?.();
  };

  const handleKey = (event) => {
    if (event.key === 'Escape') {
      handleDeactivate();
      return;
    }

    const list = getMatches(inputVal);

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlighted((current) => (current + 1) % Math.max(list.length, 1));
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlighted((current) => (current - 1 + Math.max(list.length, 1)) % Math.max(list.length, 1));
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      const target = list[highlighted] ?? list[0];
      if (target) runCommand(target.id);
    }
  };

  const handleActivate = () => {
    setActive(true);
    setTimeout(() => inputRef.current?.focus(), 20);
  };

  const handleBlur = () => {
    if (clickingRef.current) {
      clickingRef.current = false;
      inputRef.current?.focus();
      return;
    }

    handleDeactivate();
  };

  return (
    <div className="search-stack anim-fade-up" style={{ animationDelay: '0.25s' }}>
      <div className="search-wrapper">
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
              onChange={handleChange}
              onKeyDown={handleKey}
              onBlur={handleBlur}
              placeholder="Search or type a command..."
              autoComplete="off"
            />
          ) : (
            <span className="typed-text">{typedText}</span>
          )}

          <span className="typing-cursor" />
        </div>

        {active && suggestions.length > 0 && (
          <div className="search-suggestions">
            {suggestions.map((command, i) => (
              <button
                key={command.id}
                className={`suggestion-item${i === highlighted ? ' suggestion-item--hl' : ''}`}
                onMouseDown={() => {
                  clickingRef.current = true;
                  runCommand(command.id);
                }}
                onMouseEnter={() => setHighlighted(i)}
              >
                <span className="suggestion-item__icon">
                  <command.Icon size={14} />
                </span>
                <span className="suggestion-item__label">{command.label}</span>
                <span className="suggestion-item__hint">{command.hint}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSearch;