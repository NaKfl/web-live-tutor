import { WEB_API } from 'configs';
import request, { handleGeneralError } from './index';

export const getListCategory = () =>
  request(WEB_API, {
    url: 'category',
    method: 'GET',
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
