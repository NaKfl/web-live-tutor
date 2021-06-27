import { WEB_API } from 'configs';
import request, { handleGeneralError } from './index';

export const createReport = payload => {
  return request(WEB_API, {
    url: 'report',
    method: 'POST',
    data: payload,
  })
    .then(response => response.data)
    .catch(handleGeneralError);
};
