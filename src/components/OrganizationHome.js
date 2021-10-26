import React, { useState } from 'react';
import cn from 'classnames';

import { useIntl } from 'react-intl';
import CountDownTimer from './CountDownTimer';
import EventView from './EventView';

const OrganizationHome = ({ organization, subscribeAction }) => {
  const fighters = [
    {
      name: 'BRADY'
    },
    {
      name: 'KOVACS'
    }
  ];
  const event1 = {
    name: 'CAGEZILLA 61',
    date: 'Saturday, August 21st',
    location: 'The Sailsburry Center, Manassas VA',
    fighters: { fighters }
  };
  const event2 = {
    name: 'CAGEZILLA 62',
    date: 'Saturday, August 21st',
    location: 'The Sailsburry Center, Manassas VA',
    fighters: { fighters }
  };
  const event3 = {
    name: 'CAGEZILLA 63',
    date: 'Saturday, August 21st',
    location: 'The Sailsburry Center, Manassas VA',
    fighters: { fighters }
  };
  const date = new Date('October 29, 2021 13:13:00');
  const intl = useIntl();
  const [prelim, setPrelim] = useState(false);

  return (
    <div>
      <div>
        <CountDownTimer date={date} event={event3} subscribeAction={subscribeAction} />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <EventView
          prevEvent={event1}
          currEvent={event2}
          nextEvent={event3}
          subscribeAction={subscribeAction}
        />
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
                {organization && (
                  <li className={cn('nav-item', { active: !prelim })}>
                    <p
                      className="nav-link"
                      href=""
                      onClick={() => {
                        setPrelim(false);
                      }}
                    >
                      {intl.formatMessage({ id: 'header.home' })}{' '}
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
                    {intl.formatMessage({ id: 'header.allevents' })}{' '}
                  </p>
                </li>
              </ul>
            </React.Fragment>
          </div>
        </nav>
        <div className="container-nav">
          {!prelim &&
            organization.mainVideos.mainVideos &&
            organization?.mainVideos.mainVideos.map(v => (
              <div className="event-item">
                {v?.name}
                <button
                  type="button"
                  className="btn btn-danger btn-lg"
                  onClick={() => subscribeAction()}
                >
                  {intl.formatMessage({ id: 'organization.watchfight' })}
                </button>
              </div>
            ))}
          {prelim &&
            organization.prelimVideos.prelimVideos &&
            organization?.prelimVideos.prelimVideos.map(v => (
              <div className="event-item">
                {v?.name}
                <button
                  type="button"
                  className="btn btn-danger btn-lg"
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

export default OrganizationHome;
