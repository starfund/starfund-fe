import React from 'react';

import { useMediaQuery } from 'react-responsive';

import CountDownTimer from './CountDownTimer';
import EventView from './EventView';
import EventViewMobile from './EventViewMobile';
import Background from '../assets/awcf_poster_bg2.png';

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
  const divImage = {
    backgroundImage: `url(${Background})`
  };
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });
  return (
    <div className="organization-container" style={divImage}>
      <div>
        {sortedEvents && !isMobile && (
          <CountDownTimer
            event={sortedEvents[sortedEvents?.length - 1]}
            subscribeAction={subscribeAction}
            payed={payedPPV}
            watchAction={watchAction}
          />
        )}
        {sortedEvents && !isMobile && (
          <EventView
            prevEvent={sortedEvents[sortedEvents?.length - 3]}
            currEvent={sortedEvents[sortedEvents?.length - 2]}
            nextEvent={sortedEvents[sortedEvents?.length - 1]}
            subscribeAction={subscribeAction}
            payed={payed}
          />
        )}
        {sortedEvents && isMobile && (
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
