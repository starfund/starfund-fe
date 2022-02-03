import React, { useState, useRef } from 'react';

import { useMediaQuery } from 'react-responsive';
import { useIntl } from 'react-intl';
import { sendForm } from '@emailjs/browser';

const EnrollOrganization = () => {
  const intl = useIntl();
  const form = useRef();
  const [notesLenght, setNotesLenght] = useState(0);
  const countries = ['a', 'b', 'c'];
  const isMobile = useMediaQuery({
    query: '(max-width: 1024px)'
  });

  const handleSubmit = e => {
    const ApiKey = {
      USER_ID: 'user_MmACYI6HiOcEkTdwI8iHi',
      SERVICE_ID: 'service_1k96rhn',
      TEMPLATE_ID: `template_7vhykod`
    };
    e.preventDefault();
    sendForm(ApiKey.SERVICE_ID, ApiKey.TEMPLATE_ID, form.current, ApiKey.USER_ID).then(
      result => {
        alert('Message Sent, We will get back to you shortly', result.text);
      },
      error => {
        alert('An error occurred, Please try again', error.text);
      }
    );
  };

  return (
    <div className="form-card">
      <form ref={form} onSubmit={e => handleSubmit(e)}>
        {!isMobile && <br />}
        {!isMobile && <br />}
        <br />
        <div className="form-card-title">
          {intl.formatMessage({ id: 'enroll.organization.title' })}
        </div>
        <br />
        <div className="card-description">
          {intl.formatMessage({ id: 'enroll.organization.description' })}
        </div>
        <br />
        <div>
          <label htmlFor="name">{intl.formatMessage({ id: 'enroll.name' })}</label>
          <br />
          <input
            id="name"
            name="name"
            type="text"
            placeholder={intl.formatMessage({ id: 'enroll.name.placeholder' })}
          />
        </div>
        <br />
        <div>
          <label htmlFor="companyname">{intl.formatMessage({ id: 'enroll.companyname' })}</label>
          <br />
          <input
            id="companyname"
            name="companyname"
            type="text"
            placeholder={intl.formatMessage({ id: 'enroll.companyname.placeholder' })}
          />
        </div>
        <br />
        <div>
          <label htmlFor="email">{intl.formatMessage({ id: 'enroll.email' })}</label>
          <br />
          <input
            id="email"
            name="email"
            type="email"
            placeholder={intl.formatMessage({ id: 'enroll.email.placeholder' })}
          />
        </div>
        <br />
        <div>
          <label htmlFor="phone">{intl.formatMessage({ id: 'enroll.phonenumber' })}</label>
          <br />
          <input
            id="phone"
            name="phone"
            placeholder={intl.formatMessage({ id: 'enroll.phonenumber.placeholder' })}
          />
        </div>
        <br />
        <div>
          <label htmlFor="social">{intl.formatMessage({ id: 'enroll.companyinstagram' })}</label>
          <br />
          <input
            id="social"
            name="social"
            type="text"
            placeholder={intl.formatMessage({ id: 'enroll.companyinstagram.placeholder' })}
          />
        </div>
        <br />
        <div>
          <label htmlFor="country">{intl.formatMessage({ id: 'enroll.country' })}</label>
          <br />
          <select name="country" id="country">
            <option value="" disabled selected>
              {intl.formatMessage({ id: 'enroll.selectCountry' })}
            </option>
            {countries.map(c => (
              <option>{c?.name}</option>
            ))}
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="notes">{intl.formatMessage({ id: 'enroll.other' })}</label>
          <br />
          <textarea
            id="notes"
            name="notes"
            maxLength="300"
            onChange={e => setNotesLenght(e.target.value.length)}
          />
          <div className="character-count">{`${notesLenght}/300`}</div>
        </div>
        <br />
        <div className="form-card-footer">{intl.formatMessage({ id: 'enroll.note' })}</div>
        <br />
        <button type="submit">{intl.formatMessage({ id: 'enroll.submit' })}</button>
        <br />
        {!isMobile && <br />}
        {!isMobile && <br />}
      </form>
    </div>
  );
};

export default EnrollOrganization;
