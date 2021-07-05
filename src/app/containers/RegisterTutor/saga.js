import { registerTutor } from 'fetchers/registerTutor';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { actions as loginActions } from 'app/containers/Login/slice';

function* registerTutorWatcher() {
  yield takeLatest(actions.registerTutor, registerTutorTask);
}

function* registerTutorTask(action) {
  const { response, error } = yield call(registerTutorAPI, action.payload);
  if (response) {
    yield put(actions.registerTutorSuccess());
    yield put(loginActions.getMe());
  } else {
    yield put(actions.registerTutorFailed(error.data));
  }
}

function registerTutorAPI(payload) {
  return registerTutor(payload);
}

export default function* defaultSaga() {
  yield all([fork(registerTutorWatcher)]);
}
