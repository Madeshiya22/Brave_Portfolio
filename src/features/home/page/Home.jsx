import React from 'react';
import Hero from '../components/Hero';

const Home = ({
  aboutOpen,
  aboutMinimized,
  onOpenAbout,
  onMinimizeAbout,
  onRestoreAbout,
  onCloseAbout,
  onOpenProjects,
  onOpenSkills,
  onPrefetchSkills,
  onOpenEducation,
}) => {
  return (
    <Hero
      aboutOpen={aboutOpen}
      aboutMinimized={aboutMinimized}
      onOpenAbout={onOpenAbout}
      onMinimizeAbout={onMinimizeAbout}
      onRestoreAbout={onRestoreAbout}
      onCloseAbout={onCloseAbout}
      onOpenProjects={onOpenProjects}
      onOpenSkills={onOpenSkills}
      onPrefetchSkills={onPrefetchSkills}
      onOpenEducation={onOpenEducation}
    />
  );
};

export default Home;