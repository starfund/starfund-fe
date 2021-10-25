import React, { useState } from 'react';
import cn from 'classnames';

import { useIntl } from 'react-intl';
import CountDownTimer from './CountDownTimer';

const OrganizationHome = ({ organization }) => {
  const fighters = [
    {
      name: 'BRADY'
    },
    {
      name: 'KOVACS'
    }
  ];
  const event = { name: 'CAGEZILLA 63', fighters: { fighters } };
  const date = new Date('October 25, 2021 13:13:00');
  const intl = useIntl();
  const [prelim, setPrelim] = useState(true);

  return (
    <div className="container">
      <CountDownTimer date={date} event={event} />
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-collapse" id="navbarText">
          <React.Fragment>
            <ul className="navbar-nav navbar-center mr-auto">
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
                  <span className="sr-only">(current)</span>
                </p>
              </li>
            </ul>
          </React.Fragment>
        </div>
      </nav>
      {!prelim &&
        organization &&
        organization.mainVideos &&
        organization?.mainVideos.map(() => {
          <div className="event-item" />;
        })}
      ) }
    </div>
  );
};

export default OrganizationHome;
