import React from 'react';

import { useIntl } from 'react-intl';

const PaymentMode = ({
  onDemandPrice,
  MonthlyPrice,
  selectOptionPPV,
  selectOptionMonthly,
  selectOptionYearly,
  payed,
  payedPPV,
  yearlyDiscount
}) => {
  const intl = useIntl();
  return (
    <div className="pricing">
      {!payedPPV && (
        <div className="box" onClick={() => selectOptionPPV()}>
          <div className="payment-on-demand">{intl.formatMessage({ id: 'payment.ondemand' })}</div>
          <div className="price">
            <sup>$</sup>
            {onDemandPrice / 100}
          </div>
          <div className="services">{intl.formatMessage({ id: 'payment.service1' })}</div>
        </div>
      )}
      {!payed && (
        <div className="box" onClick={() => selectOptionMonthly()}>
          <div className="payment-monthly">{intl.formatMessage({ id: 'payment.monthly' })}</div>
          <div className="price">
            <sup>$</sup>
            {MonthlyPrice / 100}
          </div>
          <div className="services">{intl.formatMessage({ id: 'payment.service2' })}</div>
          <div className="services">{intl.formatMessage({ id: 'payment.service3' })}</div>
        </div>
      )}
      {!payed && (
        <div className="box" onClick={() => selectOptionYearly()}>
          <span className="featured">{intl.formatMessage({ id: 'payment.featured' })}</span>
          <div className="payment-yearly">{intl.formatMessage({ id: 'payment.yearly' })}</div>
          <div className="price">
            {yearlyDiscount && (
              <div className="discount-percentage">
                <div className="discount">$ {(MonthlyPrice * 12) / 100}</div>
                {yearlyDiscount}% OFF
              </div>
            )}
            <sup>$</sup>
            {Math.round((MonthlyPrice * 12 * ((100 - yearlyDiscount) / 100)) / 100)}
          </div>
          <div className="services">{intl.formatMessage({ id: 'payment.service4' })}</div>
        </div>
      )}
    </div>
  );
};

export default PaymentMode;
