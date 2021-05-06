import { WEB_API } from 'configs';
import request, { handleGeneralError } from './index';

export const getList = ({ page = 1, perPage = 20, search = 'Berry' }) => {
  let params = {
    perPage,
    page,
  };
  if (search) {
    params = {
      perPage,
      page,
      search: search,
    };
  }
  return request(WEB_API, {
    url: 'tutor',
    method: 'GET',
    params,
  })
    .then(res => res.data)
    .then(data => {
      return { response: data };
    })
    .catch(handleGeneralError);
};
