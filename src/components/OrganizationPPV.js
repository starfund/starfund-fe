import React, { useState } from 'react';
import cn from 'classnames';

import { useMediaQuery } from 'react-responsive';
import ReactPlayer from 'react-player/lazy';
import { FormattedMessage, useIntl } from 'react-intl';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Background from '../assets/awcf_poster_bg2.png';
import DropDown from './common/DropDown';

const OrganizationPPV = ({ event, payed, subscribeAction, homeNav, hasBackground }) => {
  const divImage = {
    backgroundImage: `url(${Background})`
  };

  const sortedMainEvents = event?.mainEvents.slice();
  sortedMainEvents?.sort((a, b) => new Date(a?.eventDate) - new Date(b?.eventDate));
  sortedMainEvents?.sort((a, b) => (a.isLive && !b.isLive ? -1 : 1));
  const dateString = event?.eventDate?.slice(0, 19);
  const date = new Date(dateString);
  const today = new Date();
  const sortedPrelimEvents = event?.prelimEvents.slice();
  sortedPrelimEvents?.sort((a, b) => new Date(a?.eventDate) - new Date(b?.eventDate));
  sortedPrelimEvents?.sort((a, b) => (a.isLive && !b.isLive ? -1 : 1));

  window.scrollTo(0, 700);
  const intl = useIntl();
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
  const monthsLong = [
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

  function EventDate(d) {
    const date = new Date(d);
    return `${intl.formatMessage({
      id: `organization.months.${monthsLong[date?.getMonth()]}`
    })} ${date?.getDate()}, ${date.getFullYear()}`;
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

  const [prelim, setPrelim] = useState(false);
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  function getFirstFighter() {
    const video = event?.mainEvents
      .concat(event?.prelimEvents)
      .filter(v => v.fighter1 && v.fighter2)
      .slice(0, 1);
    if (video?.length > 0) {
      return video[0].fighter1;
    }
    return '';
  }

  function getSecondFighter() {
    const video = event?.mainEvents
      .concat(event?.prelimEvents)
      .filter(v => v.fighter1 && v.fighter2)
      .slice(0, 1);
    if (video?.length > 0) {
      return video[0].fighter2;
    }
    return '';
  }

  return (
    <div
      className={isMobile ? 'mobile-background' : 'organization-container'}
      style={isMobile || !hasBackground ? { backgroundColor: '#202020' } : divImage}
    >
      {!isMobile && <br />}
      {!isMobile && <br />}
      {!isMobile && <br />}
      {!isMobile && <br />}
      {isMobile && (
        <div className="event-view-mobile-container">
          <div className="link-text-back" onClick={() => homeNav()}>
            {intl.formatMessage({ id: 'organization.mobile.home' })}
          </div>
        </div>
      )}
      {!isMobile && <br />}
      {!isMobile && <br />}
      {!isMobile && <br />}
      {!isMobile && <br />}
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
          <br />
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
              {event?.replay
                ? intl.formatMessage({ id: 'organization.button.replay' })
                : intl.formatMessage({ id: 'organization.event.ppv' })}
            </div>
          </div>
          <br />
          <button type="button" className="btn btn-danger btn-lg" onClick={subscribeAction}>
            {event?.finished && (
              <FormattedMessage
                id="organization.button.rewatchppv"
                values={{ eventName: event?.name }}
              />
            )}
            {!event?.finished &&
              !event?.replay &&
              intl.formatMessage({
                id: 'organization.button.watch'
              })}
            {!event?.finished &&
              event?.replay &&
              intl.formatMessage({
                id: 'organization.button.replay'
              })}
          </button>
        </div>
      )}
      {payed && date <= today && (
        <div className="video-div">
          <div className="video-title">
            {isMobile ? <div className="title-mobile">{event?.name}</div> : <h2>{event?.name}</h2>}
            <div className="event-live">
              {intl.formatMessage({
                id:
                  event?.finished || event?.replay
                    ? 'organization.event.rewatch'
                    : 'organization.event.live'
              })}
            </div>
          </div>
          <LazyLoadComponent>
            <ReactPlayer
              url={event?.streamLink ? event?.streamLink : ''}
              width
              controls
              muted
              style={{ minHeight: `${isMobile ? 'auto' : '550px'}` }}
              config={{
                file: {
                  forceHLS: true,
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
      {payed && date > today && (
        <div className="no-ppv-page">
          <div className="no-ppv-title">
            {intl.formatMessage({
              id: 'organization.upcomingPPV'
            })}
            {` ${EventDate(event?.eventDate?.slice(0, 19))}, ${formatAMPM(date)}`}
          </div>
        </div>
      )}
      <br />
      <br />
      <div className="container main-events">
        {!isMobile && <br />}
        {!isMobile && <br />}
        {!isMobile && <br />}
        {!isMobile && <br />}
        {isMobile && (
          <div className="mobile-nav-center">
            {event?.mainEvents.length > 0 && (
              <div
                className={!prelim ? 'nav-button-active' : 'nav-button'}
                onClick={() => setPrelim(false)}
              >
                {intl.formatMessage({ id: 'header.main' })}
              </div>
            )}
            {event?.prelimEvents.length > 0 && (
              <div
                className={prelim ? 'nav-button-active' : 'nav-button'}
                onClick={() => setPrelim(true)}
              >
                {intl.formatMessage({ id: 'header.prelim' })}
              </div>
            )}
          </div>
        )}
        {!isMobile && (
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="navbar-collapse" id="navbarText">
              <React.Fragment>
                <ul className="navbar-nav">
                  {event?.mainEvents.length > 0 && (
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
                  {event?.prelimEvents.length > 0 && (
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
        )}
        <div className={!isMobile && 'container-nav'}>
          {!prelim &&
            sortedMainEvents &&
            sortedMainEvents.map(v => (
              <div className={!v.isLive ? 'event-item-ppv' : 'event-item-ppv-active'}>
                {v.isLive && (
                  <div className="live-tag">
                    {intl.formatMessage({ id: `organization.event.livevideo` })}
                  </div>
                )}
                {!v.isLive && !isMobile && v.winner == v.fighter1 && (
                  <div className="winner1-tag">W</div>
                )}
                {!v.isLive && !isMobile && v.winner == v.fighter2 && (
                  <div className="winner2-tag">W</div>
                )}
                {!v.isLive && !isMobile && v.winner == v.fighter1 && (
                  <div className="loser2-tag">L</div>
                )}
                {!v.isLive && !isMobile && v.winner == v.fighter2 && (
                  <div className="loser1-tag">L</div>
                )}
                {!isMobile && (
                  <div>
                    {v?.fighter1} vs {v?.fighter2}
                    <div className="event-item-ppv-desc">
                      {`${v?.division} | ${v?.rounds} Rounds`}
                    </div>
                  </div>
                )}
                {isMobile && (
                  <DropDown
                    textBold={`${intl.formatMessage({ id: 'organization.winner' })}: `}
                    text={v?.winner}
                    title={`${v?.fighter1} vs ${v?.fighter2}`}
                    subtitle={`${v?.division} | ${v?.rounds} Rounds`}
                  />
                )}
              </div>
            ))}
          {prelim &&
            sortedPrelimEvents &&
            sortedPrelimEvents.map(v => (
              <div className={!v.isLive ? 'event-item-ppv' : 'event-item-ppv-active'}>
                {v.isLive && (
                  <div className="live-tag">
                    {intl.formatMessage({ id: `organization.event.livevideo` })}
                  </div>
                )}
                {!v.isLive && !isMobile && v.winner == v.fighter1 && (
                  <div className="winner1-tag">W</div>
                )}
                {!v.isLive && !isMobile && v.winner == v.fighter2 && (
                  <div className="winner2-tag">W</div>
                )}
                {!v.isLive && !isMobile && v.winner == v.fighter1 && (
                  <div className="loser2-tag">L</div>
                )}
                {!v.isLive && !isMobile && v.winner == v.fighter2 && (
                  <div className="loser1-tag">L</div>
                )}
                {!isMobile && (
                  <div>
                    {v?.fighter1} vs {v?.fighter2}
                    <div className="event-item-ppv-desc">
                      {`${v?.division} | ${v?.rounds} Rounds`}
                    </div>
                  </div>
                )}
                {isMobile && (
                  <DropDown
                    textBold={`${intl.formatMessage({ id: 'organization.winner' })}: `}
                    text={v?.winner}
                    title={`${v?.fighter1} vs ${v?.fighter2}`}
                    subtitle={`${v?.division} | ${v?.rounds} Rounds`}
                  />
                )}
              </div>
            ))}
        </div>
        <br />
      </div>
      {!isMobile && <br />}
      {!isMobile && <br />}
      {!isMobile && <br />}
      {!isMobile && <br />}
      {!isMobile && <br />}
      {!isMobile && <br />}
    </div>
  );
};

export default OrganizationPPV;
