import { getHistory } from 'fetchers/walletFetcher';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';

function* getHistoryWatcher() {
  yield takeLatest(actions.getHistory, getHistoryTask);
}

function* getHistoryTask(action) {
  const { response, error } = yield call(getHistory, action.payload);
  if (response) {
    yield put(actions.getHistorySuccess(response.data));
  } else {
    yield put(actions.getHistoryFailed(error.data));
  }
}

export default function* defaultSaga() {
  yield all([fork(getHistoryWatcher)]);
}
