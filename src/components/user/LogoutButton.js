import React from 'react';
import { FormattedMessage } from 'react-intl';

import useDispatch from 'hooks/useDispatch';
import { logout } from 'state/actions/userActions';

const LogoutButton = () => {
  const logoutRequest = useDispatch(logout);

  return (
    <button onClick={logoutRequest} type="button" className="btn dropdown-item">
      <FormattedMessage id="logout.button" />
    </button>
  );
};

export default LogoutButton;
