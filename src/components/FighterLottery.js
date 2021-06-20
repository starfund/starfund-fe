import React, { useEffect, useState } from 'react';

import { useIntl, FormattedMessage } from 'react-intl';
import { format } from 'date-fns';
import ReactGA from 'react-ga';
import { useMediaQuery } from 'react-responsive';

import { useSession } from 'hooks';
import ConfirmationModal from './common/ConfirmationModal';
import BillingForm from './BillingForm';

import WinPrizes from '../assets/WinPrizes.jpeg';
import Facebook from '../assets/Facebook.svg';
import Instagram from '../assets/Instagram.svg';
import './index.css';

const FighterLottery = () => {
  const intl = useIntl();
  const { authenticated } = useSession();
  const fighter = 6;
  const subPrice = 199;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    ReactGA.pageview('/rewards/');
  }, []);

  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6" onClick={() => !authenticated && setModalIsOpen(true)}>
          {!isMobile && (
            <div>
              <button
                type="button"
                disabled={authenticated}
                className={authenticated ? 'btn btn-secondary btn-lg' : 'btn btn-danger btn-lg'}
                onClick={() => setModalIsOpen(true)}
              >
                {intl.formatMessage({
                  id: authenticated ? 'button.subscribed' : 'button.participate'
                })}
              </button>
            </div>
          )}
          <br />
          <img src={WinPrizes} alt="prizes" width="100%" height="90%" />
        </div>
        {!isMobile && (
          <div className="col-md-5 text-container">
            <div className="">
              <h2>
                {' '}
                {intl.formatMessage({
                  id: authenticated ? 'rewards.refer.title' : 'rewards.title'
                })}{' '}
              </h2>
              <br />
              <p>
                {intl.formatMessage({
                  id: authenticated ? 'rewards.refer.explain' : 'rewards.explain'
                })}
              </p>
              <br />
              <br />
              <h2>
                <FormattedMessage
                  id={authenticated ? 'rewards.refer.date' : 'rewards.date'}
                  values={{ date: format(new Date(2021, 5, 27), 'MMMM do yyyy') }}
                />
              </h2>
              <br />
              <p>{intl.formatMessage({ id: 'rewards.result' })}</p>
              <br />
              <br />
              <div className="social">
                <img src={Instagram} alt="Instagram" />
                <a
                  className="social"
                  onClick={() => window.open('https://www.instagram.com/starfund.co/', '_blank')}
                >
                  starfund.co
                </a>
                <img src={Facebook} alt="Facebook" />
                <a
                  className="social"
                  onClick={() => window.open('http://facebook.com/starfundapp', '_blank')}
                >
                  starfundapp
                </a>
              </div>
            </div>
          </div>
        )}
        {isMobile && (
          <React.Fragment>
            <div className="center-text">
              {intl.formatMessage({
                id: authenticated ? 'rewards.refer.explain' : 'rewards.explain'
              })}
              <h3>
                <FormattedMessage
                  id={authenticated ? 'rewards.refer.date' : 'rewards.date'}
                  values={{ date: format(new Date(2021, 5, 14), 'MMMM do yyyy') }}
                />
              </h3>
              {intl.formatMessage({
                id: authenticated ? 'rewards.refer.result' : 'rewards.result'
              })}
            </div>
            <div className="center-button">
              <button
                type="button"
                disabled={authenticated}
                className={authenticated ? 'btn btn-secondary btn-lg' : 'btn btn-danger btn-lg'}
                onClick={() => setModalIsOpen(true)}
              >
                {intl.formatMessage({
                  id: authenticated ? 'button.subscribed' : 'button.participate'
                })}
              </button>
            </div>
            <div className="center-text social">
              <img src={Instagram} alt="Instagram" />
              <a
                className="social"
                onClick={() => window.open('https://www.instagram.com/starfund.co/', '_blank')}
              >
                starfund.co
              </a>
              <img src={Facebook} alt="Facebook" />
              <a
                className="social"
                onClick={() => window.open('http://facebook.com/starfundapp', '_blank')}
              >
                starfundapp
              </a>
            </div>
          </React.Fragment>
        )}
      </div>
      <ConfirmationModal
        title={intl.formatMessage({ id: 'billing.title' })}
        explain={intl.formatMessage({ id: 'rewards.billing.title' })}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        isDelete={false}
        price={subPrice}
      >
        <BillingForm fighter={fighter} type="subscription" />
      </ConfirmationModal>
    </div>
  );
};

export default FighterLottery;
