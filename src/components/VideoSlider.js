import React, { useState } from 'react';
import cn from 'classnames';

import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import ReactPlayer from 'react-player/lazy';
import { useMediaQuery } from 'react-responsive';
import { formatTitle, formatDescription } from 'utils/translationsHelper';
import Carousel from 'react-grid-carousel';

const VideoSlider = ({ event, publicVideos, privateVideos, subscribeAction }) => {
  const intl = useIntl();
  const [url, setUrl] = useState();
  const [activeVideo, setActiveVideo] = useState();
  const [displayContent, setDisplayContent] = useState();
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });
  const language = useSelector(state => state.language.language);

  const selectVideo = content => {
    setUrl(content.video);
    setDisplayContent(content);
    setActiveVideo(`${content.id}pub`);
  };
  const months = [
    'jan.long',
    'feb.long',
    'mar.long',
    'apr.long',
    'may.long',
    'jun.long',
    'jul.long',
    'aug.long',
    'sep.long',
    'oct.long',
    'nov.long',
    'dec.long'
  ];

  const selectPrivateVideo = content => {
    if (event?.payed) {
      setActiveVideo(`${content.id}pri`);
      selectVideo(content);
    } else {
      subscribeAction();
    }
  };

  function EventDate(d) {
    const date = new Date(d);
    return `${intl.formatMessage({
      id: `organization.months.${months[date?.getMonth()]}`
    })} ${date?.getDate()}, ${date.getFullYear()}`;
  }

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
              minHeight: `${isMobile ? '35vh' : '50vh'}`,
              maxHeight: `${isMobile ? '35vh' : '50vh'}`,
              minWidth: `${isMobile ? '75vw' : '45vw'}`,
              maxWidth: `${isMobile ? '75vw' : '45vw'}`
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
            <div className="event-description">{EventDate(event?.date)}</div>
            <br />
            <div className="event-description">{event?.location}</div>
          </div>
        )}
      </div>
      <div>
        <Carousel
          mobileBreakpoint={0}
          containerStyle={{ backgroundColor: '#202020', width: '75vw', marginLeft: '2vw' }}
          cols={isMobile ? 1 : 3}
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
                    <div
                      className={
                        isMobile
                          ? cn('video-description-mobile', {
                              selected: activeVideo === `${v.id}pub`
                            })
                          : cn('video-description', {
                              selected: activeVideo === `${v.id}pub`
                            })
                      }
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
                      <h4>{formatTitle(v, language)}</h4>
                      <p>{formatDescription(v, language)}</p>
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
                    <div
                      className={
                        isMobile
                          ? cn('video-description-mobile', {
                              selected: activeVideo === `${v.id}pri`
                            })
                          : cn('video-description', {
                              selected: activeVideo === `${v.id}pri`
                            })
                      }
                    >
                      <LazyLoadComponent>
                        <ReactPlayer
                          url={v.video}
                          width={isMobile ? '100%' : '15vw'}
                          height={isMobile ? '35vh' : '25vh'}
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
                      <h4>{formatTitle(v, language)}</h4>
                      <p>{formatDescription(v, language)}</p>
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
