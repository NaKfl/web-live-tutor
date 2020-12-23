import { WEB_API } from 'configs';
import request, { handleGeneralError } from './index';

export const getList = ({ page = 1, perPage = 20 }) => {
  return request(WEB_API, {
    url: 'tutor',
    method: 'GET',
    params: {
      page,
      perPage,
    },
  })
    .then(res => res.data)
    .then(data => {
      return { response: data };
    })
    .catch(handleGeneralError);
};
