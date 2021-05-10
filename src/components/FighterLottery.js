import React, { useEffect, useState } from 'react';

import { useIntl, FormattedMessage } from 'react-intl';
import { format } from 'date-fns';
import ReactGA from 'react-ga';
import { useMediaQuery } from 'react-responsive';

import ConfirmationModal from './common/ConfirmationModal';
import BillingForm from './BillingForm';

import WinPrizes from '../assets/WinPrizes.png';
import './index.css';

const FighterLottery = () => {
  const intl = useIntl();
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
        <div className="col-md-6" onClick={() => setModalIsOpen(true)}>
          <img src={WinPrizes} alt="prizes" width="100%" height="100%" />
        </div>
        {!isMobile && (
          <div className="col-md-6">
            <h2>
              <center>
                <FormattedMessage
                  id="rewards.title"
                  values={{ date: format(new Date(2021, 5, 14), 'dd/MM/yyyy') }}
                />
              </center>
            </h2>
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
