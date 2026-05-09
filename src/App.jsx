import React, { useState, useEffect } from 'react';
import { FolderOpen, User, Code2 } from 'lucide-react';
import useLenis from './hooks/useLenis';
import Home from './features/home/page/Home';
import Projects from './features/projects/page/Projects';
import Skills from './features/skills/page/Skills';
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
  const [skillsOpen, setSkillsOpen] = useState(() => JSON.parse(sessionStorage.getItem('appState_skillsOpen')) || false);
  const [skillsMinimized, setSkillsMinimized] = useState(() => JSON.parse(sessionStorage.getItem('appState_skillsMinimized')) || false);
  const [dockOrder, setDockOrder] = useState(() => JSON.parse(sessionStorage.getItem('appState_dockOrder')) || []);
  const [activeSection, setActiveSection] = useState(() => sessionStorage.getItem('appState_activeSection') || 'html-css');

  useEffect(() => { sessionStorage.setItem('appState_aboutOpen', JSON.stringify(aboutOpen)); }, [aboutOpen]);
  useEffect(() => { sessionStorage.setItem('appState_aboutMinimized', JSON.stringify(aboutMinimized)); }, [aboutMinimized]);
  useEffect(() => { sessionStorage.setItem('appState_projectsOpen', JSON.stringify(projectsOpen)); }, [projectsOpen]);
  useEffect(() => { sessionStorage.setItem('appState_projectsMinimized', JSON.stringify(projectsMinimized)); }, [projectsMinimized]);
  useEffect(() => { sessionStorage.setItem('appState_skillsOpen', JSON.stringify(skillsOpen)); }, [skillsOpen]);
  useEffect(() => { sessionStorage.setItem('appState_skillsMinimized', JSON.stringify(skillsMinimized)); }, [skillsMinimized]);
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

  const openSkills = () => {
    setSkillsOpen(true);
    setSkillsMinimized(false);
  };

  const minimizeSkills = () => {
    setSkillsMinimized(true);
    setDockOrder((current) => (current.includes('skills') ? current : [...current, 'skills']));
  };

  const restoreSkills = () => {
    setSkillsOpen(true);
    setSkillsMinimized(false);
    setDockOrder((current) => current.filter((item) => item !== 'skills'));
  };

  const closeSkills = () => {
    setSkillsOpen(false);
    setSkillsMinimized(false);
    setDockOrder((current) => current.filter((item) => item !== 'skills'));
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

      if (itemId === 'skills' && skillsOpen && skillsMinimized) {
        return {
          id: 'skills',
          label: 'Skills',
          icon: Code2,
          previewTitle: 'My Tech Stack',
          previewSubtitle: 'React, Node, MERN & More',
          previewAlt: 'Skills preview',
          image: profileImage,
          onRestore: restoreSkills,
          onClose: closeSkills,
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
        onOpenSkills={openSkills}
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
      {skillsOpen && (
        <Skills
          onClose={closeSkills}
          onMinimize={minimizeSkills}
          isMinimized={skillsMinimized}
        />
      )}
      <DesktopDock items={dockItems} />
    </main>
  );
}

export default App;
