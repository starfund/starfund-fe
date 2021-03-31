import React from 'react';

import { Link } from 'react-router-dom';
import { bool, func } from 'prop-types';
import { useIntl } from 'react-intl';

import '../styles/components/common/_subscribe-cta.scss';

const SubscribeCallToAction = ({ visible, onClose }) => {
  const intl = useIntl();
  return (
    <div className={`subscribe-cta ${visible && 'visible'}`}>
      <button className="subscribe-cta-close-btn" onClick={onClose} alt="close cta" type="button">
        x
      </button>
      <span className="subscribe-cta-text">{intl.formatMessage({ id: 'cta.text' })}</span>
      <Link to="/fighters" type="button" className="subscribe-cta-button">
        {intl.formatMessage({ id: 'button.subscribe' })}
      </Link>
    </div>
  );
};

SubscribeCallToAction.propTypes = {
  visible: bool.isRequired,
  onClose: func.isRequired
};

export default SubscribeCallToAction;
