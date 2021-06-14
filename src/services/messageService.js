import httpClient from 'httpClient';

class MessageService {
  static getMessages(content) {
    return httpClient.get(`/comments?content_id=${content}`);
  }

  static createMessage(content, message) {
    return httpClient.post(`/contents/${content}/comments`, { message });
  }
}

export default MessageService;
