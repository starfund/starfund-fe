import React, { useState, useMemo, useCallback } from 'react';
import cn from 'classnames';

import { useIntl, FormattedMessage } from 'react-intl';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import ReactPlayer from 'react-player/lazy';
import { useMediaQuery } from 'react-responsive';
import { formatTitle, formatDescription } from 'utils/translationsHelper';
import { useSelector } from 'react-redux';
import Pagination from './Pagination';
import EventView from './EventView';

const PageSize = 4;

const OrganizationEvents = ({ organization, subscribeAction }) => {
  const intl = useIntl();
  const [allevents, setAllEvents] = useState(true);
  const [prevEvent, setPrevEvent] = useState();
  const [currEvent, setCurrEvent] = useState();
  const [nextEvent, setNextEvent] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeVideo, setActiveVideo] = useState();
  const [searchText, setSearchText] = useState('');
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });
  const selectVideo = (content, event) => {
    setActiveVideo(content.id + event?.name);
  };

  const filterEvents = useCallback(list => {
    if (searchText == '') {
      return list;
    }
    return list.filter(e => {
      const name = e?.name.toLowerCase();
      console.log(name);
      return name.includes(searchText);
    });
  });

  const language = useSelector(state => state.language.language);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filterEvents(organization?.events.events).slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filterEvents, organization]);

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
  const videos = organization?.events.events
    .filter(e => e?.mainVideos?.mainVideos?.length > 0)
    .map(j => j.mainVideos?.mainVideos)
    .flat()
    .concat(
      organization?.events.events
        .filter(e => e?.prelimVideos.prelimVideos.length > 0)
        .map(j => j.prelimVideos.prelimVideos)
        .flat()
    )
    .slice(0, 3);
  const videosMobile = organization?.events.events
    .filter(e => e?.mainVideos?.mainVideos?.length > 0)
    .map(j => j.mainVideos?.mainVideos)
    .flat()
    .concat(
      organization?.events.events
        .filter(e => e?.prelimVideos.prelimVideos.length > 0)
        .map(j => j.prelimVideos.prelimVideos)
        .flat()
    )
    .slice(0, 1);
  function EventDate(d) {
    const date = new Date(d);
    return `${intl.formatMessage({
      id: `organization.months.${months[date?.getMonth()]}`
    })} ${date?.getDate()}, ${date.getFullYear()}`;
  }

  return (
    <div>
      {allevents && (
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
                  onClick={() => filterEvents(organization?.events.events.length)}
                >
                  <path
                    d="M23.7871 22.7761L17.9548 16.9437C19.5193 15.145 20.4665 12.7982 20.4665 10.2333C20.4665 4.58714 15.8741 0 10.2333 0C4.58714 0 0 4.59246 0 10.2333C0 15.8741 4.59246 20.4665 10.2333 20.4665C12.7982 20.4665 15.145 19.5193 16.9437 17.9548L22.7761 23.7871C22.9144 23.9255 23.1007 24 23.2816 24C23.4625 24 23.6488 23.9308 23.7871 23.7871C24.0639 23.5104 24.0639 23.0528 23.7871 22.7761ZM1.43149 10.2333C1.43149 5.38004 5.38004 1.43681 10.2279 1.43681C15.0812 1.43681 19.0244 5.38537 19.0244 10.2333C19.0244 15.0812 15.0812 19.035 10.2279 19.035C5.38004 19.035 1.43149 15.0865 1.43149 10.2333Z"
                    fill="#FFFFFF"
                  />
                </svg>
              </div>
            </div>
          </div>
          <br />
          <br />
          <table>
            <tbody>
              {currentTableData.map((item, index) => {
                return (
                  <tr>
                    <td>
                      <div className={isMobile ? 'event-video-row-mobile' : 'event-video-row'}>
                        <div className="event-video-text">
                          <div className="event-name">{item?.name}</div>
                          <div className="event-description">{EventDate(item?.date)}</div>
                          <br />
                        </div>
                        <button
                          type="button"
                          className="btn btn-danger btn-lg"
                          onClick={() => {
                            setAllEvents(false);
                            setCurrEvent(item);
                            setPrevEvent(organization?.events.events[index - 1]);
                            setNextEvent(organization?.events.events[index + 1]);
                          }}
                        >
                          {intl.formatMessage({ id: 'organization.watchevent' })}
                        </button>
                      </div>
                      <div className="event-row">
                        {!isMobile &&
                          videos &&
                          videos.map(v => (
                            <div
                              key={v.url}
                              className="col-12 col-sm-6 col-md-4 fighter-watch"
                              onClick={() => {
                                selectVideo(v, item);
                                setAllEvents(false);
                                setCurrEvent(item);
                                setPrevEvent(organization?.events.events[index - 1]);
                                setNextEvent(organization?.events.events[index + 1]);
                              }}
                            >
                              <div
                                className={cn('video-description', {
                                  selected: activeVideo === v.id + item?.name
                                })}
                              >
                                <LazyLoadComponent>
                                  <ReactPlayer
                                    url={v.video}
                                    width={isMobile ? '100%' : '25vw'}
                                    height="30vh"
                                    light={v.thumbnail}
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
                                <h4>{formatTitle(v, language)}</h4>
                                <p>{formatDescription(v, language)}</p>
                              </div>
                            </div>
                          ))}
                        {isMobile &&
                          videosMobile &&
                          videosMobile.map(v => (
                            <div key={v.url} className="col-12 col-sm-6 col-md-4 fighter-watch">
                              <div
                                className={cn('video-description-mobile', {
                                  selected: activeVideo === v.id + item?.name
                                })}
                              >
                                <LazyLoadComponent>
                                  <ReactPlayer
                                    url={v.video}
                                    width={isMobile ? '100%' : '20vw'}
                                    height="25vh"
                                    light={v.thumbnail}
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
                                <h4>{formatTitle(v, language)}</h4>
                                <p>{formatDescription(v, language)}</p>
                              </div>
                              <br />
                              <br />
                            </div>
                          ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br />
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={filterEvents(organization?.events.events).length}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)}
          />
          <br />
          <br />
        </div>
      )}
      {!allevents && (
        <div className="organization-container">
          <br />
          <br />
          <br />
          <br />
          <br />
          <EventView
            prevEvent={prevEvent}
            currEvent={currEvent}
            nextEvent={nextEvent}
            subscribeAction={subscribeAction}
          />
        </div>
      )}
    </div>
  );
};

export default OrganizationEvents;
