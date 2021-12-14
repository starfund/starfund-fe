import React, { memo } from 'react';
import { func } from 'prop-types';
import { useIntl, defineMessages, FormattedMessage } from 'react-intl';
import { useStatus, ERROR, LOADING } from '@rootstrap/redux-tools';
import ReactGA from 'react-ga';

import Loading from 'components/common/Loading';
import Input from 'components/common/Input';
import { login as loginValidations } from 'utils/constraints';
import { useForm, useValidation, useTextInputProps } from 'hooks';
import { login } from 'state/actions/userActions';

const messages = defineMessages({
  email: { id: 'login.form.email' },
  password: { id: 'login.form.password' }
});

const fields = {
  email: 'email',
  password: 'password'
};

export const LoginForm = ({ onSubmit }) => {
  const intl = useIntl();
  const { status, error } = useStatus(login);
  const validator = useValidation(loginValidations);
  const { values, errors, handleValueChange, handleSubmit, handleBlur } = useForm(
    {
      onSubmit,
      validator,
      validateOnBlur: true
    },
    [onSubmit]
  );
  ReactGA.modalview('/login');

  const inputProps = useTextInputProps({ handleValueChange, handleBlur, values, errors });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {status === ERROR && <strong className="error-message">{error}</strong>}
        <div>
          <Input
            name="email"
            type="email"
            placeholder={intl.formatMessage(messages.email)}
            style={status === ERROR ? { borderColor: 'red' } : {}}
            {...inputProps(fields.email)}
          />
        </div>
        <div>
          <Input
            name="password"
            type="password"
            placeholder={intl.formatMessage(messages.password)}
            style={status === ERROR ? { borderColor: 'red' } : {}}
            {...inputProps(fields.password)}
          />
        </div>
        <button className="btn btn-lg btn-danger" type="submit">
          <FormattedMessage id="login.form.submit" />
        </button>
        {status === LOADING && <Loading />}
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onSubmit: func.isRequired
};

export default memo(LoginForm);
