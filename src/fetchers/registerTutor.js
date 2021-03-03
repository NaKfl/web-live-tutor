import { WEB_API } from 'configs';
import request, { handleGeneralError } from './index';

export const registerTutor = payload => {
  return request(WEB_API, {
    url: 'tutor/register',
    method: 'POST',
    data: {
      ...payload,
    },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};
