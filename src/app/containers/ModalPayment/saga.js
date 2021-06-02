import { depositToAccount } from 'fetchers/paymentFetcher';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { actions as loginActions } from 'app/containers/Login/slice';

function* depositToAccountWatcher() {
  yield takeLatest(actions.depositToAccount, depositToAccountTask);
}

function* depositToAccountTask(action) {
  const { response, error } = yield call(depositToAccountAPI, action.payload);
  if (response) {
    yield put(actions.depositToAccountSuccess(response));
    yield put(loginActions.getMe());
  } else {
    yield put(actions.depositToAccountFailed(error));
  }
}

function depositToAccountAPI(payload) {
  return depositToAccount(payload);
}

export default function* defaultSaga() {
  yield all([fork(depositToAccountWatcher)]);
}
