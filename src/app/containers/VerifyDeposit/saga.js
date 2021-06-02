import { verifyDeposit } from 'fetchers/paymentFetcher';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';

function* verifyDepositWatcher() {
  yield takeLatest(actions.verifyDeposit, verifyDepositTask);
}

function* verifyDepositTask() {
  const { response, error } = yield call(verifyDepositAPI);
  if (response) {
    yield put(actions.verifyDepositSuccess());
  } else {
    yield put(actions.verifyDepositFailed(error.data));
  }
}

function verifyDepositAPI() {
  return verifyDeposit();
}

export default function* defaultSaga() {
  yield all([fork(verifyDepositWatcher)]);
}
