import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import ReactPlayer from 'react-player/lazy';
import { useMediaQuery } from 'react-responsive';
import { formatTitle, formatDescription } from 'utils/translationsHelper';
import Carousel from 'react-grid-carousel';

const VideoSlider = ({ event, publicVideos, privateVideos, subscribeAction }) => {
  const [url, setUrl] = useState();
  const [displayContent, setDisplayContent] = useState();
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });
  const language = useSelector(state => state.language.language);

  const selectVideo = content => {
    setUrl(content.video);
    setDisplayContent(content);
  };

  const selectPrivateVideo = content => {
    if (event?.payed) {
      selectVideo(content);
    } else {
      subscribeAction();
    }
  };

  return (
    <div>
      <div className="event-video">
        <LazyLoadComponent>
          <ReactPlayer
            url={url}
            width
            controls
            playing
            muted
            style={{
              margin: '3%',
              minHeight: `${isMobile ? 'auto' : '50vh'}`,
              minWidth: `${isMobile ? 'auto' : '40vw'}`,
              maxWidth: `${isMobile ? 'auto' : '40vw'}`
            }}
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
        {!isMobile && (
          <div className="event-video-text">
            <div className="event-name">{event?.name}</div>
            <div className="event-title">{displayContent?.title}</div>
            <br />
            <div className="event-subtitle">{displayContent?.description}</div>

            <br />
            <div className="event-description">
              {event?.date}
              <br />
              <br />
              <br />
              {event?.location}
            </div>
          </div>
        )}
      </div>
      <div>
        <Carousel
          mobileBreakpoint={0}
          containerStyle={{ backgroundColor: '#202020', width: '75vw', marginLeft: '2vw' }}
          cols={isMobile ? 1 : 4}
          rows={1}
          gap={10}
          loop
        >
          {publicVideos &&
            publicVideos
              .filter(c => !!c.video)
              .map(v => (
                <Carousel.Item>
                  <div
                    key={v.url}
                    className="col-12 col-sm-6 col-md-4 fighter-watch"
                    onClick={() => selectVideo(v)}
                  >
                    <LazyLoadComponent>
                      <ReactPlayer
                        url={v.video}
                        width={isMobile ? '100%' : '15vw'}
                        height="25vh"
                        light={v.thumbnail}
                        muted
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
                </Carousel.Item>
              ))}
          {privateVideos &&
            privateVideos
              .filter(c => !!c.video)
              .map(v => (
                <Carousel.Item>
                  <div
                    key={v.url}
                    className="col-12 col-sm-6 col-md-4 fighter-watch"
                    onClick={() => selectPrivateVideo(v)}
                  >
                    <div
                      className={
                        isMobile ? 'exclusive-event-video-mobile' : 'exclusive-event-video'
                      }
                    >
                      EXCLUSIVE
                    </div>
                    <LazyLoadComponent>
                      <ReactPlayer
                        url={v.video}
                        width={isMobile ? '100%' : '15vw'}
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
                </Carousel.Item>
              ))}
        </Carousel>
        <br />
      </div>
    </div>
  );
};

export default VideoSlider;
