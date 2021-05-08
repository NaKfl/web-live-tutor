import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import { updateUserInfo, getUser } from 'utils/localStorageUtils';
import { ACTION_STATUS, ROLES } from 'utils/constants';
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
        set('currentRole', ROLES.STUDENT),
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
        set('currentRole', ROLES.STUDENT),
        set('status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    loginServiceFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('status', ACTION_STATUS.FAILED),
      )(state);
    },

    changeRole(state, action) {
      const user = getUser();
      user.currentRole = action?.payload?.roleName;
      updateUserInfo(user);
      return set('info', user)(state);
    },

    logout(state) {
      return state;
    },

    logoutSuccess(state) {
      return flow(
        set('isAuthenticated', false),
        set('info', null),
        set('status', ''),
        set('currentRole', ROLES.GUEST),
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
