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
    />
  );
};

export default Home;