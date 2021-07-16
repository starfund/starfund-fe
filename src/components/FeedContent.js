import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Heart from 'react-animated-heart';
import ReactPlayer from 'react-player';
import { formatDistance } from 'date-fns';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { formatTitle, formatDescription } from 'utils/translationsHelper';
import { increaseLikes, decreaseLikes } from '../state/actions/contentActions';

const FeedContent = ({ fighterInfo, content, language, likes }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLiked = likes.some(c => c.content === content.id);
  const [isClick, setIsClick] = useState(isLiked);

  const likeContent = () => {
    if (isClick) {
      dispatch(decreaseLikes(content));
      setIsClick(false);
    } else {
      dispatch(increaseLikes(content));
      setIsClick(true);
    }
  };

  if (!fighterInfo || !content) {
    return (
      <SkeletonTheme color="#202020" highlightColor="#444">
        <Skeleton height="90vh" />
      </SkeletonTheme>
    );
  }

  const fighterLink = fighter => {
    if (fighter.teamName) {
      return history.push(`/team/${fighter.teamName}`);
    }
    return history.push(`/fighter/${fighter.fighterId}`);
  };

  return (
    <div className="content-row">
      <div className="fighter-title flex" onClick={() => fighterLink(fighterInfo)}>
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
          <Heart isClick={isClick} onClick={() => likeContent()} />
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
