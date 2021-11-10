import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ConfirmationModal from './common/ConfirmationModal';
import { getFighters } from '../state/actions/fighterActions';
import CommonModal from './common/CommonModal';
import BillingForm from './BillingForm';
import PPVForm from './PPVForm';

import HomeFooter from './HomeFooter';
import background from '../assets/efc_poster_template.png';
import OrganizationHome from './OrganizationHome';
import OrganizationPPV from './OrganizationPPV';
import OrganizationEvents from './OrganizationEvents';

const OrganizationView = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalPPVIsOpen, setModalPPVIsOpen] = useState(false);
  const currentUser = useSelector(state => state.session.user);
  const [PPVOpen, setPPVOpen] = useState(false);
  useEffect(() => {
    dispatch(getFighters(true));
  }, [dispatch]);

  const fighters = useSelector(state => state.fighters.fighters);
  const fightersNames = [
    {
      name: 'GANE'
    },
    {
      name: 'NGANNOU'
    }
  ];
  const Videos = fighters && fighters[10]?.publicVideos;
  const prelimVideos = Videos?.map(a => {
    return { ...a };
  })?.map(v => {
    v.isLive = false;
    return v;
  });
  const mainVideos = Videos?.map(a => {
    return { ...a };
  })?.map(v => {
    v.isLive = false;
    return v;
  });
  if (mainVideos) {
    mainVideos[1].isLive = true;
  }

  const events = [
    {
      name: 'EFC 29',
      date: '2020-10-08T22:00:00',
      location: 'Globall Sports Center',
      fighters: { fightersNames },
      mainVideos: { mainVideos },
      prelimVideos: { prelimVideos }
    },
    {
      name: 'BACK WITH A VENGENCE',
      date: '2021-06-26T20:00:00',
      location: 'Globall Sports Center',
      fighters: { fightersNames },
      mainVideos: { mainVideos },
      prelimVideos: { prelimVideos }
    },
    {
      name: 'WARRIORS CHALLENGE',
      date: '2021-07-31T16:00:00',
      location: 'Globall Sports Center',
      fighters: { fightersNames },
      mainVideos: { mainVideos },
      prelimVideos: { prelimVideos }
    },
    {
      name: 'RAGE IN THE CAGE',
      date: '2021-10-08T22:00:00',
      location: 'Globall Sports Center',
      fighters: { fightersNames },
      mainVideos: { mainVideos },
      prelimVideos: { prelimVideos }
    },
    {
      name: 'HOLIDAY HAVOC',
      date: '2021-12-04T22:00:00',
      location: 'The Space, Westbury NY',
      fighters: { fightersNames },
      mainVideos: { mainVideos },
      prelimVideos: { prelimVideos }
    }
  ];

  const organization = {
    id: '1',
    name: 'Extreme Cage Fighting',
    events: { events }
  };
  const [home, setHome] = useState(true);
  const [allevents, setAllEvents] = useState(false);
  const [ppv, setPPV] = useState(false);
  const [event, setEvent] = useState();
  const [defaulturl] = useState();

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
                    setEvent(organization?.events?.events[organization?.events?.events.length - 1]);
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
      {allevents && (
        <OrganizationEvents
          organization={organization}
          subscribeAction={() => setModalIsOpen(true)}
        />
      )}
      {ppv && fighters && (
        <OrganizationPPV
          event={event}
          defaulturl={defaulturl}
          subscribeAction={() => setModalIsOpen(true)}
        />
      )}
      {organization && (
        <div>
          <ConfirmationModal
            title={intl.formatMessage({ id: 'billing.title' })}
            explain={intl.formatMessage({
              id: 'modal.header.explain'
            })}
            isOpen={modalIsOpen}
            setIsOpen={setModalIsOpen}
            isDelete={false}
            price={organization?.subPrice}
            email={currentUser?.email}
          >
            <BillingForm
              email={currentUser?.email}
              organization={organization?.name}
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
