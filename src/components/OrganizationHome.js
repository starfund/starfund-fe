import React from 'react';

import CountDownTimer from './CountDownTimer';
import EventView from './EventView';

const OrganizationHome = ({ organization, subscribeAction }) => {
  return (
    <div className="organization-container">
      <div>
        <CountDownTimer
          event={organization?.events.events[organization?.events.events.length - 1]}
          subscribeAction={subscribeAction}
        />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <EventView
          prevEvent={organization?.events.events[organization?.events.events.length - 3]}
          currEvent={organization?.events.events[organization?.events.events.length - 2]}
          nextEvent={organization?.events.events[organization?.events.events.length - 1]}
          subscribeAction={subscribeAction}
        />
      </div>
    </div>
  );
};

export default OrganizationHome;
