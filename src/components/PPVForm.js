import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import ReactGA from 'react-ga';

import { setPPVRequest } from 'state/actions/subscriptionActions';
import Input from './common/Input';

const PPVForm = ({ onSubmit, nextStep }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [receptor, setReceptor] = useState();
  const [emailReceptor, setReceptorEmail] = useState();
  const [dream, setDream] = useState();

  ReactGA.modalview('/ppv');

  const sendDream = () => {
    const request = {
      receptor,
      emailReceptor,
      text: dream
    };
    dispatch(setPPVRequest(request));
    onSubmit(false);
    nextStep(true);
  };

  return (
    <div className="container ppv-container">
      <br />
      <h2> {intl.formatMessage({ id: 'ppv.description' })} </h2>
      <br />
      <div className="row">
        <div className="col-12">
          <Input
            name="Video Receptor"
            label={intl.formatMessage({ id: 'ppv.receptor' })}
            placeholder="Mike Tyson"
            onChange={e => setReceptor(e.target.value)}
          />
          <Input
            name="Email"
            type="email"
            label={intl.formatMessage({ id: 'ppv.emailReceptor' })}
            placeholder="email@example.com"
            onChange={e => setReceptorEmail(e.target.value)}
          />
        </div>
        <br />
        <br />
        <div className="col-12">
          <br />
          <p>{intl.formatMessage({ id: 'ppv.dream' })}</p>
          <textarea
            name="explanation"
            type="textarea"
            className="textarea"
            placeholder="Send me a video with your tiger please"
            onChange={e => setDream(e.target.value)}
          />
        </div>
        <br />
        <br />
        <div className="col-12">
          <p>{intl.formatMessage({ id: 'ppv.dontWorry' })}</p>
          <br />
          <button className="btn-danger btn-lg btn-block" onClick={() => sendDream()} type="button">
            {intl.formatMessage({ id: 'button.continue' })}
          </button>
          <br />
        </div>
      </div>
    </div>
  );
};

export default PPVForm;
