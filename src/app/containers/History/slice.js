import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  historyList: [],
  totalCount: 0,
  load: false,
  status: null,
  error: null,
  isTutor: false,
};

const historySlice = createSlice({
  name: 'history',
  initialState: initialState,
  reducers: {
    fetchHistory(state) {
      return flow(
        set('load', true),
        set('error', null),
        set('status', ACTION_STATUS.PENDING),
      )(state);
    },

    fetchHistorySuccess(state, action) {
      return flow(
        set('historyList', action.payload?.rows),
        set('totalCount', action.payload?.count),
        set('load', false),
        set('status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    fetchHistoryFail(state, action) {
      return flow(
        set('error', action.payload),
        set('load', false),
        set('status', ACTION_STATUS.FAILED),
      )(state);
    },

    changeTargetIsTutor(state, action) {
      return flow(set('isTutor', action.payload || !state.isTutor))(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = historySlice;
