import { actions } from './slice';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { getListTutorBySearch } from 'fetchers/tutor.service';

function* getListTutorWatcher() {
  yield takeLatest(actions.optionFromUrl, getListTutorTask);
}

function* getListTutorTask(action) {
  const { haveNoTutor, ...resPayload } = action.payload;
  const { response, error } = yield call(getListAPI, resPayload);
  if (response) {
    yield put(
      actions.getListTutorSuccess({
        list: response.rows,
        count: response.count,
      }),
    );
  } else {
    yield put(actions.getListTutorFailed(error));
  }
}

function getListAPI(data) {
  return getListTutorBySearch(data);
}

export default function* defaultSaga() {
  yield all([fork(getListTutorWatcher)]);
}
