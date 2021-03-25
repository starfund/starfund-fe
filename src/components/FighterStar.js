import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useSession } from 'hooks';

import HomeExclusive from './HomeExclusive';
import HomeFooter from './HomeFooter';
import Slider from './common/Slider';
import { getFighters } from '../state/actions/fighterActions';
import { getSubscriptions } from '../state/actions/subscriptionActions';
import ConfirmationModal from './common/ConfirmationModal';
import BillingForm from './BillingForm';
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
            {fighter.firstName} {fighter.lastName}
            <br />
            <div className="small-blank-line" />
            {fighter.organization}
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
        )}
      </div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="" onClick={() => history.push('/fighters')}>
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="" onClick={() => history.push('/about-us')}>
                Videos
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="main-content">
        <div className="how-it-works">
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
        <div className="video">
          {fighter && (
            <video
              title="preview"
              width="925"
              height="552"
              src={fighter.publicVideos[0]?.url}
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
