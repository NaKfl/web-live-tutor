import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import { ACTION_STATUS } from 'utils/constants';

const initialState = {
  verifyDeposit: {
    status: '',
    error: null,
  },
};

const verifyDepositSlice = createSlice({
  name: 'verifyDeposit',
  initialState,
  reducers: {
    verifyDeposit(state) {
      return flow(
        set('verifyDeposit.error', null),
        set('verifyDeposit.status', ACTION_STATUS.PENDING),
      )(state);
    },

    verifyDepositSuccess(state) {
      return set('verifyDeposit.status', ACTION_STATUS.SUCCESS)(state);
    },

    verifyDepositFailed(state, action) {
      return flow(
        set('verifyDeposit.error', action.payload),
        set('verifyDeposit.status', ACTION_STATUS.FAILED),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = verifyDepositSlice;
