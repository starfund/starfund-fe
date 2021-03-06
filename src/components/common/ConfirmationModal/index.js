import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import { modalStyles } from './styles';
import { useMediaQuery } from '../../../utils/mediaHoc';

import './index.css';

const ConfirmationModal = ({ children, title, isOpen, setIsOpen }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const height = isMobile ? '100%' : '212';
  const width = isMobile ? '100%' : '560px';
  const styles = modalStyles(
    isMobile,
    height,
    width,
    '20px 24px 16px 24px',
    isMobile ? '0' : '40%',
    isMobile ? '0' : '50%'
  );

  return (
    <Modal
      isOpen={isOpen}
      style={styles}
      ariaHideApp={false}
      shouldCloseOnOverlayClick
      onRequestClose={() => setIsOpen(false)}
    >
      <div className="change-name-modal__container">
        <div className="confirm_modal_title">
          {title}
          <p> Total Billed Today: $5 </p>
        </div>
        {children}
        <div className="confirm_modal_title">
          <div className="container">
            <div className="row">
              <div className="col-sm-4 offset-sm-1 ">
                <p className="big"> 100% GUARANTEED </p>
              </div>
              <div className="col-sm-5 offset-sm-1">
                <i className="fas fa-shield-alt" />
                <p> Secured with SSL </p>
              </div>
            </div>
          </div>
        </div>
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
