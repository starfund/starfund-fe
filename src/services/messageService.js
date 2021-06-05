import httpClient from 'httpClient';

class MessageService {
  static getMessages(content) {
    return httpClient.get(`/comments?content_id=${content}`);
  }
}

export default MessageService;
