import httpClient from 'httpClient';

class SubscriptionService {
  static subscribe(sub) {
    return httpClient.post('/subscriptions', sub);
  }

  static charge(sub) {
    return httpClient.post('/subscriptions/ppv', sub);
  }

  static userSubs() {
    return httpClient.get('/subscriptions');
  }

  static increaseLikes() {
    return httpClient.post('');
  }

  static decreaseLikes() {
    return httpClient.post('');
  }
}

export default SubscriptionService;
