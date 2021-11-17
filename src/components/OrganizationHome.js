import React from 'react';

import CountDownTimer from './CountDownTimer';
import EventView from './EventView';
import Background from '../assets/ppv_background.png';

const OrganizationHome = ({ organization, subscribeAction, watchAction, payed, payedPPV }) => {
  const sortedEvents = organization?.events.slice();
  sortedEvents?.sort((a, b) => (new Date(a.eventDate) - new Date(b.eventDate) >= 0 ? 1 : -1));
  const divImage = {
    backgroundImage: `url(${Background})`
  };
  return (
    <div className="organization-container" style={divImage}>
      <div>
        {sortedEvents && (
          <CountDownTimer
            event={sortedEvents[sortedEvents?.length - 1]}
            subscribeAction={subscribeAction}
            payed={payedPPV}
            watchAction={watchAction}
          />
        )}
        {sortedEvents && (
          <EventView
            prevEvent={sortedEvents[sortedEvents?.length - 3]}
            currEvent={sortedEvents[sortedEvents?.length - 2]}
            nextEvent={sortedEvents[sortedEvents?.length - 1]}
            subscribeAction={subscribeAction}
            payed={payed}
          />
        )}
      </div>
    </div>
  );
};

export default OrganizationHome;
