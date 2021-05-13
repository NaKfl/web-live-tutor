import { getTutorDetail } from 'fetchers/tutor.service';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';

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

export default function* defaultSaga() {
  yield all([fork(getTutorDetailWatcher)]);
}
