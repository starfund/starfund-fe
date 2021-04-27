import React, { useEffect } from 'react';
import { useDispatch } from 'hooks';
import { useHistory } from 'react-router-dom';

import { useStatus, SUCCESS } from '@rootstrap/redux-tools';
import { resetPass } from 'state/actions/userActions';

import ResetPasswordForm from '../components/user/ResetPasswordForm';

const ResetPasswordPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const resetPassRequest = useDispatch(resetPass);
  const { status } = useStatus(resetPass);

  useEffect(() => {
    if (status === SUCCESS) {
      history.push('/');
    }
  }, [dispatch, history, status]);

  return (
    <div className="reset-password-container">
      <div className="container">
        <div className="row">
          <ResetPasswordForm onSubmit={resetPassRequest} />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
