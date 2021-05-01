import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import ReactGA from 'react-ga';

import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import { useMediaQuery } from 'react-responsive';
import { useIntl } from 'react-intl';
import { useParams, useHistory, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useSession } from 'hooks';
import { getFighters } from '../state/actions/fighterActions';

import { getSubscriptions } from '../state/actions/subscriptionActions';

import Slider from './common/Slider';
import ConfirmationModal from './common/ConfirmationModal';
import BillingForm from './BillingForm';
import HowItWorks from './HowItWorks';
import FighterVideos from './FighterVideos';
import HomeExclusive from './HomeExclusive';
import HomeFooter from './HomeFooter';

import ArrowDown from '../assets/ArrowDown.svg';
import Email from '../assets/Email.svg';
import Pin from '../assets/Pin.svg';
import VideoCamera from '../assets/VideoCamera.svg';

import '../styles/components/_home-starts.scss';

const FighterStar = () => {
  const { id } = useParams();
  const intl = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const { authenticated } = useSession();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [videos, setVideos] = useState(false);
  useEffect(() => {
    dispatch(getFighters());
  }, [dispatch]);
  useEffect(() => {
    if (authenticated) {
      dispatch(getSubscriptions());
    }
  }, [authenticated, dispatch]);
  useEffect(() => {
    ReactGA.pageview(`/fighter/${id}`);
  }, [id]);
  const fighters = useSelector(state => state.fighters.fighters);
  const supporting = useSelector(state => state.subscriptions?.subscriptions);
  const fighter = useSelector(
    state => state.fighters.fighters.filter(f => f.id == parseInt(id))[0]
  );
  const currentUser = useSelector(state => state.session.user);
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  return (
    <div className="fighter-container">
      <div className="cover-container">
        {fighter ? (
          <LazyLoadImage className="fighter-cover" src={fighter.coverPhoto} alt="Cover" />
        ) : (
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height="90vh" />
          </SkeletonTheme>
        )}
        {fighter && (
          <div className="centered">
            <br />
            <br />
            <p>
              {' '}
              {fighter.firstName} {fighter.lastName}{' '}
            </p>
            {authenticated &&
              supporting &&
              fighter &&
              !supporting.filter(s => s.fighter.id === fighter.id).length > 0 && (
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
          <ul className="navbar-nav mr-auto">
            <li className={cn('nav-item', { active: !videos })}>
              <Link className="nav-link" href="" onClick={() => setVideos(false)}>
                {intl.formatMessage({ id: 'header.home' })}{' '}
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className={cn('nav-item', { active: videos })}>
              <Link className="nav-link" onClick={() => setVideos(true)}>
                {intl.formatMessage({ id: 'header.videos' })}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {!videos && (
        <div className="container">
          <div className="main-content row">
            {isMobile && (
              <div className="col-sm-12 col-md-8">
                {fighter && (
                  <LazyLoadComponent>
                    <ReactPlayer
                      title="preview"
                      width="100%"
                      height="80%"
                      url={fighter.publicVideos[0]?.url}
                      controls
                    />
                  </LazyLoadComponent>
                )}
                <p className="video-text">{intl.formatMessage({ id: 'fighter.videoPreview' })}</p>
              </div>
            )}
            <div className="how-it-works offset-lg-1 col-sm-12 col-md-4 col-lg-3">
              {!isMobile && (
                <div className="content">
                  <React.Fragment>
                    <p className="bold">{intl.formatMessage({ id: 'fighter.howItWorks.title' })}</p>
                    <br />
                    <br />
                    <div className="text">
                      <LazyLoadImage src={VideoCamera} alt="bcm" />
                      <p>{intl.formatMessage({ id: 'fighter.howItWorks.item1' })}</p>
                    </div>
                    <br />
                    <br />
                    <div className="text">
                      <LazyLoadImage src={Pin} alt="bpj" />
                      <p>{intl.formatMessage({ id: 'fighter.howItWorks.item2' })}</p>
                    </div>
                    <br />
                    <br />
                    <div className="text">
                      <LazyLoadImage src={Email} alt="cwm" />
                      <p>{intl.formatMessage({ id: 'fighter.howItWorks.item3' })}</p>
                    </div>
                  </React.Fragment>
                </div>
              )}
              {authenticated &&
                supporting &&
                fighter &&
                !supporting.filter(s => s.fighter.id === fighter.id).length > 0 && (
                  <button
                    type="button"
                    className="btn btn-danger btn-lg"
                    onClick={() => setModalIsOpen(true)}
                  >
                    {intl.formatMessage({ id: 'button.subscribeNow' })}
                  </button>
                )}
              {!authenticated && (
                <button
                  type="button"
                  className="btn btn-danger btn-lg"
                  onClick={() => setModalIsOpen(true)}
                >
                  {intl.formatMessage({ id: 'button.subscribeNow' })}
                </button>
              )}
            </div>
            {!isMobile && (
              <div className="col-sm-12 col-md-8">
                {fighter && (
                  <LazyLoadComponent>
                    <ReactPlayer
                      title="preview"
                      width="100%"
                      height="80%"
                      url={fighter.publicVideos[0]?.url}
                      controls
                    />
                  </LazyLoadComponent>
                )}
                <p className="video-text">{intl.formatMessage({ id: 'fighter.videoPreview' })}</p>
              </div>
            )}
          </div>
          {isMobile && (
            <div className="content">
              <div id="accordion">
                <div className="card text-white bg-dark">
                  <div className="card-header" id="headingOne">
                    <h5 className="mb-0 flex">
                      <p className="bold width-90">
                        {intl.formatMessage({ id: 'fighter.howItWorks.title' })}
                      </p>
                      <LazyLoadImage
                        alt="drop"
                        src={ArrowDown}
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      />
                    </h5>
                  </div>
                  <div
                    id="collapseOne"
                    className="collapse"
                    aria-labelledby="headingOne"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <div className="text">
                        <LazyLoadImage src={VideoCamera} alt="bcm" />
                        <p>{intl.formatMessage({ id: 'fighter.howItWorks.item1' })}</p>
                      </div>
                      <br />
                      <br />
                      <div className="text">
                        <LazyLoadImage src={Pin} alt="bpj" />
                        <p>{intl.formatMessage({ id: 'fighter.howItWorks.item2' })}</p>
                      </div>
                      <br />
                      <br />
                      <div className="text">
                        <LazyLoadImage src={Email} alt="cwm" />
                        <p>{intl.formatMessage({ id: 'fighter.howItWorks.item3' })}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <br />
              </div>
            </div>
          )}
          {authenticated &&
            supporting &&
            fighter &&
            !supporting.filter(s => s.fighter.id === fighter.id).length > 0 && (
              <div className="container">
                <HowItWorks />
                <HomeExclusive fighter={fighter} />
              </div>
            )}
          {!authenticated && (
            <div className="container">
              <HowItWorks />
              <HomeExclusive fighter={fighter} />
            </div>
          )}
        </div>
      )}
      {videos && (
        <FighterVideos
          fighter={fighter}
          supporting={supporting}
          subscribeAction={() => setModalIsOpen(true)}
        />
      )}
      <div className="stars-container">
        <h2>{intl.formatMessage({ id: 'fighter.discoverMore' })}</h2>
        <div className="fighters-container fighters-slider-wrapper">
          <Slider>
            {fighters.length > 0 &&
              fighters
                .filter(f => f.id !== fighter.id)
                .map(f => (
                  <a
                    key={f.id}
                    className="fighter-card-link"
                    href=""
                    onClick={() => history.push(`/fighter/${f.id}`)}
                  >
                    <div key={f.id} className="fighter-card">
                      <LazyLoadImage
                        className="fighter-card-image"
                        src={f?.profilePicture}
                        alt="Card cap"
                      />
                      <div className="fighter-card-overlay">
                        <div className="fighter-card-name-wrapper">
                          <span className="fighter-card-text">{f.firstName} </span>
                          <span className="fighter-card-text secondary">{f.lastName} </span>
                        </div>
                        <div className="fighter-card-separator" />
                        <span className="fighter-card-text">{f.organization} </span>
                      </div>
                    </div>
                  </a>
                ))}
          </Slider>
        </div>
      </div>
      <HomeFooter />
      <ConfirmationModal
        title={intl.formatMessage({ id: 'billing.title' })}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        isDelete={false}
        price={fighter?.subPrice}
        email={currentUser?.email}
        fighter={fighter?.id}
      >
        <BillingForm email={currentUser?.email} fighter={fighter?.id} />
      </ConfirmationModal>
    </div>
  );
};

export default FighterStar;
