import { getProfile, editProfile } from 'fetchers/profileFetcher';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { actions as loginActions } from 'app/containers/Login/slice';
import { notifySuccess } from 'utils/notify';
import i18n from 'locales/i18n';
import { uploadAvatar } from 'fetchers/user.service';

function* getProfileWatcher() {
  yield takeLatest(actions.getProfile, getProfileTask);
}

function* getProfileTask() {
  const { response, error } = yield call(getProfileAPI);
  if (response) {
    yield put(actions.getProfileSuccess(response));
  } else {
    yield put(actions.getProfileFailed(error.data));
  }
}

function getProfileAPI() {
  return getProfile();
}

function* editProfileWatcher() {
  yield takeLatest(actions.editProfile, editProfileTask);
}

function* editProfileTask(action) {
  const { response, error } = yield call(editProfileAPI, action.payload);
  if (response) {
    yield put(actions.editProfileSuccess(response));
    notifySuccess(i18n.t('Profile.notifyEditSuccess'));
  } else {
    yield put(actions.editProfileFailed(error.data));
  }
}

function editProfileAPI(payload) {
  return editProfile(payload);
}

function* uploadAvatarWatcher() {
  yield takeLatest(actions.uploadAvatar, uploadAvatarTask);
}
function* uploadAvatarTask(action) {
  const { response, error } = yield call(uploadAvatarAPI, action.payload);
  if (response) {
    yield put(actions.getProfile());
    yield put(loginActions.getMe());
    yield put(actions.uploadAvatarSuccess());
    notifySuccess(i18n.t('Profile.uploadAvatarSuccess'));
  } else {
    yield put(actions.uploadAvatarFailed(error));
  }
}
function uploadAvatarAPI(payload) {
  return uploadAvatar(payload);
}
export default function* defaultSaga() {
  yield all([
    fork(getProfileWatcher),
    fork(editProfileWatcher),
    fork(uploadAvatarWatcher),
  ]);
}
