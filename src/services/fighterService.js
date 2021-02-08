import httpClient from 'httpClient';

class FighterService {
  static getFighters() {
    return httpClient.get(`/fighters`);
  }
}

export default FighterService;
