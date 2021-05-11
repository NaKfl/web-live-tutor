import { WEB_API } from 'configs';
import request, { handleGeneralError } from './index';

export const manageFavoriteTutor = tutorId => {
  return request(WEB_API, {
    url: 'user/manageFavoriteTutor',
    method: 'POST',
    data: { tutorId },
  })
    .then(res => res.data)
    .then(data => {
      return { response: data };
    })
    .catch(handleGeneralError);
};

export const getFavoriteTutorList = () => {
  return request(WEB_API, {
    url: 'user/favoriteTutor',
    method: 'GET',
  })
    .then(res => res.data)
    .then(data => {
      return { response: data };
    })
    .catch(handleGeneralError);
};

export const uploadAvatar = file => {
  const form = new FormData();
  form.set('avatar', file);
  return request(
    WEB_API,
    {
      url: 'user/uploadAvatar',
      method: 'POST',
      data: form,
    },
    1,
  )
    .then(res => {
      return res.data;
    })
    .then(data => {
      return { response: 'ok' };
    })
    .catch(handleGeneralError);
};

export const requestRecoverPassword = email => {
  return request(WEB_API, {
    url: 'user/forgotPassword',
    method: 'POST',
    data: { email },
  })
    .then(res => res.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const resetPassword = ({ email, token, password }) => {
  return request(WEB_API, {
    url: 'user/resetpassword',
    method: 'POST',
    data: {
      email,
      token,
      password,
    },
  })
    .then(res => res.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};
