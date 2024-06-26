import React from 'react';

import routesPaths from 'constants/routesPaths';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import SignUpPage from 'pages/SignUpPage';
import NotFoundPage from 'pages/NotFoundPage';
import BillingPage from 'pages/BillingPage';
import FighterPage from 'pages/FighterPage';
import BusinessPage from 'pages/BusinessPage';
import TeamPage from 'pages/TeamPage';
import OrganizationPage from 'pages/OrganizationPage';
import OrganizationRedirect from 'components/OrganizationRedirect';
import FightersPage from 'pages/FightersPage';
import BusinessesPage from 'pages/BusinessesPage';
import FightersPPVPage from 'pages/FightersPPVPage';
import AboutPage from 'pages/AboutPage';
// import ShopPage from 'pages/ShopPage';
import TermsPage from 'pages/TermsPage';
import PrivacyPage from 'pages/PrivacyPage';
import UserHomePage from 'pages/UserHomePage';
import ProfilePage from 'pages/ProfilePage';
import WatchPage from 'pages/WatchPage';
import EnrollPage from 'pages/EnrollPage';
import RewardsPage from 'pages/RewardsPage';
import ResetPasswordPage from 'pages/ResetPasswordPage';

const routes = [
  {
    path: routesPaths.index,
    component: <HomePage />,
    exact: true,
    private: false
  },
  {
    path: routesPaths.login,
    component: <LoginPage />
  },
  {
    path: routesPaths.signUp,
    component: <SignUpPage />
  },
  {
    path: routesPaths.fighter,
    component: <FighterPage />,
    private: false,
    exact: false
  },
  {
    path: routesPaths.athlete,
    component: <FighterPage />,
    private: false,
    exact: false
  },
  {
    path: routesPaths.business,
    component: <BusinessPage />,
    private: false,
    exact: false
  },
  {
    path: routesPaths.team,
    component: <TeamPage />,
    private: false,
    exact: false
  },
  {
    path: routesPaths.organization,
    component: <OrganizationPage />,
    private: false,
    exact: false
  },
  {
    path: routesPaths.organizationName,
    component: <OrganizationRedirect />,
    private: false,
    exact: false
  },
  {
    path: routesPaths.fightersPpv,
    component: <FightersPPVPage />,
    private: false,
    exact: true
  },
  {
    path: routesPaths.athletes,
    component: <FightersPage />,
    private: false,
    exact: false
  },
  {
    path: routesPaths.fighters,
    component: <FightersPage />,
    private: false,
    exact: false
  },
  {
    path: routesPaths.businesses,
    component: <BusinessesPage />,
    private: false,
    exact: false
  },
  {
    path: routesPaths.teams,
    component: <FightersPage />,
    private: false,
    exact: false
  },
  {
    path: routesPaths.organizations,
    component: <BusinessesPage />,
    private: false,
    exact: false
  },
  {
    path: routesPaths.rewards,
    component: <RewardsPage />,
    private: false,
    exact: false
  },
  /* {
    path: routesPaths.shop,
    component: <ShopPage />,
    private: false,
    exact: false
  }, */
  {
    path: routesPaths.terms,
    component: <TermsPage />,
    private: false,
    exact: false
  },
  {
    path: routesPaths.privacy,
    component: <PrivacyPage />,
    private: false,
    exact: false
  },
  {
    path: routesPaths.about,
    component: <AboutPage />,
    private: false,
    exact: false
  },
  {
    path: routesPaths.billing,
    component: <BillingPage />,
    exact: true,
    private: false
  },
  {
    path: routesPaths.watch,
    component: <WatchPage />,
    exact: true,
    private: false
  },
  {
    path: routesPaths.becomeStar,
    component: <EnrollPage />,
    exact: true,
    private: false
  },
  {
    path: routesPaths.help,
    component: <EnrollPage />,
    exact: true,
    private: false
  },
  {
    path: routesPaths.userHome,
    component: <UserHomePage />,
    exact: true,
    private: true
  },
  {
    path: routesPaths.profile,
    component: <ProfilePage />,
    exact: true,
    private: true
  },
  {
    path: routesPaths.password,
    component: <ResetPasswordPage />,
    exact: true,
    private: false
  },
  {
    component: <NotFoundPage />
  }
];

export default routes;
