import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import ReactGA from 'react-ga';

import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import { useMediaQuery } from 'react-responsive';
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
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

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
          <LazyLoadImage className="fighter-cover" src={business.coverPhoto} alt="Cover" />
        ) : (
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height="90vh" />
          </SkeletonTheme>
        )}
        {business && (
          <div className="centered">
            <br />
            <br />
            <p>{business.name}</p>
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
        <div className="container">
          <div className="main-content row">
            {isMobile && (
              <div className="col-sm-12 col-md-8">
                {business && (
                  <LazyLoadComponent>
                    <ReactPlayer
                      title="preview"
                      width="100%"
                      height="80%"
                      url={business.officialPreview}
                      controls
                    />
                  </LazyLoadComponent>
                )}
              </div>
            )}
            {!isMobile && (
              <div className="col-sm-12 col-md-8">
                {business && (
                  <LazyLoadComponent>
                    <ReactPlayer
                      title="preview"
                      width="100%"
                      height="90%"
                      url={business.officialPreview}
                      controls
                    />
                  </LazyLoadComponent>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {videos && <p> Upcoming videos soon </p>}
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
