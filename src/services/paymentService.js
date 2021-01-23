import httpClient from 'httpClient';

class PaymentService {
  static getPayments() {
    return httpClient.get(`/payments`);
  }

  static donate(amount) {
    return httpClient.post(`/payments`, amount);
  }
}

export default PaymentService;
