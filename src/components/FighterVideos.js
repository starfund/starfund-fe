import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl, FormattedMessage } from 'react-intl';
import { useSession } from 'hooks';
import ReactPlayer from 'react-player';

import { useMediaQuery } from 'react-responsive';
import { formatDistance } from 'date-fns';
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
import ReactGA from 'react-ga';

import { formatTitle, formatDescription } from 'utils/translationsHelper';
import { getMessages } from '../state/actions/messageActions';

import Subscribe from '../assets/subscribe.svg';
import SubscribeRu from '../assets/subscribe_rus.svg';

import MessageSection from './MessageSection';

const FighterVideos = ({ fighter, supporting, subscribeAction }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { authenticated } = useSession();
  const [url, setUrl] = useState(fighter.previewUrl || fighter.officialPreview);
  const [diplayContent, setDisplayContent] = useState();
  const payedFighter = supporting.map(sub => sub.fighter.id);
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  useEffect(() => {
    if (authenticated && diplayContent) {
      dispatch(getMessages(diplayContent));
    }
  }, [authenticated, diplayContent, dispatch]);

  const endFreeVideo = () => {
    if (!payedFighter.includes(fighter.id)) {
      subscribeAction();
    }
  };

  const selectVideo = content => {
    setUrl(content.video);
    setDisplayContent(content);
    window.scrollTo(0, 900);
  };

  const language = useSelector(state => state.language.language);
  const messages = useSelector(state => state.messages.messages.comments);
  ReactGA.modalview(`/fighter/${fighter.id}/videos`);

  return (
    <div className="fighter-videos">
      <h1>{intl.formatMessage({ id: 'fighter.videos.title' })}</h1>
      <br />
      <div className="row">
        <div className="col-12 col-sm-8">
          <LazyLoadComponent>
            <ReactPlayer
              url={url}
              width
              controls
              playing
              muted
              style={{ 'margin-left': '3%', minHeight: `${isMobile ? 'auto' : '550px'}` }}
              onEnded={endFreeVideo}
            />
          </LazyLoadComponent>
          <div className="blank-line" />
        </div>
        <div className={`more-videos col-12 col-sm-4 ${isMobile && 'row'}`}>
          {fighter.publicVideos &&
            fighter.publicVideos
              .filter(c => !!c.video)
              .map(v => (
                <div
                  key={v.url}
                  className="col-5 col-sm-12 fighter-watch"
                  onClick={() => selectVideo(v)}
                >
                  <LazyLoadComponent>
                    <ReactPlayer url={v.video} width={isMobile ? '100%' : '80%'} height="200" />
                  </LazyLoadComponent>
                  <div>
                    <h4> {formatTitle(v, language)} </h4>
                    <p>
                      {' '}
                      {formatDescription(v, language)} *{' '}
                      {formatDistance(new Date(v.eventDate), new Date(), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
          {fighter.privateVideos &&
            payedFighter.includes(fighter.id) &&
            fighter.privateVideos
              .filter(c => !!c.video)
              .map(v => (
                <div
                  key={v.url}
                  className="col-5 col-sm-12 fighter-watch"
                  onClick={() => selectVideo(v)}
                >
                  <LazyLoadComponent>
                    <ReactPlayer url={v.video} width={isMobile ? '100%' : '80%'} height="200" />
                  </LazyLoadComponent>
                  <div>
                    <h4> {formatTitle(v, language)} </h4>
                    <p>
                      {' '}
                      {formatDescription(v, language)} *{' '}
                      {formatDistance(new Date(v.eventDate), new Date(), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
          <div className={!isMobile && `blank-line`} />
          {fighter.privateVideos?.filter(c => !!c.video)?.length > 0 &&
            !payedFighter.includes(fighter.id) && (
              <div className={`other-videos ${isMobile && 'center'}`}>
                <div className="flex">
                  <h3 className="center">
                    <FormattedMessage
                      id="fighter.videos.subscribe"
                      values={{ videos: fighter.privateVideos?.filter(c => !!c.video)?.length }}
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
          {fighter.publicVideos?.filter(c => !!c.video)?.length == 0 &&
            fighter.privateVideos?.filter(c => !!c.video)?.length == 0 && (
              <h2 className="center">{intl.formatMessage({ id: 'fighter.videos.noVideos' })}</h2>
            )}
        </div>
        <div className="row">
          {diplayContent && (
            <div className="col-12">
              <h2>{diplayContent.title}</h2>
            </div>
          )}
          <MessageSection content={diplayContent} messages={messages} />
        </div>
      </div>
    </div>
  );
};

export default FighterVideos;
