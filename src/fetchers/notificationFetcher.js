import { WEB_API as BASE_URL } from 'configs';
import request, { handleGeneralError } from './index';

export const registerToken = token => {
  return request(BASE_URL, {
    url: `notification/register`,
    method: 'POST',
    data: { token },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};
