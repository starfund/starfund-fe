import React from 'react';

import { useIntl, FormattedMessage } from 'react-intl';

const PaymentMode = ({
  onDemandPrice,
  MonthlyPrice,
  selectOptionPPV,
  selectOptionMonthly,
  selectOptionYearly,
  payed,
  payedPPV,
  yearlyDiscount,
  event
}) => {
  const intl = useIntl();

  const months = [
    'jan.long',
    'feb.long',
    'mar.long',
    'apr.long',
    'may.long',
    'jun.long',
    'jul.long',
    'aug.long',
    'sep.long',
    'oct.long',
    'nov.long',
    'dec.long'
  ];

  function EventDate(d) {
    const date = new Date(d);
    return `${intl.formatMessage({
      id: `organization.months.${months[date?.getMonth()]}`
    })} ${date?.getDate()}, ${date.getFullYear()}`;
  }
  return (
    <div className="pricing">
      {!payedPPV && (
        <div className="box" onClick={() => selectOptionPPV()}>
          <div className="payment-on-demand">
            {event?.finnished ? (
              <FormattedMessage id="payment.ondemand.rewatch" values={{ eventName: event?.name }} />
            ) : (
              <FormattedMessage id="payment.ondemand" values={{ eventName: event?.name }} />
            )}
          </div>
          <div className="price">
            <sup>$</sup>
            {onDemandPrice / 100}
          </div>
          <div className="services">{intl.formatMessage({ id: 'payment.service1' })}</div>
          {!event?.finished ? (
            <div className="services">
              {intl.formatMessage({ id: 'payment.service1.date' })}{' '}
              {+' ' + EventDate(event?.eventDate)}
            </div>
          ) : (
            <div className="services">
              {intl.formatMessage({ id: 'payment.service1.replaydate' })}{' '}
              {+' ' + EventDate(event?.eventDate)}
            </div>
          )}
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
