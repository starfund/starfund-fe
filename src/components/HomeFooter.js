import React from 'react';

import './index.css';

const HomeFooter = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row footer-header">
          <div className="col-md-3">
            <p> Explore </p>
          </div>
          <div className="col-md-3">
            <p> About </p>
          </div>
          <div className="col-md-3">
            <p> Social </p>
          </div>
          <div className="col-md-3">
            <p> Join Us </p>
          </div>
        </div>
        <div className="row row-1">
          <div className="col-md-3">
            <p> Athletes </p>
          </div>
          <div className="col-md-3">
            <p> Who we are </p>
          </div>
          <div className="col-md-3">
            <p> Instagram </p>
          </div>
          <div className="col-md-3">
            <button type="button" className="btn btn-lg">
              {' '}
              ENROLL AS STAR{' '}
            </button>
          </div>
        </div>
        <div className="row row-1">
          <div className="col-md-3">
            <p> Shop </p>
          </div>
          <div className="col-md-3">
            <p> Career </p>
          </div>
          <div className="col-md-3">
            <p> Youtube </p>
          </div>
          <div className="col-md-3" />
        </div>
        <div className="row row-1">
          <div className="col-md-3">
            <p> Watch </p>
          </div>
          <div className="col-md-3">
            <p> News </p>
          </div>
          <div className="col-md-3">
            <p> Facebook </p>
          </div>
          <div className="col-md-3" />
        </div>
        <div className="row language-row">
          <div className="col-md-3" />
          <div className="col-md-3" />
          <div className="col-md-3" />
          <div className="col-md-3" />
        </div>
        <div className="row">
          <a href="/terms"> Terms & Conditions </a>
          <a href="/privacy"> Privacy Policy </a>
          <a href="/help"> Help & Support </a>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
