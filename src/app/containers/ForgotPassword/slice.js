import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  step: 0,
  status: '',
  isChangeSuccess: false,
  error: null,
};

const fgPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: initialState,
  reducers: {
    submitEmail: state => {
      return flow(set('status', ACTION_STATUS.PENDING))(state);
    },
    submitEmailSuccess: state => {
      return flow(set('step', 1), set('status', ACTION_STATUS.SUCCESS))(state);
    },
    submitEmailFailed: state => {
      return flow(set('status', ACTION_STATUS.FAILED))(state);
    },
    changeToThirdStep: state => {
      return flow(set('step', 2))(state);
    },

    resetPassword: state => {
      return state;
    },

    resetPasswordSuccess: state => {
      return flow(set('isChangeSuccess', true))(state);
    },

    resetPasswordFailed: (state, action) => {
      return flow(
        set('isChangeSuccess', false),
        set('error', action.payload),
      )(state);
    },

    resetStep: state => {
      return flow(
        set('step', 0),
        set('status', ''),
        set('isChangeSuccess', false),
        set('error', null),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = fgPasswordSlice;
