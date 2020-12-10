import { WEB_API as BASE_URL } from 'configs';
import request, { handleGeneralError } from './index';

export const login = payload => {
  return request(BASE_URL, {
    url: '/login',
    method: 'POST',
    data: {
      ...payload,
    },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const register = payload => {
  return request(BASE_URL, {
    url: '/register',
    method: 'POST',
    data: {
      ...payload,
    },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const google = payload => {
  return request(BASE_URL, {
    url: 'auth/google',
    method: 'POST',
    data: {
      access_token: payload,
    },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const facebook = payload => {
  return request(BASE_URL, {
    url: 'auth/facebook',
    method: 'POST',
    data: {
      access_token: payload,
    },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};
