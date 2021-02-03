import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import { ACTION_STATUS } from 'utils/constants';
export const initialState = {
  info: null,
  isAuthenticated: false,
  status: '',
  error: null,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login(state) {
      return flow(
        set('error', null),
        set('status', ACTION_STATUS.PENDING),
      )(state);
    },

    loginSuccess(state, action) {
      return flow(
        set('isAuthenticated', true),
        set('info', action.payload?.user),
        set('status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    loginFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('status', ACTION_STATUS.FAILED),
      )(state);
    },

    loginService(state) {
      return flow(
        set('error', null),
        set('status', ACTION_STATUS.PENDING),
      )(state);
    },

    loginServiceSuccess(state) {
      return flow(
        set('isAuthenticated', true),
        set('status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    loginServiceFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('status', ACTION_STATUS.FAILED),
      )(state);
    },

    logout(state) {
      return state;
    },

    logoutSuccess(state) {
      return flow(
        set('isAuthenticated', false),
        set('info', null),
        set('status', ''),
        set('error', null),
      )(state);
    },

    getUserInfoFromStorage(state) {
      return state;
    },

    getUserInfoFromStorageSuccess(state, action) {
      return set('info', action.payload)(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = authenticationSlice;
