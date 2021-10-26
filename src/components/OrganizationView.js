import React, { useState } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ConfirmationModal from './common/ConfirmationModal';
import CommonModal from './common/CommonModal';
import BillingForm from './BillingForm';
import PPVForm from './PPVForm';

import HomeFooter from './HomeFooter';
import background from '../assets/poster_ppv.png';
import OrganizationHome from './OrganizationHome';

const OrganizationView = () => {
  const intl = useIntl();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalPPVIsOpen, setModalPPVIsOpen] = useState(false);
  const currentUser = useSelector(state => state.session.user);
  const [PPVOpen, setPPVOpen] = useState(false);

  const mainVideos = [
    {
      name: 'Patrick Brady vs Raiden Kovacs'
    },
    {
      name: 'Marecelus Wilkinson vs Joshua Lilley'
    },
    {
      name: 'Rochelle Peebles III vs Terelle Perry'
    },
    {
      name: 'Tyler Hiob vs Will Valentin'
    },
    {
      name: 'Hunter Sulc vs Ryan Smith'
    }
  ];
  const prelimVideos = [
    {
      name: 'Connor McFarland vs Matthew Santagelo'
    },
    {
      name: 'Charlie McCloskey vs James'
    },
    {
      name: 'Rochelle Peebles III vs Terelle Perry'
    },
    {
      name: 'Tyler Hiob vs Will Valentin'
    },
    {
      name: 'Hunter Sulc vs Ryan Smith'
    }
  ];
  const organization = {
    id: '1',
    name: 'CageZilla',
    mainVideos: { mainVideos },
    prelimVideos: { prelimVideos }
  };
  const [home, setHome] = useState(true);
  const [allevents, setAllEvents] = useState(false);
  const [ppv, setPPV] = useState(false);

  return (
    <div className="fighter-container">
      <div className="cover-container">
        {organization ? (
          <LazyLoadImage className="fighter-cover" src={background} alt="Cover" />
        ) : (
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height="90vh" />
          </SkeletonTheme>
        )}
        {organization && (
          <div className="centered">
            <br />
            <br />
            <br />
            {organization && (
              <button
                type="button"
                className="btn btn-danger btn-lg"
                onClick={() => setModalIsOpen(true)}
              >
                {intl.formatMessage({ id: 'organization.button.watch' })}
              </button>
            )}
          </div>
        )}
      </div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-collapse" id="navbarText">
          <React.Fragment>
            <ul className="navbar-nav navbar-center mr-auto">
              {organization && (
                <li className={cn('nav-item', { active: home })}>
                  <Link
                    className="nav-link"
                    href=""
                    onClick={() => {
                      setHome(true);
                      setAllEvents(false);
                      setPPV(false);
                    }}
                  >
                    {intl.formatMessage({ id: 'header.home' })}{' '}
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
              )}
              <li className={cn('nav-item', { active: allevents })}>
                <Link
                  className="nav-link"
                  href=""
                  onClick={() => {
                    setHome(false);
                    setAllEvents(true);
                    setPPV(false);
                  }}
                >
                  {intl.formatMessage({ id: 'header.allevents' })}{' '}
                </Link>
              </li>
              <li className={cn('nav-item', { active: ppv })}>
                <Link
                  className="nav-link"
                  onClick={() => {
                    setHome(false);
                    setAllEvents(false);
                    setPPV(true);
                  }}
                >
                  {intl.formatMessage({ id: 'header.ppv' })}
                </Link>
              </li>
            </ul>
          </React.Fragment>
        </div>
      </nav>
      {home && (
        <OrganizationHome
          organization={organization}
          subscribeAction={() => setModalIsOpen(true)}
        />
      )}
      {organization && (
        <div>
          <ConfirmationModal
            title={intl.formatMessage({ id: 'billing.title' })}
            explain={intl.formatMessage({
              id: organization?.support ? 'modal.header.support' : 'modal.header.explain'
            })}
            isOpen={modalIsOpen}
            setIsOpen={setModalIsOpen}
            isDelete={false}
            price={organization?.subPrice}
            email={currentUser?.email}
            fighter={organization?.id}
          >
            <BillingForm
              email={currentUser?.email}
              fighter={organization?.id}
              type="subscription"
            />
          </ConfirmationModal>
          <CommonModal
            title={intl.formatMessage({ id: 'ppv.title' })}
            isOpen={PPVOpen}
            setIsOpen={setPPVOpen}
            customWidth="80%"
            customHeight="80%"
          >
            <PPVForm
              onSubmit={setPPVOpen}
              nextStep={setModalPPVIsOpen}
              fighterName={`${organization?.name}`}
            />
          </CommonModal>
          <ConfirmationModal
            title={intl.formatMessage({ id: 'billing.ppv.title' })}
            explain={intl.formatMessage({ id: 'modal.header.ppv.explain' })}
            isOpen={modalPPVIsOpen}
            setIsOpen={setModalPPVIsOpen}
            isDelete={false}
            price={500}
            email={currentUser?.email}
            fighter={organization?.id}
          >
            <BillingForm email={currentUser?.email} fighter={organization?.id} type="ppv" />
          </ConfirmationModal>
        </div>
      )}
      <HomeFooter />
    </div>
  );
};

export default OrganizationView;
