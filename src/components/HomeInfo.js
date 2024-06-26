import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useIntl } from 'react-intl';
import ReactPlayer from 'react-player';
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import SecondarySlider from './common/SecondarySlider';
import ConfirmationModal from './common/ConfirmationModal';
import BillingForm from './BillingForm';

import { smBreakpoint } from '../styles/_variables.scss';

import '../styles/components/_home-info.scss';

const initialDimensions = { width: 950, height: 501 };

const HomeInfo = () => {
  const intl = useIntl();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const fighters = useSelector(state => state.fighters.fighters);
  const [activeFighter, setActiveFighter] = useState();
  const [dimensions, setDimensions] = useState(initialDimensions);

  const thereWasRezise = () => {
    const { innerWidth: width } = window;
    if (width < smBreakpoint) {
      setDimensions({ width, height: 300 });
    } else if (width < 1200) {
      setDimensions({ width: 600, height: 400 });
    } else {
      setDimensions(initialDimensions);
    }
  };

  useEffect(() => {
    setActiveFighter(fighters[0]);
  }, [fighters]);

  useEffect(() => {
    thereWasRezise();

    window.addEventListener('resize', thereWasRezise);

    return () => window.removeEventListener('resize', thereWasRezise);
  }, []);

  return (
    <div className="info-container">
      <div className="">
        <div className="info-container-header">
          <div className="row text-row info-container-header-text">
            <div className="col-md-6">
              <h2 className="info-container-title">
                {intl.formatMessage({ id: 'home.info.title' })}
              </h2>
            </div>
            <div className="col-md-6 info-container-description">
              <p>{intl.formatMessage({ id: 'home.info.subTitle' })}</p>
            </div>
          </div>
          <div className="row">
            <ul className="info-container-fighters row">
              {!fighters && (
                <SkeletonTheme color="#202020" highlightColor="#444">
                  <Skeleton height="90vh" />
                </SkeletonTheme>
              )}
              {fighters &&
                fighters?.slice(0, 4).map(f => (
                  <li key={f.id} className="col-12 col-sm-6 col-lg-3">
                    <button
                      type="button"
                      onClick={() => setActiveFighter(f)}
                      className={`${
                        activeFighter?.id === f.id ? 'active' : ''
                      } info-fighter-wrapper`}
                    >
                      <LazyLoadImage
                        src={f.profilePicture}
                        className="info-fighter-avatar"
                        alt="fighter-avatar"
                      />
                      <span className="" aria-current="page">
                        {`${f.firstName} ${f.lastName}`}
                      </span>
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <SecondarySlider>
          {fighters &&
            activeFighter &&
            fighters
              .filter(f => f.id == activeFighter.id)[0]
              .publicVideos.filter(c => !!c.video)
              .map((v, index) => (
                <div className="homeinfo-slider-card slide-left" key={index}>
                  <LazyLoadComponent>
                    <ReactPlayer
                      title="fighter-video"
                      className="homeinfo-slider-video"
                      controls
                      autoPlay
                      url={v.video}
                      width={dimensions.width}
                      height={dimensions.height}
                    />
                  </LazyLoadComponent>
                  <div onClick={() => setModalIsOpen(true)}>
                    <div className="homeinfo-slider-card-overlay">
                      <span className="no-wrap">
                        {intl.formatMessage({ id: 'home.preview.text' })}
                      </span>
                      <span>{intl.formatMessage({ id: 'home.subscribe.text' })}</span>
                    </div>
                  </div>
                </div>
              ))}
        </SecondarySlider>
      </div>
      <ConfirmationModal
        title={intl.formatMessage({ id: 'billing.title' })}
        explain={intl.formatMessage({ id: 'modal.header.explain' })}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        isDelete={false}
        price={activeFighter?.subPrice}
        fighter={activeFighter?.id}
      >
        <BillingForm fighter={activeFighter?.id} type="subscription" subscriptionType="monthly" />
      </ConfirmationModal>
    </div>
  );
};

export default HomeInfo;
