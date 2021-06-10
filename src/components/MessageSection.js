import React from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import Input from './common/Input';
import DefaultAvatar from '../assets/DefaultAvatar.jpeg';

const MessageSection = ({ messages, authenticated }) => {
  const intl = useIntl();
  const currentUser = useSelector(state => state.session.user);

  return (
    <div className="col-12 col-sm-12 col-md-8 comment-section">
      <h4> {messages?.lenght || 0} comments </h4>
      <br />
      {authenticated && (
        <div className="flex">
          <img
            className="center"
            alt="user"
            src={currentUser?.profilePic ? currentUser.profilePic : DefaultAvatar}
          />
          <div className="col-12">
            <Input
              name="comment"
              placeholder={intl.formatMessage({ id: 'comments.add' })}
              className="comment-input"
              autocomplete="off"
            />
          </div>
        </div>
      )}
      <br />
      {messages &&
        messages.map(m => (
          <div>
            <p> {m.id} </p>
          </div>
        ))}
      {!authenticated && <p> {intl.formatMessage({ id: 'comments.none' })}</p>}
    </div>
  );
};

export default MessageSection;
