import httpClient from 'httpClient';

class UserService {
  static login(user) {
    return httpClient.post('/users/sign_in', user);
  }

  static logout() {
    return httpClient.delete('/users/sign_out');
  }

  static signUp(user) {
    return httpClient.post('/users', user);
  }

  static update(user) {
    return httpClient.put('/user', user);
  }

  static setNewbiePassword(newPassword) {
    return httpClient.post('/user/update_password', {
      password: newPassword
    });
  }
}

export default UserService;
