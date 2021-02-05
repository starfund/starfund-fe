import React from 'react';

const HomeInfo = () => {
  return (
    <div className="info-container">
      <h1> WHAT`S STARFUND? </h1>
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
            <h3> STEP 1 </h3>
            <h2> Pick Your Favorite Fighter </h2>
            <h5> Let them know that, they are not alone and you got their back. </h5>
          </div>
          <div className="step2">
            <h3> STEP 2 </h3>
            <h2> Pick The Amount </h2>
            <h5> Pick the existing membership of your favorite fighter. </h5>
          </div>
          <div className="step3">
            <h3> STEP 3 </h3>
            <h2> Enjoy Exclusive Access </h2>
            <h5> Be a part of the Journey from the Beginning Experience exclusive access. </h5>
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
