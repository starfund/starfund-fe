import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import { modalStyles } from './styles';
import { useMediaQuery } from '../../../utils/mediaHoc';

import SupportedCards from '../../../assets/ccs.png';
import './index.css';

const ConfirmationModal = ({ children, title, isOpen, setIsOpen, price, email, fighter }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const height = isMobile ? '100%' : '460px';
  const width = isMobile ? '100%' : '760px';
  const styles = modalStyles(
    isMobile,
    height,
    width,
    '20px 24px 16px 24px',
    isMobile ? '0' : '40%',
    isMobile ? '0' : '50%'
  );
  const subPrice = price ? `$${price / 100}` : '$5';
  const newUser = useSelector(state => state.subscriptions.newUser);
  const shouldUpdatePassword = useSelector(state => state.subscriptions.shouldUpdatePassword);

  return (
    <Modal
      isOpen={isOpen}
      style={styles}
      ariaHideApp={false}
      shouldCloseOnOverlayClick
      onRequestClose={() => setIsOpen(false)}
    >
      <div className="confirmation_modal_container">
        <div className="confirm_modal_title">
          {newUser && shouldUpdatePassword && (
            <React.Fragment>
              <h2> Select your password to finish your account </h2>
            </React.Fragment>
          )}
          {!newUser && (
            <React.Fragment>
              {title}
              <p> Total Billed Today: {subPrice}</p>
              <p> Email you will recieve your bill: {email} </p>
            </React.Fragment>
          )}
        </div>
        {children}
        {!newUser && (
          <div className="confirm_modal_footer">
            <div className="container">
              <div className="row">
                <div className="col-sm-3 ">
                  <p className="big"> 100% GUARANTEED </p>
                </div>
                <div className="col-sm-4 offset-sm-1">
                  <p className="pad-20"> SECURED WITH SSL </p>
                  <br />
                  <img src={SupportedCards} alt="Supported cards" />
                </div>
                <div className="col-sm-3">
                  <p className="pad-20"> Have a question? </p>
                  <p> starfundapp@gmail.com </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func
};

export default ConfirmationModal;
