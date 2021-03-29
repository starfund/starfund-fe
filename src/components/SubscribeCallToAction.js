import React from 'react';
import { Link } from 'react-router-dom';
import { bool, func } from 'prop-types';

import '../styles/components/common/_subscribe-cta.scss';

const SubscribeCallToAction = ({ visible, onClose }) => (
  <div className={`subscribe-cta ${visible && 'visible'}`}>
    <button className="subscribe-cta-close-btn" onClick={onClose} alt="close cta" type="button">
      x
    </button>
    <span className="subscribe-cta-text">
      Subscribe to get access to all athletes videos and exclusive content
    </span>
    <Link to="/fighters" type="button" className="subscribe-cta-button">
      SUBSCRIBE
    </Link>
  </div>
);

SubscribeCallToAction.propTypes = {
  visible: bool.isRequired,
  onClose: func.isRequired
};

export default SubscribeCallToAction;
