import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useIntl } from 'react-intl';
import { update } from '../../state/actions/userActions';

import Input from '../common/Input';

const UserInfoForm = ({ currentUser }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [phone, setPhone] = useState(currentUser?.phone);
  const [birthdate, setBirthdate] = useState(currentUser.birthdate);

  return (
    <div className="personal-info">
      <div className="blank-line" />
      <h2> YOUR INFORMATION </h2>
      <Input
        name="firstName"
        placeholder="First Name"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <Input
        name="lastName"
        placeholder="Last Name"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
      <Input
        name="phone"
        placeholder="Phone Number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />
      <Input
        name="birthdate"
        placeholder="Birthdate"
        value={birthdate}
        type="date"
        onChange={e => setBirthdate(e.target.value)}
      />
      <button
        type="button"
        className="link-button update-btn"
        onClick={() => dispatch(update({ firstName, lastName, birthdate }))}
      >
        UPDATE
      </button>
    </div>
  );
};

export default UserInfoForm;
