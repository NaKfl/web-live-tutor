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

export const getTopTutor = () => {
  return request(WEB_API, {
    // url: 'tutor/rank/20',
    url: 'tutor',
    method: 'GET',
  })
    .then(res => res.data)
    .then(data => {
      return { response: data };
    })
    .catch(handleGeneralError);
};

export const reviewTutor = ({ tutorId, rating, content }) => {
  return request(WEB_API, {
    url: 'user/feedbackTutor',
    method: 'POST',
    data: { tutorId, rating, content },
  })
    .then(response => response.data)
    .then(({ data }) => ({ response: data }))
    .catch(handleGeneralError);
};

export const getTutorById = ({ tutorId }) => {
  return request(WEB_API, {
    url: `/tutor/${tutorId}`,
    method: 'GET',
  })
    .then(response => response.data)
    .catch(handleGeneralError);
};
