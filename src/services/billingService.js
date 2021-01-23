import httpClient from 'httpClient';

class BillingService {
  static getBilling() {
    return httpClient.get(`/credit_cards`);
  }

  static updateBilling(data) {
    return httpClient.put(`/credit_cards`, data);
  }

  static saveBilling(token) {
    return httpClient.post(`/credit_cards`, token);
  }
}

export default BillingService;
