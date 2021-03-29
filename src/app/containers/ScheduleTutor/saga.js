import { getSchedule } from 'fetchers/scheduleFetcher';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';

function* getScheduleWatcher() {
  yield takeLatest(actions.getFreeSchedule, getScheduleTask);
}

function* getScheduleTask() {
  const { response, error } = yield call(getScheduleAPI);
  if (response) {
    yield put(actions.getFreeScheduleSuccess(response));
  } else {
    yield put(actions.getFreeScheduleFailed(error));
  }
}

function getScheduleAPI() {
  return getSchedule();
}

export default function* defaultSaga() {
  yield all([fork(getScheduleWatcher)]);
}
