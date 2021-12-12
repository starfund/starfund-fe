import React, { useState } from 'react';

import { useIntl } from 'react-intl';
import { useMediaQuery } from 'react-responsive';
import cn from 'classnames';
import VideoSlider from './VideoSlider';

const EventView = ({
  prevEvent,
  currEvent,
  nextEvent,
  subscribeAction,
  video,
  payed,
  payedPPV,
  isUpcoming,
  goToPPV
}) => {
  const intl = useIntl();
  const [curr, setCurr] = useState(true);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);
  const [prelim, setPrelim] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(video);

  function getPublicVideos(e) {
    return e.mainEvents.concat(e.prelimEvents).filter(v => v.public);
  }

  function getPrivateVideos(e) {
    return e.mainEvents.concat(e.prelimEvents).filter(v => !v.public);
  }

  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  return (
    <div>
      <div className="event-view-div">
        <div className={isMobile ? 'event-view-nav-mobile' : 'event-view-nav'}>
          <React.Fragment>
            <ul className="navbar-nav">
              <li className={cn('nav-item', { active: prev })}>
                <p
                  className="nav-link"
                  href=""
                  onClick={() => {
                    setPrev(true);
                    setCurr(false);
                    setNext(false);
                  }}
                >
                  {prevEvent?.name}{' '}
                </p>
              </li>
              <li className={cn('nav-item', { active: curr })}>
                <p
                  className="nav-link"
                  href=""
                  onClick={() => {
                    setPrev(false);
                    setCurr(true);
                    setNext(false);
                  }}
                >
                  {currEvent?.name} <span className="sr-only">(current)</span>
                </p>
              </li>
              <li className={cn('nav-item', { active: next })}>
                <p
                  className="nav-link"
                  href=""
                  onClick={() => {
                    if (isUpcoming) {
                      if (payedPPV) {
                        goToPPV();
                      } else {
                        subscribeAction();
                      }
                    } else {
                      setPrev(false);
                      setCurr(false);
                      setNext(true);
                    }
                  }}
                >
                  {`${nextEvent?.name} `}
                  {isUpcoming && !currEvent?.finished && '(UPCOMING)'}
                </p>
              </li>
            </ul>
          </React.Fragment>
        </div>
        {prev && (
          <div>
            {prevEvent && (
              <VideoSlider
                event={prevEvent}
                publicVideos={getPublicVideos(prevEvent)}
                privateVideos={getPrivateVideos(prevEvent)}
                subscribeAction={subscribeAction}
                selectedVideo={selectedVideo}
                payed={payed}
              />
            )}
          </div>
        )}
        {curr && (
          <div>
            {currEvent && (
              <VideoSlider
                event={currEvent}
                publicVideos={getPublicVideos(currEvent)}
                privateVideos={getPrivateVideos(currEvent)}
                subscribeAction={subscribeAction}
                selectedVideo={selectedVideo}
                payed={payed}
              />
            )}
          </div>
        )}
        {next && (
          <div>
            {nextEvent && (
              <VideoSlider
                event={nextEvent}
                publicVideos={getPublicVideos(nextEvent)}
                privateVideos={getPrivateVideos(nextEvent)}
                subscribeAction={subscribeAction}
                selectedVideo={selectedVideo}
                payed={payed}
              />
            )}
          </div>
        )}
      </div>
      <div className="container main-events">
        <br />
        <br />
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="navbar-collapse" id="navbarText">
            <React.Fragment>
              <ul className="navbar-nav">
                <li className={cn('nav-item', { active: !prelim })}>
                  <p
                    className="nav-link"
                    href=""
                    onClick={() => {
                      setPrelim(false);
                    }}
                  >
                    {intl.formatMessage({ id: 'header.main' })}{' '}
                    <span className="sr-only">(current)</span>
                  </p>
                </li>
                <li className={cn('nav-item', { active: prelim })}>
                  <p
                    className="nav-link"
                    href=""
                    onClick={() => {
                      setPrelim(true);
                    }}
                  >
                    {intl.formatMessage({ id: 'header.prelim' })}{' '}
                  </p>
                </li>
              </ul>
            </React.Fragment>
          </div>
        </nav>
        <div className="container-nav">
          {!prelim &&
            curr &&
            currEvent?.mainEvents &&
            currEvent?.mainEvents.map(v => (
              <div className="event-item">
                {v?.title}
                <button
                  type="button"
                  className={isMobile ? 'btn-mob btn-danger btn-lg' : 'btn btn-danger btn-lg'}
                  onClick={() => {
                    v.public || payed ? setSelectedVideo(v) : subscribeAction();
                  }}
                >
                  {intl.formatMessage({ id: 'organization.watchfight' })}
                </button>
              </div>
            ))}
          {prelim &&
            curr &&
            currEvent?.prelimEvents &&
            currEvent?.prelimEvents.map(v => (
              <div className="event-item">
                {v?.title}
                <button
                  type="button"
                  className={isMobile ? 'btn-mob btn-danger btn-lg' : 'btn btn-danger btn-lg'}
                  onClick={() => (v.public || payed ? setSelectedVideo(v) : subscribeAction())}
                >
                  {intl.formatMessage({ id: 'organization.watchfight' })}
                </button>
              </div>
            ))}
          {!prelim &&
            next &&
            nextEvent?.mainEvents &&
            nextEvent?.mainEvents.map(v => (
              <div className="event-item">
                {v?.title}
                <button
                  type="button"
                  className={isMobile ? 'btn-mob btn-danger btn-lg' : 'btn btn-danger btn-lg'}
                  onClick={() => (v.public || payed ? setSelectedVideo(v) : subscribeAction())}
                >
                  {intl.formatMessage({ id: 'organization.watchfight' })}
                </button>
              </div>
            ))}
          {prelim &&
            next &&
            nextEvent?.prelimEvents &&
            nextEvent?.prelimEvents.map(v => (
              <div className="event-item">
                {v?.title}
                <button
                  type="button"
                  className={isMobile ? 'btn-mob btn-danger btn-lg' : 'btn btn-danger btn-lg'}
                  onClick={() => (v.public || payed ? setSelectedVideo(v) : subscribeAction())}
                >
                  {intl.formatMessage({ id: 'organization.watchfight' })}
                </button>
              </div>
            ))}
          {!prelim &&
            prev &&
            prevEvent?.mainEvents &&
            prevEvent?.mainEvents.map(v => (
              <div className="event-item">
                {v?.title}
                <button
                  type="button"
                  className={isMobile ? 'btn-mob btn-danger btn-lg' : 'btn btn-danger btn-lg'}
                  onClick={() => (v.public || payed ? setSelectedVideo(v) : subscribeAction())}
                >
                  {intl.formatMessage({ id: 'organization.watchfight' })}
                </button>
              </div>
            ))}
          {prelim &&
            prev &&
            prevEvent?.prelimEvents &&
            prevEvent?.prelimEvents.map(v => (
              <div className="event-item">
                {v?.title}
                <button
                  type="button"
                  className={isMobile ? 'btn-mob btn-danger btn-lg' : 'btn btn-danger btn-lg'}
                  onClick={() => (v.public || payed ? setSelectedVideo(v) : subscribeAction())}
                >
                  {intl.formatMessage({ id: 'organization.watchfight' })}
                </button>
              </div>
            ))}
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};

export default EventView;
