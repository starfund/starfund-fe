import React, { useEffect, useState } from 'react';

import { useIntl, FormattedMessage } from 'react-intl';
import ReactPlayer from 'react-player';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { format } from 'date-fns';
import ReactGA from 'react-ga';

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

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6" onClick={() => setModalIsOpen(true)}>
          <img src={WinPrizes} alt="prizes" width="100%" height="100%" />
        </div>
        <div className="col-md-6 video-container">
          <LazyLoadComponent>
            <ReactPlayer
              title="prizes"
              width="760"
              height="515"
              playing
              muted
              loop
              playsInline
              defaultMuted
              url={require('../assets/HomeVideoBig.mp4')}
            />
          </LazyLoadComponent>
          <h2>
            <center>
              <FormattedMessage
                id="rewards.explain"
                values={{ date: format(new Date(2021, 5, 14), 'dd/MM/yyyy') }}
              />
            </center>
          </h2>
        </div>
      </div>
      <ConfirmationModal
        title={intl.formatMessage({ id: 'billing.title' })}
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
