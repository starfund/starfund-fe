import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Heart from 'react-animated-heart';
import ReactPlayer from 'react-player';
import { formatDistance } from 'date-fns';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { formatTitle, formatDescription } from 'utils/translationsHelper';

const FeedContent = ({ fighterInfo, content, language }) => {
  const history = useHistory();
  const [isClick, setClick] = useState(false);

  if (!fighterInfo || !content) {
    return (
      <SkeletonTheme color="#202020" highlightColor="#444">
        <Skeleton height="90vh" />
      </SkeletonTheme>
    );
  }

  return (
    <div className="content-row">
      <div
        className="fighter-title flex"
        onClick={() => history.push(`/fighter/${fighterInfo.id}`)}
      >
        <img src={fighterInfo.profilePicture} className="fighter-img" alt="title" />
        <p>
          {' '}
          {fighterInfo.firstName} {fighterInfo.lastName}{' '}
        </p>
      </div>
      <br />
      {content.image && (
        <div className="content-img">
          <img src={content.image} height="300" alt="content" />
        </div>
      )}
      {content.video && <ReactPlayer url={content.video} width="200" height="200" controls />}
      <div className="flex">
        <div>
          <Heart isClick={isClick} onClick={() => setClick(!isClick)} />
          <p className="like-count">{content.likes}</p>
        </div>
        <div>
          <h2>{formatTitle(content, language)}</h2>
          <h4 className="content-title">
            {formatDescription(content, language)} *{' '}
            {formatDistance(new Date(content.eventDate), new Date(), {
              addSuffix: true
            })}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default FeedContent;
