import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useWindowManager = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [aboutOpen, setAboutOpen]           = useState(() => JSON.parse(sessionStorage.getItem('appState_aboutOpen'))      || false);
  const [aboutMinimized, setAboutMinimized] = useState(() => JSON.parse(sessionStorage.getItem('appState_aboutMinimized')) || false);
  const [projectsOpen, setProjectsOpen]     = useState(() => JSON.parse(sessionStorage.getItem('appState_projectsOpen'))   || false);
  const [projectsMinimized, setProjectsMinimized] = useState(() => JSON.parse(sessionStorage.getItem('appState_projectsMinimized')) || false);
  const [skillsOpen, setSkillsOpen]         = useState(() => JSON.parse(sessionStorage.getItem('appState_skillsOpen'))     || false);
  const [skillsMinimized, setSkillsMinimized] = useState(() => JSON.parse(sessionStorage.getItem('appState_skillsMinimized')) || false);
  const [eduOpen, setEduOpen]               = useState(() => JSON.parse(sessionStorage.getItem('appState_eduOpen'))        || false);
  const [eduMinimized, setEduMinimized]     = useState(() => JSON.parse(sessionStorage.getItem('appState_eduMinimized'))   || false);
  const [dockOrder, setDockOrder]           = useState(() => JSON.parse(sessionStorage.getItem('appState_dockOrder'))      || []);
  const [activeSection, setActiveSection]   = useState(() => sessionStorage.getItem('appState_activeSection') || 'html-css');

  // Sync with URL location on mount / location change
  useEffect(() => {
    const path = location.pathname;
    if (path === '/about') {
      setAboutOpen(true);
      setAboutMinimized(false);
    } else if (path.startsWith('/projects')) {
      setProjectsOpen(true);
      setProjectsMinimized(false);
    } else if (path === '/skills') {
      setSkillsOpen(true);
      setSkillsMinimized(false);
    } else if (path === '/education') {
      setEduOpen(true);
      setEduMinimized(false);
    }
  }, [location.pathname]);

  useEffect(() => { sessionStorage.setItem('appState_aboutOpen',        JSON.stringify(aboutOpen));        }, [aboutOpen]);
  useEffect(() => { sessionStorage.setItem('appState_aboutMinimized',   JSON.stringify(aboutMinimized));   }, [aboutMinimized]);
  useEffect(() => { sessionStorage.setItem('appState_projectsOpen',     JSON.stringify(projectsOpen));     }, [projectsOpen]);
  useEffect(() => { sessionStorage.setItem('appState_projectsMinimized',JSON.stringify(projectsMinimized));}, [projectsMinimized]);
  useEffect(() => { sessionStorage.setItem('appState_skillsOpen',       JSON.stringify(skillsOpen));       }, [skillsOpen]);
  useEffect(() => { sessionStorage.setItem('appState_skillsMinimized',  JSON.stringify(skillsMinimized));  }, [skillsMinimized]);
  useEffect(() => { sessionStorage.setItem('appState_eduOpen',          JSON.stringify(eduOpen));          }, [eduOpen]);
  useEffect(() => { sessionStorage.setItem('appState_eduMinimized',     JSON.stringify(eduMinimized));     }, [eduMinimized]);
  useEffect(() => { sessionStorage.setItem('appState_dockOrder',        JSON.stringify(dockOrder));        }, [dockOrder]);
  useEffect(() => { sessionStorage.setItem('appState_activeSection',    activeSection);                    }, [activeSection]);

  const openAbout = () => {
    setAboutOpen(true);
    setAboutMinimized(false);
    navigate('/about');
  };

  const minimizeAbout = () => {
    setAboutMinimized(true);
    setDockOrder((current) => (current.includes('about') ? current : [...current, 'about']));
  };

  const restoreAbout = () => {
    setAboutOpen(true);
    setAboutMinimized(false);
    setDockOrder((current) => current.filter((item) => item !== 'about'));
    navigate('/about');
  };

  const closeAbout = () => {
    setAboutOpen(false);
    setAboutMinimized(false);
    setDockOrder((current) => current.filter((item) => item !== 'about'));
    navigate('/');
  };

  const openProjects = (sectionId = 'html-css') => {
    setActiveSection(sectionId);
    setProjectsOpen(true);
    setProjectsMinimized(false);
    navigate('/projects');
  };

  const minimizeProjects = () => {
    setProjectsMinimized(true);
    setDockOrder((current) => (current.includes('projects') ? current : [...current, 'projects']));
  };

  const restoreProjects = () => {
    setProjectsOpen(true);
    setProjectsMinimized(false);
    setDockOrder((current) => current.filter((item) => item !== 'projects'));
    navigate('/projects');
  };

  const closeProjects = () => {
    setProjectsOpen(false);
    setProjectsMinimized(false);
    setDockOrder((current) => current.filter((item) => item !== 'projects'));
    navigate('/');
  };

  const openSkills = () => {
    setSkillsOpen(true);
    setSkillsMinimized(false);
    navigate('/skills');
  };

  const minimizeSkills = () => {
    setSkillsMinimized(true);
    setDockOrder((current) => (current.includes('skills') ? current : [...current, 'skills']));
  };

  const restoreSkills = () => {
    setSkillsOpen(true);
    setSkillsMinimized(false);
    setDockOrder((current) => current.filter((item) => item !== 'skills'));
    navigate('/skills');
  };

  const closeSkills = () => {
    setSkillsOpen(false);
    setSkillsMinimized(false);
    setDockOrder((current) => current.filter((item) => item !== 'skills'));
    navigate('/');
  };

  const openEducation = () => {
    setEduOpen(true);
    setEduMinimized(false);
    navigate('/education');
  };

  const minimizeEducation = () => {
    setEduMinimized(true);
    setDockOrder((current) => (current.includes('education') ? current : [...current, 'education']));
  };

  const restoreEducation = () => {
    setEduOpen(true);
    setEduMinimized(false);
    setDockOrder((current) => current.filter((item) => item !== 'education'));
    navigate('/education');
  };

  const closeEducation = () => {
    setEduOpen(false);
    setEduMinimized(false);
    setDockOrder((current) => current.filter((item) => item !== 'education'));
    navigate('/');
  };

  return {
    aboutOpen, aboutMinimized, openAbout, minimizeAbout, restoreAbout, closeAbout,
    projectsOpen, projectsMinimized, openProjects, minimizeProjects, restoreProjects, closeProjects,
    skillsOpen, skillsMinimized, openSkills, minimizeSkills, restoreSkills, closeSkills,
    eduOpen, eduMinimized, openEducation, minimizeEducation, restoreEducation, closeEducation,
    dockOrder, activeSection, setActiveSection
  };
};
