import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import { Link, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useMediaQuery } from 'react-responsive';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useSession } from 'hooks';
import ConfirmationModal from './common/ConfirmationModal';
import { getOrganizations } from '../state/actions/organizationActions';
import { getSubscriptions } from '../state/actions/subscriptionActions';

import BillingForm from './BillingForm';
import PaymentMode from './PaymentMode';
import HomeFooter from './HomeFooter';
import OrganizationHome from './OrganizationHome';
import OrganizationPPV from './OrganizationPPV';
import OrganizationEvents from './OrganizationEvents';

const OrganizationView = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const intl = useIntl();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [payPPV, setPayPPV] = useState(false);
  const [payMonthly, setPayMonthly] = useState(false);
  const [payYearly, setPayYearly] = useState(false);
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
    state => state.organizations.organizations.filter(f => f.name == name)[0]
  );

  const sortedEvents = organization && [...organization.events];
  sortedEvents?.sort((a, b) => (new Date(a.eventDate) - new Date(b.eventDate) >= 0 ? 1 : -1));

  const today = new Date();
  const supporting = useSelector(state => state.subscriptions?.orgSubscriptions);
  const supportingPPV = useSelector(state => state.subscriptions?.ppvCharges);
  const payed = supporting.map(s => s.orgName).includes(name);
  const lastEvent = sortedEvents && sortedEvents.filter(e => e.homePage === true)[0];
  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const payedPPV = supportingPPV.map(s => s.orgEvent).includes(lastEvent?.id);

  const isDiscount =
    lastEvent?.finished &&
    today > new Date(lastEvent?.eventDate) &&
    today < addDays(lastEvent?.eventDate, 30);

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

  const [home, setHome] = useState(!payedPPV);
  const [allevents, setAllEvents] = useState(false);
  const [ppv, setPPV] = useState(payedPPV);
  const [event, setEvent] = useState();

  return (
    <div className="fighter-container">
      <div className="cover-container">
        {organization ? (
          <LazyLoadImage
            className="fighter-cover"
            src={isMobile ? organization?.mobileCoverPhoto : organization?.coverPhoto}
            alt="Cover"
          />
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
                onClick={() => {
                  if (payedPPV || isMobile) {
                    setHome(false);
                    setAllEvents(false);
                    setPPV(true);
                    setEvent(sortedEvents.filter(e => e.homePage)[0]);
                  } else {
                    setModalIsOpen(true);
                  }
                }}
              >
                {intl.formatMessage({
                  id: lastEvent.finished
                    ? 'organization.button.rewatchppv'
                    : 'organization.button.watch'
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
                      setEvent(sortedEvents.filter(e => e.homePage)[0]);
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
          subscribeAction={() => setModalIsOpen(true)}
          payed={payed}
          payedPPV={payedPPV}
          watchAction={() => {
            setHome(false);
            setAllEvents(false);
            setPPV(true);
            setEvent(sortedEvents[sortedEvents?.length - 1]);
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
          subscribeAction={() => setModalIsOpen(true)}
          payed={payed}
          homeNav={() => {
            setHome(true);
            setAllEvents(false);
            setPPV(false);
          }}
          payedPPV={payedPPV}
          goToPPV={() => {
            setHome(false);
            setAllEvents(false);
            setPPV(true);
            setEvent(sortedEvents.filter(e => e.homePage)[0]);
          }}
          allevents={allevents2}
          setAllEvents={setAllEvents2}
        />
      )}
      {ppv && (
        <OrganizationPPV
          event={event}
          payed={payedPPV}
          subscribeAction={() => setModalIsOpen(true)}
          homeNav={() => {
            setHome(true);
            setAllEvents(false);
            setPPV(false);
          }}
        />
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
              onDemandPrice={isDiscount ? organization?.ppvPrice * 0.75 : organization?.ppvPrice}
              MonthlyPrice={organization?.subPrice}
              selectOptionPPV={() => selectOptionPPV()}
              selectOptionMonthly={() => selectOptionMonthly()}
              selectOptionYearly={() => selectOptionYearly()}
              payed={payed}
              payedPPV={payedPPV}
              yearlyDiscount={organization?.yearlyDiscount}
            />
          </ConfirmationModal>

          <ConfirmationModal
            title={intl.formatMessage({ id: 'billing.title' })}
            explain={intl.formatMessage({
              id: 'modal.header.explain'
            })}
            isOpen={payMonthly}
            setIsOpen={setPayMonthly}
            isDelete={false}
            price={organization?.subPrice}
            email={currentUser?.email}
            organization={organization?.id}
          >
            <BillingForm
              email={currentUser?.email}
              organization={organization?.name}
              price={organization?.subPrice}
              type="subscription"
            />
          </ConfirmationModal>
          <ConfirmationModal
            title={intl.formatMessage({ id: 'billing.ppv.title' })}
            explain={intl.formatMessage({ id: 'modal.header.ppv.explain' })}
            isOpen={payPPV}
            setIsOpen={setPayPPV}
            isDelete={false}
            price={isDiscount ? organization?.ppvPrice * 0.75 : organization?.ppvPrice}
            email={currentUser?.email}
            organization={organization?.id}
          >
            <BillingForm
              email={currentUser?.email}
              orgEvent={sortedEvents[sortedEvents?.length - 1]?.id}
              price={isDiscount ? organization?.ppvPrice * 0.8 : organization?.ppvPrice}
              type="ppv"
            />
          </ConfirmationModal>
          <ConfirmationModal
            title={intl.formatMessage({ id: 'billing.title.yearly' })}
            explain={intl.formatMessage({
              id: 'modal.header.explain'
            })}
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
          >
            <BillingForm
              email={currentUser?.email}
              organization={organization?.name}
              type="subscription"
              price={
                Math.round(
                  (organization?.subPrice / 100) * 12 * ((100 - organization?.yearlyDiscount) / 100)
                ) * 100
              }
            />
          </ConfirmationModal>
        </div>
      )}
      <HomeFooter />
    </div>
  );
};

export default OrganizationView;
