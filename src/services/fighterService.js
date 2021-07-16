import httpClient from 'httpClient';

class FighterService {
  static getFighters(withContent) {
    return httpClient.get(`/fighters?with_content=${withContent}`);
  }

  static getReport() {
    return httpClient.get('/fighter_reports');
  }
}

export default FighterService;
