import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { useStatus, SUCCESS, LOADING } from '@rootstrap/redux-tools';

import { subscribe, updatePassword, charge } from 'state/actions/subscriptionActions';
import { modalStyles } from './styles';
import { useMediaQuery } from '../../../utils/mediaHoc';

import SupportedCards from '../../../assets/ccs.png';
import './index.css';

const ConfirmationModal = ({
  children,
  title,
  explain,
  isOpen,
  setIsOpen,
  price,
  backFunction
}) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const history = useHistory();
  const isMobile = useMediaQuery('(max-width: 1024px)');
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
  const { status: subStatus } = useStatus(subscribe);
  const { status: updateStatus } = useStatus(updatePassword);
  const { status: chargeStatus } = useStatus(charge);
  const authenticated = useSelector(state => state.session.authenticated);

  const subPrice = price ? `$${price / 100}` : '$5';
  const newUser = useSelector(state => state.subscriptions.newUser);
  const shouldUpdatePassword = useSelector(state => state.subscriptions.shouldUpdatePassword);

  useEffect(() => {
    if (!shouldUpdatePassword && authenticated) {
      if (subStatus === SUCCESS) {
        dispatch(subscribe.reset());
        setIsOpen(false);
        window.location.reload();
      }
    }

    if (authenticated && updateStatus === SUCCESS) {
      dispatch(updatePassword.reset());
      setIsOpen(false);
      window.history.pushState({ new: true }, '', '/dashboard');
      window.location.reload();
    }

    if (!shouldUpdatePassword && authenticated) {
      if (chargeStatus === SUCCESS) {
        dispatch(charge.reset());
        setIsOpen(false);
        window.location.reload();
      }
    }

    if (authenticated && updateStatus === SUCCESS) {
      if (chargeStatus === SUCCESS) {
        dispatch(updatePassword.reset());
        setIsOpen(false);
        window.history.pushState({ new: true }, '', '/dashboard');
        window.location.reload();
      }
    }
  }, [
    authenticated,
    dispatch,
    setIsOpen,
    shouldUpdatePassword,
    newUser,
    updateStatus,
    subStatus,
    chargeStatus,
    history,
    intl
  ]);

  return (
    <Modal
      isOpen={isOpen}
      style={styles}
      ariaHideApp={false}
      onRequestClose={() => {
        setIsOpen(false);
        dispatch(subscribe.reset());
        dispatch(charge.reset());
      }}
    >
      <div className="confirmation_modal_container">
        <div className="confirm_modal_title">
          {(subStatus === LOADING || chargeStatus === LOADING) && (
            <React.Fragment>
              <h2> {intl.formatMessage({ id: 'modal.header.processing' })} </h2>
            </React.Fragment>
          )}
          {newUser && shouldUpdatePassword && (
            <React.Fragment>
              <h2> {intl.formatMessage({ id: 'modal.header.selectPassword' })} </h2>
            </React.Fragment>
          )}
          {!newUser && (
            <React.Fragment>
              {backFunction && (
                <button type="button" className="back-button" onClick={() => backFunction()}>
                  Back
                </button>
              )}
              <h3>
                <center>{explain}</center>
              </h3>
              <br />
              <h4>{title}</h4>
              {price && (
                <p>
                  {' '}
                  {intl.formatMessage({ id: 'modal.header.totalBilled' })} {subPrice}
                </p>
              )}
            </React.Fragment>
          )}
          <button
            type="button"
            aria-label="Close"
            className="modal_close close"
            onClick={() => {
              setIsOpen(false);
              dispatch(subscribe.reset());
              dispatch(charge.reset());
            }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        {children}
        {!newUser && (
          <div className="confirm_modal_footer">
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-4">
                  <p> {intl.formatMessage({ id: 'modal.footer.secured' })} </p>
                  <br />
                  <img src={SupportedCards} alt="Supported cards" />
                </div>
                <div className="col-sm-4">
                  <p className="big">
                    {' '}
                    100% {intl.formatMessage({ id: 'modal.footer.guaranteed' })}{' '}
                  </p>
                </div>
                <div className="col-sm-4">
                  <p> {intl.formatMessage({ id: 'modal.footer.question' })} </p>
                  <p className="email-pad"> info@starfund.app </p>
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
