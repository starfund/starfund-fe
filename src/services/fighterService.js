import httpClient from 'httpClient';

class FighterService {
  static getFighters(withContent) {
    return httpClient.get(`/fighters?with_content=${withContent}`);
  }
}

export default FighterService;
