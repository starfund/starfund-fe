import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import ReactPlayer from 'react-player/lazy';
import { useMediaQuery } from 'react-responsive';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { formatDistance } from 'date-fns';
import { formatTitle, formatDescription } from 'utils/translationsHelper';

const BusinessVideos = ({ business }) => {
  const intl = useIntl();
  const [url, setUrl] = useState(business.previewUrl || business.officialPreview);
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  const selectVideo = content => {
    setUrl(content.video);
  };

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
            business.content.map(v => (
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
        </div>
      </div>
    </div>
  );
};

export default BusinessVideos;
