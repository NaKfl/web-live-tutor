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
  console.log('🚀 ~ file: user.service.js ~ line 30 ~ file', file);
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
      console.log(data);
      return { response: 'ok' };
    })
    .catch(handleGeneralError);
};
