import axios from 'axios';
import isNil from 'lodash/fp/isNil';
import get from 'lodash/fp/get';
import { getAccessToken } from 'utils/localStorageUtils';
import { notifyError } from 'utils/notify';
import i18n from 'locales/i18n';
import { errorCode } from 'utils/constants';
import { actions } from 'app/containers/Login/slice';
import { store } from '../index';

const createClient = (baseURL, isMultipart = 0) => {
  if (!isMultipart) {
    return axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : '',
      },
    });
  } else {
    return axios.create({
      baseURL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : '',
      },
    });
  }
};

const request = (baseURL, options, isMultipart) => {
  const onSuccess = response => response;
  const onError = error => Promise.reject(error.response || error.message);
  const client = createClient(baseURL, isMultipart);
  return client(options).then(onSuccess).catch(onError);
};

export const handleGeneralError = error => {
  handleShowError(error);
  if (!isNil(error.response)) {
    return {
      error: error.response
        .clone()
        // json() method returns a promise that resolves with the result as JSON
        .json()
        .catch(() => error.response.text())
        .then(objData => ({
          error: { ...objData, status: error.response.status },
        })),
    };
  }
  return { error };
};

const handleShowError = error => {
  const message = get('data.message', error);
  const statusCode = get('data.statusCode', error);
  if (statusCode === 21 || statusCode === 1) {
    store.dispatch(actions.logout());
    return;
  }
  const messaseShow =
    i18n.t(`Error_code.${errorCode[statusCode]}`) + ` (code: ${statusCode})`;
  if (statusCode && errorCode[statusCode] && message) notifyError(messaseShow);
};

export default request;
