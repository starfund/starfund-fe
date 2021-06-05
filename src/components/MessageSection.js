import React from 'react';
import { useIntl } from 'react-intl';

import Input from './common/Input';

const MessageSection = ({ messages, authenticated }) => {
  const intl = useIntl();

  return (
    <div className="col-12 col-sm-12 col-md-8">
      <h4> {messages?.lenght || 0} comments </h4>
      <br />
      {authenticated && (
        <Input name="comment" placeholder={intl.formatMessage({ id: 'comments.add' })} />
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
