import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import { ACTION_STATUS } from 'utils/constants';

const initialState = {
  info: null,
  get: {
    status: '',
    error: null,
  },
  edit: {
    status: '',
    error: null,
  },
  upload: {
    status: '',
    error: '',
    visibleModal: false,
    loading: false,
  },
  getTutorInfo: {
    data: {},
    status: '',
    error: null,
  },
  editTutorInfo: {
    status: '',
    error: null,
  },
  allFeedbacks: {
    data: [],
    status: '',
    error: null,
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfile(state) {
      return flow(
        set('get.error', null),
        set('get.status', ACTION_STATUS.PENDING),
      )(state);
    },

    getProfileSuccess(state, action) {
      const { user } = action.payload;
      return flow(
        set('info', user),
        set('get.status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    getProfileFailed(state, action) {
      return flow(
        set('get.error', action.payload),
        set('get.status', ACTION_STATUS.FAILED),
      )(state);
    },

    getTutorInfo(state) {
      return flow(
        set('getTutorInfo.error', null),
        set('getTutorInfo.status', ACTION_STATUS.PENDING),
      )(state);
    },

    getTutorInfoSuccess(state, action) {
      return flow(
        set('getTutorInfo.data', action.payload),
        set('getTutorInfo.status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    getTutorInfoFailed(state, action) {
      return flow(
        set('getTutorInfo.error', action.payload),
        set('getTutorInfo.status', ACTION_STATUS.FAILED),
      )(state);
    },

    editTutorInfo(state) {
      return flow(
        set('editTutorInfo.error', null),
        set('editTutorInfo.status', ACTION_STATUS.PENDING),
      )(state);
    },

    editTutorInfoSuccess(state, action) {
      return flow(
        set('editTutorInfo.data', action.payload),
        set('editTutorInfo.status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    editTutorInfoFailed(state, action) {
      return flow(
        set('editTutorInfo.error', action.payload),
        set('editTutorInfo.status', ACTION_STATUS.FAILED),
      )(state);
    },

    editProfile(state) {
      return flow(
        set('edit.error', null),
        set('edit.status', ACTION_STATUS.PENDING),
      )(state);
    },

    editProfileFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('edit.status', ACTION_STATUS.FAILED),
      )(state);
    },

    editProfileSuccess(state, action) {
      const { user } = action.payload;
      return flow(
        set('info', user),
        set('edit.status', ACTION_STATUS.SUCCESS),
      )(state);
    },
    hideModal(state) {
      return flow(set('upload.visibleModal', false))(state);
    },
    showModal(state) {
      return flow(set('upload.visibleModal', true))(state);
    },
    uploadAvatar(state) {
      return flow(
        set('upload.status', ACTION_STATUS.PENDING),
        set('upload.loading', true),
      )(state);
    },
    uploadAvatarSuccess(state) {
      return flow(
        set('upload.status', ACTION_STATUS.SUCCESS),
        set('upload.loading', false),
        set('upload.visibleModal', false),
      )(state);
    },
    uploadAvatarFailed(state, action) {
      return flow(
        set('upload.status', ACTION_STATUS.FAILED),
        set('upload.loading', false),
        set('upload.error', action.payload),
      )(state);
    },

    getAllFeedbacks(state) {
      return flow(
        set('allFeedbacks.error', null),
        set('allFeedbacks.status', ACTION_STATUS.PENDING),
      )(state);
    },

    getAllFeedbacksSuccess(state, action) {
      return flow(
        set('allFeedbacks.data', action.payload),
        set('allFeedbacks.status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    getAllFeedbacksFailed(state, action) {
      return flow(
        set('allFeedbacks.error', action.payload),
        set('allFeedbacks.status', ACTION_STATUS.FAILED),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = profileSlice;
