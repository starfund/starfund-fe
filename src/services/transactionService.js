import httpClient from 'httpClient';

class TransactionService {
  static requestDream(dream) {
    return httpClient.post('/petitions/dream', { dream });
  }
}

export default TransactionService;
