import React, { useState, useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useMediaQuery } from 'react-responsive';

import ConfirmationModal from './common/ConfirmationModal';
import StoreCard from './common/StoreCard';
import MerchItemDetails from './MerchItemDetails';
import ShippingInfo from './ShippingInfo';
import BillingForm from './BillingForm';

const OrganizationStore = ({ organization, homeNav, currentUser }) => {
  const intl = useIntl();
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });
  const [searchText, setSearchText] = useState('');
  const [merchItem, setMerchItem] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [shippingInfo, setShippingInfo] = useState(false);
  const [payModal, setPayModal] = useState(false);
  const [billingInfo, setBillingInfo] = useState();
  const [amount, setAmount] = useState();
  const [size, setSize] = useState();
  const merchItems = organization?.merch;

  const filterMerch = useCallback(list => {
    if (searchText == '') {
      return list;
    }
    return list.filter(
      m =>
        m?.productType.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        m?.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
  });

  const selectMerchItem = m => {
    setMerchItem(m);
    setModalIsOpen(true);
  };

  const getBillingInfo = data => {
    setBillingInfo(data);
    setPayModal(true);
  };

  const getAmountAndSize = (a, s) => {
    setAmount(a);
    setSize(s);
    setShippingInfo(true);
  };

  return (
    <div className="store-container">
      {isMobile && (
        <div className="event-view-mobile-container">
          <div className="link-text-back" onClick={() => homeNav()}>
            {intl.formatMessage({ id: 'organization.mobile.home' })}
          </div>
        </div>
      )}
      <br />
      <br />
      <br />
      <h2>
        <FormattedMessage id="organization.store.title" values={{ orgName: organization?.name }} />
      </h2>
      <div className="events-container">
        <div className={isMobile ? 'search-bar-mobile' : 'search-bar'}>
          <div className="bar">
            <input
              id="search-bar"
              className="search-bar-input"
              type="search"
              aria-label="Search"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </div>
          <div className="search-button">
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => filterMerch(merchItems)}
            >
              <path
                d="M23.7871 22.7761L17.9548 16.9437C19.5193 15.145 20.4665 12.7982 20.4665 10.2333C20.4665 4.58714 15.8741 0 10.2333 0C4.58714 0 0 4.59246 0 10.2333C0 15.8741 4.59246 20.4665 10.2333 20.4665C12.7982 20.4665 15.145 19.5193 16.9437 17.9548L22.7761 23.7871C22.9144 23.9255 23.1007 24 23.2816 24C23.4625 24 23.6488 23.9308 23.7871 23.7871C24.0639 23.5104 24.0639 23.0528 23.7871 22.7761ZM1.43149 10.2333C1.43149 5.38004 5.38004 1.43681 10.2279 1.43681C15.0812 1.43681 19.0244 5.38537 19.0244 10.2333C19.0244 15.0812 15.0812 19.035 10.2279 19.035C5.38004 19.035 1.43149 15.0865 1.43149 10.2333Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>
          <br />
          <br />
        </div>
      </div>
      <br />
      <div className="row">
        {merchItems &&
          filterMerch(merchItems).map(m => (
            <div className="col-12 col-md-3" style={{ display: 'flex', justifyContent: 'center' }}>
              <div onClick={() => selectMerchItem(m)}>
                <StoreCard merchItem={m} />
              </div>
            </div>
          ))}
      </div>
      <ConfirmationModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} isDelete={false} noFooter>
        <MerchItemDetails
          merchItem={merchItem}
          close={() => setModalIsOpen(false)}
          nextStep={getAmountAndSize}
        />
      </ConfirmationModal>
      <ConfirmationModal
        isOpen={shippingInfo}
        setIsOpen={setShippingInfo}
        isDelete={false}
        noFooter
      >
        <ShippingInfo close={() => setShippingInfo(false)} next={getBillingInfo} />
      </ConfirmationModal>
      <ConfirmationModal
        isOpen={payModal}
        setIsOpen={setPayModal}
        isDelete={false}
        price={amount * merchItem?.price * 100}
        email={currentUser?.email}
      >
        <BillingForm
          email={currentUser?.email}
          price={amount * merchItem?.price * 100}
          type="ppv"
          merchItem={merchItem?.name}
          shippingInfo={billingInfo}
          amount={amount}
          size={size}
        />
      </ConfirmationModal>
      <br />
    </div>
  );
};

export default OrganizationStore;
