import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import cn from 'classnames';
import { Link } from 'react-router-dom';

const BecomeStarPage = () => {
  const intl = useIntl();
  const [isStar, setIsStar] = useState();
  return (
    <div className="contact-container">
      <div className="container">
        <div className="row center">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="navbar-collapse" id="navbarText">
              <React.Fragment>
                <ul className="navbar-nav mr-auto">
                  <li className={cn('nav-item', { active: isStar })}>
                    <Link className="nav-link" href="" onClick={() => setIsStar(true)}>
                      {intl.formatMessage({ id: 'enroll.star' })}{' '}
                      <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li className={cn('nav-item', { active: !isStar })}>
                    <Link className="nav-link" onClick={() => setIsStar(false)}>
                      {intl.formatMessage({ id: 'enroll.organization' })}
                    </Link>
                  </li>
                </ul>
              </React.Fragment>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BecomeStarPage;
