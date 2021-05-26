import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { requestRecoverPassword, resetPassword } from 'fetchers/user.service';
import { notifySuccess } from 'utils/notify';

function* submitEmailWatcher() {
  yield takeLatest(actions.submitEmail, submitEmailTask);
}

function* submitEmailTask(action) {
  const { response, error } = yield call(submitEmailAPI, action.payload);
  if (response) {
    yield put(actions.submitEmailSuccess());
  } else {
    yield put(actions.submitEmailFailed());
    console.log(error);
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
    notifySuccess('Changed password success');
  } else {
    yield put(actions.resetPasswordFailed(error));
    console.log(error);
  }
}
function resetPasswordAPI(payload) {
  return resetPassword(payload);
}
export default function* defaultSaga() {
  yield all([fork(submitEmailWatcher), fork(resetPasswordWatcher)]);
}
