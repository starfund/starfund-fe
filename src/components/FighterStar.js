import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useIntl } from 'react-intl';
import { useParams, useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useSession } from 'hooks';
import { getFighters } from '../state/actions/fighterActions';

import { getSubscriptions } from '../state/actions/subscriptionActions';

import Slider from './common/Slider';
import ConfirmationModal from './common/ConfirmationModal';
import BillingForm from './BillingForm';
import HowItWorks from './HowItWorks';
import FighterVideos from './FighterVideos';
import HomeExclusive from './HomeExclusive';
import HomeFooter from './HomeFooter';

import Email from '../assets/Email.svg';
import Pin from '../assets/Pin.svg';
import VideoCamera from '../assets/VideoCamera.svg';

import '../styles/components/_home-starts.scss';

const FighterStar = () => {
  const { id } = useParams();
  const intl = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const { authenticated } = useSession();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [videos, setVideos] = useState(false);
  useEffect(() => {
    dispatch(getFighters());
  }, [dispatch]);
  useEffect(() => {
    if (authenticated) {
      dispatch(getSubscriptions());
    }
  }, [authenticated, dispatch]);
  const fighters = useSelector(state => state.fighters.fighters);
  const supporting = useSelector(state => state.subscriptions?.subscriptions);
  const fighter = useSelector(
    state => state.fighters.fighters.filter(f => f.id == parseInt(id))[0]
  );
  const currentUser = useSelector(state => state.session.user);

  return (
    <div className="fighter-container">
      <div className="cover-container">
        <img className="fighter-cover" src={fighter?.coverPhoto} alt="Cover" />
        {fighter && (
          <div className="centered">
            <br />
            <br />
            <p>
              {' '}
              {fighter.firstName} {fighter.lastName}{' '}
            </p>
            {authenticated &&
              supporting &&
              fighter &&
              !supporting.filter(s => s.fighter.id === fighter.id).length > 0 && (
                <button
                  type="button"
                  className="btn btn-danger btn-lg"
                  onClick={() => setModalIsOpen(true)}
                >
                  {intl.formatMessage({ id: 'button.subscribe' })}
                </button>
              )}
            {!authenticated && (
              <button
                type="button"
                className="btn btn-danger btn-lg"
                onClick={() => setModalIsOpen(true)}
              >
                {intl.formatMessage({ id: 'button.subscribe' })}
              </button>
            )}
          </div>
        )}
      </div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="" onClick={() => setVideos(false)}>
                {intl.formatMessage({ id: 'header.home' })}{' '}
                <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => setVideos(true)}>
                {intl.formatMessage({ id: 'header.videos' })}
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {!videos && (
        <div className="container">
          <div className="main-content row">
            <div className="how-it-works offset-lg-1 col-sm-12 col-md-4 col-lg-3">
              <div className="content">
                <p className="bold"> {intl.formatMessage({ id: 'fighter.howItWorks.title' })} </p>
                <br />
                <br />
                <div className="text">
                  <img src={VideoCamera} alt="bcm" />
                  <p>{intl.formatMessage({ id: 'fighter.howItWorks.item1' })}</p>
                </div>
                <br />
                <br />
                <div className="text">
                  <img src={Pin} alt="bpj" />
                  <p>{intl.formatMessage({ id: 'fighter.howItWorks.item2' })}</p>
                </div>
                <br />
                <br />
                <div className="text">
                  <img src={Email} alt="cwm" />
                  <p>{intl.formatMessage({ id: 'fighter.howItWorks.item3' })}</p>
                </div>
              </div>
              <br />
              {authenticated &&
                supporting &&
                fighter &&
                !supporting.filter(s => s.fighter.id === fighter.id).length > 0 && (
                  <button
                    type="button"
                    className="btn btn-danger btn-lg"
                    onClick={() => setModalIsOpen(true)}
                  >
                    {intl.formatMessage({ id: 'button.subscribeNow' })}
                  </button>
                )}
              {!authenticated && (
                <button
                  type="button"
                  className="btn btn-danger btn-lg"
                  onClick={() => setModalIsOpen(true)}
                >
                  {intl.formatMessage({ id: 'button.subscribeNow' })}
                </button>
              )}
            </div>
            <div className="col-sm-12 col-md-8">
              {fighter && (
                <ReactPlayer
                  title="preview"
                  width="100%"
                  height="80%"
                  url={fighter.publicVideos[0]?.url}
                  controls
                />
              )}
              <p className="video-text">{intl.formatMessage({ id: 'fighter.videoPreview' })}</p>
            </div>
          </div>
          {authenticated &&
            supporting &&
            fighter &&
            !supporting.filter(s => s.fighter.id === fighter.id).length > 0 && (
              <div className="container">
                <HowItWorks />
                <HomeExclusive />
              </div>
            )}
          {!authenticated && (
            <div className="container">
              <HowItWorks />
              <HomeExclusive />
            </div>
          )}
        </div>
      )}
      {videos && <FighterVideos fighter={fighter} supporting={supporting} />}
      <div className="stars-container">
        <h2>{intl.formatMessage({ id: 'fighter.discoverMore' })}</h2>
        <div className="fighters-container fighters-slider-wrapper">
          <Slider>
            {fighters.length > 0 &&
              fighters
                .filter(f => f.id !== fighter.id)
                .map(f => (
                  <a
                    key={f.id}
                    className="fighter-card-link"
                    href=""
                    onClick={() => history.push(`/fighter/${f.id}`)}
                  >
                    <div key={f.id} className="fighter-card">
                      <img className="fighter-card-image" src={f?.profilePicture} alt="Card cap" />
                      <div className="fighter-card-overlay">
                        <div className="fighter-card-name-wrapper">
                          <span className="fighter-card-text">{f.firstName} </span>
                          <span className="fighter-card-text secondary">{f.lastName} </span>
                        </div>
                        <div className="fighter-card-separator" />
                        <span className="fighter-card-text">{f.organization} </span>
                      </div>
                    </div>
                  </a>
                ))}
          </Slider>
        </div>
      </div>
      <HomeFooter />
      <ConfirmationModal
        title={intl.formatMessage({ id: 'billing.title' })}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        isDelete={false}
        price={fighter?.subPrice}
        email={currentUser?.email}
        fighter={fighter?.id}
      >
        <BillingForm email={currentUser?.email} fighter={fighter?.id} />
      </ConfirmationModal>
    </div>
  );
};

export default FighterStar;
