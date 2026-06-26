import React, { Suspense, lazy } from 'react';
import { FolderOpen, User, Code2, BookOpen } from 'lucide-react';
import useLenis from './hooks/useLenis';
import Home from './features/home/page/Home';
import Projects from './features/projects/page/Projects';
import DesktopDock from './features/home/components/DesktopDock';
import profileImage from './assets/rahul.png';
import { ABOUT_CONTENT } from './features/about/utils/aboutContent';
import { projectSections } from './data';
import { CursorProvider } from './context/CursorContext';
import CustomCursor from './components/Cursor/CustomCursor';
import { useWindowManager } from './hooks/useWindowManager';

const Skills    = lazy(() => import('./features/skills/page/Skills'));
const Education = lazy(() => import('./features/education/page/Education'));

const preloadSkills = () => { void import('./features/skills/page/Skills'); };
const preloadEdu    = () => { void import('./features/education/page/Education'); };

function App() {
  useLenis();
  const {
    aboutOpen, aboutMinimized, openAbout, minimizeAbout, restoreAbout, closeAbout,
    projectsOpen, projectsMinimized, openProjects, minimizeProjects, restoreProjects, closeProjects,
    skillsOpen, skillsMinimized, openSkills, minimizeSkills, restoreSkills, closeSkills,
    eduOpen, eduMinimized, openEducation, minimizeEducation, restoreEducation, closeEducation,
    dockOrder, activeSection, setActiveSection
  } = useWindowManager();

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
          image: undefined,
          previewTone: 'skills',
          onRestore: restoreSkills,
          onClose: closeSkills,
        };
      }

      if (itemId === 'education' && eduOpen && eduMinimized) {
        return {
          id: 'education',
          label: 'Education',
          icon: BookOpen,
          previewTitle: 'My Academic Journey',
          previewSubtitle: 'CEC • ThinkNext • Sheryians',
          previewAlt: 'Education preview',
          image: undefined,
          previewTone: 'education',
          onRestore: restoreEducation,
          onClose: closeEducation,
        };
      }

      return null;
    })
    .filter(Boolean);

  return (
    <CursorProvider>
      <CustomCursor />
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
          onPrefetchSkills={preloadSkills}
          onOpenEducation={openEducation}
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
          <Suspense fallback={null}>
            <Skills
              onClose={closeSkills}
              onMinimize={minimizeSkills}
              isMinimized={skillsMinimized}
            />
          </Suspense>
        )}
        {eduOpen && (
          <Suspense fallback={null}>
            <Education
              onClose={closeEducation}
              onMinimize={minimizeEducation}
              isMinimized={eduMinimized}
            />
          </Suspense>
        )}
        <DesktopDock items={dockItems} />
      </main>
    </CursorProvider>
  );
}

export default App;
