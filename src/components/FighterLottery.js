import React, { useEffect, useState } from 'react';

import { useIntl, FormattedMessage } from 'react-intl';
import { format } from 'date-fns';
import ReactGA from 'react-ga';
import { useMediaQuery } from 'react-responsive';

import { useSession } from 'hooks';
import ConfirmationModal from './common/ConfirmationModal';
import BillingForm from './BillingForm';

import WinPrizes from '../assets/WinPrizes.png';
import './index.css';

const FighterLottery = () => {
  const intl = useIntl();
  const { authenticated } = useSession();
  const fighter = 2;
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
          <img src={WinPrizes} alt="prizes" width="100%" height="100%" />
        </div>
        {!isMobile && (
          <div className="col-md-6">
            <h2>
              <center>
                <FormattedMessage
                  id={authenticated ? 'rewards.refer' : 'rewards.title'}
                  values={{ date: format(new Date(2021, 5, 14), 'dd/MM/yyyy') }}
                />
              </center>
            </h2>
          </div>
        )}
        {!authenticated && (
          <div className="center">
            <button
              type="button"
              className="btn btn-danger btn-lg"
              onClick={() => setModalIsOpen(true)}
            >
              {intl.formatMessage({ id: 'button.subscribeNow' })}
            </button>
          </div>
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
        <BillingForm fighter={fighter} />
      </ConfirmationModal>
    </div>
  );
};

export default FighterLottery;
