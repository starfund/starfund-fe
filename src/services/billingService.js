import httpClient from 'httpClient';

class BillingService {
  static getBilling() {
    return httpClient.get(`/credit_cards`);
  }

  static updateBilling(data) {
    return httpClient.put(`/credit_cards`, data);
  }

  static deleteCard() {
    return httpClient.delete('/credit_cards');
  }

  static saveBilling(token, card) {
    return httpClient.post(`/credit_cards`, { ...token, ...card });
  }
}

export default BillingService;
