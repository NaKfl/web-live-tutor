import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import { ACTION_STATUS } from 'utils/constants';

const initialState = {
  confirm: {
    status: '',
    error: null,
  },
};

const verifyAccountSlice = createSlice({
  name: 'verifyAccount',
  initialState,
  reducers: {
    confirmVerifyAccount(state) {
      return flow(
        set('confirm.error', null),
        set('confirm.status', ACTION_STATUS.PENDING),
      )(state);
    },

    confirmVerifyAccountSuccess(state, action) {
      const { user } = action.payload;
      return flow(
        set('info', user),
        set('confirm.status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    confirmVerifyAccountFailed(state, action) {
      return flow(
        set('confirm.error', action.payload),
        set('confirm.status', ACTION_STATUS.FAILED),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = verifyAccountSlice;
