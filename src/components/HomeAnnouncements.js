import React from 'react';

import ContentMock1 from '../assets/ContentMock1.png';
import ContentMock2 from '../assets/ContentMock2.png';
import ContentMock3 from '../assets/ContentMock3.png';
import './index.css';

const HomeAnnouncements = () => {
  return (
    <div className="announcements-container">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 home-text">
            <h1> Fighter Announcement </h1>
            <br />
            <p>Empowering Stars and Entertaining Fans.</p>
            <div className="col-sm-12 offset-md-1 flex pictures">
              <div className="col-sm-12 col-md-6">
                <img src={ContentMock2} alt="Mock" />
              </div>
              <div className="col-sm-12 col-md-6">
                <img src={ContentMock3} alt="Mock" />
                <img src={ContentMock1} alt="Mock" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAnnouncements;
