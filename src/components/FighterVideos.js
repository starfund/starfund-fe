import React, { useState } from 'react';

import { useIntl } from 'react-intl';
import ReactPlayer from 'react-player';
import { useMediaQuery } from 'react-responsive';

const FighterVideos = ({ fighter, supporting, subscribeAction }) => {
  const intl = useIntl();
  const [url, setUrl] = useState(fighter.previewUrl);
  const payedFighter = supporting.map(sub => sub.fighter.id);
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  return (
    <div className="fighter-videos">
      <h1>{intl.formatMessage({ id: 'fighter.videos.title' })}</h1>
      <br />
      <br />
      <ReactPlayer
        url={url}
        width={isMobile ? '90%' : '60%'}
        controls
        style={{ margin: 'auto', minHeight: `${isMobile ? 'auto' : '550px'}` }}
      />
      <div className="blank-line" />
      <div className="container">
        <div className="row flex">
          {fighter.publicVideos.length == 0 && fighter.privateVideos.length == 0 && (
            <h2 className="center">{intl.formatMessage({ id: 'fighter.videos.noVideos' })}</h2>
          )}
        </div>
        <div className="row flex">
          {fighter.privateVideos.length > 0 && payedFighter.length == 0 && (
            <div className="center">
              <div className="row flex">
                <h2 className="center">{intl.formatMessage({ id: 'fighter.videos.subscribe' })}</h2>
              </div>
              <div className="btn-sub">
                <button
                  type="button"
                  className="btn btn-danger btn-lg center"
                  onClick={subscribeAction}
                >
                  {intl.formatMessage({ id: 'button.subscribe' })}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="row flex">
          {fighter.publicVideos &&
            fighter.publicVideos.map(v => (
              <div key={v.url} className="col-sm-4 fighter-watch" onClick={() => setUrl(v.url)}>
                <ReactPlayer url={v.url} width="300" height="250" />
              </div>
            ))}
          {fighter.privateVideos &&
            payedFighter.includes(fighter.id) &&
            fighter.privateVideos.map(v => (
              <div key={v.url} className="col-sm-4 fighter-watch" onClick={() => setUrl(v.url)}>
                <ReactPlayer url={v.url} width="300" height="250" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FighterVideos;
