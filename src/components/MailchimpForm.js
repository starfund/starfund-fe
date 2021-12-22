import React from 'react';
import { useIntl } from 'react-intl';

const MailchimpForm = () => {
  const intl = useIntl();
  return (
    <div id="mc_embed_signup" className="mailchimp">
      <form
        action="https://app.us6.list-manage.com/subscribe/post?u=afe93a970567ff88ccd219547&amp;id=bb2e03da83"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        className="validate"
        target="_blank"
        noValidate
      >
        <div id="mc_embed_signup_scroll" className="center-50">
          <h2 htmlFor="mce-EMAIL">{intl.formatMessage({ id: 'mailchimp.sub' })}</h2>
          <br />
          <input
            type="email"
            name="EMAIL"
            className="email"
            id="mce-EMAIL"
            placeholder={intl.formatMessage({ id: 'mailchimp.email' })}
            required
          />
          <br />
          <br />
          <div className="clear">
            <input
              type="submit"
              value={intl.formatMessage({ id: 'button.subscribe' })}
              name="subscribe"
              id="mc-embedded-subscribe"
              className="button"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default MailchimpForm;
