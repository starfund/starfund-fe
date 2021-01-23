import React, { useState, useCallback } from 'react';
import { StripeProvider, Elements, injectStripe } from 'react-stripe-elements';
import { Helmet } from 'react-helmet';

export default component => {
  const StripedComponent = injectStripe(component);

  const WithStripe = props => {
    const [stripe, setStripe] = useState(null);
    const updateStripe = useCallback(() => {
      if (window.Stripe) {
        !stripe && setStripe(window.Stripe(process.env.STRIPE_API_KEY));
      } else {
        document
          .querySelector('#stripe-js')
          .addEventListener('load', () => setStripe(window.Stripe(process.env.STRIPE_API_KEY)));
      }
    }, [stripe]);

    return (
      <>
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
      </>
    );
  };

  return WithStripe;
};
