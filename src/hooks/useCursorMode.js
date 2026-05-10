import { useCursor } from '../context/CursorContext';

/**
 * Convenience re-export so components only need one import.
 * Usage: const { cursorMode, setCursorMode, toggleCursor } = useCursorMode();
 */
const useCursorMode = () => useCursor();

export default useCursorMode;
