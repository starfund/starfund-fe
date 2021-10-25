import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

const CountDownTimer = ({ date, event }) => {
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
          <div className="timer-days-number">{timeLeft[interval]} </div>
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
        <div className="timer-col">
          {timeLeft[interval] < 10 ? (
            <div className="timer-time-number">
              {'0'}
              {timeLeft[interval]}{' '}
            </div>
          ) : (
            <div className="timer-time-number">{timeLeft[interval]} </div>
          )}
          <div className="timer-labels">
            {intl.formatMessage({ id: `organization.${interval}` })}{' '}
          </div>
        </div>
      );
    } else {
      timerComponents.push(
        <div className="timer-col">
          {timeLeft[interval] < 10 ? (
            <div className="timer-time-number">
              {'0'}
              {timeLeft[interval]}
              {':'}
            </div>
          ) : (
            <div className="timer-time-number">
              {timeLeft[interval]}
              {':'}
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
      {timerComponents.length > 0 && (
        <div className="event-div">
          <div className="event-name">{event.name}</div>
          <div className="event-row">
            <div className="event-fighter-name">{event.fighters.fighters[0].name}</div>
            <div className="event-vs">VS</div>
          </div>
          <div className="event-fighter-name">{event.fighters.fighters[1].name}</div>
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
          <button type="button" className="btn btn-danger btn-lg">
            {intl.formatMessage({ id: 'organization.button.buyppv' })}
          </button>
        </div>
      )}
      <br />
      <br />
    </div>
  );
};

export default CountDownTimer;
