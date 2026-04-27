import React, { useState } from 'react';
import useLenis from './hooks/useLenis';
import Home from './features/home/Home';
import Projects from './features/projects/Projects';

function App() {
  useLenis();
  const [view, setView] = useState('home');
  const [activeSection, setActiveSection] = useState('html-css');

  const openProjects = (sectionId = 'html-css') => {
    setActiveSection(sectionId);
    setView('projects');
  };

  return (
    <main className="app-container">
      {view === 'home' && <Home onOpenProjects={openProjects} />}
      {view === 'projects' && (
        <Projects
          activeSectionId={activeSection}
          onSelectSection={setActiveSection}
          onBack={() => setView('home')}
        />
      )}
    </main>
  );
}

export default App;
