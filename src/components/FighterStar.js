import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getFighters } from '../state/actions/fighterActions';
import ConfirmationModal from './common/ConfirmationModal';
import BillingForm from './BillingForm';
import Chat from '../assets/Chat.png';
import Journey from '../assets/Journey.png';
import Unlock from '../assets/Unlock.png';
import Badge from '../assets/Badge.png';
import CreditCard from '../assets/CreditCard.png';
import Signature from '../assets/Signature.png';
import NewsPaper from '../assets/NewsPaper.png';

const FighterStar = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(() => {
    dispatch(getFighters());
  }, [dispatch]);
  const fighter = useSelector(state => state.fighters.fighters[parseInt(id, 0)]);

  return (
    <div className="fighter-container">
      <img className="fighter-cover" src={fighter?.coverPhoto} alt="Cover" />
      <div className="presentation-card">
        <button type="button" className="btn btn-light">
          STATISTICS
        </button>
        <div className="avatar-info">
          <img className="fighter-avatar" src={fighter?.profilePicture} alt="Avatar" />
          <p className="bold">
            {fighter?.firstName} {fighter?.lastName}
          </p>
          <div className="red-line" />
          <p> {fighter?.organization} FIGHTER </p>
        </div>
        <button type="button" className="btn btn-light">
          VIDEOS
        </button>
        <button type="button" className="btn btn-light">
          DIRECT CHAT
        </button>
      </div>
      <div className="main-content">
        <div className="how-it-works">
          <p className="bold"> Become an exclusive fan to </p>
          <br />
          <br />
          <div className="text">
            <img src={Unlock} alt="bcm" />
            Unlock 20 exclusive posts
          </div>
          <div className="text">
            <img src={Journey} alt="bpj" />
            Be part of my journey
          </div>
          <div className="text">
            <img src={Chat} alt="cwm" />
            Chat with me Directly
          </div>
          <br />
          <br />
          <button type="button" className="btn btn-danger" onClick={() => setModalIsOpen(true)}>
            SUBSCRIBE
          </button>
        </div>
        <iframe
          title="preview"
          width="860"
          height="515"
          src={fighter?.previewUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="foot-banner">
        <h2 className="bold"> GET STARTED IN 2 MINUTES </h2>
        <br />
        <div className="text">
          <div>
            <img src={Signature} alt="cwm" />
            <p> Choose Membership </p>
          </div>
          <div>
            <img src={NewsPaper} alt="cwm" />
            <p> Sign Up </p>
          </div>
          <div>
            <img src={CreditCard} alt="cwm" />
            <p> Add Payment Method </p>
          </div>
          <div>
            <img src={Badge} alt="cwm" />
            <p> Get Benefits </p>
          </div>
        </div>
      </div>
      <ConfirmationModal
        title="MONTHLY MEMBERSHIP"
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        isDelete={false}
        confirmationAction={() => console.log}
      >
        <BillingForm />
      </ConfirmationModal>
    </div>
  );
};

export default FighterStar;
