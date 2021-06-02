import { getHistory, getStatistics } from 'fetchers/walletFetcher';
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

function* getStatisticsWatcher() {
  yield takeLatest(actions.getStatistics, getStatisticsTask);
}

function* getStatisticsTask(action) {
  const { response, error } = yield call(getStatistics, action.payload);
  if (response) {
    yield put(actions.getStatisticsSuccess(response.data));
  } else {
    yield put(actions.getStatisticsFailed(error.data));
  }
}

export default function* defaultSaga() {
  yield all([fork(getHistoryWatcher), fork(getStatisticsWatcher)]);
}
