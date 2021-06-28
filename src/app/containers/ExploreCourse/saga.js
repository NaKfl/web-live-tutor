import { getDetailCourse } from 'fetchers/coursesFetcher';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';

function* getDetailCourseWatcher() {
  yield takeLatest(actions.getDetailCourse, getDetailCourseTask);
}

function* getDetailCourseTask(action) {
  const { response, error } = yield call(getDetailCourseAPI, action.payload);
  if (response) {
    yield put(actions.getDetailCourseSuccess(response));
  } else {
    yield put(actions.getDetailCourseFailed(error));
  }
}

function getDetailCourseAPI(payload) {
  return getDetailCourse(payload);
}

export default function* defaultSaga() {
  yield all([fork(getDetailCourseWatcher)]);
}
