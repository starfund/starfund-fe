import React from 'react';

import { useMediaQuery } from 'react-responsive';

import CountDownTimer from './CountDownTimer';
import EventView from './EventView';
import EventViewMobile from './EventViewMobile';

const OrganizationHome = ({
  organization,
  subscribeAction,
  watchAction,
  payed,
  payedPPV,
  eventsNav
}) => {
  const sortedEvents = organization?.events.slice();
  sortedEvents?.sort((a, b) => (new Date(a.eventDate) - new Date(b.eventDate) >= 0 ? 1 : -1));
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });
  const lastEvent = sortedEvents && sortedEvents.filter(e => e.homePage === true)[0];
  const nonPpvEvents = sortedEvents && sortedEvents.filter(e => e.homePage === false);

  const getPrevEvent = () => {
    if (nonPpvEvents?.length >= 3) {
      return nonPpvEvents[nonPpvEvents.length - 3];
    }
    if (nonPpvEvents?.length == 2) {
      return nonPpvEvents[0];
    }
  };

  const getCurrentEvent = () => {
    if (nonPpvEvents?.length >= 3) {
      return nonPpvEvents[nonPpvEvents.length - 2];
    }
    if (nonPpvEvents?.length == 2) {
      return nonPpvEvents[1];
    }
    if (nonPpvEvents?.length == 1) {
      return nonPpvEvents[0];
    }
  };

  const getNextEvent = () => {
    if (nonPpvEvents?.length >= 3) {
      return nonPpvEvents[nonPpvEvents.length - 1];
    }
    return lastEvent;
  };

  return (
    <div className="organization-container">
      <div>
        {lastEvent && !isMobile && (
          <CountDownTimer
            event={lastEvent}
            subscribeAction={subscribeAction}
            payed={payedPPV}
            watchAction={watchAction}
            hasTimer
          />
        )}
        {lastEvent && isMobile && sortedEvents[0].homePage && (
          <div>
            <CountDownTimer
              event={lastEvent}
              subscribeAction={subscribeAction}
              payed={payedPPV}
              watchAction={watchAction}
              hasTimer={false}
            />
            <br />
            <br />
            <br />
          </div>
        )}
        {!lastEvent && <br />}
        {!lastEvent && <br />}
        {!lastEvent && <br />}
        {nonPpvEvents && !sortedEvents[0].homePage && !isMobile && (
          <EventView
            prevEvent={getPrevEvent()}
            currEvent={getCurrentEvent()}
            nextEvent={getNextEvent()}
            subscribeAction={subscribeAction}
            payed={payed}
            payedPPV={payedPPV}
            goToPPV={watchAction}
            isUpcoming={getNextEvent()?.id == lastEvent?.id}
          />
        )}
        {sortedEvents && !sortedEvents[0].homePage && isMobile && (
          <EventViewMobile
            organization={organization}
            subscribeAction={subscribeAction}
            payed={payed}
            eventsNav={eventsNav}
          />
        )}
      </div>
    </div>
  );
};

export default OrganizationHome;
