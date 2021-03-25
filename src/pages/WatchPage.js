import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ReactPlayer from 'react-player';
import { getFighters } from '../state/actions/fighterActions';

const WatchPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFighters());
  }, [dispatch]);
  const fighters = useSelector(state => state.fighters.fighters);

  const [url, setUrl] = useState('');
  useEffect(() => {
    setUrl(fighters[0]?.publicVideos[0]?.url);
  }, [fighters]);

  return (
    <div className="watch-container">
      <h1> Watch Featured Videos </h1>
      <br />
      <ReactPlayer url={url} width="400" height="380" controls />
      <div className="flex">
        {fighters &&
          fighters.length > 0 &&
          fighters.map(
            f =>
              f.publicVideos && (
                <div
                  key={f.id}
                  className="col-sm-4 fighter-watch"
                  onClick={() => setUrl(f.publicVideos[0]?.url)}
                >
                  <ReactPlayer url={f.publicVideos[0]?.url} width="300" height="250" />
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default WatchPage;
