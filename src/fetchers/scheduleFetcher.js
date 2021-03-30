import { WEB_API as BASE_URL } from 'configs';
import request, { handleGeneralError } from './index';

export const getSchedule = () => {
  return request(BASE_URL, {
    url: `/schedule`,
    method: 'GET',
  })
    .then(response => response.data)
    .then(({ data }) => ({ response: data }))
    .catch(handleGeneralError);
};

export const getScheduleByDate = date => {
  return request(BASE_URL, {
    url: `/schedule?date=${date}`,
    method: 'GET',
  })
    .then(response => response.data)
    .then(({ data }) => ({ response: data }))
    .catch(handleGeneralError);
};

export const registerSchedule = payload => {
  return request(BASE_URL, {
    url: '/schedule',
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
