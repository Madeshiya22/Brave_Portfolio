import React, { useState } from 'react';
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
  const [aboutOpen, setAboutOpen] = useState(false);
  const [aboutMinimized, setAboutMinimized] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [projectsMinimized, setProjectsMinimized] = useState(false);
  const [dockOrder, setDockOrder] = useState([]);
  const [activeSection, setActiveSection] = useState('html-css');

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
