import { createThunk } from '@rootstrap/redux-tools';
import parseError from 'utils/parseError';
import messageService from '../../services/messageService';

export const getMessages = createThunk('GET_MESSAGES', async content => {
  try {
    const { data } = await messageService.getMessages(content.id);
    return data;
  } catch ({ response: data }) {
    throw parseError(data);
  }
});

export const createMessage = createThunk('CREATE_MESSAGE', async ({ content, message }) => {
  try {
    const { data } = await messageService.createMessage(content, message);
    return data;
  } catch ({ response: data }) {
    throw parseError(data);
  }
});

export const newMessage = createThunk('NEW_MESSAGE', async message => {
  return message;
});
