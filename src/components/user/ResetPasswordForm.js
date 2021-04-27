import React, { memo } from 'react';
import { func } from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useIntl, defineMessages, FormattedMessage } from 'react-intl';
import { useStatus, ERROR, LOADING } from '@rootstrap/redux-tools';
import ReactGA from 'react-ga';

import Loading from 'components/common/Loading';
import Input from 'components/common/Input';
import { useForm, useTextInputProps } from 'hooks';
import { forgotPass } from 'state/actions/userActions';

const messages = defineMessages({
  password: { id: 'login.form.password' },
  confirmPassword: { id: 'signup.form.passconfirmation' }
});

const fields = {
  password: 'password',
  confirmPassword: 'confirmPassword',
  client: 'client'
};

export const ResetPasswordForm = ({ onSubmit }) => {
  const intl = useIntl();
  const params = new URLSearchParams(useLocation().search);
  const token = params.get('access-token');
  const uid = params.get('uid');
  const client = params.get('client_id');
  const initialValues = { client, uid, token };

  const { status, error } = useStatus(forgotPass);
  const { values, errors, handleValueChange, handleSubmit, handleBlur } = useForm(
    {
      initialValues,
      onSubmit
    },
    [onSubmit]
  );

  ReactGA.modalview('/resetPass');

  const inputProps = useTextInputProps({ handleValueChange, handleBlur, values, errors });

  return (
    <div className="reset-form">
      <h2> {intl.formatMessage(messages.confirmPassword)} </h2>
      <form onSubmit={handleSubmit}>
        {status === ERROR && <strong>{error}</strong>}
        <div>
          <Input
            name="password"
            type="password"
            label={intl.formatMessage(messages.password)}
            {...inputProps(fields.password)}
          />
        </div>
        <div>
          <Input
            name="confirmPassword"
            type="password"
            label={intl.formatMessage(messages.confirmPassword)}
            {...inputProps(fields.confirmPassword)}
          />
        </div>
        <br />
        <button className="btn btn-danger" type="submit">
          <FormattedMessage id="login.form.submit" />
        </button>
        {status === LOADING && <Loading />}
      </form>
    </div>
  );
};

ResetPasswordForm.propTypes = {
  onSubmit: func.isRequired
};

export default memo(ResetPasswordForm);
