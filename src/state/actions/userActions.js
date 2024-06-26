import { createThunk, createAction } from '@rootstrap/redux-tools';
import userService from 'services/userService';
import parseError from 'utils/parseError';

export const login = createThunk('LOGIN', async user => {
  try {
    const { data } = await userService.login({ user });
    return data.user;
  } catch ({ response: { data } }) {
    throw parseError(data);
  }
});

export const forgotPass = createThunk('FORGOT_PASS', async user => {
  try {
    await userService.forgotPass({ user });
  } catch ({ response: { data } }) {
    throw parseError(data);
  }
});

export const resetPass = createThunk('RESET_PASS', async user => {
  try {
    await userService.resetPass(
      { user },
      { client: user.client, uid: user.uid, token: user.token }
    );
  } catch ({ response: { data } }) {
    throw parseError(data);
  }
});

export const logout = createThunk('LOGOUT', async () => {
  try {
    await userService.logout();
  } catch ({ response: { data } }) {
    throw parseError(data);
  }
});

export const signUp = createThunk('SIGNUP', async user => {
  try {
    const { data } = await userService.signUp({ user });
    return data;
  } catch ({ response: { data } }) {
    throw parseError(data);
  }
});

export const update = createThunk('UPDATE', async user => {
  try {
    const { data } = await userService.update({ user });
    return data.user;
  } catch ({ response: { data } }) {
    throw parseError(data);
  }
});

export const updateSession = createAction('UPDATE_SESSION');
