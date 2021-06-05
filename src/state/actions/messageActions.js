import { createThunk } from '@rootstrap/redux-tools';
import parseError from 'utils/parseError';
import messageService from '../../services/messageService';

export const getMessages = createThunk('GET_MESSAGES', async content => {
  try {
    const { data } = await messageService.getMessages(content);
    return data;
  } catch ({ response: data }) {
    throw parseError(data);
  }
});
