import httpClient from 'httpClient';
import axios from 'axios';

class UserService {
  static login(user) {
    return httpClient.post('/users/sign_in', user);
  }

  static forgotPass(user) {
    return httpClient.post('/users/password', {
      email: user.user.email,
      redirect_url: process.env.RESET_PASSWORD_URL
    });
  }

  static resetPass(user, headers) {
    return axios.put(
      '/users/password',
      { password: user.user.password, password_confirmation: user.user.confirmPassword },
      {
        baseURL: process.env.API_URL,
        headers: {
          Accept: 'application/json',
          client: headers.client,
          uid: headers.uid,
          'access-token': headers.token,
          'Content-Type': 'application/json'
        }
      }
    );
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
