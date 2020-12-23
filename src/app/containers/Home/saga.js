import { getList } from 'fetchers/tutor.service';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
function getListTutorAPI(payload = '') {
  return getList(payload);
}
function* getListWatcher() {
  yield takeLatest(actions.fetchRequest, fetchListTast);
}
function* fetchListTast() {
  const { response, error } = yield call(getListTutorAPI);
  if (response) {
    const data = response.tutors?.rows;
    if (data) {
      yield put(actions.getList(data));
      yield put(actions.fetchRequestSuccess());
    }
  } else {
    console.log(error);
    yield put(actions.fetchRequestFailure());
  }
}
export default function* defaultSaga() {
  yield all([fork(getListWatcher)]);
}
