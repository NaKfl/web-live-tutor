import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { getCallSession } from 'fetchers/callSession';
import { getAllFeedbacks, getFeedbackSession } from 'fetchers/user.service';

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

function* getAllFeedbacksWatcher() {
  yield takeLatest(actions.getAllFeedbacks, getAllFeedbacksTask);
}

function* getAllFeedbacksTask(action) {
  const { response, error } = yield call(getAllFeedbacks, action.payload);
  if (response) {
    const { feedbacks } = response;
    yield put(actions.getAllFeedbacksSuccess(feedbacks));
  } else {
    yield put(actions.getAllFeedbacksFailed(error.data));
  }
}

function* getFeedbackSessionWatcher() {
  yield takeLatest(actions.getFeedbackSession, getFeedbackSessionTask);
}

function* getFeedbackSessionTask(action) {
  const { response, error } = yield call(getFeedbackSession, action.payload);
  if (response) {
    yield put(actions.getFeedbackSessionSuccess(response));
  } else {
    yield put(actions.getFeedbackSessionFailed(error.data));
  }
}

export default function* defaultSaga() {
  yield all([
    fork(getHistoryWatcher),
    fork(getAllFeedbacksWatcher),
    fork(getFeedbackSessionWatcher),
  ]);
}
