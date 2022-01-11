import React, { useState } from 'react';
import cn from 'classnames';

import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import HomeFooter from './HomeFooter';
import EnrollOrganization from './EnrollOrganization';
import EnrollStar from './EnrollStar';

const EnrollView = () => {
  const intl = useIntl();

  const [isOrg, setIsOrg] = useState();

  return (
    <div>
      <div className="enroll-container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="navbar-collapse" id="navbarText">
            <React.Fragment>
              <ul className="navbar-nav navbar-center mr-auto">
                <li className={cn('nav-item', { active: !isOrg })}>
                  <Link className="nav-link" href="" onClick={() => setIsOrg(false)}>
                    {intl.formatMessage({ id: 'enroll.star' })}{' '}
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className={cn('nav-item', { active: isOrg })}>
                  <Link className="nav-link" onClick={() => setIsOrg(true)}>
                    {intl.formatMessage({ id: 'enroll.organization' })}
                  </Link>
                </li>
              </ul>
            </React.Fragment>
          </div>
        </nav>
        {isOrg ? <EnrollOrganization /> : <EnrollStar />}
      </div>
      <div>
        <HomeFooter />
      </div>
    </div>
  );
};

export default EnrollView;
