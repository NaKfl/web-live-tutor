import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectProfileState = state => state.profile;

export const selectProfileInfo = createSelector(selectProfileState, profile =>
  get('info', profile),
);

export const selectEditProfileStatus = createSelector(
  selectProfileState,
  profile => get('edit.status', profile),
);

export const selectGetProfileStatus = createSelector(
  selectProfileState,
  profile => get('get.status', profile),
);

export const selectVisibleModal = createSelector(selectProfileState, visible =>
  get('upload.visibleModal', visible),
);

export const selectLoadingUpload = createSelector(
  selectProfileState,
  loadingUpload => get('upload.loading', loadingUpload),
);

export const selectUploadStatus = createSelector(
  selectProfileState,
  loadingUpload => get('upload.status', loadingUpload),
);

export const selectGetStatus = createSelector(
  selectProfileState,
  tutorProfile => get('get.status', tutorProfile),
);

export const selectGetTutorInfoStatus = createSelector(
  selectProfileState,
  tutorProfile => get('getTutorInfo.status', tutorProfile),
);

export const selectGetTutorInfoData = createSelector(
  selectProfileState,
  tutorProfile => get('getTutorInfo.data', tutorProfile),
);

export const selectEditTutorInfoStatus = createSelector(
  selectProfileState,
  tutorProfile => get('editTutorInfo.status', tutorProfile),
);

export const selectAllFeedbacks = createSelector(
  selectProfileState,
  allFeedbacks => get('allFeedbacks', allFeedbacks),
);
