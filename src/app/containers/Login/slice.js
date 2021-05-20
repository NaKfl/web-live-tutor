import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import { updateUserInfo, getUser } from 'utils/localStorageUtils';
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

    loginServiceSuccess(state, action) {
      return flow(
        set('isAuthenticated', true),
        set('info', action.payload?.user),
        set('status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    loginServiceFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('status', ACTION_STATUS.FAILED),
      )(state);
    },

    getMe(state) {
      return flow(
        set('error', null),
        set('status', ACTION_STATUS.PENDING),
      )(state);
    },

    getMeSuccess(state, action) {
      const user = getUser();
      const currentRole = user?.currentRole ?? 'student';
      const newUser = { ...action.payload?.user, currentRole };
      updateUserInfo(newUser);
      return flow(
        set('info', newUser),
        set('status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    getMeFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('status', ACTION_STATUS.FAILED),
      )(state);
    },

    changeRole(state, action) {
      const user = getUser();
      if (user) {
        user.currentRole = action?.payload?.roleName;
        updateUserInfo(user);
        return set('info', user)(state);
      }
      return state;
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
  },
});

export const { actions, reducer, name: sliceKey } = authenticationSlice;
