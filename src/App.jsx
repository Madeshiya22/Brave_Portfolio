import React from 'react';
import useLenis from './hooks/useLenis';
import Home from './features/home/Home';

function App() {
  useLenis();

  return (
    <main className="app-container">
      <Home />
    </main>
  );
}

export default App;
