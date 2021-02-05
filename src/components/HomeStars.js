import React from 'react';

const HomeStars = () => {
  return (
    <div>
      <h1> STARFUND STARS </h1>
      <div className="fighters-container">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(f => (
          <div key={f} className="card fighter-card">
            <img className="card-img-top" src="..." alt="Card cap" />
            <div className="card-body">
              <p className="card-text">ASDF movie</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeStars;
