import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { useSession } from 'hooks';
import { ActionCableConsumer } from 'react-actioncable-provider';

import Input from './common/Input';
import DefaultAvatar from '../assets/DefaultAvatar.jpeg';

import { createMessage, newMessage } from '../state/actions/messageActions';

const MessageSection = ({ content, messages }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [msg, setMsg] = useState('');
  const { authenticated } = useSession();
  const currentUser = useSelector(state => state.session.user);

  const sendMessage = () => {
    dispatch(createMessage({ content: content.id, message: msg }));
    setMsg('');
  };

  const handleReceivedComment = response => {
    const newContent = {
      id: response.id,
      userId: response.userId,
      userName: response.userName,
      contentId: response.contentId,
      message: response.content
    };
    if (!messages.some(m => m.id === newContent.id)) {
      dispatch(newMessage(newContent));
    }
  };

  return (
    <div className="col-12 col-sm-12 col-md-8 comment-section">
      <h4> {messages?.length || 0} comments </h4>
      <br />
      {authenticated && content && (
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
              value={msg}
              onChange={e => setMsg(e.target.value)}
              autocomplete="off"
            />
            {msg && (
              <div className="comment-actions">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setMsg('')}
                  type="button"
                >
                  Cancel
                </button>
                <button className="btn-sm btn-primary" onClick={() => sendMessage()} type="button">
                  Comment
                </button>
              </div>
            )}
            {!msg && <br />}
          </div>
        </div>
      )}
      {messages &&
        messages.map(m => (
          <div className="flex comment-thread">
            <div className="flex">
              <img className="center" alt="user" src={DefaultAvatar} />
              <div>
                <p> {m.userName} </p>
                <p> {m.message} </p>
              </div>
            </div>
          </div>
        ))}
      {content && (
        <ActionCableConsumer
          channel={{ channel: 'CommentChannel', content_id: content?.id }}
          onReceived={e => handleReceivedComment(e)}
        />
      )}
      {!authenticated && <p> {intl.formatMessage({ id: 'comments.none' })}</p>}
    </div>
  );
};

export default MessageSection;
