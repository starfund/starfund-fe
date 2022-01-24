import React from 'react';
import { useIntl } from 'react-intl';

const StoreCart = ({ cartItems }) => {
  const intl = useIntl();
  function getTotal() {
    let total = 0;
    cartItems.forEach(i => {
      total += i?.price * i?.amount;
    });
    return total;
  }

  return (
    <div className="cart-container">
      {cartItems.length === 0 && (
        <div className="empty-cart">
          {intl.formatMessage({ id: 'organization.store.emptycart' })}
        </div>
      )}
      {cartItems?.map(i => (
        <div className="cart-item">
          <div className="amount-name-container">
            <div className="amount">{`x${i?.amount}`}</div>
            <div className="name">{i?.name}</div>
          </div>
          <div className="price">{`${i?.amount * i?.price}$`}</div>
        </div>
      ))}
      {cartItems.length > 0 && (
        <div className="total">
          <span style={{ fontWeight: 'bold' }}>
            {intl.formatMessage({ id: 'organization.store.total' })}
          </span>
          {` ${getTotal()}$`}
        </div>
      )}
      {cartItems.length > 0 && (
        <button type="button">{intl.formatMessage({ id: 'organization.store.buy' })}</button>
      )}
    </div>
  );
};

export default StoreCart;
