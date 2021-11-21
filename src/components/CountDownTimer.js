import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useMediaQuery } from 'react-responsive';

const CountDownTimer = ({ event, subscribeAction, watchAction, payed }) => {
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

  const calculateTimeLeft = date => {
    const diff = date - new Date();
    let timeLeft = {};

    if (diff > 0) {
      timeLeft = {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(date));

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(date));
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach(interval => {
    if (!timeLeft[interval] && interval == 'days') {
      return;
    }
    if (interval == 'days') {
      timerComponents.push(
        <div className="timer-col-days">
          <div className={isMobile ? 'timer-days-number-mobile' : 'timer-days-number'}>
            {timeLeft[interval]}{' '}
          </div>
          {timeLeft[interval] == 1 ? (
            <div className="timer-labels">{intl.formatMessage({ id: 'organization.day' })} </div>
          ) : (
            <div className="timer-labels">
              {intl.formatMessage({ id: `organization.${interval}` })}{' '}
            </div>
          )}
        </div>
      );
    } else if (interval == 'seconds') {
      timerComponents.push(
        <div className={isMobile ? 'timer-col-mobile' : 'timer-col'}>
          {timeLeft[interval] < 10 ? (
            <div className={isMobile ? 'timer-time-number-mobile' : 'timer-time-number'}>
              {'0'}
              {timeLeft[interval]}{' '}
            </div>
          ) : (
            <div className={isMobile ? 'timer-time-number-mobile' : 'timer-time-number'}>
              {timeLeft[interval]}{' '}
            </div>
          )}
          <div className="timer-labels">
            {intl.formatMessage({ id: `organization.${interval}` })}{' '}
          </div>
        </div>
      );
    } else {
      timerComponents.push(
        <div className={isMobile ? 'timer-col-mobile' : 'timer-col'}>
          {timeLeft[interval] < 10 ? (
            <div className={isMobile ? 'timer-time-number-mobile' : 'timer-time-number'}>
              {'0'}
              {timeLeft[interval]}
              {' :'}
            </div>
          ) : (
            <div className={isMobile ? 'timer-time-number-mobile' : 'timer-time-number'}>
              {timeLeft[interval]}
              {': '}
            </div>
          )}
          <div className="timer-labels">
            {intl.formatMessage({ id: `organization.${interval}` })}{' '}
          </div>
        </div>
      );
    }
  });

  return (
    <div className="cover-container">
      <br />
      <br />
      <div className="timer-div">{timerComponents.length > 0 && timerComponents}</div>
      <br />
      <br />
      <br />
      {timerComponents.length > 0 && (
        <div className="event-div">
          <div className="event-name">{event.name}</div>
          <div className="event-row">
            <div className="event-fighter-name">{getFirstFighter()}</div>
            {getFirstFighter() != '' && getSecondFighter() != '' && (
              <div className="event-vs">VS</div>
            )}
          </div>
          <div className="event-fighter-name">{getSecondFighter()}</div>
          <div className="event-row">
            <br />
            <br />
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
          <button
            type="button"
            className="btn btn-danger btn-lg"
            onClick={() => {
              payed ? watchAction() : subscribeAction();
            }}
          >
            {payed
              ? intl.formatMessage({ id: 'organization.button.watch' })
              : intl.formatMessage({ id: 'organization.button.buyppv' })}
          </button>
        </div>
      )}
      <br />
      <br />
    </div>
  );
};

export default CountDownTimer;
