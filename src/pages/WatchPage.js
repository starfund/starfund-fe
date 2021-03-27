import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ReactPlayer from 'react-player';

import SubscribeCallToAction from '../components/SubscribeCallToAction';
import HomeStars from '../components/HomeStars';

import { getFighters } from '../state/actions/fighterActions';

import 'styles/components/_watch-page.scss';

const WatchPage = () => {
  const [ctaVisible, setCtaVisible] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFighters());
  }, [dispatch]);
  const fighters = useSelector(state => state.fighters.fighters);

  const [url, setUrl] = useState('');
  useEffect(() => {
    setUrl(fighters[0]?.publicVideos[0]?.url);
  }, [fighters]);

  useEffect(() => {
    setTimeout(() => setCtaVisible(true), 5000);
  }, []);

  const CurrentFighter = fighters[0] || {};

  return (
    <div className="watch-container">
      <h1> Watch Featured Videos </h1>
      <SubscribeCallToAction visible={ctaVisible} onClose={() => setCtaVisible(false)} />
      <br />
      {url && (
        <div className="fighter-video-overlay">
          <div className="avatar-container">
            <img className="fighter-avatar" src={CurrentFighter.coverPhoto} alt="fighter avatar" />
            <span>{`${CurrentFighter.firstName} ${CurrentFighter.lastName}`}</span>
          </div>
          <ReactPlayer url={url} width="100%" height="380" controls />
        </div>
      )}
      <div className="flex">
        {fighters?.length > 0 &&
          fighters.map(
            f =>
              f.publicVideos && (
                <div
                  key={f.id}
                  className="col-sm-4 fighter-watch"
                  onClick={() => setUrl(f.publicVideos[0]?.url)}
                >
                  <div className="fighter-video-overlay">
                    <ReactPlayer url={f.publicVideos[0]?.url} width="300" height="250" />
                    {f.publicVideos[0]?.url && (
                      <div className="avatar-container">
                        <img
                          className="fighter-avatar small"
                          src={CurrentFighter.coverPhoto}
                          alt="fighter avatar"
                        />
                        <span>{`${CurrentFighter.firstName} ${CurrentFighter.lastName}`}</span>
                      </div>
                    )}
                  </div>
                </div>
              )
          )}
      </div>
      <HomeStars title="Know The Athletes" />
    </div>
  );
};

export default WatchPage;
