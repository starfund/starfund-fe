import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import ReactPlayer from 'react-player';

import { useMediaQuery } from 'react-responsive';
import { formatDistance } from 'date-fns';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import ReactGA from 'react-ga';

import { formatTitle, formatDescription } from 'utils/translationsHelper';

const FighterVideos = ({ fighter, supporting, subscribeAction }) => {
  const intl = useIntl();
  const [url, setUrl] = useState(fighter.previewUrl);
  const payedFighter = supporting.map(sub => sub.fighter.id);
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  const endFreeVideo = () => {
    if (!payedFighter.includes(fighter.id)) {
      subscribeAction();
    }
  };
  const language = useSelector(state => state.language.language);
  ReactGA.modalview(`/fighter/${fighter.id}/videos`);

  return (
    <div className="fighter-videos">
      <h1>{intl.formatMessage({ id: 'fighter.videos.title' })}</h1>
      <br />
      <br />
      <LazyLoadComponent>
        <ReactPlayer
          url={url}
          width={isMobile ? '90%' : '80%'}
          controls
          playing
          muted
          style={{ margin: 'auto', minHeight: `${isMobile ? 'auto' : '550px'}` }}
          onEnded={endFreeVideo}
        />
      </LazyLoadComponent>
      <div className="blank-line" />
      <div className="container">
        <div className="row flex">
          {fighter.publicVideos?.filter(c => !!c.video)?.length == 0 &&
            fighter.privateVideos?.filter(c => !!c.video)?.length == 0 && (
              <h2 className="center">{intl.formatMessage({ id: 'fighter.videos.noVideos' })}</h2>
            )}
        </div>
        <div className="row flex">
          {fighter.publicVideos &&
            fighter.publicVideos
              .filter(c => !!c.video)
              .map(v => (
                <div key={v.url} className="col-sm-4 fighter-watch" onClick={() => setUrl(v.video)}>
                  <LazyLoadComponent>
                    <ReactPlayer url={v.video} width="300" height="250" />
                  </LazyLoadComponent>
                  <div>
                    <h3> {formatTitle(v, language)} </h3>
                    <p>
                      {' '}
                      {formatDescription(v, language)} *{' '}
                      {formatDistance(new Date(v.publishDate), new Date(), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
          {fighter.privateVideos &&
            payedFighter.includes(fighter.id) &&
            fighter.privateVideos
              .filter(c => !!c.video)
              .map(v => (
                <div key={v.url} className="col-sm-4 fighter-watch" onClick={() => setUrl(v.video)}>
                  <LazyLoadComponent>
                    <ReactPlayer url={v.video} width="300" height="250" />
                  </LazyLoadComponent>
                  <div>
                    <h3> {formatTitle(v, language)} </h3>
                    <p>
                      {' '}
                      {formatDescription(v, language)} *{' '}
                      {formatDistance(new Date(v.publishDate), new Date(), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
        </div>
        <br />
        <div className="row flex">
          {fighter.privateVideos?.filter(c => !!c.video)?.length > 0 &&
            !payedFighter.includes(fighter.id) && (
              <div className="center">
                <div className="row flex">
                  <h2 className="center sub-cta-title">
                    {intl.formatMessage({ id: 'fighter.videos.subscribe' })}
                  </h2>
                </div>
                <div className="sub-cta">
                  <LazyLoadComponent>
                    <ReactPlayer
                      url={require('../assets/SubCTA.mp4')}
                      width="80%"
                      height="80%"
                      playing
                      muted
                      loop
                      playsInline
                      onClick={subscribeAction}
                    />
                  </LazyLoadComponent>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default FighterVideos;
