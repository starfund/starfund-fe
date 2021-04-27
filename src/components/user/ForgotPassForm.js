import React, { memo } from 'react';
import { func } from 'prop-types';
import { useIntl, defineMessages, FormattedMessage } from 'react-intl';
import { useStatus, ERROR, LOADING } from '@rootstrap/redux-tools';
import ReactGA from 'react-ga';

import Loading from 'components/common/Loading';
import Input from 'components/common/Input';
import { useForm, useTextInputProps } from 'hooks';
import { forgotPass } from 'state/actions/userActions';

const messages = defineMessages({
  email: { id: 'login.form.email' }
});

const fields = {
  email: 'email'
};

export const ForgotPassForm = ({ onSubmit }) => {
  const intl = useIntl();
  const { status, error } = useStatus(forgotPass);
  const { values, errors, handleValueChange, handleSubmit, handleBlur } = useForm(
    {
      onSubmit
    },
    [onSubmit]
  );
  ReactGA.modalview('/forgotPass');

  const inputProps = useTextInputProps({ handleValueChange, handleBlur, values, errors });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {status === ERROR && <strong>{error}</strong>}
        <div>
          <Input
            name="email"
            type="email"
            label={intl.formatMessage(messages.email)}
            {...inputProps(fields.email)}
          />
        </div>
        <button className="btn btn-danger" type="submit">
          <FormattedMessage id="login.form.submit" />
        </button>
        {status === LOADING && <Loading />}
      </form>
    </div>
  );
};

ForgotPassForm.propTypes = {
  onSubmit: func.isRequired
};

export default memo(ForgotPassForm);
