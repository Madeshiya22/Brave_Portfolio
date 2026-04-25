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
  { id: 'about',    keywords: ['about', 'aboutme', 'about me', 'who', 'rahul'], label: 'About Me',  Icon: User,       hint: "View Rahul's story" },
  { id: 'contact',  keywords: ['contact', 'message', 'email', 'send', 'hire'],  label: 'Contact',   Icon: Mail,       hint: 'Send a message'    },
  { id: 'projects', keywords: ['project', 'work', 'portfolio', 'build', 'app'], label: 'Projects',  Icon: FolderOpen, hint: 'See my work'       },
  { id: 'skills',   keywords: ['skill', 'tech', 'stack', 'react', 'node'],      label: 'Skills',    Icon: Code2,      hint: 'My tech stack'     },
  { id: 'home',     keywords: ['home', 'back', 'start'],                        label: 'Home',      Icon: Home,       hint: 'Back to start'     },
];

const getMatches = (val) => {
  const q = val.toLowerCase().trim();
  if (!q) return [];
  return COMMANDS.filter(({ keywords }) =>
    keywords.some(kw => kw.includes(q) || q.includes(kw))
  );
};

const HeroSearch = ({ onOpenAbout, onOpenContact }) => {
  const [typedText, setTypedText]     = useState('');
  const [active, setActive]           = useState(false);
  const [inputVal, setInputVal]       = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [highlighted, setHighlighted] = useState(0);
  const inputRef      = useRef(null);
  const tickRef       = useRef(null);
  // Tracks if user mousedown'd a suggestion — prevents blur from closing menu
  const clickingRef   = useRef(false);

  // ── Typewriter (pauses while active) ─────────────────────────
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

  // ── Filter suggestions on every keystroke ─────────────────────
  const handleChange = (e) => {
    const val = e.target.value;
    setInputVal(val);
    setHighlighted(0);
    setSuggestions(getMatches(val));
  };

  // ── Open a command ─────────────────────────────────────────────
  const runCommand = (id) => {
    handleDeactivate();
    if (id === 'about')   onOpenAbout?.();
    if (id === 'contact') onOpenContact?.();
  };

  // ── Keyboard: arrows + Enter ──────────────────────────────────
  const handleKey = (e) => {
    if (e.key === 'Escape') { handleDeactivate(); return; }

    const list = getMatches(inputVal); // fresh match from current value

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlighted(h => (h + 1) % Math.max(list.length, 1));
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlighted(h => (h - 1 + Math.max(list.length, 1)) % Math.max(list.length, 1));
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      // Use highlighted suggestion if available, else first match
      const target = list[highlighted] ?? list[0];
      if (target) runCommand(target.id);
    }
  };

  const handleActivate = () => {
    setActive(true);
    setTimeout(() => inputRef.current?.focus(), 20);
  };

  const handleDeactivate = () => {
    setActive(false);
    setInputVal('');
    setSuggestions([]);
    setHighlighted(0);
  };

  // ── Blur — only close if NOT clicking a suggestion ─────────────
  const handleBlur = () => {
    if (clickingRef.current) {
      clickingRef.current = false;
      inputRef.current?.focus(); // keep focus on input
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

        {/* Suggestions dropdown */}
        {active && suggestions.length > 0 && (
          <div className="search-suggestions">
            {suggestions.map((cmd, i) => (
              <button
                key={cmd.id}
                className={`suggestion-item${i === highlighted ? ' suggestion-item--hl' : ''}`}
                onMouseDown={() => { clickingRef.current = true; runCommand(cmd.id); }}
                onMouseEnter={() => setHighlighted(i)}
              >
                <span className="suggestion-item__icon"><cmd.Icon size={14} /></span>
                <span className="suggestion-item__label">{cmd.label}</span>
                <span className="suggestion-item__hint">{cmd.hint}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSearch;
