import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSession } from 'hooks';
import { useIntl } from 'react-intl';
import ReactGA from 'react-ga';

import UserHomePage from './UserHomePage';
import ParalaxHome from '../components/ParalaxHome';
import HomeStars from '../components/HomeStars';
import HomeInfo from '../components/HomeInfo';
import HomeFooter from '../components/HomeFooter';
import MailchimpForm from '../components/MailchimpForm';
// import HomeAnnouncements from '../components/HomeAnnouncements';
import FAQS from '../components/FAQS';
import HomeExclusive from '../components/HomeExclusive';

const HomePage = () => {
  const { authenticated } = useSession();
  const intl = useIntl();
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
      <ParalaxHome />
      <HomeStars title={intl.formatMessage({ id: 'home.fighters.title' })} />
      <MailchimpForm />
      <HomeInfo />
      <FAQS />
      <HomeExclusive />
      <HomeFooter />
    </div>
  );
};

export default HomePage;
