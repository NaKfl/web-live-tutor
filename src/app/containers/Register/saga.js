import { register } from 'fetchers/authFetcher';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { notifySuccess } from 'utils/notify';
import i18n from 'locales/i18n';

function* registerWatcher() {
  yield takeLatest(actions.register, registerTask);
}

function* registerTask(action) {
  const { response, error } = yield call(registerAPI, action.payload);
  if (response) {
    yield put(actions.registerSuccess());
    notifySuccess(i18n.t('Register.notifySuccess'));
  } else {
    yield put(actions.registerFailed(error.data));
  }
}

function registerAPI(payload) {
  return register(payload);
}

export default function* defaultSaga() {
  yield all([fork(registerWatcher)]);
}
