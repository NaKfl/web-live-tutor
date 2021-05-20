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
    url: 'tutor/more',
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
    url: 'tutor/rank/20',
    method: 'GET',
  })
    .then(res => res.data)
    .then(data => {
      return { response: data };
    })
    .catch(handleGeneralError);
};

export const reviewTutor = ({ sessionId, tutorId, rating, content }) => {
  return request(WEB_API, {
    url: 'user/feedbackTutor',
    method: 'POST',
    data: { sessionId, tutorId, rating, content },
  })
    .then(response => response.data)
    .then(({ data }) => ({ response: data }))
    .catch(handleGeneralError);
};

export const getTutorById = ({ tutorId }) => {
  return request(WEB_API, {
    url: `/tutor/${tutorId}`,
    method: 'GET',
  }).then(response => response.data);
};

export const getTutorDetail = payload => {
  return request(WEB_API, {
    url: `tutor/${payload}`,
  })
    .then(res => res.data)
    .then(data => {
      return { response: data };
    })
    .catch(handleGeneralError);
};

export const getListTutorBySearch = data => {
  const { search, perPage = 15, page = 1, ...filters } = data;
  return request(WEB_API, {
    url: 'tutor/search',
    method: 'POST',
    data: !!search
      ? { filters, search, page, perPage }
      : { filters, page, perPage },
  })
    .then(res => res.data)
    .then(data => {
      return { response: data };
    })
    .catch(handleGeneralError);
};
