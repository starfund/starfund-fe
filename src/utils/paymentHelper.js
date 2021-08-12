export const cardBrand = brand => {
  switch (brand) {
    case 'Visa':
      return 'visa';
    case 'MasterCard':
      return 'mc';
    case 'American Express':
      return 'amex';
    case 'Discover':
      return 'discover';
    default:
      return 'visa';
  }
};
