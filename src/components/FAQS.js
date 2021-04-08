import React from 'react';

import { useIntl } from 'react-intl';

import ArrowDown from '../assets/ArrowDown.svg';
import './index.css';

const FAQS = () => {
  const intl = useIntl();
  return (
    <div className="faqs-container">
      <div className="container">
        <div className="row">
          <div className="col-md-7 offset-md-3">
            <h2 className="offset-md-2"> {intl.formatMessage({ id: 'faqs.title' })} </h2>
            <br />
            <div id="accordion">
              <div className="card text-white bg-dark">
                <div className="card-header" id="headingOne">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                      style={{ background: `url(${ArrowDown})` }}
                    />
                    <p> {intl.formatMessage({ id: 'faqs.q1' })} </p>
                  </h5>
                </div>
                <div
                  id="collapseOne"
                  className="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div className="card-body">{intl.formatMessage({ id: 'faqs.a1' })}</div>
                </div>
              </div>
              <br />
              <div className="card text-white bg-dark">
                <div className="card-header" id="headingTwo">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      type="button"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                      style={{ background: `url(${ArrowDown})` }}
                    />
                    <p> {intl.formatMessage({ id: 'faqs.q2' })} </p>
                  </h5>
                </div>
                <div
                  id="collapseTwo"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#accordion"
                >
                  <div className="card-body">
                    {intl.formatMessage({ id: 'faqs.a2' })}
                    <ul>
                      <li>{intl.formatMessage({ id: 'faqs.a2.item1' })}</li>
                      <li>{intl.formatMessage({ id: 'faqs.a2.item2' })}</li>
                      <li>{intl.formatMessage({ id: 'faqs.a2.item3' })}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <br />
              <div className="card text-white bg-dark">
                <div className="card-header" id="headingThree">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseThree"
                      aria-expanded="false"
                      type="button"
                      aria-controls="collapseThree"
                      style={{ background: `url(${ArrowDown})` }}
                    />
                    <p>{intl.formatMessage({ id: 'faqs.q3' })}</p>
                  </h5>
                </div>
                <div
                  id="collapseThree"
                  className="collapse"
                  aria-labelledby="headingThree"
                  data-parent="#accordion"
                >
                  <div className="card-body">
                    Access all your favorite fighters exclusive contents, behind scenes videos.
                  </div>
                </div>
              </div>
              <br />
              <div className="card text-white bg-dark">
                <div className="card-header" id="headingFour">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link"
                      data-toggle="collapse"
                      data-target="#collapseFour"
                      type="button"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                      style={{ background: `url(${ArrowDown})` }}
                    />
                    <p>{intl.formatMessage({ id: 'faqs.q4' })}</p>
                  </h5>
                </div>

                <div
                  id="collapseFour"
                  className="collapse"
                  aria-labelledby="headingFour"
                  data-parent="#accordion"
                >
                  <div className="card-body">{intl.formatMessage({ id: 'faqs.a4' })}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQS;
