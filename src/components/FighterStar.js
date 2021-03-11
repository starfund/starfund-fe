import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import HomeExclusive from './HomeExclusive';
import HomeFooter from './HomeFooter';
import { getFighters } from '../state/actions/fighterActions';
import ConfirmationModal from './common/ConfirmationModal';
import BillingForm from './BillingForm';
import Email from '../assets/Email.svg';
import Pin from '../assets/Pin.svg';
import VideoCamera from '../assets/VideoCamera.svg';
import Award from '../assets/Award.svg';
import Browser from '../assets/Browser.svg';
import Clicking from '../assets/Clicking.svg';
import Account from '../assets/Account.svg';

const FighterStar = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(() => {
    dispatch(getFighters());
  }, [dispatch]);
  const fighter = useSelector(
    state => state.fighters.fighters.filter(f => f.id == parseInt(id))[0]
  );

  return (
    <div className="fighter-container">
      <img className="fighter-cover" src={fighter?.coverPhoto} alt="Cover" />
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="" onClick={() => history.push('/fighters')}>
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="" onClick={() => history.push('/shop')}>
                Statistics
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="" onClick={() => history.push('/about-us')}>
                Videos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="" onClick={() => history.push('/about-us')}>
                Direct chat
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
          <button
            type="button"
            className="btn btn-danger btn-lg"
            onClick={() => setModalIsOpen(true)}
          >
            SUBSCRIBE NOW
          </button>
        </div>
        <div className="video">
          <iframe
            title="preview"
            width="760"
            height="515"
            src={fighter?.previewUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <p className="video-text">
            {' '}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
      <div className="stars-container">
        <h2> Explore Other Athletes </h2>
        <div className="fighters-container" />
      </div>
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
      <HomeFooter />
      <ConfirmationModal
        title="MONTHLY MEMBERSHIP"
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        isDelete={false}
        confirmationAction={() => console.log}
        price={fighter?.subPrice}
      >
        <BillingForm />
      </ConfirmationModal>
    </div>
  );
};

export default FighterStar;
