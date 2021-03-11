import React from 'react';

import routesPaths from 'constants/routesPaths';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import SignUpPage from 'pages/SignUpPage';
import NotFoundPage from 'pages/NotFoundPage';
import BillingPage from 'pages/BillingPage';
import FighterPage from 'pages/FighterPage';
import FightersPage from 'pages/FightersPage';
import AboutPage from 'pages/AboutPage';
import ShopPage from 'pages/ShopPage';
import TermsPage from 'pages/TermsPage';

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
    path: routesPaths.fighters,
    component: <FightersPage />,
    private: false,
    exact: false
  },
  {
    path: routesPaths.shop,
    component: <ShopPage />,
    private: false,
    exact: false
  },
  {
    path: routesPaths.terms,
    component: <TermsPage />,
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
    component: <NotFoundPage />
  }
];

export default routes;
