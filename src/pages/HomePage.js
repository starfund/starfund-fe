import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSession } from 'hooks';

import LogoutButton from 'components/user/LogoutButton';
import BillingPage from './BillingPage';

const HomePage = () => {
  const { user } = useSession();

  return (
    <div>
      <BillingPage />
      {user && user.email && (
        <p>
          <FormattedMessage id="home.welcome" values={user} />
        </p>
      )}
      <br />
      <LogoutButton />
    </div>
  );
};

export default HomePage;
