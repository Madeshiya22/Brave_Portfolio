import React from 'react';
import useLenis from './hooks/useLenis';
import Hero from './sections/Hero';

function App() {
  useLenis();

  return (
    <main className="app-container">
      <Hero />
    </main>
  );
}

export default App;
