import httpClient from 'httpClient';

class OrganizationService {
  static getOrganizations() {
    return httpClient.get('/organizations');
  }
}

export default OrganizationService;
