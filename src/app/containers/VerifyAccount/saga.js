import { verifyAccount } from 'fetchers/authFetcher';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';

function* confirmVerifyAccountWatcher() {
  yield takeLatest(actions.confirmVerifyAccount, confirmVerifyAccountTask);
}

function* confirmVerifyAccountTask(action) {
  const { response, error } = yield call(
    confirmVerifyAccountAPI,
    action.payload,
  );
  if (response) {
    yield put(actions.confirmVerifyAccountSuccess(response));
  } else {
    yield put(actions.confirmVerifyAccountFailed(error.data));
  }
}

function confirmVerifyAccountAPI(token) {
  return verifyAccount(token);
}

export default function* defaultSaga() {
  yield all([fork(confirmVerifyAccountWatcher)]);
}
