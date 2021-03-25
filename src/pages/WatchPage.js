import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getFighters } from '../state/actions/fighterActions';

const WatchPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFighters());
  }, [dispatch]);
  const fighters = useSelector(state => state.fighters.fighters);
  const [url, setUrl] = useState(fighters[0]?.publicVideos[0]?.url);

  return (
    <div className="watch-container">
      <h1> Discover Athletes </h1>
      <br />
      <video width="800" height="450" controls src={url} />
      <div className="flex">
        {fighters.length > 0 &&
          fighters.map(
            f =>
              f.publicVideos && (
                <div
                  key={f.id}
                  className="col-sm-4 fighter-watch"
                  onClick={() => setUrl(f.publicVideos[0]?.url)}
                >
                  <video width="300" height="250">
                    <source src={f.publicVideos[0]?.url} />
                  </video>
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default WatchPage;