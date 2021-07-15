import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl, FormattedMessage } from 'react-intl';
import ReactPlayer from 'react-player/lazy';

import { useMediaQuery } from 'react-responsive';
import { formatDistance } from 'date-fns';
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
import ReactGA from 'react-ga';

import { formatTitle, formatDescription } from 'utils/translationsHelper';
import { getMessages } from '../state/actions/messageActions';

import Subscribe from '../assets/subscribe.png';
import SubscribeRu from '../assets/subscribe_rus.png';

import MessageSection from './MessageSection';

const TeamVideos = ({ team, supporting, subscribeAction }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [url, setUrl] = useState(team?.previewUrl || team?.officialPreview);
  const [diplayContent, setDisplayContent] = useState();
  const payedTeam = supporting.map(sub => sub.team.id);
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  useEffect(() => {
    if (diplayContent) {
      dispatch(getMessages(diplayContent));
    }
  }, [diplayContent, dispatch]);

  const endFreeVideo = () => {
    if (!payedTeam.includes(team.id)) {
      subscribeAction();
    }
  };

  const selectVideo = content => {
    setUrl(content.video);
    setDisplayContent(content);
    if (payedTeam.includes(team.id)) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 900);
    }
  };

  const language = useSelector(state => state.language.language);
  const messages = useSelector(state => state.messages.messages.comments);
  ReactGA.modalview(`/team/${team.id}/videos`);

  return (
    <div className="fighter-videos">
      <h1>{intl.formatMessage({ id: 'fighter.videos.title' })}</h1>
      <br />
      <div className="row">
        <div className="col-12 col-md-8">
          <LazyLoadComponent>
            <ReactPlayer
              url={url}
              width
              controls
              playing
              muted
              style={{ 'margin-left': '3%', minHeight: `${isMobile ? 'auto' : '40vw'}` }}
              onEnded={endFreeVideo}
            />
          </LazyLoadComponent>
          <div className="blank-line" />
          <div className="container">
            {diplayContent && (
              <div className="col-12">
                <h2>{diplayContent.title}</h2>
              </div>
            )}
            <MessageSection content={diplayContent} messages={messages} />
          </div>
        </div>
        <div className={`more-videos col-12 col-md-4 ${isMobile && 'row'}`}>
          {team.fighters.map(
            fighter =>
              fighter.publicVideos &&
              fighter.publicVideos
                .filter(c => !!c.video)
                .map(v => (
                  <div className="row col-12">
                    <div
                      key={v.url}
                      className="col-7 col-sm-5 col-md-7 fighter-watch"
                      onClick={() => selectVideo(v)}
                    >
                      <LazyLoadComponent>
                        <ReactPlayer
                          url={v.video}
                          width="100%"
                          height={isMobile ? '100%' : '10vw'}
                          light={v.thumbnail}
                        />
                      </LazyLoadComponent>
                    </div>
                    <div className="col-5 video-desc">
                      <h4> {formatTitle(v, language)} </h4>
                      <p>
                        {formatDescription(v, language)} *{' '}
                        {formatDistance(new Date(v.eventDate), new Date(), { addSuffix: true })}
                      </p>
                      <span>
                        {fighter.firstName}
                        {''}
                        {fighter.lastName}
                      </span>
                    </div>
                  </div>
                ))
          )}
          {team.fighters.map(
            fighter =>
              fighter.privateVideos &&
              payedTeam.includes(fighter.id) &&
              fighter.privateVideos
                .filter(c => !!c.video)
                .map(v => (
                  <div className="row col-12">
                    <div
                      key={v.url}
                      className="col-7 col-sm-5 col-md-7 fighter-watch"
                      onClick={() => selectVideo(v)}
                    >
                      <LazyLoadComponent>
                        <ReactPlayer
                          url={v.video}
                          width="100%"
                          height={isMobile ? '100%' : '10vw'}
                          light={v.thumbnail}
                        />
                      </LazyLoadComponent>
                    </div>
                    <div className="col-5 video-desc">
                      <h4> {formatTitle(v, language)} </h4>
                      <p>
                        {' '}
                        {formatDescription(v, language)} *{' '}
                        {formatDistance(new Date(v.eventDate), new Date(), { addSuffix: true })}
                      </p>
                      <span>
                        {fighter.firstName}
                        {''}
                        {fighter.lastName}
                      </span>
                    </div>
                  </div>
                ))
          )}
          <div className={!isMobile && `blank-line`} />
          {team.fighters.map(f => f.privateVideos)?.filter((_, v) => v != []).length > 0 &&
            !payedTeam.includes(team.id) && (
              <div className={`other-videos ${isMobile && 'center'}`}>
                <div className="flex">
                  <h3 className="center">
                    <FormattedMessage
                      id="fighter.videos.subscribe"
                      values={{
                        videos: team.fighters.map(f => f.privateVideos)?.filter((_, v) => v != [])
                          .length
                      }}
                    />
                  </h3>
                </div>
                <div className="sub-cta">
                  <LazyLoadImage
                    src={language == 'ru' ? SubscribeRu : Subscribe}
                    onClick={subscribeAction}
                  />
                </div>
              </div>
            )}
        </div>
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
