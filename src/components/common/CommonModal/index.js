import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import { useStatus, SUCCESS } from '@rootstrap/redux-tools';
import { createCard } from 'state/actions/billingActions';

import { modalStyles } from './styles';
import { useMediaQuery } from '../../../utils/mediaHoc';

import './index.css';

const CommonModal = ({ children, title, isOpen, setIsOpen, customWidth, customHeight }) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const height = isMobile ? '100%' : customHeight || '420';
  const width = isMobile ? '100%' : customWidth || '400px';
  const styles = modalStyles(
    isMobile,
    height,
    width,
    '20px 24px 16px 24px',
    isMobile ? '0' : '40%',
    isMobile ? '0' : '50%'
  );
  const { status: cardStatus } = useStatus(createCard);

  useEffect(() => {
    if (cardStatus === SUCCESS) {
      dispatch(createCard.reset());
      setIsOpen(false);
    }
  }, [cardStatus, dispatch, setIsOpen]);

  return (
    <Modal
      isOpen={isOpen}
      style={styles}
      ariaHideApp={false}
      shouldCloseOnOverlayClick
      onRequestClose={() => setIsOpen(false)}
    >
      <div className="change-name-modal__container">
        <div className="modal_title">
          {title}
          <button
            type="button"
            aria-label="Close"
            className="modal_close close"
            onClick={() => setIsOpen(false)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
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
