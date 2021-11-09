import React from 'react';

import CountDownTimer from './CountDownTimer';
import EventView from './EventView';
import Background from '../assets/ppv_background.png';

const OrganizationHome = ({ organization, subscribeAction }) => {
  const divImage = {
    backgroundImage: `url(${Background})`
  };
  return (
    <div className="organization-container" style={divImage}>
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
