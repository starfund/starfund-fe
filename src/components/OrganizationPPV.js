import React, { useState } from 'react';
import cn from 'classnames';

import { useMediaQuery } from 'react-responsive';
import ReactPlayer from 'react-player/lazy';
import { useIntl } from 'react-intl';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Background from '../assets/ppv_background.png';

const OrganizationPPV = ({ event, subscribeAction }) => {
  const divImage = {
    backgroundImage: `url(${Background})`
  };
  window.scrollTo(0, 700);
  const intl = useIntl();
  const date = new Date(event?.eventDate);
  const months = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec'
  ];
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const [prelim, setPrelim] = useState(false);
  const payed = true;
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  function getFirstFighter() {
    const video = event?.mainEvents
      .concat(event?.prelimEvents)
      .filter(v => v.fighter1 && v.fighter2)
      .slice(0, 1);
    if (video.length > 0) {
      return video[0].fighter1;
    }
    return '';
  }

  function getSecondFighter() {
    const video = event?.mainEvents
      .concat(event?.prelimEvents)
      .filter(v => v.fighter1 && v.fighter2)
      .slice(0, 1);
    if (video.length > 0) {
      return video[0].fighter2;
    }
    return '';
  }

  function formatAMPM(d) {
    let hours = d.getHours();
    let minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  }

  return (
    <div className="organization-container" style={divImage}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {!payed && (
        <div className="event-div">
          <div className="event-name">{event?.name}</div>
          <div className="event-row">
            <div className="event-fighter-name">{getFirstFighter()}</div>
            {getFirstFighter() != '' && getSecondFighter() != '' && (
              <div className="event-vs">VS</div>
            )}
          </div>
          <div className="event-fighter-name">{getSecondFighter()}</div>
          <div className="event-row">
            <div className="event-date">
              {intl.formatMessage({ id: `organization.months.${months[date.getMonth()]}` })}{' '}
              {date.getDate()}{' '}
              {intl.formatMessage({ id: `organization.days.${days[date.getDay()]}` })}
              {' | '}
              {formatAMPM(date)}
              {' | '}
            </div>
            <div className="event-watch">
              {intl.formatMessage({ id: 'organization.event.ppv' })}
            </div>
          </div>
          <br />
          <button type="button" className="btn btn-danger btn-lg">
            {intl.formatMessage({ id: 'organization.button.buyppv' })}
          </button>
        </div>
      )}
      {payed && (
        <div className="video-div">
          <div className="video-title">
            {isMobile ? <div className="title-mobile">{event?.name}</div> : <h2>{event?.name}</h2>}
            <div className="event-live">
              {intl.formatMessage({ id: `organization.event.live` })}
            </div>
          </div>
          <LazyLoadComponent>
            <ReactPlayer
              url={event?.streamLink ? event?.streamLink : ''}
              width
              controls
              playing
              muted
              style={{ minHeight: `${isMobile ? 'auto' : '550px'}` }}
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
      )}
      <br />
      <br />
      <div className="container">
        <br />
        <br />
        <br />
        <br />
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="navbar-collapse" id="navbarText">
            <React.Fragment>
              <ul className="navbar-nav">
                {event && (
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
        <div className={!isMobile && 'container-nav'}>
          {!prelim &&
            event?.mainEvents &&
            event?.mainEvents.map(v => (
              <div className={!v.isLive ? 'event-item-ppv' : 'event-item-ppv-active'}>
                {v.isLive && (
                  <div className="live-tag">
                    {intl.formatMessage({ id: `organization.event.livevideo` })}
                  </div>
                )}
                {!v.isLive && v.winner == v.fighter1 && <div className="winner1-tag">W</div>}
                {!v.isLive && v.winner == v.fighter2 && <div className="winner2-tag">W</div>}
                {v?.fighter1} vs {v?.fighter2}
              </div>
            ))}
          {prelim &&
            event?.prelimEvents &&
            event?.prelimEvents.map(v => (
              <div className={!v.isLive ? 'event-item-ppv' : 'event-item-ppv-active'}>
                {v.isLive && (
                  <div className="live-tag">
                    {intl.formatMessage({ id: `organization.event.livevideo` })}
                  </div>
                )}
                {!v.isLive && v.winner == v.fighter1 && <div className="winner1-tag">W</div>}
                {!v.isLive && v.winner == v.fighter2 && <div className="winner2-tag">W</div>}
                {v?.fighter1} vs {v?.fighter2}
              </div>
            ))}
        </div>
        <br />
      </div>
      {!payed && (
        <button type="button" className="btn btn-danger btn-lg" onClick={() => subscribeAction()}>
          {intl.formatMessage({ id: 'organization.button.buyppv' })}
        </button>
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default OrganizationPPV;
