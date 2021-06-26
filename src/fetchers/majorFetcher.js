import { WEB_API } from 'configs';
import request, { handleGeneralError } from './index';

export const getMajor = () => {
  return request(WEB_API, {
    url: '/major',
    method: 'GET',
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};
