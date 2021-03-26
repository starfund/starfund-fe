import React, { memo } from 'react';
import { Redirect } from 'react-router-dom';

import routes from 'constants/routesPaths';

const LoginPage = () => {
  return <Redirect to={routes.index} />;
};

export default memo(LoginPage);
