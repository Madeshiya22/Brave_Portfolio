import React from 'react';
import { useClock } from '../hooks/useClock';

const Clock = () => {
  const { timeStr, ampm } = useClock();

  return (
    <div className="time">
      {timeStr}
      <span className="ampm">{ampm}</span>
    </div>
  );
};

export default Clock;
