import React, { useState } from 'react';

import { useIntl, FormattedMessage } from 'react-intl';
import ReactPlayer from 'react-player/lazy';
import { useSelector } from 'react-redux';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { formatTitle, formatDescription } from 'utils/translationsHelper';
import Carousel from 'react-grid-carousel';

const EventViewMobile = ({
  organization,
  subscribeAction,
  payed,
  event,
  video,
  eventsNav,
  showResults
}) => {
  const intl = useIntl();
  const sortedEvents = organization?.events.slice();
  sortedEvents?.sort((a, b) => (new Date(a.eventDate) - new Date(b.eventDate) >= 0 ? 1 : -1)).pop();

  const [prelim, setPrelim] = useState(false);
  const [prelim2, setPrelim2] = useState(false);
  const [selectedEventName, setSelectedEventName] = useState(event || sortedEvents[0]?.name);
  const [sortedPrelimEvents, setSortedPrelimEvents] = useState(
    sortedEvents
      .filter(ev => ev.name === selectedEventName)[0]
      ?.prelimEvents.slice()
      .sort((a, b) => a.eventDate - b.eventDate)
  );
  const [sortedMainEvents, setSortedMainEvents] = useState(
    sortedEvents
      .filter(ev => ev.name === selectedEventName)[0]
      ?.mainEvents.slice()
      .sort((a, b) => a.eventDate - b.eventDate)
  );
  const [selectedVideo, setSelectedVideo] = useState(
    video?.title || sortedEvents[0]?.mainEvents.concat(sortedEvents[0]?.prelimEvents)[0]?.title
  );
  const [displayContent, setDisplayContent] = useState(
    video || sortedEvents[0]?.mainEvents.concat(sortedEvents[0]?.prelimEvents)[0]
  );
  const language = useSelector(state => state.language.language);

  const selectVideo = v => {
    setSelectedVideo(v);
    const selectedEvent = sortedEvents.filter(ev => ev.name == selectedEventName)[0];
    const allVideos = selectedEvent?.mainEvents.concat(selectedEvent?.prelimEvents);
    const content = allVideos.filter(vid => formatTitle(vid, language) === v)[0];
    if (content.public || payed) {
      setDisplayContent(content);
    } else {
      setDisplayContent(content);
      subscribeAction();
    }
  };

  const selectEvent = eventName => {
    setSelectedEventName(eventName);
    setSortedMainEvents(
      sortedEvents
        .filter(ev => ev.name === eventName)[0]
        ?.mainEvents.slice()
        .sort((a, b) => a.eventDate - b.eventDate)
    );
    setSortedPrelimEvents(
      sortedEvents
        .filter(ev => ev.name === eventName)[0]
        ?.prelimEvents.slice()
        .sort((a, b) => a.eventDate - b.eventDate)
    );
    const selectedEvent = sortedEvents.filter(ev => ev.name == eventName)[0];
    const allVideos = selectedEvent?.mainEvents.concat(selectedEvent?.prelimEvents);
    const content = allVideos[0];
    setSelectedVideo(formatTitle(content, language));
    setDisplayContent(content);
  };

  const months = [
    'jan.long',
    'feb.long',
    'mar.long',
    'apr.long',
    'may.long',
    'jun.long',
    'jul.long',
    'aug.long',
    'sep.long',
    'oct.long',
    'nov.long',
    'dec.long'
  ];

  function EventDate(d) {
    const date = new Date(d);
    return `${intl.formatMessage({
      id: `organization.months.${months[date?.getMonth()]}`
    })} ${date?.getDate()}, ${date.getFullYear()}`;
  }

  return (
    <div className="mobile-background">
      <div className="event-view-mobile-container">
        <br />
        <h3>
          <FormattedMessage
            id="organization.mobile.allevents"
            values={{ orgName: organization?.name }}
          />
        </h3>
        <div className="filters-container">
          <select
            value={selectedEventName}
            onChange={e => {
              selectEvent(e.target.value);
            }}
            className="mobile-filters"
          >
            {sortedEvents && sortedEvents.map(ev => <option>{ev.name}</option>)}
          </select>
          {sortedEvents
            .filter(ev => ev.name == selectedEventName)[0]
            ?.mainEvents.concat(
              sortedEvents.filter(ev => ev.name == selectedEventName)[0]?.prelimEvents
            ).length > 0 && (
            <select
              value={selectedVideo}
              onChange={e => {
                selectVideo(e.target.value);
              }}
              className="mobile-filters"
            >
              {sortedEvents &&
                sortedEvents
                  .filter(ev => ev.name == selectedEventName)[0]
                  ?.mainEvents.concat(
                    sortedEvents.filter(ev => ev.name == selectedEventName)[0]?.prelimEvents
                  )
                  .map(v => <option>{formatTitle(v, language)}</option>)}
            </select>
          )}
          <div className="link-text" onClick={() => eventsNav()}>
            {intl.formatMessage({ id: 'organization.mobile.seeall' })}
          </div>
        </div>
      </div>
      {(payed || displayContent?.public) && (
        <ReactPlayer
          url={displayContent?.videoUrl || displayContent?.video}
          width
          muted
          controls
          style={{
            margin: '3%',
            minHeight: '35vh',
            maxHeight: '35vh',
            minWidth: '95vw',
            maxWidth: '95vw'
          }}
          config={{
            file: {
              attributes: {
                onContextMenu: e => e.preventDefault(),
                controlsList: 'nodownload'
              }
            }
          }}
        />
      )}
      {!payed && !displayContent?.public && (
        <div>
          <div className="select-cover-video" onClick={() => subscribeAction()} />
          <ReactPlayer
            url={displayContent?.videoUrl || displayContent?.video}
            style={{
              margin: '3%',
              minHeight: '35vh',
              maxHeight: '35vh',
              minWidth: '95vw',
              maxWidth: '95vw'
            }}
            light={!displayContent?.videoUrl && displayContent?.thumbnail}
            muted
            config={{
              file: {
                attributes: {
                  onContextMenu: e => e.preventDefault(),
                  controlsList: 'nodownload'
                }
              }
            }}
          />
        </div>
      )}
      <div className="event-view-mobile-videos">
        <h3>{displayContent && formatTitle(displayContent, language)}</h3>
      </div>
      <div className="event-view-mobile-video-small">
        <div>
          <p>{`${displayContent?.division} | ${displayContent?.rounds} Rounds`}</p>
        </div>
        <div>
          <p>{EventDate(sortedEvents.filter(ev => ev.name == selectedEventName)[0]?.eventDate)}</p>
        </div>
      </div>
      <div className="mobile-nav-center">
        <div
          className={!prelim ? 'nav-button-active' : 'nav-button'}
          onClick={() => setPrelim(false)}
        >
          {intl.formatMessage({ id: 'header.main' })}
        </div>
        <div
          className={prelim ? 'nav-button-active' : 'nav-button'}
          onClick={() => setPrelim(true)}
        >
          {intl.formatMessage({ id: 'header.prelim' })}
        </div>
      </div>
      {!prelim && (
        <Carousel cols={1} rows={1} gap={10} loop>
          {sortedEvents
            .filter(ev => ev.name == selectedEventName)[0]
            ?.mainEvents.map(v => (
              <Carousel.Item>
                <div onClick={() => selectVideo(v.title)}>
                  {!v.public && !payed && <div className="exclusive-event-mobile"> EXCLUSIVE </div>}
                  <div className="select-cover-mobile" onClick={() => selectVideo(v.title)} />
                  <div>
                    <LazyLoadComponent>
                      <ReactPlayer
                        url={v.videoUrl || v.video}
                        width="100%"
                        height="50vw"
                        light={!v.videoUrl && v.thumbnail}
                        muted
                        config={{
                          file: {
                            attributes: {
                              onContextMenu: e => e.preventDefault(),
                              controlsList: 'nodownload'
                            }
                          }
                        }}
                      />
                    </LazyLoadComponent>
                  </div>
                  <div className="video-tag-container-mobile">
                    <div className="video-description-mobile-home">
                      <h4 className="one-line-text-mobile">{formatTitle(v, language)}</h4>
                      <p className="one-line-text-mobile">{formatDescription(v, language)}</p>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            ))}
        </Carousel>
      )}
      {prelim && (
        <Carousel cols={1} rows={1} gap={60} loop>
          {sortedEvents
            .filter(ev => ev.name == selectedEventName)[0]
            ?.prelimEvents.map(v => (
              <Carousel.Item>
                <div onClick={() => selectVideo(v.title)}>
                  <div className="video-description-mobile-home">
                    {!v.public && !payed && (
                      <div className="exclusive-event-mobile"> EXCLUSIVE </div>
                    )}
                    <div className="select-cover-mobile" onClick={() => selectVideo(v.title)} />
                    <LazyLoadComponent>
                      <ReactPlayer
                        url={v.videoUrl || v.video}
                        width="100%"
                        height="20vh"
                        light={!v.videoUrl && v.thumbnail}
                        muted
                        config={{
                          file: {
                            attributes: {
                              onContextMenu: e => e.preventDefault(),
                              controlsList: 'nodownload'
                            }
                          }
                        }}
                      />
                    </LazyLoadComponent>
                    <h4 className="one-line-text-mobile">{formatTitle(v, language)}</h4>
                    <p className="one-line-text-mobile">{formatDescription(v, language)}</p>
                  </div>
                </div>
              </Carousel.Item>
            ))}
        </Carousel>
      )}
      <br />
      {showResults && (
        <div className="mobile-background">
          <div className="mobile-results-tile">
            <br />
            <h3>
              <FormattedMessage
                id="organization.mobile.results"
                values={{ eventName: selectedEventName }}
              />
            </h3>
            <div className="mobile-nav-center">
              <div
                className={!prelim2 ? 'nav-button-active' : 'nav-button'}
                onClick={() => setPrelim2(false)}
              >
                {intl.formatMessage({ id: 'header.main' })}
              </div>
              <div
                className={prelim2 ? 'nav-button-active' : 'nav-button'}
                onClick={() => setPrelim2(true)}
              >
                {intl.formatMessage({ id: 'header.prelim' })}
              </div>
            </div>
          </div>
          <div className="container-nav">
            {!prelim2 &&
              sortedMainEvents &&
              sortedMainEvents.map(v => (
                <div className={!v.isLive ? 'event-item-results' : 'event-item-ppv-active'}>
                  {v.isLive && (
                    <div className="live-tag">
                      {intl.formatMessage({ id: `organization.event.livevideo` })}
                    </div>
                  )}
                  {!v.isLive && v.winner == v.fighter1 && <div className="winner1-tag">W</div>}
                  {!v.isLive && v.winner == v.fighter2 && <div className="winner2-tag">W</div>}
                  {!v.isLive && v.winner == v.fighter1 && <div className="loser2-tag">L</div>}
                  {!v.isLive && v.winner == v.fighter2 && <div className="loser1-tag">L</div>}
                  {v?.fighter1} vs {v?.fighter2}
                </div>
              ))}
            {prelim2 &&
              sortedPrelimEvents &&
              sortedPrelimEvents.map(v => (
                <div className={!v.isLive ? 'event-item-results' : 'event-item-ppv-active'}>
                  {v.isLive && (
                    <div className="live-tag">
                      {intl.formatMessage({ id: `organization.event.livevideo` })}
                    </div>
                  )}
                  {!v.isLive && v.winner == v.fighter1 && <div className="winner1-tag">W</div>}
                  {!v.isLive && v.winner == v.fighter2 && <div className="winner2-tag">W</div>}
                  {!v.isLive && v.winner == v.fighter1 && <div className="loser2-tag">L</div>}
                  {!v.isLive && v.winner == v.fighter2 && <div className="loser1-tag">L</div>}
                  {v?.fighter1} vs {v?.fighter2}
                </div>
              ))}
          </div>
          <br />
        </div>
      )}
    </div>
  );
};

export default EventViewMobile;
