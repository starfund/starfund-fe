import React from 'react';

import ArrowDown from '../assets/ArrowDown.svg';
import './index.css';

const FAQS = () => {
  return (
    <div className="faqs-container">
      <div className="container">
        <div className="row">
          <div className="col-md-7 offset-md-3">
            <h2 className="offset-md-2"> Frequently Asked Questions </h2>
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
                    <p> What is Starfund? </p>
                  </h5>
                </div>
                <br />
                <div
                  id="collapseOne"
                  className="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div className="card-body">
                    Starfund is a place where athletes create exclusive content, products and
                    surprises for their fans. Fans can become an active participant in the work of
                    their favorite athletes, in the monthly membership form.
                  </div>
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
                    <p> How does it work? </p>
                  </h5>
                </div>
                <div
                  id="collapseTwo"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#accordion"
                >
                  <div className="card-body">
                    Starfund powers membership business for athletes by giving them the tools they
                    need to acquire, manage and energize their paying fans, with a
                    subscription-style payment model, fans pay their favorite athletes a monthly
                    amount of their choice in exchange for exclusive, extra content or a closer look
                    into their athletic life.
                    <br />
                    Pick Your Favorite Fighter
                    <br />
                    Pick The Amount
                    <br />
                    Enjoy Exclusive Access
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
                    <p>What is included in a Starfund membership?</p>
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
                    <p> How do I cancel? </p>
                  </h5>
                </div>

                <div
                  id="collapseFour"
                  className="collapse"
                  aria-labelledby="headingFour"
                  data-parent="#accordion"
                >
                  <div className="card-body">
                    Just go to your profile and choose "Cancel" button under your subscription
                    information
                  </div>
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
