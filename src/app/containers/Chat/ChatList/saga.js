import { getRecentList } from 'fetchers/chatListFetcher';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';

function* getRecentListWatcher() {
  yield takeLatest(actions.getRecentList, getRecentListTask);
}

function* getRecentListTask() {
  const { response, error } = yield call(getRecentListAPI);
  if (response) {
    yield put(actions.getRecentListSuccess(response));
  } else {
    yield put(actions.getRecentListFailed(error.data));
  }
}

function getRecentListAPI() {
  return getRecentList();
}

export default function* defaultSaga() {
  yield all([fork(getRecentListWatcher)]);
}
