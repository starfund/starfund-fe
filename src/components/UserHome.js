import React from 'react';

const UserHome = () => {
  return (
    <div className="user-home">
      <div className="container">
        <div className="row">
          <div className="col-sm-2 col-lg-2">
            <div className="user-avatar">
              <div className="blank-line" />
              <h3> SUPPORTING </h3>
              <div className="blank-line" />
            </div>
          </div>
          <div className="col-sm-8 col-lg-8">user feed</div>
          <div className="col-sm-2 col-lg-2">
            <div className="find-athletes">
              <h4> FIND ATHLETES YOU LOVE </h4>
              <div className="blank-line" />
              <p> Search your favorite Athletes to find them the need your support. </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
