import httpClient from 'httpClient';

class SubscriptionService {
  static subscribe(sub) {
    return httpClient.post('/subscriptions', sub);
  }

  static userSubs() {
    return httpClient.get('/subscriptions');
  }
}

export default SubscriptionService;
