import { WEB_API as BASE_URL } from 'configs';
import request, { handleGeneralError } from './index';

export const depositToAccount = payload => {
  return request(BASE_URL, {
    url: `/payment/deposit`,
    method: 'POST',
    data: payload,
  })
    .then(response => response.data)
    .then(({ data }) => ({ response: data }))
    .catch(handleGeneralError);
};

export const priceOneOfSession = () => {
  return request(BASE_URL, {
    url: '/payment/price-of-session',
    method: 'GET',
  })
    .then(({ data }) => ({ response: data }))
    .catch(handleGeneralError);
};

export const getListBanksVN = () => {
  return request(BASE_URL, {
    url: 'payment/banks',
    method: 'GET',
  })
    .then(response => response.data)
    .then(({ data }) => data)
    .catch(handleGeneralError);
};

export const verifyDeposit = () => {
  return request(BASE_URL, {
    url: 'payment/banks',
    method: 'GET',
  })
    .then(response => response.data)
    .then(({ data }) => ({ response: data }))
    .catch(handleGeneralError);
};
