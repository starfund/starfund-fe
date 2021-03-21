import httpClient from 'httpClient';

class SubscriptionService {
  static subscribe(sub) {
    return httpClient.post('/subscriptions', sub);
  }
}

export default SubscriptionService;
