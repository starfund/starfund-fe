import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import { useMediaQuery } from 'react-responsive';
import { FormattedMessage, useIntl } from 'react-intl';
import ReactPlayer from 'react-player';

import Auth from './common/Auth';
import ConfirmationModal from './common/ConfirmationModal';
import CommonModal from './common/CommonModal';
import BillingForm from './BillingForm';
import HomeExclusive from './HomeExclusive';
import PPVForm from './PPVForm';

import ArrowDown from '../assets/ArrowDown.svg';
import Email from '../assets/Email.svg';
import Pin from '../assets/Pin.svg';
import VideoCamera from '../assets/VideoCamera.svg';

import '../styles/components/_home-starts.scss';

const FighterTeamHome = ({ isTeam, team, fighter, authenticated, supporting, videos }) => {
  const intl = useIntl();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [modalPPVIsOpen, setModalPPVIsOpen] = useState(false);
  const currentUser = useSelector(state => state.session.user);
  const [PPVOpen, setPPVOpen] = useState(false);
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  return (
    <div className="container">
      <div className="main-content row">
        {isMobile && (
          <div className="col-sm-12 col-md-8">
            {(team || fighter) && (
              <LazyLoadComponent>
                <ReactPlayer
                  title="preview"
                  width="100%"
                  height="80%"
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
                <div className="text">
                  <p>
                    {isTeam
                      ? intl.formatMessage({ id: 'team.howItWorks.item1' })
                      : intl.formatMessage({ id: 'fighter.howItWorks.item1' })}
                  </p>
                </div>
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
                className="btn btn-danger btn-lg"
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
              className="btn btn-danger btn-lg"
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
                  width="100%"
                  height="90%"
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
      {isMobile && (
        <div className="content">
          <div id="accordion">
            <div className="card text-white bg-dark">
              <div className="card-header" id="headingOne">
                <h5 className="mb-0 flex">
                  <p className="bold width-90">
                    {isTeam
                      ? intl.formatMessage({ id: 'team.howItWorks.title' })
                      : intl.formatMessage({ id: 'fighter.howItWorks.title' })}
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
                    <p>
                      {isTeam
                        ? intl.formatMessage({ id: 'team.howItWorks.item1' })
                        : intl.formatMessage({ id: 'fighter.howItWorks.item1' })}
                    </p>
                  </div>
                  <br />
                  <br />
                  <div className="text">
                    <LazyLoadImage src={Pin} alt="bpj" />
                    <p>
                      {isTeam
                        ? intl.formatMessage({ id: 'team.howItWorks.item2' })
                        : intl.formatMessage({ id: 'fighter.howItWorks.item2' })}
                    </p>
                  </div>
                  <br />
                  <br />
                  <div className="text">
                    <LazyLoadImage src={Email} alt="cwm" />
                    <p>
                      {isTeam
                        ? intl.formatMessage({ id: 'team.howItWorks.item3' })
                        : intl.formatMessage({ id: 'fighter.howItWorks.item3' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
          </div>
        </div>
      )}
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
                    <LazyLoadComponent>
                      <ReactPlayer
                        title="preview"
                        height="250px"
                        width="inherit"
                        url={v.video}
                        style={{ margin: '0 20px' }}
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
                  </div>
                ))}
          </div>
          <br />
          <button
            type="button"
            className="btn btn-danger btn-lg"
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
