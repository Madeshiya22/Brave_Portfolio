import React, { useState, useEffect } from 'react';
import { FolderOpen, User } from 'lucide-react';
import useLenis from './hooks/useLenis';
import Home from './features/home/page/Home';
import Projects from './features/projects/page/Projects';
import DesktopDock from './features/home/components/DesktopDock';
import profileImage from './assets/rahul.png';
import { ABOUT_CONTENT } from './features/about/utils/aboutContent';
import { projectSections } from './data';

function App() {
  useLenis();
  const [aboutOpen, setAboutOpen] = useState(() => JSON.parse(sessionStorage.getItem('appState_aboutOpen')) || false);
  const [aboutMinimized, setAboutMinimized] = useState(() => JSON.parse(sessionStorage.getItem('appState_aboutMinimized')) || false);
  const [projectsOpen, setProjectsOpen] = useState(() => JSON.parse(sessionStorage.getItem('appState_projectsOpen')) || false);
  const [projectsMinimized, setProjectsMinimized] = useState(() => JSON.parse(sessionStorage.getItem('appState_projectsMinimized')) || false);
  const [dockOrder, setDockOrder] = useState(() => JSON.parse(sessionStorage.getItem('appState_dockOrder')) || []);
  const [activeSection, setActiveSection] = useState(() => sessionStorage.getItem('appState_activeSection') || 'html-css');

  useEffect(() => { sessionStorage.setItem('appState_aboutOpen', JSON.stringify(aboutOpen)); }, [aboutOpen]);
  useEffect(() => { sessionStorage.setItem('appState_aboutMinimized', JSON.stringify(aboutMinimized)); }, [aboutMinimized]);
  useEffect(() => { sessionStorage.setItem('appState_projectsOpen', JSON.stringify(projectsOpen)); }, [projectsOpen]);
  useEffect(() => { sessionStorage.setItem('appState_projectsMinimized', JSON.stringify(projectsMinimized)); }, [projectsMinimized]);
  useEffect(() => { sessionStorage.setItem('appState_dockOrder', JSON.stringify(dockOrder)); }, [dockOrder]);
  useEffect(() => { sessionStorage.setItem('appState_activeSection', activeSection); }, [activeSection]);

  const openAbout = () => {
    setAboutOpen(true);
    setAboutMinimized(false);
  };

  const minimizeAbout = () => {
    setAboutMinimized(true);
    setDockOrder((current) => (current.includes('about') ? current : [...current, 'about']));
  };

  const restoreAbout = () => {
    setAboutOpen(true);
    setAboutMinimized(false);
    setDockOrder((current) => current.filter((item) => item !== 'about'));
  };

  const closeAbout = () => {
    setAboutOpen(false);
    setAboutMinimized(false);
    setDockOrder((current) => current.filter((item) => item !== 'about'));
  };

  const openProjects = (sectionId = 'html-css') => {
    setActiveSection(sectionId);
    setProjectsOpen(true);
    setProjectsMinimized(false);
  };

  const minimizeProjects = () => {
    setProjectsMinimized(true);
    setDockOrder((current) => (current.includes('projects') ? current : [...current, 'projects']));
  };

  const restoreProjects = () => {
    setProjectsOpen(true);
    setProjectsMinimized(false);
    setDockOrder((current) => current.filter((item) => item !== 'projects'));
  };

  const closeProjects = () => {
    setProjectsOpen(false);
    setProjectsMinimized(false);
    setDockOrder((current) => current.filter((item) => item !== 'projects'));
  };

  const activeProjectSection = projectSections.find((section) => section.id === activeSection) ?? projectSections[0];

  const dockItems = dockOrder
    .map((itemId) => {
      if (itemId === 'about' && aboutOpen && aboutMinimized) {
        return {
          id: 'about',
          label: ABOUT_CONTENT.windowTitle,
          icon: User,
          previewTitle: ABOUT_CONTENT.preview.title,
          previewSubtitle: ABOUT_CONTENT.preview.subtitle,
          previewAlt: 'About Me preview',
          image: profileImage,
          onRestore: restoreAbout,
          onClose: closeAbout,
        };
      }

      if (itemId === 'projects' && projectsOpen && projectsMinimized) {
        return {
          id: 'projects',
          label: 'Projects',
          icon: FolderOpen,
          previewTitle: activeProjectSection.label,
          previewSubtitle: activeProjectSection.summary,
          previewAlt: `${activeProjectSection.label} preview`,
          image: activeProjectSection.projects[0]?.image,
          onRestore: restoreProjects,
          onClose: closeProjects,
        };
      }

      return null;
    })
    .filter(Boolean);

  return (
    <main className="app-container">
      <Home
        aboutOpen={aboutOpen}
        aboutMinimized={aboutMinimized}
        onOpenAbout={openAbout}
        onMinimizeAbout={minimizeAbout}
        onRestoreAbout={restoreAbout}
        onCloseAbout={closeAbout}
        onOpenProjects={openProjects}
      />
      {projectsOpen && (
        <Projects
          activeSectionId={activeSection}
          onSelectSection={setActiveSection}
          onBack={closeProjects}
          isMinimized={projectsMinimized}
          onMinimize={minimizeProjects}
          fullPage={true}
        />
      )}
      <DesktopDock items={dockItems} />
    </main>
  );
}

export default App;
