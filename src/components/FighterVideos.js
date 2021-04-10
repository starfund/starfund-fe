import React, { useState } from 'react';

import { useIntl } from 'react-intl';
import ReactPlayer from 'react-player';

const FighterVideos = ({ fighter, supporting }) => {
  const intl = useIntl();
  const [url, setUrl] = useState(fighter.previewUrl);
  const payedFighter = supporting.map(sub => sub.fighter.id);
  return (
    <div className="fighter-videos">
      <h1>{intl.formatMessage({ id: 'fighter.videos.title' })}</h1>
      <br />
      <br />
      <ReactPlayer url={url} width="80%" controls style={{ margin: 'auto' }} />
      <div className="blank-line" />
      <div className="container">
        <div className="row flex">
          {fighter.publicVideos.length == 0 && fighter.privateVideos.length == 0 && (
            <h2 className="center">{intl.formatMessage({ id: 'fighter.videos.noVideos' })}</h2>
          )}
          {fighter.privateVideos.length > 0 && payedFighter.length == 0 && (
            <h2 className="center">{intl.formatMessage({ id: 'fighter.videos.subscribe' })}</h2>
          )}
          {fighter.publicVideos &&
            fighter.publicVideos.map(v => (
              <div key={v.url} className="col-sm-4 fighter-watch" onClick={() => setUrl(v.url)}>
                <ReactPlayer url={v.url} width="300" height="250" />
              </div>
            ))}
        </div>
        <br />
        <br />
        <div className="row flex">
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
