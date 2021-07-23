import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useIntl, FormattedMessage } from 'react-intl';
import ReactPlayer from 'react-player/lazy';
import { useSession } from 'hooks';
import { useMediaQuery } from 'react-responsive';
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
import { formatDistance } from 'date-fns';
import { formatTitle, formatDescription } from 'utils/translationsHelper';

import Subscribe from '../../assets/subscribe.png';
import SubscribeRu from '../../assets/subscribe_rus.png';
import Watch from '../../assets/watch.png';
import WatchRu from '../../assets/watch_rus.png';

const BusinessVideos = ({ business, supporting, subscribeAction, watchAction }) => {
  const intl = useIntl();
  const [url, setUrl] = useState(business.previewUrl || business.officialPreview);
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  const selectVideo = content => {
    setUrl(content.video);
  };

  const { authenticated } = useSession();
  const language = useSelector(state => state.language.language);

  return (
    <div className="fighter-videos">
      <h1>{intl.formatMessage({ id: 'fighter.videos.title' })}</h1>
      <br />
      <div className="row">
        <div className="col-12 col-sm-8">
          <LazyLoadComponent>
            <ReactPlayer
              url={url}
              width
              controls
              playing
              muted
              style={{ 'margin-left': '3%', minHeight: `${isMobile ? 'auto' : '550px'}` }}
            />
          </LazyLoadComponent>
        </div>
        <div className={`more-videos col-12 col-sm-4 ${isMobile && 'row'}`}>
          {business &&
            business.content
              .filter(c => c.public)
              .map(v => (
                <div
                  key={v.url}
                  className="col-5 col-sm-12 fighter-watch"
                  onClick={() => selectVideo(v)}
                >
                  <LazyLoadComponent>
                    <ReactPlayer
                      url={v.video}
                      width={isMobile ? '100%' : '80%'}
                      height="20vh"
                      light={v.thumbnail}
                    />
                  </LazyLoadComponent>
                  <div>
                    <h4> {formatTitle(v, language)} </h4>
                    <p>
                      {' '}
                      {formatDescription(v, language)} *{' '}
                      {formatDistance(new Date(v.eventDate), new Date(), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
          {business &&
            supporting.includes(business.id) &&
            business.content
              .filter(c => !c.public)
              .map(v => (
                <div
                  key={v.url}
                  className="col-5 col-sm-12 fighter-watch"
                  onClick={() => selectVideo(v)}
                >
                  <LazyLoadComponent>
                    <ReactPlayer
                      url={v.video}
                      width={isMobile ? '100%' : '80%'}
                      height="20vh"
                      light={v.thumbnail}
                    />
                  </LazyLoadComponent>
                  <div>
                    <h4> {formatTitle(v, language)} </h4>
                    <p>
                      {' '}
                      {formatDescription(v, language)} *{' '}
                      {formatDistance(new Date(v.eventDate), new Date(), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
          {business &&
            !supporting.includes(business.id) &&
            business.content
              .filter(c => !c.public)
              .map(() => (
                <div className={`other-videos col-11 ${isMobile && 'center'}`}>
                  <div className="flex">
                    <h3 className="center">
                      <FormattedMessage
                        id="fighter.videos.subscribe"
                        values={{ videos: business.content.filter(c => !c.public).length }}
                      />
                    </h3>
                  </div>
                  <div className="sub-cta">
                    {authenticated && (
                      <LazyLoadImage
                        src={language == 'ru' ? SubscribeRu : Subscribe}
                        onClick={subscribeAction}
                      />
                    )}
                    {!authenticated && (
                      <LazyLoadImage
                        src={language == 'ru' ? WatchRu : Watch}
                        onClick={watchAction}
                      />
                    )}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessVideos;
