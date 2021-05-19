import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { login, google, facebook } from 'fetchers/authFetcher';
import { getProfile } from 'fetchers/profileFetcher';
import { storeAuthInfo, removeAuthInfo } from 'utils/localStorageUtils';
import { ROLES } from 'utils/constants';

function* getMeWatcher() {
  yield takeLatest(actions.getMe, getMeTask);
}

function* getMeTask() {
  const { response, error } = yield call(getProfile);
  if (response) {
    yield put(actions.getMeSuccess(response));
  } else {
    yield put(actions.getMeFailed(error.data));
  }
}

function* loginWatcher() {
  yield takeLatest(actions.login, loginTask);
}

function* loginTask(action) {
  const { response, error } = yield call(loginAPI, action.payload);
  if (response) {
    response.user.currentRole = ROLES.STUDENT;
    yield call(storeAuthInfo, response);
    yield put(actions.loginSuccess(response));
  } else {
    yield put(actions.loginFailed(error.data));
  }
}

function loginAPI(payload) {
  return login(payload);
}

function* loginServiceWatcher() {
  yield takeLatest(actions.loginService, loginServiceTask);
}

function* loginServiceTask(action) {
  let receivedData = null;
  switch (action.payload.service) {
    case 'google': {
      receivedData = yield call(loginServiceGoogleAPI, action.payload.data);
      break;
    }
    case 'facebook': {
      receivedData = yield call(loginServiceFacebookAPI, action.payload.data);
      break;
    }
    default:
      break;
  }
  const { response, error } = receivedData;
  if (response) {
    response.user.currentRole = ROLES.STUDENT;
    yield call(storeAuthInfo, response);
    yield put(actions.loginServiceSuccess(response));
  } else {
    yield put(actions.loginServiceFailed(error.data));
  }
}

function loginServiceGoogleAPI(payload) {
  return google(payload);
}

function loginServiceFacebookAPI(payload) {
  return facebook(payload);
}

function* logoutWatcher() {
  yield takeLatest(actions.logout, logoutTask);
}

function* logoutTask() {
  yield call(removeAuthInfo);
  yield put(actions.logoutSuccess());
}

export default function* defaultSaga() {
  yield all([
    fork(loginWatcher),
    fork(logoutWatcher),
    fork(loginServiceWatcher),
    fork(getMeWatcher),
  ]);
}
