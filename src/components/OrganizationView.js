import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import { Link, useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useMediaQuery } from 'react-responsive';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useSession } from 'hooks';
import Carousel from 'react-grid-carousel';
import ConfirmationModal from './common/ConfirmationModal';
import { getOrganizations } from '../state/actions/organizationActions';
import { getSubscriptions } from '../state/actions/subscriptionActions';

import BillingForm from './BillingForm';
import PaymentMode from './PaymentMode';
import HomeFooter from './HomeFooter';
import OrganizationHome from './OrganizationHome';
import OrganizationPPV from './OrganizationPPV';
import OrganizationEvents from './OrganizationEvents';
import OrganizationMultiplePPV from './OrganizationMultiplePPV';

const OrganizationView = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const intl = useIntl();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [payPPV, setPayPPV] = useState(false);
  const [payMonthly, setPayMonthly] = useState(false);
  const [setPayYearly] = useState(false);
  const [allevents2, setAllEvents2] = useState(true);
  const currentUser = useSelector(state => state.session.user);
  const { authenticated } = useSession();

  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  useEffect(() => {
    dispatch(getOrganizations());
  }, [dispatch]);

  useEffect(() => {
    if (authenticated) {
      dispatch(getSubscriptions());
    }
  }, [authenticated, dispatch]);

  const organization = useSelector(
    state =>
      state.organizations.organizations.filter(f => f.name.toLowerCase() == name.toLowerCase())[0]
  );

  const sortedEvents = organization && [...organization.events];
  sortedEvents?.sort((a, b) => (new Date(a.eventDate) - new Date(b.eventDate) >= 0 ? 1 : -1));

  const today = new Date();
  const supporting = useSelector(state => state.subscriptions?.orgSubscriptions);
  const supportingPPV = useSelector(state => state.subscriptions?.ppvCharges);
  const payed = supporting.map(s => s.orgName).includes(name);
  const ppvEvents = sortedEvents && sortedEvents.filter(e => e.homePage === true);
  const lastEvent = ppvEvents && ppvEvents[0];
  const [ppvEvent, setPPVEvent] = useState(lastEvent);
  const [selectedPPV, setSelectedPPV] = useState(ppvEvents?.length == 1);
  const [noReload, setNoReload] = useState(false);
  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  useEffect(() => {
    if (!noReload) {
      setPPVEvent(lastEvent);
      setSelectedPPV(ppvEvents?.length == 1);
    }
  }, [noReload, lastEvent, ppvEvents]);

  const payedPPV = supportingPPV.map(s => s.orgEvent).includes(lastEvent?.id);

  const isDiscount = e => {
    return e?.finished && today > new Date(e?.eventDate) && today < addDays(e?.eventDate, 30);
  };

  const selectPPVEvent = e => {
    setSelectedPPV(true);
    setPPVEvent(e);
    setNoReload(true);
  };

  const selectOptionPPV = () => {
    setPayPPV(true);
    setPayMonthly(false);
    setPayYearly(false);
    setModalIsOpen(false);
  };

  const selectOptionMonthly = () => {
    setPayPPV(false);
    setPayMonthly(true);
    setPayYearly(false);
    setModalIsOpen(false);
  };

  const selectOptionYearly = () => {
    setPayPPV(false);
    setPayMonthly(false);
    setPayYearly(true);
    setModalIsOpen(false);
  };

  const backFunction = () => {
    setPayPPV(false);
    setPayMonthly(false);
    setPayYearly(false);
    setModalIsOpen(true);
  };

  function uniq(a) {
    return a?.sort().filter(function(item, pos, ary) {
      return !pos || item != ary[pos - 1];
    });
  }

  const getAllFightersOrganization = () => {
    const allVideos = organization?.events
      ?.map(e => !e?.homePage && e?.mainEvents.concat(e?.prelimEvents))
      .flat();
    const allFighters = allVideos
      .map(v => {
        return [v?.fighter1, v?.fighter2];
      })
      .flat();
    return uniq(allFighters);
  };

  const getAllFightersLastEvent = e => {
    const allVideos = e?.mainEvents.concat(lastEvent?.prelimEvents).flat();
    const allFighters = allVideos
      ?.map(v => {
        return [v?.fighter1, v?.fighter2];
      })
      .flat();
    return uniq(allFighters);
  };

  const subscribeAction = e => {
    setPPVEvent(e);
    setModalIsOpen(true);
  };

  const [home, setHome] = useState(!payedPPV);
  const [allevents, setAllEvents] = useState(false);
  const [ppv, setPPV] = useState(payedPPV);

  return (
    <div className="fighter-container">
      <div className="cover-container">
        {organization &&
          ((isMobile && organization?.mobileCoverPhotos?.length == 1) ||
            (!isMobile && organization?.coverPhotos?.length == 1)) && (
            <LazyLoadImage
              className="fighter-cover"
              src={
                isMobile
                  ? organization?.mobileCoverPhotos[0]?.image
                  : organization?.coverPhotos[0]?.image
              }
              alt="Cover"
            />
          )}
        {organization && isMobile && organization?.mobileCoverPhotos?.length > 1 && (
          <Carousel loop autoplay={2000} gap={0} mobileBreakpoint={0} hideArrow>
            {organization?.mobileCoverPhotos.map(f => (
              <Carousel.Item>
                <img src={f.image} alt="" className="fighter-cover" style={{ width: '100vw' }} />
              </Carousel.Item>
            ))}
          </Carousel>
        )}
        {organization && !isMobile && organization?.coverPhotos?.length > 1 && (
          <Carousel loop autoplay={2000}>
            {organization?.coverPhotos.map(f => (
              <Carousel.Item>
                <img src={f.image} alt="" className="fighter-cover" style={{ width: '100vw' }} />
              </Carousel.Item>
            ))}
          </Carousel>
        )}
        {!organization ||
          (((isMobile && organization?.mobileCoverPhotos?.length == 0) ||
            (!isMobile && organization?.coverPhotos?.length == 0)) && (
            <SkeletonTheme color="#202020" highlightColor="#444">
              <Skeleton height="90vh" />
            </SkeletonTheme>
          ))}
        {organization && (
          <div className="centered">
            <br />
            <br />
            <br />
            {organization && (
              <button
                type="button"
                className="btn btn-danger btn-lg"
                onClick={() => {
                  if (payedPPV || isMobile || ppvEvents.length > 0) {
                    setHome(false);
                    setAllEvents(false);
                    setPPV(true);
                  } else {
                    setPPVEvent(lastEvent);
                    setModalIsOpen(true);
                  }
                }}
              >
                {!lastEvent && intl.formatMessage({ id: 'organization.seasonpass' })}
                {lastEvent && lastEvent?.finished && (
                  <FormattedMessage
                    id="organization.button.rewatchppv"
                    values={{ eventName: lastEvent?.name }}
                  />
                )}
                {lastEvent &&
                  !lastEvent?.finished &&
                  !lastEvent.replay &&
                  intl.formatMessage({
                    id: 'organization.button.watch'
                  })}
                {lastEvent &&
                  !lastEvent?.finished &&
                  lastEvent.replay &&
                  intl.formatMessage({
                    id: 'organization.button.replay'
                  })}
              </button>
            )}
          </div>
        )}
      </div>
      {!isMobile && (
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
                      setAllEvents2(true);
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
                      if (ppvEvents?.length > 1) {
                        setSelectedPPV(false);
                        setNoReload(false);
                      }
                    }}
                  >
                    {intl.formatMessage({ id: 'header.ppv' })}
                  </Link>
                </li>
              </ul>
            </React.Fragment>
          </div>
        </nav>
      )}
      {home && (
        <OrganizationHome
          organization={organization}
          subscribeAction={() => subscribeAction(lastEvent)}
          payed={payed}
          payedPPV={payedPPV}
          watchAction={() => {
            setHome(false);
            setAllEvents(false);
            setPPV(true);
          }}
          homeNav={() => {
            setHome(true);
            setAllEvents(false);
            setPPV(false);
          }}
          eventsNav={() => {
            setHome(false);
            setAllEvents(true);
            setPPV(false);
          }}
          PPVNav={() => {
            setHome(false);
            setAllEvents(false);
            setPPV(true);
          }}
        />
      )}
      {allevents && (
        <OrganizationEvents
          organization={organization}
          subscribeAction={subscribeAction}
          payed={payed}
          homeNav={() => {
            setHome(true);
            setAllEvents(false);
            setPPV(false);
          }}
          supportingPPV={supportingPPV}
          goToPPV={() => {
            setHome(false);
            setAllEvents(false);
            setPPV(true);
          }}
          allevents={allevents2}
          setAllEvents={setAllEvents2}
        />
      )}
      {ppv && !selectedPPV && ppvEvents.length > 1 && (
        <OrganizationMultiplePPV
          events={ppvEvents}
          selectEvent={selectPPVEvent}
          supportingPPV={supportingPPV}
        />
      )}
      {ppv && selectedPPV && (
        <OrganizationPPV
          event={ppvEvent}
          payed={supportingPPV.map(s => s.orgEvent).includes(ppvEvent?.id)}
          subscribeAction={() => subscribeAction(ppvEvent)}
          hasBackground={!sortedEvents[0]?.homePage}
          homeNav={() => {
            setHome(true);
            setAllEvents(false);
            setPPV(false);
          }}
        />
      )}
      {ppv && !lastEvent && (
        <div className="no-ppv-page">
          <div className="no-ppv-title">
            {intl.formatMessage({
              id: 'organization.noppv.title'
            })}
          </div>
          <div className="no-ppv-desc">
            {intl.formatMessage({
              id: 'organization.noppv.desc'
            })}
          </div>
        </div>
      )}
      {organization && (
        <div>
          <ConfirmationModal
            explain={intl.formatMessage({
              id: 'payment.title'
            })}
            isOpen={modalIsOpen}
            setIsOpen={setModalIsOpen}
            isDelete={false}
            email={currentUser?.email}
          >
            <PaymentMode
              onDemandPrice={
                isDiscount(ppvEvent) ? organization?.ppvPrice * 0.75 : organization?.ppvPrice
              }
              MonthlyPrice={organization?.subPrice}
              selectOptionPPV={() => selectOptionPPV()}
              selectOptionMonthly={() => selectOptionMonthly()}
              selectOptionYearly={() => selectOptionYearly()}
              payed={payed || sortedEvents[0]?.homePage}
              payedPPV={supportingPPV.map(s => s.orgEvent).includes(ppvEvent?.id) || !lastEvent}
              yearlyDiscount={organization?.yearlyDiscount}
              event={ppvEvent}
            />
          </ConfirmationModal>

          <ConfirmationModal
            title={intl.formatMessage({ id: 'billing.title' })}
            isOpen={payMonthly}
            setIsOpen={setPayMonthly}
            isDelete={false}
            price={organization?.subPrice * 12}
            email={currentUser?.email}
            organization={organization?.id}
            backFunction={() => backFunction()}
          >
            <BillingForm
              email={currentUser?.email}
              organization={organization?.name}
              fighters={getAllFightersOrganization()}
              price={organization?.subPrice * 12}
              type="subscription"
              subscriptionType="monthly"
              hasReferal
            />
          </ConfirmationModal>
          <ConfirmationModal
            title={intl.formatMessage({ id: 'billing.ppv.title' })}
            explain={intl.formatMessage({ id: 'modal.header.ppv.explain' })}
            isOpen={payPPV}
            setIsOpen={setPayPPV}
            isDelete={false}
            price={isDiscount(ppvEvent) ? organization?.ppvPrice * 0.75 : organization?.ppvPrice}
            email={currentUser?.email}
            organization={organization?.id}
            backFunction={() => backFunction()}
          >
            <BillingForm
              email={currentUser?.email}
              orgEvent={ppvEvent?.id}
              price={isDiscount(ppvEvent) ? organization?.ppvPrice * 0.75 : organization?.ppvPrice}
              fighters={getAllFightersLastEvent(ppvEvent)}
              type="ppv"
              hasReferal
            />
          </ConfirmationModal>
          {/* <ConfirmationModal
            title={intl.formatMessage({ id: 'billing.title.yearly' })}
            isOpen={payYearly}
            setIsOpen={setPayYearly}
            isDelete={false}
            price={
              Math.round(
                (organization?.subPrice / 100) * 12 * ((100 - organization?.yearlyDiscount) / 100)
              ) * 100
            }
            email={currentUser?.email}
            organization={organization?.id}
            backFunction={() => backFunction()}
          >
            <BillingForm
              email={currentUser?.email}
              organization={organization?.name}
              fighters={getAllFightersOrganization()}
              type="subscription"
              subscriptionType="yearly"
              price={
                Math.round(
                  (organization?.subPrice / 100) * 12 * ((100 - organization?.yearlyDiscount) / 100)
                ) * 100
              }
              hasReferal
            />
            </ConfirmationModal> */}
        </div>
      )}
      <HomeFooter />
    </div>
  );
};

export default OrganizationView;
