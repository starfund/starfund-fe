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
  const [selectedEvent, setSelectedEvent] = useState(currEvent);

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
                    setSelectedEvent(prevEvent);
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
                    setSelectedEvent(currEvent);
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
                      setSelectedEvent(nextEvent);
                    }
                  }}
                >
                  {`${nextEvent?.name} `}
                  {isUpcoming &&
                    !nextEvent?.finished &&
                    `(${intl.formatMessage({ id: 'organization.upcoming' })})`}
                  {isUpcoming &&
                    nextEvent?.finished &&
                    `(${intl.formatMessage({ id: 'organization.rewatch' })})`}
                </p>
              </li>
            </ul>
          </React.Fragment>
        </div>
        {selectedEvent && (
          <div>
            {selectedEvent && (
              <VideoSlider
                event={selectedEvent}
                publicVideos={getPublicVideos(selectedEvent)}
                privateVideos={getPrivateVideos(selectedEvent)}
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
                {selectedEvent?.mainEvents.length > 0 && (
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
                )}
                {selectedEvent?.prelimEvents.length > 0 && (
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
                )}
              </ul>
            </React.Fragment>
          </div>
        </nav>
        <div className="container-nav">
          {!prelim &&
            selectedEvent &&
            selectedEvent?.mainEvents &&
            selectedEvent?.mainEvents.map(v => (
              <div className="event-item">
                <div className="event-item-title">
                  {v?.title}
                  {payed && (
                    <div className="event-item-desc">
                      {`${intl.formatMessage({ id: 'organization.winner' })} : ${v?.winner} | ${
                        v?.resultDescription
                      }`}
                    </div>
                  )}
                </div>
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
            selectedEvent &&
            selectedEvent?.prelimEvents &&
            selectedEvent?.prelimEvents.map(v => (
              <div className="event-item">
                <div className="event-item-title">
                  {v?.title}
                  {payed && (
                    <div className="event-item-desc">
                      {`${intl.formatMessage({ id: 'organization.winner' })} : ${v?.winner} | ${
                        v?.resultDescription
                      }`}
                    </div>
                  )}
                </div>
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
