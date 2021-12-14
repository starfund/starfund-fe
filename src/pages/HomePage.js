import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSession } from 'hooks';
import ReactGA from 'react-ga';

import HomeView from 'components/HomeView';
import UserHomePage from './UserHomePage';
import HomeFooter from '../components/HomeFooter';
import MailchimpForm from '../components/MailchimpForm';

const HomePage = () => {
  const { authenticated } = useSession();
  const newUser = useSelector(state => state.subscriptions.newUser);
  const shouldUpdatePassword = useSelector(state => state.subscriptions.shouldUpdatePassword);
  useEffect(() => {
    ReactGA.pageview('/homepage');
  }, []);

  if (!newUser && !shouldUpdatePassword && authenticated) {
    return <UserHomePage />;
  }
  return (
    <div className="home">
      <HomeView />
      <MailchimpForm />
      <HomeFooter />
    </div>
  );
};

export default HomePage;
