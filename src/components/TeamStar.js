import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import ReactGA from 'react-ga';

import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import { useMediaQuery } from 'react-responsive';
import { useIntl } from 'react-intl';
// import { format } from 'date-fns';
import { useParams, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useSession } from 'hooks';
// import { formatTitle, formatDescription } from 'utils/translationsHelper';
import { getTeams } from '../state/actions/teamActions';
import { getSubscriptions } from '../state/actions/subscriptionActions';

import Auth from './common/Auth';
import ConfirmationModal from './common/ConfirmationModal';
import CommonModal from './common/CommonModal';
import BillingForm from './BillingForm';
import HowItWorks from './HowItWorks';
import TeamVideos from './TeamVideos';
import HomeExclusive from './HomeExclusive';
import HomeFooter from './HomeFooter';
import PPVForm from './PPVForm';

// import Subscribe from '../assets/subscribe.png';
// import SubscribeRu from '../assets/subscribe_rus.png';
import ArrowDown from '../assets/ArrowDown.svg';
import Email from '../assets/Email.svg';
import Pin from '../assets/Pin.svg';
import VideoCamera from '../assets/VideoCamera.svg';

import '../styles/components/_home-starts.scss';

const TeamStar = () => {
  const { name } = useParams();
  const intl = useIntl();
  const dispatch = useDispatch();
  const { authenticated } = useSession();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [modalPPVIsOpen, setModalPPVIsOpen] = useState(false);
  const [videos, setVideos] = useState(false);
  const [PPVOpen, setPPVOpen] = useState(false);
  useEffect(() => {
    dispatch(getTeams(true));
  }, [dispatch]);
  useEffect(() => {
    if (authenticated) {
      dispatch(getSubscriptions());
    }
  }, [authenticated, dispatch]);
  useEffect(() => {
    ReactGA.pageview(`/teams/${name}`);
  }, [name]);

  const supporting = useSelector(state => state.subscriptions?.subscriptions);
  const team = useSelector(state => state.teams.teams.filter(t => t.name == name)[0]);
  const ppvRequest = useSelector(state => state.subscriptions.ppvRequest);
  // const language = useSelector(state => state.language.language);
  const payedTeam = supporting.map(sub => sub.fighter.name);
  const currentUser = useSelector(state => state.session.user?.user);
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  useEffect(() => {
    if (payedTeam && team) {
      payedTeam.includes(team.name) && setVideos(true);
    }
  }, [payedTeam, team]);

  const ppvClick = () => {
    ReactGA.pageview('/ppvClick');
    if (authenticated) {
      if (ppvRequest.length > 0) {
        setModalPPVIsOpen(true);
      } else {
        setPPVOpen(true);
      }
    } else {
      setAuthModal(true);
    }
  };

  return (
    <div className="fighter-container">
      {!payedTeam.includes(team?.name) && (
        <div className="cover-container">
          {team ? (
            <LazyLoadImage className="fighter-cover" src={team.coverPhoto} alt="Cover" />
          ) : (
            <SkeletonTheme color="#202020" highlightColor="#444">
              <Skeleton height="90vh" />
            </SkeletonTheme>
          )}
          {team && (
            <div className="centered">
              <br />
              <br />
              <p>
                {'Team '}
                {team.name}{' '}
              </p>
              {authenticated &&
                supporting &&
                team &&
                !supporting.filter(s => s.fighter.id === team.id).length > 0 && (
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
      )}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-collapse" id="navbarText">
          {!payedTeam.includes(team?.name) && (
            <React.Fragment>
              <ul className="navbar-nav mr-auto">
                {team && payedTeam && !payedTeam.includes(team.id) && (
                  <li className={cn('nav-item', { active: !videos })}>
                    <Link className="nav-link" href="" onClick={() => setVideos(false)}>
                      {intl.formatMessage({ id: 'header.home' })}{' '}
                      <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                )}
                <li className={cn('nav-item', { active: videos })}>
                  <Link className="nav-link" onClick={() => setVideos(true)}>
                    {intl.formatMessage({ id: 'header.videos' })}
                  </Link>
                </li>
              </ul>
            </React.Fragment>
          )}
          <div className={`nav-actions flex ppv-button ${!isMobile && 'justify-content-end'}`}>
            <button type="button" className="btn btn-danger" onClick={() => ppvClick()}>
              {intl.formatMessage({ id: 'button.ppv' })}
            </button>
          </div>
        </div>
      </nav>
      {!videos && (
        <div className="container">
          <div className="main-content row">
            {isMobile && (
              <div className="col-sm-12 col-md-8">
                {team && (
                  <LazyLoadComponent>
                    <ReactPlayer
                      title="preview"
                      width="100%"
                      height="80%"
                      url={team.officialPreview}
                      controls
                    />
                  </LazyLoadComponent>
                )}
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
                team &&
                !supporting.filter(s => s.fighter.id === team.id).length > 0 && (
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
                {team && (
                  <LazyLoadComponent>
                    <ReactPlayer
                      title="preview"
                      width="100%"
                      height="90%"
                      url={team.officialPreview}
                      controls
                    />
                  </LazyLoadComponent>
                )}
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
            team &&
            !supporting.filter(s => s.fighter.id === team.id).length > 0 && (
              <div className="container">
                <HowItWorks />
                <HomeExclusive fighter={team} />
              </div>
            )}
          {!authenticated && (
            <React.Fragment>
              <div className="container">
                <HowItWorks />
                <HomeExclusive fighter={team} />
              </div>
            </React.Fragment>
          )}
        </div>
      )}
      {videos && (
        <TeamVideos
          team={team}
          supporting={supporting}
          subscribeAction={() => setModalIsOpen(true)}
        />
      )}
      <HomeFooter />
      <ConfirmationModal
        title={intl.formatMessage({ id: 'billing.title' })}
        explain={intl.formatMessage({ id: 'modal.header.explain' })}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        isDelete={false}
        price={team?.subPrice}
        email={currentUser?.email}
        fighter={team?.id}
      >
        <BillingForm email={currentUser?.email} fighter={team?.id} type="subscription" />
      </ConfirmationModal>
      <CommonModal
        title={intl.formatMessage({ id: 'ppv.title' })}
        isOpen={PPVOpen}
        setIsOpen={setPPVOpen}
        customWidth="80%"
        customHeight="80%"
      >
        <PPVForm
          onSubmit={setPPVOpen}
          nextStep={setModalPPVIsOpen}
          fighterName={`Team ${team?.name}`}
        />
      </CommonModal>
      <ConfirmationModal
        title={intl.formatMessage({ id: 'billing.ppv.title' })}
        explain={intl.formatMessage({ id: 'modal.header.ppv.explain' })}
        isOpen={modalPPVIsOpen}
        setIsOpen={setModalPPVIsOpen}
        isDelete={false}
        price={500}
        email={currentUser?.email}
        fighter={team?.id}
      >
        <BillingForm email={currentUser?.email} fighter={team?.id} type="ppv" />
      </ConfirmationModal>
      <Auth modalIsOpen={authModal} setModalIsOpen={setAuthModal} />
    </div>
  );
};

export default TeamStar;
