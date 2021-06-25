import httpClient from 'httpClient';

class BusinessService {
  static getBusinesses() {
    return httpClient.get('/businesses');
  }
}

export default BusinessService;
