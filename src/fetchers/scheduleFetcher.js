import { WEB_API as BASE_URL } from 'configs';
import request, { handleGeneralError } from './index';

export const getSchedule = () => {
  return request(BASE_URL, {
    url: `/schedule`,
    method: 'POST',
  })
    .then(response => response.data)
    .then(({ data }) => ({ response: data }))
    .catch(handleGeneralError);
};

export const getScheduleByTutorId = payload => {
  return request(BASE_URL, {
    url: `/schedule`,
    method: 'POST',
    data: payload,
  })
    .then(response => response.data)
    .then(({ data }) => ({ response: data }))
    .catch(handleGeneralError);
};

export const getScheduleByDate = payload => {
  return request(BASE_URL, {
    url: `/schedule?date=${payload.date}`,
    method: 'POST',
    data: {
      tutorId: payload.tutorId,
    },
  })
    .then(response => response.data)
    .then(({ data }) => ({ response: data }))
    .catch(handleGeneralError);
};

export const registerSchedule = payload => {
  return request(BASE_URL, {
    url: '/schedule/register',
    method: 'POST',
    data: payload,
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const unRegisterSchedule = id => {
  return request(BASE_URL, {
    url: `/schedule/${id}`,
    method: 'DELETE',
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const getDetailSchedule = id => {
  return request(BASE_URL, {
    url: `/schedule/${id}`,
    method: 'GET',
  })
    .then(response => response.data)
    .then(({ data }) => ({ response: data }))
    .catch(handleGeneralError);
};

export const bookTimeSchedule = payload => {
  return request(BASE_URL, {
    url: '/booking',
    method: 'POST',
    data: payload,
  })
    .then(response => response.data)
    .then(({ data }) => ({ response: data }))
    .catch(handleGeneralError);
};

export const getBookingList = ({ page = 1, perPage = 10 }) => {
  return request(BASE_URL, {
    url: '/booking',
    method: 'GET',
    params: {
      page,
      perPage,
    },
  })
    .then(response => response.data)
    .then(({ data }) => ({ response: data }))
    .catch(handleGeneralError);
};

export const cancelBookTimeSchedule = payload => {
  return request(BASE_URL, {
    url: '/booking',
    method: 'DELETE',
    data: payload,
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};
