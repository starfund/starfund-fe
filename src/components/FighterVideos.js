import React, { useState } from 'react';

import ReactPlayer from 'react-player';

const FighterVideos = ({ fighter }) => {
  const [url, setUrl] = useState(fighter.previewUrl);
  return (
    <div className="fighter-videos">
      <h1> Watch Featured Videos </h1>
      <br />
      <br />
      <ReactPlayer url={url} width="100%" height="600px" controls />
      <br />
      <div className="flex">
        {fighter.publicVideos &&
          fighter.publicVideos.map(v => (
            <div key={v.url} className="col-sm-4 fighter-watch" onClick={() => setUrl(v.url)}>
              <ReactPlayer url={v.url} width="300" height="250" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default FighterVideos;
