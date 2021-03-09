import React from 'react';

import ArrowDown from '../assets/ArrowDown.svg';
import './index.css';

const FAQS = () => {
  return (
    <div className="faqs-container">
      <div className="container">
        <div className="row">
          <div className="col-md-7 offset-md-4">
            <h2> Frequently Asked Questions </h2>
            <br />
            <div id="accordion">
              <div className="card text-white bg-dark">
                <div className="card-header" id="headingOne">
                  <h5 className="flex mb-0">
                    <p> What is Starfund? </p>
                    <button
                      className="btn btn-link"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                      style={{ background: `url(${ArrowDown})` }}
                    />
                  </h5>
                </div>

                <div
                  id="collapseOne"
                  className="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div className="card-body">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                    richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
                    brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
                    sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
                    shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson
                    cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                    Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt
                    you probably haven't heard of them accusamus labore sustainable VHS.
                  </div>
                </div>
              </div>
              <div className="card text-white bg-dark">
                <div className="card-header" id="headingTwo">
                  <h5 className="mb-0">
                    <p> How does it work? </p>
                    <button
                      className="btn btn-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      type="button"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                      style={{ background: `url(${ArrowDown})` }}
                    />
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
                    need to manage and energize their paying fans, with a subscription-style payment
                    model, fans pay their favorite athletes a monthly amount of their choice in
                    exchange for exclusive, extra content, or a closer look into their athletic
                    life.
                    <br />
                    Pick Your Favorite Fighter
                    <br />
                    Pick The Amount
                    <br />
                    Enjoy Exclusive Access
                  </div>
                </div>
              </div>
              <div className="card text-white bg-dark">
                <div className="card-header" id="headingThree">
                  <h5 className="mb-0">
                    <p>What is included in a Starfund membership?</p>
                    <button
                      className="btn btn-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseThree"
                      aria-expanded="false"
                      type="button"
                      aria-controls="collapseThree"
                      style={{ background: `url(${ArrowDown})` }}
                    />
                  </h5>
                </div>
                <div
                  id="collapseThree"
                  className="collapse"
                  aria-labelledby="headingThree"
                  data-parent="#accordion"
                >
                  <div className="card-body">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                    richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
                    brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
                    sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
                    shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson
                    cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                    Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt
                    you probably haven't heard of them accusamus labore sustainable VHS.
                  </div>
                </div>
              </div>
              <div className="card text-white bg-dark">
                <div className="card-header" id="headingFour">
                  <h5 className="mb-0">
                    <p> How do I cancel? </p>
                    <button
                      className="btn btn-link"
                      data-toggle="collapse"
                      data-target="#collapseFour"
                      type="button"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                      style={{ background: `url(${ArrowDown})` }}
                    />
                  </h5>
                </div>

                <div
                  id="collapseFour"
                  className="collapse"
                  aria-labelledby="headingFour"
                  data-parent="#accordion"
                >
                  <div className="card-body">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                    richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
                    brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
                    sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
                    shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson
                    cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                    Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt
                    you probably haven't heard of them accusamus labore sustainable VHS.
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
