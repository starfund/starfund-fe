import React from 'react';

import './index.css';

const ParalaxHome = () => {
  return (
    <div className="parallax">
      <video autoPlay src={require('../assets/HomeVid.mp4')}>
        <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions" />
      </video>
    </div>
  );
};

export default ParalaxHome;
