import moment from 'moment';
import isNil from 'lodash/fp/isNil';
import get from 'lodash/fp/get';
import {
  AUTH_INFO_KEY,
  TRANSACTION_TOKEN,
  PARTICIPANT_JOIN,
} from './constants';

export const storeAuthInfo = authInfo => {
  localStorage.setItem(AUTH_INFO_KEY, JSON.stringify(authInfo));
};

export const isValidAuthInfo = authInfo => {
  const expires = get('tokens.access.expires', authInfo);
  return moment(expires) >= moment();
};

export const getAuthInfo = () => {
  try {
    const authInfo = JSON.parse(localStorage.getItem(AUTH_INFO_KEY));
    if (!isNil(authInfo)) {
      return authInfo;
    }
    return null;
  } catch (error) {
    console.log('Error: ', error);
    return null;
  }
};

export const getAccessToken = () => {
  const authInfo = getAuthInfo();
  return get('tokens.access.token', authInfo, '');
};

export const getRefreshToken = () => {
  const authInfo = getAuthInfo();
  return get('tokens.refresh.token', authInfo, '');
};

export const getUser = () => {
  const authInfo = getAuthInfo();
  return get('user', authInfo) || null;
};

export const isAuthenticated = () => {
  const authInfo = getAuthInfo();
  return !isNil(authInfo);
};

export const removeAuthInfo = () => localStorage.removeItem(AUTH_INFO_KEY);

export const getDefaultLanguages = () => localStorage.getItem('i18nextLng');

export const updateUserInfo = user => {
  const authInfo = getAuthInfo();
  localStorage.setItem(AUTH_INFO_KEY, JSON.stringify({ ...authInfo, user }));
};

export const storeTransactionToken = token => {
  localStorage.setItem(TRANSACTION_TOKEN, JSON.stringify(token));
};

export const removeTransactionToken = () =>
  localStorage.removeItem(TRANSACTION_TOKEN);

export const storeParticipantJoin = value => {
  localStorage.setItem(PARTICIPANT_JOIN, JSON.stringify(value));
};

export const removeParticipantJoin = () =>
  localStorage.removeItem(PARTICIPANT_JOIN);

export const getValueParticipantJoin = () => {
  try {
    const value = JSON.parse(localStorage.getItem(PARTICIPANT_JOIN));
    if (!isNil(value)) {
      return value;
    }
    return null;
  } catch (error) {
    console.log('Error: ', error);
    return null;
  }
};
export const getTransactionToken = () => {
  try {
    const transactionToken = JSON.parse(
      localStorage.getItem(TRANSACTION_TOKEN),
    );
    if (!isNil(transactionToken)) {
      return transactionToken;
    }
    return null;
  } catch (error) {
    console.log('Error: ', error);
    return null;
  }
};
