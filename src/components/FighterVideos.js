import React, { useState } from 'react';

import ReactPlayer from 'react-player';

const FighterVideos = ({ fighter, supporting }) => {
  const [url, setUrl] = useState(fighter.previewUrl);
  const payedFighter = supporting.map(sub => sub.fighter.id);
  return (
    <div className="fighter-videos">
      <h1> Watch Featured Videos </h1>
      <br />
      <br />
      <ReactPlayer url={url} width="100%" height="600px" controls />
      <br />
      <br />
      <div className="container">
        <div className="row flex">
          {fighter.publicVideos.length == 0 && (
            <h2 className="center">This fighter has not uploaded any videos yet</h2>
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
