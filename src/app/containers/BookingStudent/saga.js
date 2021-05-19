import {
  getBookingList,
  cancelBookTimeSchedule,
} from 'fetchers/scheduleFetcher';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';

function* getBookingListWatcher() {
  yield takeLatest(actions.getBookingList, getBookingListTask);
}

function* getBookingListTask(action) {
  const { response, error } = yield call(
    getBookingListAPI,
    action.payload || { page: 1, perPage: 10 },
  );
  if (response) {
    yield put(actions.getBookingListSuccess(response));
  } else {
    yield put(actions.getBookingListFailed(error));
  }
}

function getBookingListAPI(payload) {
  return getBookingList(payload);
}

function* cancelBookScheduleWatcher() {
  yield takeLatest(actions.cancelBookSchedule, cancelBookScheduleTask);
}

function* cancelBookScheduleTask(action) {
  const { response, error } = yield call(cancelBookScheduleAPI, action.payload);
  if (response) {
    yield put(actions.cancelBookScheduleSuccess(response));
  } else {
    yield put(actions.cancelBookScheduleFailed(error));
  }
}

function cancelBookScheduleAPI(payload) {
  return cancelBookTimeSchedule(payload);
}

export default function* defaultSaga() {
  yield all([fork(getBookingListWatcher), fork(cancelBookScheduleWatcher)]);
}
