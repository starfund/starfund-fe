import React, { useState, useMemo, useCallback } from 'react';
import cn from 'classnames';

import { useIntl, FormattedMessage } from 'react-intl';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import ReactPlayer from 'react-player/lazy';
import { useMediaQuery } from 'react-responsive';
import { formatTitle, formatDescription } from 'utils/translationsHelper';
import { useSelector } from 'react-redux';
import Carousel from 'react-grid-carousel';
import Pagination from './Pagination';
import EventView from './EventView';
import EventViewMobile from './EventViewMobile';

const PageSize = 4;

const OrganizationEvents = ({
  organization,
  subscribeAction,
  payed,
  homeNav,
  payedPPV,
  goToPPV,
  allevents,
  setAllEvents
}) => {
  const intl = useIntl();
  const sortedEvents = organization?.events.slice();
  sortedEvents?.sort((a, b) => (new Date(a.eventDate) - new Date(b.eventDate) >= 0 ? 1 : -1));
  const lastEventId = sortedEvents[sortedEvents?.length - 1]?.id;
  const [prevEvent, setPrevEvent] = useState();
  const [currEvent, setCurrEvent] = useState();
  const [nextEvent, setNextEvent] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeVideo, setActiveVideo] = useState();
  const [searchText, setSearchText] = useState('');
  const [selectedVideo, setSelectedVideo] = useState();
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });
  const isBigScreen = useMediaQuery({
    query: '(min-width: 1700px)'
  });
  const selectVideo = (content, event) => {
    setActiveVideo(content.id + event?.name);
  };
  const filterEvents = useCallback(list => {
    if (searchText == '') {
      return list;
    }
    let resEvName = list.slice();
    resEvName = resEvName.filter(e => {
      const name = e?.name.toLowerCase();
      return name.includes(searchText.toLocaleLowerCase());
    });
    let resFightersNames = list.slice();
    resFightersNames = resFightersNames?.filter(e => {
      return (
        e?.mainEvents
          .concat(e?.prelimEvents)
          .filter(
            v =>
              v.fighter1?.toLowerCase().includes(searchText.toLocaleLowerCase()) ||
              v.fighter2?.toLowerCase().includes(searchText.toLocaleLowerCase())
          ).length > 0
      );
    });
    let resDivision = list.slice();
    resDivision = resDivision?.filter(e => {
      return (
        e?.mainEvents
          .concat(e?.prelimEvents)
          .filter(v => v.division?.toLowerCase().includes(searchText.toLocaleLowerCase())).length >
        0
      );
    });
    if (resEvName.length > 0) {
      return resEvName;
    }
    if (resFightersNames.length > 0) {
      return resFightersNames;
    }
    return resDivision;
  });

  const getEventVideos = (e, list) => {
    let resFightersNames = list.slice();
    resFightersNames = resFightersNames?.filter(e => {
      return (
        e?.mainEvents
          .concat(e?.prelimEvents)
          .filter(
            v =>
              v.fighter1?.toLowerCase().includes(searchText.toLocaleLowerCase()) ||
              v.fighter2?.toLowerCase().includes(searchText.toLocaleLowerCase())
          ).length > 0
      );
    });
    let resDivision = list.slice();
    resDivision = resDivision?.filter(e => {
      return (
        e?.mainEvents
          .concat(e?.prelimEvents)
          .filter(v => v.division?.toLowerCase().includes(searchText.toLocaleLowerCase())).length >
        0
      );
    });
    if (resFightersNames.length > 0) {
      return e?.mainEvents
        .concat(e?.prelimEvents)
        .filter(
          v =>
            v.fighter1?.toLowerCase().includes(searchText.toLocaleLowerCase()) ||
            v.fighter2?.toLowerCase().includes(searchText.toLocaleLowerCase())
        );
    }
    if (resDivision.length > 0) {
      return e?.mainEvents
        .concat(e?.prelimEvents)
        .filter(v => v.division?.toLowerCase().includes(searchText.toLocaleLowerCase()));
    }
    return e?.mainEvents.concat(e?.prelimEvents);
  };

  const language = useSelector(state => state.language.language);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filterEvents(sortedEvents).slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filterEvents, sortedEvents]);

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
    <div>
      {isMobile && allevents && (
        <div className="event-view-mobile-container">
          <div className="link-text-back" onClick={() => homeNav()}>
            {intl.formatMessage({ id: 'organization.mobile.home' })}
          </div>
          <h3>
            <FormattedMessage
              id="organization.allevents"
              values={{ organizationName: organization?.name }}
            />
          </h3>
        </div>
      )}
      {!isMobile && allevents && (
        <div className="events-container">
          <br />
          <br />
          <div className="events-container">
            <h2>
              <FormattedMessage
                id="organization.allevents"
                values={{ organizationName: organization?.name }}
              />
            </h2>
            <br />
            <div className="season-pass">
              {!payed && (
                <button
                  type="button"
                  className="btn btn-danger btn-lg"
                  onClick={() => {
                    subscribeAction();
                  }}
                >
                  {intl.formatMessage({ id: 'organization.seasonpass' })}
                </button>
              )}
            </div>
          </div>
          <br />
          <div className={isMobile ? 'search-bar-mobile' : 'search-bar'}>
            <div className="bar">
              <input
                id="search-bar"
                className="search-bar-input"
                type="search"
                aria-label="Search"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
            </div>
            <div className="search-button">
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => filterEvents(sortedEvents)}
              >
                <path
                  d="M23.7871 22.7761L17.9548 16.9437C19.5193 15.145 20.4665 12.7982 20.4665 10.2333C20.4665 4.58714 15.8741 0 10.2333 0C4.58714 0 0 4.59246 0 10.2333C0 15.8741 4.59246 20.4665 10.2333 20.4665C12.7982 20.4665 15.145 19.5193 16.9437 17.9548L22.7761 23.7871C22.9144 23.9255 23.1007 24 23.2816 24C23.4625 24 23.6488 23.9308 23.7871 23.7871C24.0639 23.5104 24.0639 23.0528 23.7871 22.7761ZM1.43149 10.2333C1.43149 5.38004 5.38004 1.43681 10.2279 1.43681C15.0812 1.43681 19.0244 5.38537 19.0244 10.2333C19.0244 15.0812 15.0812 19.035 10.2279 19.035C5.38004 19.035 1.43149 15.0865 1.43149 10.2333Z"
                  fill="#FFFFFF"
                />
              </svg>
            </div>
            <br />
            <br />
          </div>
        </div>
      )}
      {allevents && (
        <div className={isMobile ? '' : 'events-container'}>
          <div className="col-12 col-sm-12 col-md-10">
            {currentTableData.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <div className={isMobile ? 'event-video-row-mobile' : 'event-video-row'}>
                    {item?.mainEvents.concat(item?.prelimEvents).length != 0 && (
                      <div className="event-video-text">
                        <div className="event-name-all-events">{item?.name}</div>
                        <div className="event-description">{EventDate(item?.eventDate)}</div>
                        <br />
                      </div>
                    )}
                    {isMobile && item?.mainEvents.concat(item?.prelimEvents).length != 0 && (
                      <div
                        className="link-text"
                        onClick={() => {
                          setAllEvents(false);
                          setCurrEvent(item);
                          setPrevEvent(sortedEvents[index - 1]);
                          setNextEvent(sortedEvents[index + 1]);
                        }}
                      >
                        {intl.formatMessage({ id: 'organization.mobile.watchfights' })}
                      </div>
                    )}
                    {item?.mainEvents.concat(item?.prelimEvents).length != 0 &&
                      !isMobile &&
                      item?.id != lastEventId && (
                        <button
                          type="button"
                          className="btn btn-danger btn-lg"
                          onClick={() => {
                            setAllEvents(false);
                            setCurrEvent(item);
                            setPrevEvent(sortedEvents[index - 1]);
                            setNextEvent(sortedEvents[index + 1]);
                          }}
                        >
                          {intl.formatMessage({ id: 'organization.watchevent' })}
                        </button>
                      )}
                    {!isMobile && item?.id == lastEventId && (
                      <button
                        type="button"
                        className="btn btn-danger btn-lg"
                        onClick={() => {
                          subscribeAction();
                        }}
                      >
                        {intl.formatMessage({ id: 'organization.button.buyppv' })}
                      </button>
                    )}
                  </div>
                  <div>
                    <div className="event-row">
                      {!isMobile &&
                        item.id != lastEventId &&
                        getEventVideos(item, sortedEvents)
                          .slice(0, 3)
                          .map(v => (
                            <div
                              key={v.url}
                              className={
                                isMobile
                                  ? 'fighter-watch'
                                  : 'col-12 col-sm-6 col-md-4 fighter-watch'
                              }
                              onClick={() => {
                                if (v.public || payed) {
                                  setSelectedVideo(v);
                                  selectVideo(v, item);
                                  setAllEvents(false);
                                  setCurrEvent(item);
                                  setPrevEvent(sortedEvents[index - 1]);
                                  setNextEvent(sortedEvents[index + 1]);
                                } else {
                                  subscribeAction();
                                }
                              }}
                            >
                              {!payed && !v.public && (
                                <div className="video-tag-container">
                                  <div
                                    className={
                                      isMobile
                                        ? 'exclusive-event-video-mobile-big'
                                        : 'exclusive-event-video-big'
                                    }
                                  >
                                    EXCLUSIVE
                                  </div>
                                </div>
                              )}
                              <div className="select-cover-big" onClick={() => selectVideo(v)} />
                              <LazyLoadComponent>
                                <ReactPlayer
                                  url={v.videoUrl || v.video}
                                  width={isMobile ? '100%' : '25vw'}
                                  height={isBigScreen ? '14vw' : '202px'}
                                  light={!v.videoUrl && v.thumbnail}
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
                              <div className="video-tag-container">
                                <div
                                  className={cn('video-description', {
                                    selected: activeVideo === v.id + item?.name
                                  })}
                                >
                                  <h4 className="one-line-text">{formatTitle(v, language)}</h4>
                                  <p className="one-line-text">{formatDescription(v, language)}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                      {item?.id == lastEventId && (
                        <div>
                          <br />
                          <h3>{intl.formatMessage({ id: 'organization.event.comingsoon' })}</h3>
                        </div>
                      )}
                    </div>
                    {isMobile && (
                      <Carousel cols={1} rows={1} gap={15} loop>
                        {item.id != lastEventId &&
                          item?.mainEvents.concat(item?.prelimEvents).length > 0 &&
                          item?.mainEvents.concat(item?.prelimEvents) &&
                          item?.mainEvents.concat(item?.prelimEvents).map(v => (
                            <Carousel.Item>
                              <div
                                key={v.url}
                                onClick={() => {
                                  if (v.public || payed) {
                                    setSelectedVideo(v);
                                    selectVideo(v, item);
                                    setAllEvents(false);
                                    setCurrEvent(item);
                                    setPrevEvent(sortedEvents[index - 1]);
                                    setNextEvent(sortedEvents[index + 1]);
                                  } else {
                                    subscribeAction();
                                  }
                                }}
                              >
                                {!v.public && !payed && (
                                  <div className="exclusive-event-mobile"> EXCLUSIVE </div>
                                )}
                                <div className="select-cover-big" onClick={() => selectVideo(v)} />
                                <LazyLoadComponent>
                                  <ReactPlayer
                                    url={v.videoUrl || v.video}
                                    width="100%"
                                    height="46vw"
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
                                <div className="video-tag-container-mobile">
                                  <div className="video-description-mobile">
                                    <h4 className="one-line-text-mobile">
                                      {formatTitle(v, language)}
                                    </h4>
                                    <p className="one-line-text-mobile">
                                      {formatDescription(v, language)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Carousel.Item>
                          ))}
                      </Carousel>
                    )}
                    <br />
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <br />
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={filterEvents(sortedEvents).length}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)}
          />
          <br />
          <br />
        </div>
      )}
      {!allevents && (
        <div className="organization-container">
          {!isMobile && <br />}
          {!isMobile && <br />}
          {!isMobile && <br />}
          {!isMobile && <br />}
          {!isMobile && <br />}
          {!isMobile && (
            <EventView
              prevEvent={prevEvent}
              currEvent={currEvent}
              nextEvent={nextEvent}
              subscribeAction={subscribeAction}
              video={selectedVideo}
              payed={payed}
              payedPPV={payedPPV}
              goToPPV={goToPPV}
              isUpcoming={nextEvent?.id === lastEventId}
            />
          )}
          {isMobile && (
            <EventViewMobile
              organization={organization}
              subscribeAction={subscribeAction}
              payed={payed}
              eventsNav={() => setAllEvents(true)}
              event={currEvent?.name}
              video={selectedVideo}
              showResults
            />
          )}
        </div>
      )}
    </div>
  );
};

export default OrganizationEvents;
