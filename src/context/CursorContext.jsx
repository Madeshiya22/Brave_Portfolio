import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CursorContext = createContext(null);

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

export const CursorProvider = ({ children }) => {
  const [cursorMode, setCursorModeState] = useState(() => {
    if (isTouchDevice()) return 'default';
    return localStorage.getItem('cursor-mode') || 'default';
  });

  // Persist to localStorage whenever mode changes
  useEffect(() => {
    if (!isTouchDevice()) {
      localStorage.setItem('cursor-mode', cursorMode);
    }
  }, [cursorMode]);

  // Hide / restore native cursor based on mode
  useEffect(() => {
    const root = document.documentElement;
    if (cursorMode === 'custom') {
      root.style.cursor = 'none';
    } else {
      root.style.cursor = '';
    }
    return () => {
      root.style.cursor = '';
    };
  }, [cursorMode]);

  const setCursorMode = useCallback((mode) => {
    if (isTouchDevice()) return;
    setCursorModeState(mode);
  }, []);

  const toggleCursor = useCallback(() => {
    if (isTouchDevice()) return;
    setCursorModeState((prev) => (prev === 'custom' ? 'default' : 'custom'));
  }, []);

  return (
    <CursorContext.Provider value={{ cursorMode, setCursorMode, toggleCursor }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error('useCursor must be used inside <CursorProvider>');
  return ctx;
};

export default CursorContext;
