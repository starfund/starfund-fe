import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import ReactGA from 'react-ga';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useMediaQuery } from 'react-responsive';
import { useIntl } from 'react-intl';
import { useParams, useHistory, Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useSession, usePrevious } from 'hooks';
import { fighterUrl } from 'utils/urlHelper';
import { getFighters } from '../state/actions/fighterActions';
import { getSubscriptions } from '../state/actions/subscriptionActions';
import ConfirmationModal from './common/ConfirmationModal';
import CommonModal from './common/CommonModal';
import BillingForm from './BillingForm';
import PPVForm from './PPVForm';

import FighterVideos from './FighterVideos';
import HomeStars from './HomeStars';
import FighterTeamHome from './FighterTeamHome';
import HomeFooter from './HomeFooter';

import '../styles/components/_home-starts.scss';

const FighterStar = () => {
  const { id } = useParams();
  const intl = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const { authenticated } = useSession();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [setAuthModal] = useState(false);
  const [modalPPVIsOpen, setModalPPVIsOpen] = useState(false);
  const [PPVOpen, setPPVOpen] = useState(false);
  const [videos, setVideos] = useState(!!authenticated);
  const prevAuth = usePrevious(authenticated);

  useEffect(() => {
    dispatch(getFighters(true));
  }, [dispatch]);
  useEffect(() => {
    if (authenticated) {
      dispatch(getSubscriptions());
    }
    if (!prevAuth && authenticated) {
      setVideos(true);
    }
  }, [authenticated, dispatch, prevAuth]);
  useEffect(() => {
    ReactGA.pageview(`/fighter/${id}`);
  }, [id]);

  const supporting = useSelector(state => state.subscriptions?.subscriptions);
  /* eslint-disable */
  const fighter = !isNaN(id)
    ? useSelector(state => state.fighters.fighters.filter(f => f.id == parseInt(id))[0])
    : useSelector(state => state.fighters.fighters.filter(f => f.urlName == id)[0]);
  const language = useSelector(state => state.language.language);
  const payedFighter = supporting.map(sub => sub.fighter?.id);
  const currentUser = useSelector(state => state.session.user);
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  useEffect(() => {
    if (payedFighter && fighter) {
      payedFighter.includes(fighter.id) && setVideos(true);
    }
  }, [payedFighter, fighter]);

  const fighterLink = fighter => {
    if (fighter.team) {
      history.push(`/team/${fighter.team.name}`);
    } else {
      history.push(`/fighter/${fighterUrl(fighter, parseInt(id))}`);
    }
  };

  return (
    <div className="fighter-container">
      {!payedFighter.includes(fighter?.id) && (
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
              <h1>
                {' '}
                {fighter.firstName} {fighter.lastName}{' '}
              </h1>
              {authenticated &&
                supporting &&
                fighter &&
                !supporting.filter(s => s.fighter?.id === fighter.id).length > 0 && (
                  <button
                    type="button"
                    className="btn btn-danger btn-lg"
                    onClick={() => setModalIsOpen(true)}
                  >
                    {`${intl.formatMessage({
                      id: fighter.support ? 'button.support' : 'button.subscribe'
                    })} | $ ${fighter.subPrice / 100}`}
                  </button>
                )}
              {!authenticated && (
                <button
                  type="button"
                  className="btn btn-danger btn-lg"
                  onClick={() => setModalIsOpen(true)}
                >
                  {fighter.support
                    ? `${intl.formatMessage({ id: 'button.support' })} | $ ${fighter.subPrice /
                        100}`
                    : `${intl.formatMessage({ id: 'button.subscribe' })} | $ ${fighter.subPrice /
                        100}`}
                </button>
              )}
            </div>
          )}
        </div>
      )}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-collapse" id="navbarText">
          {!payedFighter.includes(fighter?.id) && (
            <React.Fragment>
              <ul className="navbar-nav mr-auto">
                {fighter && payedFighter && !payedFighter.includes(fighter.id) && (
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
        </div>
      </nav>
      {!videos && (
        <FighterTeamHome
          isTeam={false}
          fighter={fighter}
          videos={fighter?.publicVideos}
          authenticated={authenticated}
          supporting={supporting}
        />
      )}
      {fighter && videos && (
        <FighterVideos
          fighter={fighter}
          supporting={supporting}
          subscribeAction={() => setModalIsOpen(true)}
          watchAction={() => setAuthModal(true)}
        />
      )}
      <div className="stars-container">
        <HomeStars
          title={intl.formatMessage({ id: 'fighter.discoverMore' })}
          selectedFighter={fighter}
        />
      </div>
      <HomeFooter />
      <ConfirmationModal
        title={intl.formatMessage({ id: 'billing.title' })}
        explain={intl.formatMessage({
          id: fighter?.support ? 'modal.header.support' : 'modal.header.explain'
        })}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        isDelete={false}
        price={fighter?.subPrice}
        email={currentUser?.email}
        fighter={fighter?.id}
      >
        <BillingForm email={currentUser?.email} fighter={fighter?.id} type="subscription" />
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
          fighterName={`${fighter?.firstName} ${fighter?.lastName}`}
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
        fighter={fighter?.id}
      >
        <BillingForm email={currentUser?.email} fighter={fighter?.id} type="ppv" />
      </ConfirmationModal>
    </div>
  );
};

export default FighterStar;
