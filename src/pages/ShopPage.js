import React from 'react';
import { useIntl } from 'react-intl';

const ShopPage = () => {
  const intl = useIntl();
  return (
    <div className="shop-container">
      <p>{intl.formatMessage({ id: 'comingSoon' })}</p>
    </div>
  );
};

export default ShopPage;
