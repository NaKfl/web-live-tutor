import { getList, getTopTutor, reviewTutor } from 'fetchers/tutor.service';
import {
  manageFavoriteTutor,
  getFavoriteTutorList,
} from 'fetchers/user.service';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';

function getTopTutorAPI(payload) {
  return getTopTutor(payload);
}

function* getTopTutorWatcher() {
  yield takeLatest(actions.getTopTutor, getTopTutorTask);
}

function* getTopTutorTask(action) {
  const { response, error } = yield call(getTopTutorAPI, action.payload);
  if (response) {
    yield put(actions.getTopTutorSuccess(response.data));
  } else {
    yield put(actions.getTopTutorFailure(error.data));
  }
}

function reviewTutorAPI(payload) {
  return reviewTutor(payload);
}

function* reviewTutorWatcher() {
  yield takeLatest(actions.reviewTutor, reviewTutorTask);
}

function* reviewTutorTask(action) {
  const { response, error } = yield call(reviewTutorAPI, action.payload);
  if (response) {
    yield put(actions.reviewTutorSuccess(response));
  } else {
    yield put(actions.reviewTutorFailure(error.data));
  }
}

function getListTutorAPI({ search = null, page, perPage }) {
  return getList({ search, page, perPage });
}

function* getListWatcher() {
  yield takeLatest(actions.fetchRequest, fetchListTask);
}

function* fetchListTask(action) {
  const { response, error } = yield call(getListTutorAPI, {
    search: null,
    page: 1,
    perPage: 9,
    ...action.payload,
  });

  if (response) {
    const data = response.tutors;
    const favoriteList = response?.favoriteTutor;
    if (data) {
      yield put(actions.getList(data));
      yield put(actions.fetchFavoriteListSuccess(favoriteList));
      yield put(actions.fetchRequestSuccess());
    }
  } else {
    console.log(error);
    yield put(actions.fetchRequestFailure());
  }
}

function manageFavoriteTutorAPI(payload) {
  return manageFavoriteTutor(payload);
}

function* manageFavoriteTutorWatcher() {
  yield takeLatest(actions.manageFavoriteTutor, manageFavoriteTutorTask);
}

function* manageFavoriteTutorTask(action) {
  const { response, error } = yield call(
    manageFavoriteTutorAPI,
    action.payload,
  );
  console.log(action.payload);
  if (response.result === 1) {
    yield put(actions.removeFavoriteTutorFromList(action.payload));
  } else if (response.result !== 1) {
    yield put(actions.pushFavoriteTutorToList(response.result));
  } else {
    console.log(error);
  }
}

function fetchListFavoriteAPI(payload) {
  return getFavoriteTutorList(payload);
}

function* fetchListFavoriteWatcher() {
  yield takeLatest(actions.fetchFavoriteList, fetchFavoriteTutorTask);
}

function* fetchFavoriteTutorTask() {
  const { response, error } = yield call(fetchListFavoriteAPI);
  if (response) {
    yield put(actions.fetchFavoriteListSuccess(response));
  } else {
    console.log({ error });
    yield put(actions.fetchFavoriteListFailed(error));
  }
}

export default function* defaultSaga() {
  yield all([
    fork(getListWatcher),
    fork(manageFavoriteTutorWatcher),
    fork(fetchListFavoriteWatcher),
    fork(getTopTutorWatcher),
    fork(reviewTutorWatcher),
  ]);
}
