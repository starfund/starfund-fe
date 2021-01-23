import React, { memo } from 'react';
import { func, string, node, object, number } from 'prop-types';
import cn from 'classnames';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      color: '#fff',
      fontFamily: 'Open Sans',
      fontSize: '16px',
      '::placeholder': {
        color: '#000'
      }
    }
  }
};

const StripeField = ({ onChange, StripeComponent, label, placeholder, error, width }) => (
  <div className="stripe" style={width ? { width: `${width}rem` } : { flex: 1 }}>
    <label className="stripe-label tag-bold">{label}</label>
    <div className={cn('stripe-field', { error })}>
      <StripeComponent options={CARD_OPTIONS} onChange={onChange} placeholder={placeholder} />
    </div>
    {error && <div className="error-message p2">{error.message}</div>}
  </div>
);

StripeField.propTypes = {
  onChange: func.isRequired,
  StripeComponent: node.isRequired,
  label: string.isRequired,
  placeholder: string,
  error: object,
  width: number
};

export default memo(StripeField);
