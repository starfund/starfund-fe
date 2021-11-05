import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { useMediaQuery } from 'react-responsive';
import { FormattedMessage, useIntl } from 'react-intl';
import { formatTitle, formatDescription } from 'utils/translationsHelper';
import ReactPlayer from 'react-player';

import Auth from './common/Auth';
import ConfirmationModal from './common/ConfirmationModal';
import CommonModal from './common/CommonModal';
import BillingForm from './BillingForm';
import HomeExclusive from './HomeExclusive';
import PPVForm from './PPVForm';
import PlayIcon from '../assets/play_button.png';

import '../styles/components/_home-starts.scss';

const FighterTeamHome = ({ isTeam, team, fighter, authenticated, supporting, videos }) => {
  const intl = useIntl();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [activeVideo] = useState();
  const [modalPPVIsOpen, setModalPPVIsOpen] = useState(false);
  const currentUser = useSelector(state => state.session.user);
  const [PPVOpen, setPPVOpen] = useState(false);
  const language = useSelector(state => state.language.language);
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  return (
    <div className="container">
      <br />
      <br />
      <div className="main-content row">
        {isMobile && (
          <div className="col-sm-12 col-md-8">
            {(team || fighter) && (
              <LazyLoadComponent>
                <ReactPlayer
                  title="preview"
                  width="100%"
                  height="35vh"
                  url={isTeam ? team?.officialPreview : fighter?.officialPreview}
                  controls
                  config={{
                    file: {
                      attributes: {
                        onContextMenu: e => e.preventDefault(),
                        controlsList: 'nodownload'
                      }
                    }
                  }}
                />
              </LazyLoadComponent>
            )}
          </div>
        )}
        <div className="how-it-works offset-lg-1 col-sm-12 col-md-4 col-lg-3">
          {!isMobile && (
            <div className="content">
              <React.Fragment>
                <h1 className="bold">
                  {isTeam
                    ? intl.formatMessage({ id: 'team.howItWorks.title' })
                    : intl.formatMessage({ id: 'fighter.howItWorks.title' })}
                </h1>
                <br />
                <br />
                <div className="text">
                  {isTeam
                    ? intl.formatMessage({ id: 'team.howItWorks.item1' })
                    : intl.formatMessage({ id: 'fighter.howItWorks.item1' })}
                </div>
                <br />
                <br />
              </React.Fragment>
            </div>
          )}
          {authenticated &&
            supporting &&
            supporting.length > 0 &&
            (fighter || team) &&
            (!supporting.filter(s => s.fighter?.id === fighter?.id).length > 0 ||
              !supporting.filter(s => s.team?.name === team?.name).length > 0) && (
              <button
                type="button"
                className={
                  isMobile ? 'btn-mob-big btn-danger btn-lg' : 'btn-nobold btn-danger btn-lg'
                }
                onClick={() => setModalIsOpen(true)}
              >
                {isTeam
                  ? intl.formatMessage({
                      id: team?.support ? 'button.supportNow' : 'button.subscribeNow'
                    })
                  : intl.formatMessage({
                      id: fighter?.support ? 'button.supportNow' : 'button.subscribeNow'
                    })}
              </button>
            )}
          {!authenticated && (
            <button
              type="button"
              className={
                isMobile ? 'btn-mob-big btn-danger btn-lg' : 'btn-nobold btn-danger btn-lg'
              }
              onClick={() => setModalIsOpen(true)}
            >
              {isTeam
                ? intl.formatMessage({
                    id: team?.support ? 'button.supportNow' : 'button.subscribeNow'
                  })
                : intl.formatMessage({
                    id: fighter?.support ? 'button.supportNow' : 'button.subscribeNow'
                  })}
            </button>
          )}
        </div>
        {!isMobile && (
          <div className="col-sm-12 col-md-8">
            {(fighter || team) && (
              <LazyLoadComponent>
                <ReactPlayer
                  title="preview"
                  width="57vw"
                  height="52vh"
                  url={isTeam ? team.officialPreview : fighter.officialPreview}
                  controls
                  config={{
                    file: {
                      attributes: {
                        onContextMenu: e => e.preventDefault(),
                        controlsList: 'nodownload'
                      }
                    }
                  }}
                />
              </LazyLoadComponent>
            )}
          </div>
        )}
      </div>
      <br />
      <br />
      <br />
      <div className="fighter-discover">
        <center>
          <h2>
            {!isTeam ? (
              <FormattedMessage
                id="fighter.discover.videos"
                values={{ fighterName: fighter?.firstName }}
              />
            ) : (
              <FormattedMessage id="team.discover.videos" values={{ teamName: team?.name }} />
            )}
          </h2>
          <br />
          <div className="discover-videos row">
            {videos &&
              videos
                .filter(c => !!c.video)
                .slice(0, 2)
                .map(v => (
                  <div className="col-12 col-md-6 d-video">
                    <div
                      onClick={() => setModalIsOpen(true)}
                      className={
                        isMobile
                          ? cn('video-description-mobile', {
                              selected: activeVideo === v.id
                            })
                          : cn('video-description', {
                              selected: activeVideo === v.id
                            })
                      }
                    >
                      <LazyLoadComponent>
                        <img
                          src={PlayIcon}
                          alt=""
                          className={isMobile ? 'play-icon-mobile' : 'play-icon'}
                        />
                        <ReactPlayer
                          title="preview"
                          height={isMobile ? '30vh' : '345px'}
                          width={!isMobile ? '40vw' : '82vw'}
                          url={v.video}
                          onClick={() => setModalIsOpen(true)}
                          config={{
                            file: {
                              attributes: {
                                onContextMenu: e => e.preventDefault(),
                                controlsList: 'nodownload'
                              }
                            }
                          }}
                        />
                      </LazyLoadComponent>
                      <h4>{formatTitle(v, language)}</h4>
                      <p>{formatDescription(v, language)}</p>
                    </div>
                  </div>
                ))}
          </div>
          <br />
          <button
            type="button"
            className={isMobile ? 'btn-mob-big btn-danger btn-lg' : 'btn btn-danger btn-lg'}
            onClick={() => setModalIsOpen(true)}
            style={{ width: 'fit-content', padding: '5px 15px' }}
          >
            {isTeam
              ? intl.formatMessage({ id: 'team.discover.cta' })
              : intl.formatMessage({ id: 'fighter.discover.cta' })}
          </button>
        </center>
        <br />
      </div>
      {!isTeam &&
        authenticated &&
        supporting &&
        supporting.length > 0 &&
        fighter &&
        !supporting.filter(s => s.fighter?.id === fighter?.id).length > 0 && (
          <div className="container">
            <HomeExclusive fighter={fighter} isTeam={false} />
          </div>
        )}

      {isTeam && (
        <div>
          <ConfirmationModal
            title={intl.formatMessage({ id: 'billing.title' })}
            explain={intl.formatMessage({ id: 'modal.header.explain' })}
            isOpen={modalIsOpen}
            setIsOpen={setModalIsOpen}
            isDelete={false}
            price={team?.subPrice}
            email={currentUser?.email}
          >
            <BillingForm email={currentUser?.email} team={team?.id} type="subscription" />
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
      )}

      {!isTeam && (
        <div>
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
      )}
    </div>
  );
};

export default FighterTeamHome;
