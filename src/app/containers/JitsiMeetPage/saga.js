import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { addCallSession } from 'fetchers/callSession';

function* addCallSessionWatcher() {
  yield takeLatest(actions.endCall, addCallSessionTask);
}

function* addCallSessionTask(action) {
  const { response, error } = yield call(addCallSessionAPI, action.payload);
  if (response) {
    yield put(actions.endCallSuccess(response));
  } else {
    yield put(actions.endCallFail(error.data));
  }
}

function addCallSessionAPI(payload) {
  return addCallSession(payload);
}

export default function* defaultSaga() {
  yield all([fork(addCallSessionWatcher)]);
}
