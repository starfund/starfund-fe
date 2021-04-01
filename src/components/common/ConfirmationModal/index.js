import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { useStatus, SUCCESS } from '@rootstrap/redux-tools';

import { subscribe, updatePassword } from 'state/actions/subscriptionActions';
import { modalStyles } from './styles';
import { useMediaQuery } from '../../../utils/mediaHoc';

import SupportedCards from '../../../assets/ccs.png';
import './index.css';

const ConfirmationModal = ({ children, title, isOpen, setIsOpen, price }) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const history = useHistory();
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
  const { status: subStatus } = useStatus(subscribe);
  const { status: updateStatus } = useStatus(updatePassword);
  const authenticated = useSelector(state => state.session.authenticated);

  const subPrice = price ? `$${price / 100}` : '$5';
  const newUser = useSelector(state => state.subscriptions.newUser);
  const shouldUpdatePassword = useSelector(state => state.subscriptions.shouldUpdatePassword);

  useEffect(() => {
    if (!shouldUpdatePassword && authenticated) {
      if (subStatus === SUCCESS) {
        dispatch(subscribe.reset());
        setIsOpen(false);
      }
    }

    if (authenticated && updateStatus === SUCCESS) {
      dispatch(updatePassword.reset());
      setIsOpen(false);
      window.location.href = '/dashboard';
    }
  }, [
    authenticated,
    dispatch,
    setIsOpen,
    shouldUpdatePassword,
    newUser,
    updateStatus,
    subStatus,
    history
  ]);

  return (
    <Modal
      isOpen={isOpen}
      style={styles}
      ariaHideApp={false}
      onRequestClose={() => setIsOpen(false)}
    >
      <div className="confirmation_modal_container">
        <div className="confirm_modal_title">
          {newUser && shouldUpdatePassword && (
            <React.Fragment>
              <h2> {intl.formatMessage({ id: 'modal.header.selectPassword' })} </h2>
            </React.Fragment>
          )}
          {!newUser && (
            <React.Fragment>
              <h2>{title}</h2>
              <p>
                {' '}
                {intl.formatMessage({ id: 'modal.header.totalBilled' })} {subPrice}
              </p>
            </React.Fragment>
          )}
        </div>
        {children}
        {!newUser && (
          <div className="confirm_modal_footer">
            <div className="container">
              <div className="row">
                <div className="col-sm-3 ">
                  <p className="big">
                    {' '}
                    100% {intl.formatMessage({ id: 'modal.footer.guaranteed' })}{' '}
                  </p>
                </div>
                <div className="col-sm-4 offset-sm-1">
                  <p className="pad-20"> {intl.formatMessage({ id: 'modal.footer.secured' })} </p>
                  <br />
                  <img src={SupportedCards} alt="Supported cards" />
                </div>
                <div className="col-sm-3">
                  <p className="pad-20"> {intl.formatMessage({ id: 'modal.footer.question' })} </p>
                  <p className="email-pad"> starfundapp@gmail.com </p>
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
