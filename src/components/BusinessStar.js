import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import ReactGA from 'react-ga';

import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
// import { useMediaQuery } from 'react-responsive';
import { useIntl } from 'react-intl';
import ReactPlayer from 'react-player';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useParams, Link } from 'react-router-dom';
import { useSession } from 'hooks';
import { getBusinesses } from '../state/actions/businessActions';
import { getSubscriptions } from '../state/actions/subscriptionActions';

import ConfirmationModal from './common/ConfirmationModal';
import BillingForm from './BillingForm';
import HomeFooter from './HomeFooter';
import Schedule from './common/Schedule';
import BusinessHome from './business/BusinessHome';
import BusinessVideos from './business/BusinessVideos';
import BusinessPrograms from './business/BusinessPrograms';

const BusinessStar = () => {
  const { id } = useParams();
  const intl = useIntl();
  const dispatch = useDispatch();
  const { authenticated } = useSession();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [videos, setVideos] = useState(false);
  const [courses, setCourses] = useState(false);

  useEffect(() => {
    dispatch(getBusinesses());
  }, [dispatch]);
  useEffect(() => {
    if (authenticated) {
      dispatch(getSubscriptions());
    }
  }, [authenticated, dispatch]);
  useEffect(() => {
    ReactGA.pageview(`/business/${id}`);
  }, [id]);

  const subscriptions = useSelector(state => state.subscriptions?.subscriptions);
  const business = useSelector(
    state => state.businesses.businesses.filter(b => b.id == parseInt(id))[0]
  );
  const subscribed = subscriptions.filter(sub => sub.business?.id);
  const currentUser = useSelector(state => state.session.user?.user);

  const setHeader = header => {
    switch (header) {
      case 'videos':
        setVideos(true);
        setCourses(false);
        break;
      case 'programs':
        setVideos(false);
        setCourses(true);
        break;
      default:
        setVideos(false);
        setCourses(false);
        break;
    }
  };

  return (
    <div className="fighter-container">
      <div className="cover-container">
        {business ? (
          <LazyLoadImage className="business-cover" src={business.coverPhoto} alt="Cover" />
        ) : (
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height="40vh" />
          </SkeletonTheme>
        )}
        {business && (
          <div className="centered">
            <br />
            <br />
            <p className="business-name">{business.name}</p>
            {authenticated &&
              subscribed.length === 0 &&
              business &&
              !subscribed.filter(s => s.business?.id === business.id).length > 0 && (
                <button
                  type="button"
                  className="btn btn-danger btn-lg"
                  onClick={() => setModalIsOpen(true)}
                >
                  {intl.formatMessage({ id: 'button.subscribe' })}
                </button>
              )}
            {!authenticated && (
              <button
                type="button"
                className="btn btn-danger btn-lg"
                onClick={() => setModalIsOpen(true)}
              >
                {intl.formatMessage({ id: 'button.subscribe' })}
              </button>
            )}
          </div>
        )}
      </div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-collapse" id="navbarText">
          {!subscribed.includes(business?.id) && (
            <React.Fragment>
              <ul className="navbar-nav mr-auto">
                <li className={cn('nav-item', { active: !videos && !courses })}>
                  <Link className="nav-link" href="" onClick={() => setHeader('home')}>
                    {intl.formatMessage({ id: 'header.home' })}{' '}
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className={cn('nav-item', { active: videos })}>
                  <Link className="nav-link" onClick={() => setHeader('videos')}>
                    {intl.formatMessage({ id: 'header.videos' })}
                  </Link>
                </li>
                <li className={cn('nav-item', { active: courses })}>
                  <Link className="nav-link" onClick={() => setHeader('programs')}>
                    {intl.formatMessage({ id: 'header.programs' })}
                  </Link>
                </li>
              </ul>
            </React.Fragment>
          )}
        </div>
      </nav>
      {!videos && !courses && (
        <div className="container business-home">
          <center>
            <h1> {business?.slogan} </h1>
          </center>
          <div className="col-sm-10 video">
            {business && (
              <LazyLoadComponent>
                <ReactPlayer
                  title="preview"
                  width="100%"
                  height="50vh"
                  url={business.officialPreview}
                  controls
                />
              </LazyLoadComponent>
            )}
          </div>
          <div className="blank-line" />
          <center>
            <h2> Know our Programs </h2>
          </center>
          <BusinessHome business={business} setPrograms={setCourses} />
          <div className="blank-line" />
          <center>
            <Schedule title="Schedule" />
          </center>
        </div>
      )}
      {videos && business && <BusinessVideos business={business} />}
      {!videos && courses && business && (
        <BusinessPrograms business={business} setVideos={setVideos} />
      )}
      <div className="blank-line" />
      <HomeFooter />
      <ConfirmationModal
        title={intl.formatMessage({ id: 'billing.title' })}
        explain={intl.formatMessage({ id: 'modal.header.explain' })}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        isDelete={false}
        price={business?.subPrice}
        email={currentUser?.email}
        fighter={business?.id}
      >
        <BillingForm email={currentUser?.email} fighter={business?.id} type="business" />
      </ConfirmationModal>
    </div>
  );
};

export default BusinessStar;
