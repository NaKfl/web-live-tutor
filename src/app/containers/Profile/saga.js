import { getProfile, editProfile } from 'fetchers/profileFetcher';
import { getTutorById, editTutor } from 'fetchers/tutor.service';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { actions as loginActions } from 'app/containers/Login/slice';
import { notifySuccess, notifyError } from 'utils/notify';
import i18n from 'locales/i18n';
import { uploadAvatar } from 'fetchers/user.service';
import { errorCode } from 'utils/constants';

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
    notifyError(i18n(`Error_code.${errorCode[error.code]}`));
  }
}
function uploadAvatarAPI(payload) {
  return uploadAvatar(payload);
}

function* getTutorInfoWatcher() {
  yield takeLatest(actions.getTutorInfo, getTutorInfoTask);
}

function* getTutorInfoTask(action) {
  const response = yield call(getTutorInfoAPI, action.payload);
  if (response) {
    yield put(actions.getTutorInfoSuccess(response));
  } else {
    yield put(actions.getTutorInfoFailed());
  }
}

function getTutorInfoAPI(payload) {
  return getTutorById({ tutorId: payload });
}

function* editTutorInfoWatcher() {
  yield takeLatest(actions.editTutorInfo, editTutorInfoTask);
}

function* editTutorInfoTask(action) {
  const { response } = yield call(editTutorInfoAPI, action.payload);
  if (response) {
    yield put(actions.editTutorInfoSuccess());
    yield put(actions.getTutorInfo(response?.data?.userId));
    notifySuccess(i18n.t('Profile.notifyEditTutorSuccess'));
  } else {
    yield put(actions.editTutorInfoFailed());
  }
}

function editTutorInfoAPI(payload) {
  return editTutor(payload);
}

export default function* defaultSaga() {
  yield all([
    fork(getProfileWatcher),
    fork(editProfileWatcher),
    fork(uploadAvatarWatcher),
    fork(getTutorInfoWatcher),
    fork(editTutorInfoWatcher),
  ]);
}
