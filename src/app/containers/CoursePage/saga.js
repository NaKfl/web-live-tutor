import { getCoursesList } from 'fetchers/coursesFetcher';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';

function* getCoursesListWatcher() {
  yield takeLatest(actions.getCoursesList, getCoursesListTask);
}

function* getCoursesListTask() {
  const { response, error } = yield call(getCoursesListAPI);
  if (response) {
    yield put(actions.getCoursesListSuccess(response));
  } else {
    yield put(actions.getCoursesListFailed(error));
  }
}

function getCoursesListAPI() {
  return getCoursesList();
}

export default function* defaultSaga() {
  yield all([fork(getCoursesListWatcher)]);
}
