import { WEB_API } from 'configs';
import request, { handleGeneralError } from './index';

export const addCallSession = payload => {
  return request(WEB_API, {
    url: 'call/save',
    method: 'POST',
    data: {
      ...payload,
    },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const getCallSession = ({ page = 1, perPage = 10, isTutor = false }) => {
  return request(WEB_API, {
    url: 'call/history',
    method: 'GET',
    params: {
      page,
      perPage,
      isTutor,
    },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};
