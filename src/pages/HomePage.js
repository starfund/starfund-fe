import React from 'react';

import ParalaxHome from '../components/ParalaxHome';
import HomeStars from '../components/HomeStars';
import HomeInfo from '../components/HomeInfo';
import HomeFooter from '../components/HomeFooter';

const HomePage = () => {
  return (
    <div className="home">
      <ParalaxHome />
      <HomeStars />
      <HomeInfo />
      <HomeFooter />
    </div>
  );
};

export default HomePage;
