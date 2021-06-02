import { WEB_API } from 'configs';
import request, { handleGeneralError } from './index';

export const getHistory = payload => {
  return request(WEB_API, {
    url: 'payment/history',
    method: 'GET',
    data: payload,
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const getStatistics = payload => {
  return request(WEB_API, {
    url: 'payment/statistics',
    method: 'GET',
    data: payload,
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};
