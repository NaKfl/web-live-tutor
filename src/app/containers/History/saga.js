import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { getCallSession } from 'fetchers/callSession';

function getCallSessionHistoryAPI(payload) {
  return getCallSession(payload);
}

function* getHistoryWatcher() {
  yield takeLatest(actions.fetchHistory, fetchListTask);
}

function* fetchListTask(action) {
  const { response, error } = yield call(
    getCallSessionHistoryAPI,
    action.payload || { page: 1, perPage: 10 },
  );
  if (response) {
    yield put(actions.fetchHistorySuccess(response));
  } else {
    yield put(actions.fetchHistoryFail(error));
  }
}

export default function* defaultSaga() {
  yield all([fork(getHistoryWatcher)]);
}
