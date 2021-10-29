import React, { useState } from 'react';
import cn from 'classnames';

import { useIntl } from 'react-intl';
import CountDownTimer from './CountDownTimer';
import EventView from './EventView';

const OrganizationHome = ({ organization, subscribeAction }) => {
  const intl = useIntl();
  const [prelim, setPrelim] = useState(false);
  return (
    <div className="organization-container">
      <div>
        <CountDownTimer
          event={organization?.events.events[organization?.events.events.length - 1]}
          subscribeAction={subscribeAction}
        />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <EventView
          prevEvent={organization?.events.events[organization?.events.events.length - 3]}
          currEvent={organization?.events.events[organization?.events.events.length - 2]}
          nextEvent={organization?.events.events[organization?.events.events.length - 1]}
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
            organization?.events.events
              .filter(e => e?.mainVideos?.mainVideos?.length > 0)
              .map(j => j.mainVideos?.mainVideos)
              .flat()
              .map(v => (
                <div className="event-item">
                  {v?.title}
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
            organization?.events.events
              .filter(e => e?.prelimVideos.prelimVideos.length > 0)
              .map(j => j.prelimVideos.prelimVideos)
              .flat()
              .map(v => (
                <div className="event-item">
                  {v?.title}
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
