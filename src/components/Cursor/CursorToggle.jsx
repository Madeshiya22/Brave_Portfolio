import { useState, useRef, useEffect } from 'react';
import { TbPointerFilled } from 'react-icons/tb';
import useCursorMode from '../../hooks/useCursorMode';
import '../../styles/cursor.scss';

const CursorToggle = () => {
  const { cursorMode, setCursorMode } = useCursorMode();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    const handleOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  const select = (mode) => {
    setCursorMode(mode);
    setOpen(false);
  };

  return (
    <div
      ref={wrapRef}
      className={`cursor-toggle${open ? ' cursor-toggle--open' : ''}`}
    >
      {/* Trigger icon — click to open/close */}
      <button
        className="cursor-toggle__btn"
        aria-label="Cursor settings"
        aria-expanded={open}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
      >
        <TbPointerFilled size={20} />
      </button>

      {/* Dropdown */}
      <div className="cursor-menu" role="menu" aria-label="Cursor mode">
        <p className="cursor-menu__label">Cursor Mode</p>

        <button
          role="menuitem"
          className={`cursor-menu__item${cursorMode === 'default' ? ' is-active' : ''}`}
          onClick={() => select('default')}
          type="button"
        >
          <span className="cursor-menu__dot" />
          Normal Cursor
        </button>

        <button
          role="menuitem"
          className={`cursor-menu__item${cursorMode === 'custom' ? ' is-active' : ''}`}
          onClick={() => select('custom')}
          type="button"
        >
          <span className="cursor-menu__dot" />
          Custom Cursor
        </button>
      </div>
    </div>
  );
};

export default CursorToggle;
