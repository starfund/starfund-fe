import React from 'react';

const StoreCart = ({ cartItems }) => {
  function getTotal() {
    let total = 0;
    cartItems.array.forEach(i => {
      total += i?.price * i?.amount;
    });
    return total;
  }

  return (
    <div className="cart-container">
      {cartItems.length === 0 && <div className="empty-cart">Your cart is empty</div>}
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
          <span style={{ fontWeight: 'bold' }}>TOTAL:</span>
          {` ${getTotal()}$`}
        </div>
      )}
      {cartItems.length > 0 && <button type="button">Buy now</button>}
    </div>
  );
};

export default StoreCart;
