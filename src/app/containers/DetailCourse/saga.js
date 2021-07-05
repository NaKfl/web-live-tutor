import {
  getDetailCourse,
  tutorAddCourse,
  tutorRemoveCourse,
} from 'fetchers/coursesFetcher';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { actions as loginActions } from 'app/containers/Login/slice';

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

function* tutorAddCourseWatcher() {
  yield takeLatest(actions.tutorAddCourse, tutorAddCourseTask);
}

function* tutorAddCourseTask(action) {
  const response = yield call(tutorAddCourse, action.payload);
  if (response) {
    yield put(actions.tutorAddCourseSuccess(response));
    yield put(loginActions.getMe());
  } else {
    yield put(actions.tutorAddCourseFailed());
  }
}

function* tutorRemoveCourseWatcher() {
  yield takeLatest(actions.tutorRemoveCourse, tutorRemoveCourseTask);
}

function* tutorRemoveCourseTask(action) {
  const response = yield call(tutorRemoveCourse, action.payload);
  if (response) {
    yield put(actions.tutorRemoveCourseSuccess(response));
    yield put(loginActions.getMe());
  } else {
    yield put(actions.tutorRemoveCourseFailed());
  }
}

export default function* defaultSaga() {
  yield all([
    fork(getDetailCourseWatcher),
    fork(tutorAddCourseWatcher),
    fork(tutorRemoveCourseWatcher),
  ]);
}
