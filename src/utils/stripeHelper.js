export const stripeKey = () => {
  const uri = window.location.href;
  if (uri.toLowerCase().indexOf('cagezilla') > -1) {
    return process.env.CAGEZILLA_STRIPE;
  }
  return process.env.STRIPE_API_KEY;
};
