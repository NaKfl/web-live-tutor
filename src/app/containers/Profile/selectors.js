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
  loadingUpload => get('get.status', loadingUpload),
);
