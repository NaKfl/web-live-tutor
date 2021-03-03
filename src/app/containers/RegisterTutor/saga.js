import { registerTutor } from 'fetchers/registerTutor';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { notifySuccess } from 'utils/notify';
import i18n from 'locales/i18n';

function* registerTutorWatcher() {
  yield takeLatest(actions.registerTutor, registerTutorTask);
}

function* registerTutorTask(action) {
  const { response, error } = yield call(registerTutorAPI, action.payload);
  if (response) {
    yield put(actions.registerTutorSuccess());
    notifySuccess(i18n.t('RegisterTutor.notifySuccess'));
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
