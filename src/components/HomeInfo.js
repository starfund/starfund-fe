import React from 'react';

import LoveContent from '../assets/LoveContent.jpeg';
import FightersBlack from '../assets/FightersBlack.jpeg';
import Pricing from '../assets/Pricing.jpeg';

const HomeInfo = () => {
  return (
    <div className="info-container">
      <h1> WHATS STARFUND? </h1>
      <div>
        <h4>
          {' '}
          Starfund is a place where Stars create exclusive content, products, and surprises for
          their fans. Fans can become an active participant in the work of their favorite idols, in
          the monthly membership form.{' '}
        </h4>
      </div>
      <div>
        <h1> HOW DOES IT WORK? </h1>
        <h4>
          {' '}
          Starfund powers membership business for athletes by giving them the tools they need to
          acquire manage and energize their paying fans, with a subscription-style payment model,
          fans pay their favorite athletes a monthly amount of their choice in exchange for
          exclusive, extra content, or a closer look into their athletic life.{' '}
        </h4>
        <div className="steps">
          <div className="step1">
            <div className="step-content">
              <img src={FightersBlack} alt="step1" />
              <div className="step1-text">
                <h3> STEP 1 </h3>
                <h2> Pick Your Favorite Fighter </h2>
                <h5> Let them know that, they are not alone and you got their back. </h5>
              </div>
            </div>
          </div>
          <div className="step2">
            <div className="step-content">
              <div className="step2-text">
                <h3> STEP 2 </h3>
                <h2> Pick The Amount </h2>
                <h5> Pick the existing membership of your favorite fighter. </h5>
              </div>
              <img src={Pricing} alt="step2" />
            </div>
          </div>
          <div className="step3">
            <div className="step-content">
              <img src={LoveContent} alt="step3" />
              <div className="step3-text">
                <h3> STEP 3 </h3>
                <h2> Enjoy Exclusive Access </h2>
                <h5> Be a part of the Journey from the Beginning Experience exclusive access. </h5>
              </div>
            </div>
          </div>
        </div>
        <h2> Are you ready to connect with your Stars? </h2>
        <button type="button" className="btn btn-lg btn-danger">
          GET STARTED
        </button>
      </div>
    </div>
  );
};

export default HomeInfo;
