import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import { ACTION_STATUS } from 'utils/constants';

const initialState = {
  depositAccount: {
    status: '',
    error: null,
    data: [],
  },
};

const depositAccountSlice = createSlice({
  name: 'depositAccount',
  initialState,
  reducers: {
    depositToAccount(state) {
      return flow(
        set('depositAccount.error', null),
        set('depositAccount.status', ACTION_STATUS.PENDING),
      )(state);
    },

    depositToAccountSuccess(state, action) {
      return flow(
        set('depositAccount.data', action.payload),
        set('depositAccount.status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    depositToAccountFailed(state, action) {
      return flow(
        set('depositAccount.error', action.payload),
        set('depositAccount.status', ACTION_STATUS.FAILED),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = depositAccountSlice;
