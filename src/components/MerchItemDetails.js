import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

const MerchItemDetails = ({ merchItem, addItems, close }) => {
  const intl = useIntl();
  const isMobile = useMediaQuery({
    query: '(max-width: 992px)'
  });

  const [active, setActive] = useState('');
  const [quantity, setQuantity] = useState(1);

  const Button = styled.button``;
  const ButtonToggle = styled(Button)`
    background-color: #373737;
    color: white;
    width: 30px;
    height: 25px;
    padding: 3px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500 !important;
    font-size: 15px;
    line-height: 18px;
    text-align: center;
    ${({ active }) =>
      active &&
      `
        background-color: red;
      `}
  `;
  const ButtonToggleMobile = styled(Button)`
    background-color: #373737;
    color: white;
    width: 30px;
    height: 25px;
    padding: 3px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500 !important;
    font-size: 15px;
    line-height: 18px;
    text-align: center;
    ${({ active }) =>
      active &&
      `
        background-color: red;
      `}
  `;
  const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
  `;

  const hasSizes = () => {
    return (
      merchItem?.amountXs > 0 ||
      merchItem?.amountS > 0 ||
      merchItem?.amountM > 0 ||
      merchItem?.amountL > 0 ||
      merchItem?.amountXl > 0
    );
  };

  const hasDimensions = () => {
    return merchItem?.length > 0 && merchItem.width > 0;
  };

  const addToCart = () => {
    const newItem = {
      name: merchItem?.name,
      amount: quantity,
      price: merchItem?.price
    };
    addItems(newItem);
  };

  const increase = () => {
    let maxAmount = 10;
    if (hasSizes) {
      if (active == 'XS') {
        maxAmount = merchItem?.amountXs;
      }
      if (active == 'S') {
        maxAmount = merchItem?.amountS;
      }
      if (active == 'M') {
        maxAmount = merchItem?.amountM;
      }
      if (active == 'L') {
        maxAmount = merchItem?.amountL;
      }
      if (active == 'XL') {
        maxAmount = merchItem?.amountXl;
      }
    }
    if (quantity < maxAmount) {
      setQuantity(quantity + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="merch-details-container">
      <div className="row">
        <div className="col-12 col-md-6">
          <img src={merchItem?.photo} alt="" />
        </div>
        <div className="col-12 col-md-6" style={!isMobile ? { marginLeft: '-30px' } : {}}>
          <div className="details-name">{merchItem?.name}</div>
          <div className="centered">
            <div className="details-type">
              <span style={{ fontWeight: 'bold' }}>
                {intl.formatMessage({ id: 'organization.store.cateogry' })}
              </span>
              {merchItem?.productType}
            </div>
            <div className="details-price">{merchItem?.price}$</div>
          </div>
          {hasSizes() && (
            <div className="details-sizes">
              {intl.formatMessage({ id: 'organization.store.sizes' })}
              <ButtonGroup>
                {!isMobile && merchItem?.amountXs > 0 && (
                  <ButtonToggle
                    key="XS"
                    active={active === 'XS'}
                    onClick={() => {
                      setActive('XS');
                      setQuantity(1);
                    }}
                  >
                    XS
                  </ButtonToggle>
                )}
                {!isMobile && merchItem?.amountS > 0 && (
                  <ButtonToggle
                    key="S"
                    active={active === 'S'}
                    onClick={() => {
                      setActive('S');
                      setQuantity(1);
                    }}
                  >
                    S
                  </ButtonToggle>
                )}
                {!isMobile && merchItem?.amountM > 0 && (
                  <ButtonToggle
                    key="M"
                    active={active === 'M'}
                    onClick={() => {
                      setActive('M');
                      setQuantity(1);
                    }}
                  >
                    M
                  </ButtonToggle>
                )}
                {!isMobile && merchItem?.amountL > 0 && (
                  <ButtonToggle
                    key="L"
                    active={active === 'L'}
                    onClick={() => {
                      setActive('L');
                      setQuantity(1);
                    }}
                  >
                    L
                  </ButtonToggle>
                )}
                {!isMobile && merchItem?.amountXl > 0 && (
                  <ButtonToggle
                    key="XL"
                    active={active === 'XL'}
                    onClick={() => {
                      setActive('XL');
                      setQuantity(1);
                    }}
                  >
                    XL
                  </ButtonToggle>
                )}
              </ButtonGroup>
              <ButtonGroup>
                {isMobile && merchItem?.amountXs > 0 && (
                  <ButtonToggleMobile
                    key="XS"
                    active={active === 'XS'}
                    onClick={() => {
                      setActive('XS');
                      setQuantity(1);
                    }}
                  >
                    XS
                  </ButtonToggleMobile>
                )}
                {isMobile && merchItem?.amountS > 0 && (
                  <ButtonToggleMobile
                    key="S"
                    active={active === 'S'}
                    onClick={() => {
                      setActive('S');
                      setQuantity(1);
                    }}
                  >
                    S
                  </ButtonToggleMobile>
                )}
                {isMobile && merchItem?.amountM > 0 && (
                  <ButtonToggleMobile
                    key="M"
                    active={active === 'M'}
                    onClick={() => {
                      setActive('M');
                      setQuantity(1);
                    }}
                  >
                    M
                  </ButtonToggleMobile>
                )}
                {isMobile && merchItem?.amountL > 0 && (
                  <ButtonToggleMobile
                    key="L"
                    active={active === 'L'}
                    onClick={() => {
                      setActive('L');
                      setQuantity(1);
                    }}
                  >
                    L
                  </ButtonToggleMobile>
                )}
                {isMobile && merchItem?.amountXl > 0 && (
                  <ButtonToggleMobile
                    key="XL"
                    active={active === 'XL'}
                    onClick={() => {
                      setActive('XL');
                      setQuantity(1);
                    }}
                  >
                    XL
                  </ButtonToggleMobile>
                )}
              </ButtonGroup>
            </div>
          )}
          {hasDimensions() && (
            <div className="details-dimensions">
              {intl.formatMessage({ id: 'organization.store.dimensions' })}
              <div className="dimensions">
                {merchItem?.length} x {merchItem?.width}
              </div>
            </div>
          )}
          <div className="details-quantity">
            {intl.formatMessage({ id: 'organization.store.quantity' })}
            <div className="quantity-selector">
              <button type="button" onClick={() => decrease()}>
                -
              </button>
              <input type="numeric" value={quantity} readOnly />
              <button type="button" onClick={() => increase()}>
                +
              </button>
            </div>
          </div>
          <button
            className="button-confirm"
            type="button"
            disabled={!((active != '' && hasSizes()) || !hasSizes())}
            onClick={() => {
              addToCart();
              close();
            }}
          >
            {intl.formatMessage({ id: 'organization.store.addToCart' })}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MerchItemDetails;
