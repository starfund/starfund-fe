import queryString from 'query-string';
import isEmpty from 'lodash/isEmpty';

export const parseInputErrors = error => {
  if (!error) {
    return;
  }
  if (Array.isArray(error)) {
    return error[0];
  }
  return error;
};

export const applyQueryParams = (url, params = {}) => {
  if (isEmpty(params)) {
    return url;
  }
  const queryParams = queryString.stringify(params);
  return `${url}?${queryParams}`;
};

export const deepen = object => {
  const result = {};

  Object.keys(object).forEach(k => {
    let t = result;
    const parts = k.split('.');
    const key = parts.pop();
    while (parts.length) {
      const part = parts.shift();
      t[part] = t[part] || {};
      t = t[part];
    }
    t[key] = object[k];
  });

  return result;
};

export const getErrors = (error, errors, renames = {}) => {
  let errorsResult = {};

  if (typeof errors === 'object') {
    const existingKeys = Object.keys(errors);
    existingKeys.map(key => {
      const value = errors[key];
      const keys = key.split('.');
      const isNested = keys.length > 1;
      const nestedKey = keys
        .slice(0, -1)
        .map(key => `${key}Attributes`)
        .join('.');
      const renamedKey = renames[key];
      errorsResult[isNested ? `${nestedKey}.${keys[keys.length - 1]}` : renamedKey || key] = value;
    });
    errorsResult = deepen(errorsResult);
  } else {
    errorsResult = { _error: errors || error };
  }
  return errorsResult;
};
