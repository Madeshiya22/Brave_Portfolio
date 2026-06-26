import { useState, useEffect, useRef } from 'react';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export const useWindowDrag = ({ onClose, onMinimize, isMinimized = false, defaultWidth = 1100, defaultHeight = 700, defaultX = 0, defaultY = 0 }) => {
  const windowRef = useRef(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const hasMountedRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [transitionState, setTransitionState] = useState('enter');
  const [position, setPosition] = useState({ x: defaultX, y: defaultY });

  useEffect(() => {
    if (!isDragging) return undefined;

    const handlePointerMove = (event) => {
      const panelWidth = windowRef.current?.offsetWidth ?? defaultWidth;
      const panelHeight = windowRef.current?.offsetHeight ?? defaultHeight;
      const nextX = clamp(event.clientX - dragOffsetRef.current.x, 0, Math.max(0, window.innerWidth - panelWidth));
      const nextY = clamp(event.clientY - dragOffsetRef.current.y, 0, Math.max(0, window.innerHeight - panelHeight));
      setPosition({ x: nextX, y: nextY });
    };

    const stopDragging = () => setIsDragging(false);

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', stopDragging);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', stopDragging);
    };
  }, [isDragging, defaultWidth, defaultHeight]);

  useEffect(() => {
    const handleResize = () => {
      const panelWidth = windowRef.current?.offsetWidth ?? defaultWidth;
      const panelHeight = windowRef.current?.offsetHeight ?? defaultHeight;

      setPosition((prev) => ({
        x: clamp(prev.x, 0, Math.max(0, window.innerWidth - panelWidth)),
        y: clamp(prev.y, 0, Math.max(0, window.innerHeight - panelHeight)),
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [defaultWidth, defaultHeight]);

  // Clear the enter animation after it finishes on first mount
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setTransitionState('idle');
      hasMountedRef.current = true;
    }, 500);
    return () => window.clearTimeout(timer);
  }, []);

  // Handle restore from minimized
  useEffect(() => {
    if (!hasMountedRef.current) return undefined;
    if (isMinimized) return undefined;

    setTransitionState('restore');
    const timer = window.setTimeout(() => setTransitionState('idle'), 500);
    return () => window.clearTimeout(timer);
  }, [isMinimized]);

  const startDragging = (event) => {
    if (event.button !== 0) return;
    if (event.target.closest('button')) return;

    const bounds = windowRef.current?.getBoundingClientRect();
    if (!bounds) return;

    dragOffsetRef.current = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };
    setIsDragging(true);
  };

  const handleMinimize = () => {
    setTransitionState('minimize');
    window.setTimeout(() => onMinimize?.(), 400);
  };

  const handleClose = () => {
    setTransitionState('close');
    window.setTimeout(() => onClose?.(), 400);
  };

  return {
    windowRef,
    position,
    isDragging,
    transitionState,
    startDragging,
    handleMinimize,
    handleClose,
  };
};
