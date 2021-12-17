import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import ReactPlayer from 'react-player/lazy';
import { useMediaQuery } from 'react-responsive';
import { formatTitle, formatDescription } from 'utils/translationsHelper';
import Carousel from 'react-grid-carousel';

const VideoSlider = ({
  event,
  publicVideos,
  privateVideos,
  subscribeAction,
  selectedVideo,
  payed
}) => {
  const intl = useIntl();
  const anyVideo = publicVideos[0] || privateVideos[0] || '';
  const [url, setUrl] = useState(
    selectedVideo
      ? selectedVideo.videoUrl || selectedVideo.video
      : anyVideo.videoUrl || anyVideo.video
  );
  const [activeVideo, setActiveVideo] = useState(selectedVideo ? selectedVideo.id : anyVideo.id);
  const [displayContent, setDisplayContent] = useState(selectedVideo || anyVideo);
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)'
  });
  const isMobileBig = useMediaQuery({
    query: '(max-width: 1024px)'
  });
  const language = useSelector(state => state.language.language);

  const selectVideo = content => {
    setUrl(content?.videoUrl || content?.video);
    setDisplayContent(content);
    setActiveVideo(`${content?.id}`);
  };

  useEffect(() => {
    if (selectedVideo) {
      selectVideo(selectedVideo);
    }
  }, [selectedVideo]);

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
    if (payed) {
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
          {(payed || displayContent.public) && (
            <ReactPlayer
              url={url}
              width
              muted
              controls
              style={{
                margin: '3%',
                minHeight: `${isMobile ? '35vh' : '50vh'}`,
                maxHeight: `${isMobile ? '35vh' : '50vh'}`,
                minWidth: `${isMobile ? '100vw' : '44vw'}`,
                maxWidth: `${isMobile ? '100vw' : '44vw'}`
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
          )}
          {!payed && !displayContent.public && (
            <ReactPlayer
              url={url}
              width
              muted
              light={!displayContent?.videoUrl && displayContent?.thumbnail}
              playIcon
              style={{
                margin: '3%',
                minHeight: `${isMobile ? '35vh' : '50vh'}`,
                maxHeight: `${isMobile ? '35vh' : '50vh'}`,
                minWidth: `${isMobile ? '100vw' : '45vw'}`,
                maxWidth: `${isMobile ? '100vw' : '45vw'}`,
                pointerEvents: 'none'
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
          )}
        </LazyLoadComponent>
        {!isMobile && (
          <div className="event-video-text">
            <div className="event-name">{event?.name}</div>
            <div className="event-title">{displayContent?.title}</div>
            <br />
            <div className="event-subtitle">{displayContent?.description}</div>
            <br />
            <div className="event-description">{EventDate(event?.eventDate)}</div>
            <br />
            <div className="event-description">{event?.location}</div>
          </div>
        )}
      </div>
      <div>
        <Carousel
          mobileBreakpoint={1024}
          containerStyle={{
            backgroundColor: '#202020',
            width: `${isMobile ? '100vw' : '75vw'}`,
            marginLeft: `${isMobile ? '0vw' : '2vw'}`,
            marginTop: '10px'
          }}
          cols={4}
          rows={1}
          gap={0}
          loop
        >
          {publicVideos &&
            publicVideos
              .filter(c => !!c.video || !!c.videoUrl)
              .map(v => (
                <Carousel.Item>
                  <div
                    key={v.url}
                    className="col-12 col-sm-6 col-md-4 fighter-watch"
                    onClick={() => selectVideo(v)}
                  >
                    <div className="select-cover" onClick={() => selectVideo(v)} />
                    <div
                      className={
                        isMobile
                          ? cn('video-description-mobile', {
                              selected: activeVideo === `${v.id}`
                            })
                          : cn('video-description', {
                              selected: activeVideo === `${v.id}`
                            })
                      }
                    >
                      <LazyLoadComponent>
                        <ReactPlayer
                          url={v.videoUrl || v.video}
                          width="302px"
                          height="202px"
                          light={!v.videoUrl && v.thumbnail}
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
                      <h4 className="one-line-text">{formatTitle(v, language)}</h4>
                      <p className="one-line-text">{formatDescription(v, language)}</p>
                    </div>
                  </div>
                </Carousel.Item>
              ))}
          {privateVideos &&
            privateVideos
              .filter(c => !!c.video || !!c.videoUrl)
              .map(v => (
                <Carousel.Item>
                  <div
                    key={v.url}
                    className="col-12 fighter-watch"
                    onClick={() => selectPrivateVideo(v)}
                  >
                    {!payed && (
                      <div
                        className={
                          isMobileBig ? 'exclusive-event-video-mobile' : 'exclusive-event-video'
                        }
                      >
                        EXCLUSIVE
                      </div>
                    )}
                    <div className="select-cover" onClick={() => selectVideo(v)} />
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
                          url={v.videoUrl || v.video}
                          width="302px"
                          height="202px"
                          light={!v.videoUrl && v.thumbnail}
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
                      <h4 className="one-line-text">{formatTitle(v, language)}</h4>
                      <p className="one-line-text">{formatDescription(v, language)}</p>
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
