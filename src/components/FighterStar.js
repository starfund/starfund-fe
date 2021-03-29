import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useParams, useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useSession } from 'hooks';
import { getFighters } from '../state/actions/fighterActions';

import { getSubscriptions } from '../state/actions/subscriptionActions';

import Slider from './common/Slider';
import ConfirmationModal from './common/ConfirmationModal';
import BillingForm from './BillingForm';
import FighterVideos from './FighterVideos';
import HomeExclusive from './HomeExclusive';
import HomeFooter from './HomeFooter';

import Email from '../assets/Email.svg';
import Pin from '../assets/Pin.svg';
import VideoCamera from '../assets/VideoCamera.svg';
import Award from '../assets/Award.svg';
import Browser from '../assets/Browser.svg';
import Clicking from '../assets/Clicking.svg';
import Account from '../assets/Account.svg';

import '../styles/components/_home-starts.scss';

const FighterStar = () => {
  const { id } = useParams();
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
                  SUBSCRIBE
                </button>
              )}
            {!authenticated && (
              <button
                type="button"
                className="btn btn-danger btn-lg"
                onClick={() => setModalIsOpen(true)}
              >
                SUBSCRIBE
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
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => setVideos(true)}>
                Videos
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
                <p className="bold"> How does it work? </p>
                <br />
                <br />
                <div className="text">
                  <img src={VideoCamera} alt="bcm" />
                  <p>Unlock 20 exclusive posts</p>
                </div>
                <br />
                <br />
                <div className="text">
                  <img src={Pin} alt="bpj" />
                  <p>Be part of my journey</p>
                </div>
                <br />
                <br />
                <div className="text">
                  <img src={Email} alt="cwm" />
                  <p>Chat with me Directly</p>
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
                    SUBSCRIBE NOW
                  </button>
                )}
              {!authenticated && (
                <button
                  type="button"
                  className="btn btn-danger btn-lg"
                  onClick={() => setModalIsOpen(true)}
                >
                  SUBSCRIBE NOW
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
              <p className="video-text">
                {' '}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
          {authenticated &&
            supporting &&
            fighter &&
            !supporting.filter(s => s.fighter.id === fighter.id).length > 0 && (
              <React.Fragment>
                <div className="foot-banner">
                  <h2 className="bold"> Get started in 2 minutes </h2>
                  <br />
                  <div className="text">
                    <div>
                      <img src={Clicking} alt="cwm" />
                      <p> Choose Membership </p>
                    </div>
                    <div>
                      <img src={Account} alt="cwm" />
                      <p> Create Account </p>
                    </div>
                    <div>
                      <img src={Browser} alt="cwm" />
                      <p> Add Payment Method </p>
                    </div>
                    <div>
                      <img src={Award} alt="cwm" />
                      <p> Get Benefits </p>
                    </div>
                  </div>
                </div>
                <HomeExclusive />
              </React.Fragment>
            )}
          {!authenticated && (
            <div className="container">
              <div className="foot-banner">
                <div className="col-12">
                  <h2 className="bold"> Get started in 2 minutes </h2>
                  <br />
                  <div className="text row">
                    <div className="col-5 col-md-3">
                      <img src={Clicking} alt="cwm" />
                      <p> Choose Membership </p>
                    </div>
                    <div className="col-5 col-md-2">
                      <img src={Account} alt="cwm" />
                      <p> Create Account </p>
                    </div>
                    <div className="col-5 col-md-2">
                      <img src={Browser} alt="cwm" />
                      <p> Add Payment Method </p>
                    </div>
                    <div className="col-5 col-md-2">
                      <img src={Award} alt="cwm" />
                      <p> Get Benefits </p>
                    </div>
                  </div>
                </div>
              </div>
              <HomeExclusive />
            </div>
          )}
        </div>
      )}
      {videos && <FighterVideos fighter={fighter} supporting={supporting} />}
      <div className="stars-container">
        <h2> Explore Other Athletes </h2>
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
        title="MONTHLY MEMBERSHIP"
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
