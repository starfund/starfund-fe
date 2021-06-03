import httpClient from 'httpClient';

class ContentService {
  static getContent() {
    return httpClient.get('/contents');
  }

  static increaseLikes(contentId) {
    return httpClient.post(`/contents/${contentId}/like`);
  }

  static decreaseLikes(contentId) {
    return httpClient.post(`/contents/${contentId}/unlike`);
  }
}

export default ContentService;
