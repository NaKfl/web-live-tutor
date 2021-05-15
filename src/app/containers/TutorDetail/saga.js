import { getTutorDetail } from 'fetchers/tutor.service';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import {
  getScheduleByDate,
  getScheduleByTutorId,
  getDetailSchedule,
  bookTimeSchedule,
} from 'fetchers/scheduleFetcher';
function* getTutorDetailWatcher() {
  yield takeLatest(actions.getTutorDetail, getTutorDetailTask);
}

function* getTutorDetailTask(action) {
  const { response, error } = yield call(getTutorDetail, action.payload);
  if (response) {
    yield put(actions.getTutorDetailSuccess(response));
  } else {
    yield put(actions.getTutorDetailFailed(error.data));
  }
}

function* getScheduleByTutorIdWatcher() {
  yield takeLatest(actions.getFreeScheduleByTutorId, getScheduleByTutorIdTask);
}

function* getScheduleByTutorIdTask(action) {
  const { response, error } = yield call(
    getScheduleByTutorIdAPI,
    action.payload,
  );
  if (response) {
    yield put(actions.getFreeScheduleByTutorIdSuccess(response));
  } else {
    yield put(actions.getFreeScheduleByTutorIdFailed(error));
  }
}

function getScheduleByTutorIdAPI(payload) {
  return getScheduleByTutorId(payload);
}

function* getScheduleByDateWatcher() {
  yield takeLatest(actions.getFreeScheduleByDate, getScheduleByDateTask);
}

function* getScheduleByDateTask(action) {
  const { response, error } = yield call(getScheduleByDateAPI, action.payload);
  if (response) {
    yield put(actions.getFreeScheduleByDateSuccess(response));
  } else {
    yield put(actions.getFreeScheduleByDateFailed(error));
  }
}

function getScheduleByDateAPI(payload) {
  return getScheduleByDate(payload);
}

function* getDetailScheduleWatcher() {
  yield takeLatest(actions.getDetailSchedule, getDetailScheduleTask);
}

function* getDetailScheduleTask(action) {
  const { response, error } = yield call(getDetailScheduleAPI, action.payload);
  if (response) {
    yield put(actions.getDetailScheduleSuccess(response));
  } else {
    yield put(actions.getDetailScheduleFailed(error));
  }
}

function getDetailScheduleAPI(payload) {
  return getDetailSchedule(payload);
}

function* bookTimeScheduleWatcher() {
  yield takeLatest(actions.bookTimeSchedule, bookTimeScheduleTask);
}

function* bookTimeScheduleTask(action) {
  const { response, error } = yield call(bookTimeScheduleAPI, action.payload);
  if (response) {
    yield put(actions.bookTimeScheduleSuccess(response));
  } else {
    yield put(actions.bookTimeScheduleFailed(error));
  }
}

function bookTimeScheduleAPI(payload) {
  return bookTimeSchedule(payload);
}

export default function* defaultSaga() {
  yield all([
    fork(getTutorDetailWatcher),
    fork(getScheduleByTutorIdWatcher),
    fork(getScheduleByDateWatcher),
    fork(getDetailScheduleWatcher),
    fork(bookTimeScheduleWatcher),
  ]);
}
