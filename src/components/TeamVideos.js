import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl, FormattedMessage } from 'react-intl';
import ReactPlayer from 'react-player/lazy';

import { useMediaQuery } from 'react-responsive';
import { formatDistance } from 'date-fns';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import ReactGA from 'react-ga';
import { formatTitle, formatDescription } from 'utils/translationsHelper';
import Lock from '../assets/lock.png';

import { getMessages } from '../state/actions/messageActions';

const TeamVideos = ({ team, supporting, subscribeAction }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [url, setUrl] = useState(team?.officialPreview || team?.previewUrl);
  const [displayContent, setDisplayContent] = useState();
  const [thumbnail, setThumnail] = useState();
  const payedTeam = supporting.map(sub => sub.team?.id);
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  useEffect(() => {
    if (displayContent) {
      dispatch(getMessages(displayContent));
    }
  }, [displayContent, dispatch]);

  const endFreeVideo = () => {
    if (!payedTeam.includes(team.id)) {
      subscribeAction();
    }
  };

  const selectVideo = content => {
    setUrl(content.video);
    setDisplayContent(content);
    setThumnail(content.thumbnail);
    if (payedTeam.includes(team.id)) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 900);
    }
  };

  const selectPrivateVideo = content => {
    if (payedTeam.includes(team.id)) {
      selectVideo(content);
    } else {
      subscribeAction();
    }
  };

  const language = useSelector(state => state.language.language);
  ReactGA.modalview(`/team/${team.id}/videos`);

  return (
    <div className="fighter-videos">
      <br />
      <h1>
        <FormattedMessage id="team.videos.title" values={{ teamName: team?.name }} />
      </h1>
      <br />
      <br />
      <div className="row">
        <div className="col-0 col-md-1" />
        <div className="col-12 col-md-5 ">
          <LazyLoadComponent>
            <ReactPlayer
              url={url}
              width={isMobile ? '100%' : '40vw'}
              controls
              playing
              muted
              style={{ 'margin-left': '8%', minHeight: `${isMobile ? 'auto' : '30vh'}` }}
              onEnded={endFreeVideo}
              config={{
                file: {
                  attributes: {
                    poster: thumbnail,
                    controlsList: 'nodownload',
                    onContextMenu: e => e.preventDefault(),
                    forceHLS: true
                  }
                }
              }}
            />
          </LazyLoadComponent>
        </div>
        {!isMobile && displayContent && (
          <div className="video-description col-12 col-sm-5">
            <h1>{displayContent.title?.toUpperCase()}</h1>
            <br />
            <h3>{displayContent.description}</h3>
            <br />
            <p>
              {' '}
              Uploaded{' '}
              {formatDistance(new Date(displayContent.eventDate), new Date(), {
                addSuffix: true
              })}{' '}
            </p>
          </div>
        )}
      </div>
      <div className="row more-videos col-12">
        {team.fighters.map(
          fighter =>
            fighter.publicVideos &&
            fighter.publicVideos
              .filter(c => !!c.video)
              .map(v => (
                <div
                  key={v.url}
                  className="col-12 col-sm-6 col-md-4 fighter-watch"
                  onClick={() => selectVideo(v)}
                >
                  <LazyLoadComponent>
                    <ReactPlayer
                      url={v.video}
                      width="100%"
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
                  <div className="video-description">
                    <h4>
                      {formatTitle(v, language)} {formatDescription(v, language)}
                    </h4>
                  </div>
                </div>
              ))
        )}
        {team.fighters.map(
          fighter =>
            fighter.privateVideos &&
            fighter.privateVideos
              .filter(c => !!c.video)
              .map(v => (
                <div
                  key={v.url}
                  className="col-12 col-sm-6 col-md-4 fighter-watch"
                  onClick={() => selectPrivateVideo(v)}
                >
                  <div className="exclusive">EXCLUSIVE</div>
                  {!v.thumbnail && !payedTeam.includes(team.id) && (
                    <div className={isMobile ? 'lock-mobile' : 'lock'}>
                      <img src={Lock} alt="" />
                    </div>
                  )}
                  <LazyLoadComponent>
                    <ReactPlayer
                      url={v.video}
                      width="100%"
                      height="25vh"
                      light={v.thumbnail}
                      playIcon={!payedTeam.includes(team.id) && <img src={Lock} alt="" />}
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
                  <div className="video-description">
                    <h4>
                      {formatTitle(v, language)} {formatDescription(v, language)}
                    </h4>
                  </div>
                </div>
              ))
        )}
      </div>
      <div className="container">
        <div className="row flex">
          {team.fighters.map(f => f.publicVideos)?.length == 0 &&
            team.fighters.map(f => f.privateVideos)?.length == 0 && (
              <h2 className="center">{intl.formatMessage({ id: 'fighter.videos.noVideos' })}</h2>
            )}
        </div>
      </div>
    </div>
  );
};

export default TeamVideos;
