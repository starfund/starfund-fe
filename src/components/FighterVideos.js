import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useIntl, FormattedMessage } from 'react-intl';
// import { useSession } from 'hooks';
import ReactPlayer from 'react-player/lazy';

import { useMediaQuery } from 'react-responsive';
import { formatDistance } from 'date-fns';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import ReactGA from 'react-ga';

import { formatTitle, formatDescription } from 'utils/translationsHelper';

const FighterVideos = ({ fighter, supporting, subscribeAction }) => {
  const intl = useIntl();
  // const { authenticated } = useSession();
  const [url, setUrl] = useState(fighter.previewUrl || fighter.officialPreview);
  const [displayContent, setDisplayContent] = useState();
  const payedFighter = supporting.map(sub => sub.fighter?.id);
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  const endFreeVideo = () => {
    if (!payedFighter.includes(fighter.id)) {
      subscribeAction();
    }
  };

  const selectVideo = content => {
    setUrl(content.video);
    setDisplayContent(content);
    if (payedFighter.includes(fighter.id)) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 900);
    }
  };

  const language = useSelector(state => state.language.language);
  ReactGA.modalview(`/fighter/${fighter.id}/videos`);

  return (
    <div className="fighter-videos">
      <br />
      <h1>
        <FormattedMessage id="fighter.videos.title" values={{ fighterName: fighter?.firstName }} />
      </h1>
      <br />
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
              onEnded={endFreeVideo}
              config={{
                file: {
                  attributes: {
                    onContextMenu: e => e.preventDefault(),
                    controlsList: 'nodownload'
                  }
                }
              }}
            />
          </LazyLoadComponent>
        </div>
        {displayContent && (
          <div className="video-description col-12 col-sm-4">
            <h1>{displayContent.title?.toUpperCase()}</h1>
            <h3>{displayContent.description}</h3>
            <br />
            <p>
              {' '}
              Uploaded{' '}
              {formatDistance(new Date(displayContent.eventDate), new Date(), {
                addSuffix: true
              })}{' '}
            </p>
          </div>
        )}
      </div>
      <div className="row more-videos col-12">
        {fighter.publicVideos &&
          fighter.publicVideos
            .filter(c => !!c.video)
            .map(v => (
              <div
                key={v.url}
                className="col-12 col-sm-6 col-md-4 fighter-watch"
                onClick={() => selectVideo(v)}
              >
                <LazyLoadComponent>
                  <ReactPlayer
                    url={v.video}
                    width="100%"
                    height="25vh"
                    light={v.thumbnail}
                    config={{
                      file: {
                        attributes: {
                          onContextMenu: e => e.preventDefault(),
                          controlsList: 'nodownload'
                        }
                      }
                    }}
                  />
                </LazyLoadComponent>
                <div className="video-description">
                  <h4>
                    {formatTitle(v, language)} {formatDescription(v, language)}
                  </h4>
                </div>
              </div>
            ))}
        {fighter.privateVideos &&
          fighter.privateVideos
            .filter(c => !!c.video)
            .map(v => (
              <div
                key={v.url}
                className="col-12 col-sm-6 col-md-4 fighter-watch"
                onClick={() => selectVideo(v)}
              >
                <div className="exclusive">EXCLUSIVE</div>
                <LazyLoadComponent>
                  <ReactPlayer
                    url={v.video}
                    width="100%"
                    height="25vh"
                    light={v.thumbnail}
                    config={{
                      file: {
                        attributes: {
                          onContextMenu: e => e.preventDefault(),
                          controlsList: 'nodownload'
                        }
                      }
                    }}
                  />
                </LazyLoadComponent>
                <div className="video-description">
                  <h4>
                    {formatTitle(v, language)} {formatDescription(v, language)}
                  </h4>
                </div>
              </div>
            ))}
      </div>
      <div className="container">
        <div className="row flex">
          {fighter.publicVideos?.filter(c => !!c.video)?.length == 0 &&
            fighter.privateVideos?.filter(c => !!c.video)?.length == 0 && (
              <h2 className="center">{intl.formatMessage({ id: 'fighter.videos.noVideos' })}</h2>
            )}
        </div>
      </div>
    </div>
  );
};

export default FighterVideos;
