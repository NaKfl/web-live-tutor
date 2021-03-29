import { WEB_API as BASE_URL } from 'configs';
import request, { handleGeneralError } from './index';

export const getSchedule = () => {
  return request(BASE_URL, {
    url: `/schedule/free-time`,
    method: 'GET',
  })
    .then(response => response.data)
    .then(({ data }) => ({ response: data }))
    .catch(handleGeneralError);
};
