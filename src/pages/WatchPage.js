import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import ReactGA from 'react-ga';

import { useIntl, FormattedMessage } from 'react-intl';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import ReactPlayer from 'react-player';

import SubscribeCallToAction from '../components/SubscribeCallToAction';
import HomeStars from '../components/HomeStars';
import HomeFooter from '../components/HomeFooter';

import { getFighters } from '../state/actions/fighterActions';

import 'styles/components/_watch-page.scss';

const WatchPage = () => {
  const intl = useIntl();
  const [ctaVisible, setCtaVisible] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getFighters(true));
  }, [dispatch]);
  const fighters = useSelector(state => state.fighters.fighters);

  const [url, setUrl] = useState('');
  const [currentFighter, setCurrentFighter] = useState(fighters[0] || {});
  useEffect(() => {
    setUrl(fighters[0]?.officialPreview);
    setCurrentFighter(fighters[0]);
  }, [fighters]);

  useEffect(() => {
    setTimeout(() => setCtaVisible(true), 5000);
  }, []);
  useEffect(() => {
    ReactGA.pageview(`/watch`);
  }, []);

  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  const fighterLink = fighter => {
    if (fighter.team) {
      return history.push(`/team/${fighter.team.name}`);
    }
    return history.push(`/fighter/${fighter.id}`);
  };

  return (
    <div className="watch-container">
      <h1>
        <FormattedMessage
          id="fighter.videos.title"
          values={{ fighterName: currentFighter?.firstName }}
        />
      </h1>
      <SubscribeCallToAction visible={ctaVisible} onClose={() => setCtaVisible(false)} />
      <br />
      {url && (
        <div className="fighter-video-overlay main-video">
          {isMobile && (
            <LazyLoadComponent>
              <ReactPlayer url={url} width="100%" height="380px" controls />
            </LazyLoadComponent>
          )}
          <div className="avatar-container">
            <Link className="fighter-link" onClick={() => fighterLink(currentFighter)}>
              <img
                className="fighter-avatar"
                src={currentFighter.coverPhoto}
                alt="fighter avatar"
              />
              {`${currentFighter.firstName} ${currentFighter.lastName}`}
            </Link>
          </div>
          {!isMobile && (
            <LazyLoadComponent>
              <ReactPlayer
                url={url}
                width="60%"
                height="60%"
                controls
                style={{ margin: '0 auto' }}
              />
            </LazyLoadComponent>
          )}
        </div>
      )}
      <div className="blank-line" />
      <div className="container">
        <div className="row flex">
          {fighters?.length > 0 &&
            fighters.map(f => (
              <div
                key={f.id}
                className="col-sm-4 fighter-watch"
                onClick={() => {
                  setUrl(f.officialPreview);
                  setCurrentFighter(f);
                }}
              >
                {f.officialPreview && (
                  <div className="fighter-video-overlay">
                    <LazyLoadComponent>
                      <ReactPlayer url={f.officialPreview} width="300" height="250" />
                    </LazyLoadComponent>
                    <div className="avatar-container">
                      <Link className="fighter-link" onClick={() => fighterLink(f)}>
                        <img
                          className="fighter-avatar small"
                          src={f.coverPhoto}
                          alt="fighter avatar"
                        />
                        <span>{`${f.firstName} ${f.lastName}`}</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      <br />
      <br />
      <HomeStars title={intl.formatMessage({ id: 'fighter.know' })} />
      <HomeFooter />
    </div>
  );
};

export default WatchPage;
