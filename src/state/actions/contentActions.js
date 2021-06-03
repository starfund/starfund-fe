import { createThunk } from '@rootstrap/redux-tools';
import parseError from 'utils/parseError';
import contentService from '../../services/contentService';

export const getContent = createThunk('GET_CONTENT', async () => {
  try {
    const { data } = await contentService.getContent();
    return data;
  } catch ({ response: data }) {
    throw parseError(data);
  }
});

export const increaseLikes = createThunk('INCREASE_LIKES', async content => {
  try {
    const { data } = await contentService.increaseLikes(content.id);
    return data;
  } catch ({ response: data }) {
    throw parseError(data);
  }
});

export const decreaseLikes = createThunk('DECREASE_LIKES', async content => {
  try {
    const { data } = await contentService.decreaseLikes(content.id);
    return data;
  } catch ({ response: data }) {
    throw parseError(data);
  }
});
