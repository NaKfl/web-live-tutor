import {
  getSchedule,
  getScheduleByDate,
  registerSchedule,
  unRegisterSchedule,
  getScheduleByTutorId,
} from 'fetchers/scheduleFetcher';
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

function* registerScheduleWatcher() {
  yield takeLatest(actions.registerSchedule, registerScheduleTask);
}

function* registerScheduleTask(action) {
  const { response, error } = yield call(registerScheduleAPI, action.payload);
  if (response) {
    yield put(actions.registerScheduleSuccess(response));
  } else {
    yield put(actions.registerScheduleFailed(error));
  }
}

function registerScheduleAPI(payload) {
  return registerSchedule(payload);
}

function* unRegisterScheduleWatcher() {
  yield takeLatest(actions.unRegisterSchedule, unRegisterScheduleTask);
}

function* unRegisterScheduleTask(action) {
  const { response, error } = yield call(unRegisterScheduleAPI, action.payload);
  if (response) {
    yield put(actions.unRegisterScheduleSuccess(response));
  } else {
    yield put(actions.unRegisterScheduleFailed(error));
  }
}

function unRegisterScheduleAPI(payload) {
  return unRegisterSchedule(payload);
}

export default function* defaultSaga() {
  yield all([
    fork(getScheduleWatcher),
    fork(getScheduleByTutorIdWatcher),
    fork(registerScheduleWatcher),
    fork(unRegisterScheduleWatcher),
    fork(getScheduleByDateWatcher),
  ]);
}
