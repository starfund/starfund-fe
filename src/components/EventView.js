import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useIntl } from 'react-intl';
import { useMediaQuery } from 'react-responsive';
import cn from 'classnames';
import { getFighters } from '../state/actions/fighterActions';
import VideoSlider from './VideoSlider';

const EventView = ({ prevEvent, currEvent, nextEvent, subscribeAction }) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [curr, setCurr] = useState(true);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);
  const [prelim, setPrelim] = useState(false);

  useEffect(() => {
    dispatch(getFighters(true));
  }, [dispatch]);

  const fighters = useSelector(state => state.fighters.fighters);
  const videos = fighters && fighters[10]?.publicVideos;
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  return (
    <div>
      <div className="event-view-div">
        <br />
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
                    setPrev(false);
                    setCurr(false);
                    setNext(true);
                  }}
                >
                  {nextEvent?.name}{' '}
                </p>
              </li>
            </ul>
          </React.Fragment>
        </div>
        {prev && (
          <div>
            {videos && (
              <VideoSlider
                event={prevEvent}
                publicVideos={videos}
                privateVideos={videos}
                subscribeAction={subscribeAction}
              />
            )}
          </div>
        )}
        {curr && (
          <div>
            {videos && (
              <VideoSlider
                event={currEvent}
                publicVideos={videos}
                privateVideos={videos}
                subscribeAction={subscribeAction}
              />
            )}
          </div>
        )}
        {next && (
          <div>
            {videos && (
              <VideoSlider
                event={nextEvent}
                publicVideos={videos}
                privateVideos={videos}
                subscribeAction={subscribeAction}
              />
            )}
          </div>
        )}
      </div>
      <div className="container">
        <br />
        <br />
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
            currEvent.mainVideos.mainVideos &&
            currEvent.mainVideos.mainVideos.map(v => (
              <div className="event-item">
                {v?.title}
                <button
                  type="button"
                  className={isMobile ? 'btn-mob btn-danger btn-lg' : 'btn btn-danger btn-lg'}
                  onClick={() => subscribeAction()}
                >
                  {intl.formatMessage({ id: 'organization.watchfight' })}
                </button>
              </div>
            ))}
          {prelim &&
            curr &&
            currEvent.prelimVideos.prelimVideos &&
            currEvent.prelimVideos.prelimVideos.map(v => (
              <div className="event-item">
                {v?.title}
                <button
                  type="button"
                  className={isMobile ? 'btn-mob btn-danger btn-lg' : 'btn btn-danger btn-lg'}
                  onClick={() => subscribeAction()}
                >
                  {intl.formatMessage({ id: 'organization.watchfight' })}
                </button>
              </div>
            ))}
          {!prelim &&
            next &&
            nextEvent.mainVideos.mainVideos &&
            nextEvent.mainVideos.mainVideos.map(v => (
              <div className="event-item">
                {v?.title}
                <button
                  type="button"
                  className={isMobile ? 'btn-mob btn-danger btn-lg' : 'btn btn-danger btn-lg'}
                  onClick={() => subscribeAction()}
                >
                  {intl.formatMessage({ id: 'organization.watchfight' })}
                </button>
              </div>
            ))}
          {prelim &&
            next &&
            nextEvent.prelimVideos.prelimVideos &&
            nextEvent.prelimVideos.prelimVideos.map(v => (
              <div className="event-item">
                {v?.title}
                <button
                  type="button"
                  className={isMobile ? 'btn-mob btn-danger btn-lg' : 'btn btn-danger btn-lg'}
                  onClick={() => subscribeAction()}
                >
                  {intl.formatMessage({ id: 'organization.watchfight' })}
                </button>
              </div>
            ))}
          {!prelim &&
            prev &&
            prevEvent.mainVideos.mainVideos &&
            prevEvent.mainVideos.mainVideos.map(v => (
              <div className="event-item">
                {v?.title}
                <button
                  type="button"
                  className={isMobile ? 'btn-mob btn-danger btn-lg' : 'btn btn-danger btn-lg'}
                  onClick={() => subscribeAction()}
                >
                  {intl.formatMessage({ id: 'organization.watchfight' })}
                </button>
              </div>
            ))}
          {prelim &&
            prev &&
            prevEvent.prelimVideos.prelimVideos &&
            prevEvent.prelimVideos.prelimVideos.map(v => (
              <div className="event-item">
                {v?.title}
                <button
                  type="button"
                  className={isMobile ? 'btn-mob btn-danger btn-lg' : 'btn btn-danger btn-lg'}
                  onClick={() => subscribeAction()}
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
