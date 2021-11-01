import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useMediaQuery } from 'react-responsive';
import cn from 'classnames';
import { getFighters } from '../state/actions/fighterActions';
import VideoSlider from './VideoSlider';

const EventView = ({ prevEvent, currEvent, nextEvent, subscribeAction }) => {
  const dispatch = useDispatch();
  const [curr, setCurr] = useState(true);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);

  useEffect(() => {
    dispatch(getFighters(true));
  }, [dispatch]);

  const fighters = useSelector(state => state.fighters.fighters);
  const videos = fighters && fighters[10]?.publicVideos;
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  return (
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
  );
};

export default EventView;
