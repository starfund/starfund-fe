import React from 'react';

import { useIntl } from 'react-intl';

const PaymentMode = ({
  onDemandPrice,
  MonthlyPrice,
  selectOptionPPV,
  selectOptionMonthly,
  selectOptionYearly
}) => {
  const intl = useIntl();
  return (
    <div className="pricing">
      <div className="box" onClick={() => selectOptionPPV()}>
        <div className="payment-on-demand">{intl.formatMessage({ id: 'payment.ondemand' })}</div>
        <div className="price">
          <sup>$</sup>
          {onDemandPrice / 100}
        </div>
        <div className="services">{intl.formatMessage({ id: 'payment.service1' })}</div>
      </div>
      <div className="box" onClick={() => selectOptionMonthly()}>
        <div className="payment-monthly">{intl.formatMessage({ id: 'payment.monthly' })}</div>
        <div className="price">
          <sup>$</sup>
          {MonthlyPrice / 100}
        </div>
        <div className="services">
          {intl.formatMessage({ id: 'payment.service1' })}
          <br />
          {intl.formatMessage({ id: 'payment.service2' })}
        </div>
      </div>
      <div className="box" onClick={() => selectOptionYearly()}>
        <span className="featured">{intl.formatMessage({ id: 'payment.featured' })}</span>
        <div className="payment-yearly">{intl.formatMessage({ id: 'payment.yearly' })}</div>
        <div className="price">
          <div className="discount-percentage">
            <div className="discount">$ {(MonthlyPrice * 12) / 100}</div>
            20% OFF
          </div>
          <sup>$</sup>
          {(MonthlyPrice * 12 * 0.8) / 100}
        </div>
        <div className="services">
          {intl.formatMessage({ id: 'payment.service1' })}
          <br />
          {intl.formatMessage({ id: 'payment.service2' })}
        </div>
      </div>
    </div>
  );
};

export default PaymentMode;