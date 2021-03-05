import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import { modalStyles } from './styles';
import { useMediaQuery } from '../../../utils/mediaHoc';

import './index.css';

const CommonModal = ({ children, title, isOpen, setIsOpen }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const height = isMobile ? '100%' : '212';
  const width = isMobile ? '100%' : '400px';
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
        <div className="modal_title">{title}</div>
        {children}
      </div>
    </Modal>
  );
};

CommonModal.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func
};

export default CommonModal;
