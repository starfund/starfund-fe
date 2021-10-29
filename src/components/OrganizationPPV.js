import React, { useState } from 'react';
import cn from 'classnames';

import { useMediaQuery } from 'react-responsive';
import ReactPlayer from 'react-player/lazy';
import { useIntl } from 'react-intl';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

const OrganizationPPV = ({ event, subscribeAction }) => {
  const intl = useIntl();
  const date = new Date(event?.date);
  const [url, setUrl] = useState();
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

  const selectVideo = content => {
    setUrl(content.video);
    if (payed) {
      window.scrollTo(0, 700);
    } else {
      window.scrollTo(0, 900);
    }
  };

  return (
    <div className="organization-container">
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
            <div className="event-fighter-name">{event?.fighters.fightersNames[0].name}</div>
            <div className="event-vs">VS</div>
          </div>
          <div className="event-fighter-name">{event?.fighters.fightersNames[1].name}</div>
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
              &nbsp;{intl.formatMessage({ id: 'organization.event.ppv' })}
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
          <h2>{event?.name}</h2>
          <LazyLoadComponent>
            <ReactPlayer
              url={url}
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
        <div className="container-nav">
          {!prelim &&
            event?.mainVideos.mainVideos &&
            event?.mainVideos.mainVideos.map(v => (
              <div className="event-item">
                {v?.title}
                <button
                  type="button"
                  className="btn btn-danger btn-lg"
                  onClick={payed ? () => selectVideo(v) : () => subscribeAction()}
                >
                  {intl.formatMessage({ id: 'organization.watchfight' })}
                </button>
              </div>
            ))}
          {prelim &&
            event?.prelimVideos.prelimVideos &&
            event?.prelimVideos.prelimVideos.map(v => (
              <div className="event-item">
                {v?.title}
                <button
                  type="button"
                  className="btn btn-danger btn-lg"
                  onClick={payed ? () => selectVideo(v) : () => subscribeAction()}
                >
                  {intl.formatMessage({ id: 'organization.watchfight' })}
                </button>
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
