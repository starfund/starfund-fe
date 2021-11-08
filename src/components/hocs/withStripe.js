import React, { useState, useCallback } from 'react';
import { StripeProvider, Elements, injectStripe } from 'react-stripe-elements';
import { Helmet } from 'react-helmet';

import { stripeKey } from 'utils/stripeHelper';

export default component => {
  const StripedComponent = injectStripe(component);

  const WithStripe = props => {
    const [stripe, setStripe] = useState(null);
    const updateStripe = useCallback(() => {
      if (window.Stripe) {
        !stripe && setStripe(window.Stripe(stripeKey()));
      } else {
        document
          .querySelector('#stripe-js')
          .addEventListener('load', () => setStripe(window.Stripe(stripeKey())));
      }
    }, [stripe]);

    return (
      <React.Fragment>
        <Helmet onChangeClientState={updateStripe}>
          <script id="stripe-js" src="https://js.stripe.com/v3/" async />
        </Helmet>
        {stripe && (
          <StripeProvider stripe={stripe}>
            <Elements>
              <StripedComponent {...props} />
            </Elements>
          </StripeProvider>
        )}
      </React.Fragment>
    );
  };

  return WithStripe;
};
