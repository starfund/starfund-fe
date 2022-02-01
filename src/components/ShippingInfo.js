import React, { useState } from 'react';

import { State, City } from 'country-state-city';
import { useIntl } from 'react-intl';

import Input from './common/Input';
import Button from './common/Button';

const ShippingInfo = ({ close, next }) => {
  const intl = useIntl();

  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [error, setError] = useState(false);

  const enter = () => {
    if (region == '' || city == '' || address == '' || zipCode == '') {
      setError(true);
    } else {
      const data = {
        state: region,
        city,
        address,
        zipCode
      };
      setError(false);
      next(data);
      close();
    }
  };

  return (
    <div className="row no-gutters checkout-container">
      <div className="col-12">
        {error && (
          <div className="error-message">{intl.formatMessage({ id: 'shipping.allfields' })}</div>
        )}
      </div>
      <div className="col-12">
        <select
          className="shipping-input"
          style={{ marginTop: '30px' }}
          value={region}
          onChange={e => setRegion(e.target.value)}
        >
          <option value="" disabled selected>
            State
          </option>
          {State.getStatesOfCountry('US').map(s => (
            <option value={s?.isoCode}>{s?.name}</option>
          ))}
        </select>
      </div>
      <br />
      <div className="col-12">
        <select className="shipping-input" value={city} onChange={e => setCity(e.target.value)}>
          <option value="" disabled selected>
            City
          </option>
          {City.getCitiesOfState('US', region).map(c => (
            <option value={c?.name}>{c?.name}</option>
          ))}
        </select>
      </div>
      <br />
      <div className="col-12">
        <Input
          value={address}
          onChange={e => setAddress(e.target.value)}
          className="shipping-input"
          name="Address"
          placeholder="Address"
        />
      </div>
      <br />
      <div className="col-12">
        <Input
          value={zipCode}
          onChange={e => setZipCode(e.target.value)}
          className="shipping-input"
          name="ZipCode"
          placeholder="Zip Code"
        />
      </div>
      <div className="col-12">
        <Button
          onClick={() => enter()}
          labelId="billing.shipping"
          type="submit"
          className="btn btn-primary pay-button"
        />
      </div>
    </div>
  );
};

export default ShippingInfo;
