import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { requestRecoverPassword, resetPassword } from 'fetchers/user.service';
import { notifySuccess } from 'utils/notify';
import i18n from 'locales/i18n';

function* submitEmailWatcher() {
  yield takeLatest(actions.submitEmail, submitEmailTask);
}

function* submitEmailTask(action) {
  const { response } = yield call(submitEmailAPI, action.payload);
  if (response) {
    yield put(actions.submitEmailSuccess());
  } else {
    yield put(actions.submitEmailFailed());
  }
}

function submitEmailAPI(email) {
  return requestRecoverPassword(email);
}

function* resetPasswordWatcher() {
  yield takeLatest(actions.resetPassword, resetPasswordTask);
}
function* resetPasswordTask(action) {
  const { response, error } = yield call(resetPasswordAPI, action.payload);
  if (response) {
    yield put(actions.resetPasswordSuccess());
    notifySuccess(i18n.t(`Notify.changePassword`));
  } else {
    yield put(actions.resetPasswordFailed(error));
  }
}
function resetPasswordAPI(payload) {
  return resetPassword(payload);
}
export default function* defaultSaga() {
  yield all([fork(submitEmailWatcher), fork(resetPasswordWatcher)]);
}
