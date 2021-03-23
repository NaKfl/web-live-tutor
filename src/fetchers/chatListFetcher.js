import { WEB_API as BASE_URL } from 'configs';
import request, { handleGeneralError } from './index';

export const getRecentList = () => {
  return request(BASE_URL, {
    url: `message/info`,
    method: 'GET',
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};
