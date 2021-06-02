import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import { ACTION_STATUS } from 'utils/constants';

const initialState = {
  getHistory: {
    data: {},
    status: '',
    error: null,
  },
  getStatistics: {
    data: {},
    status: '',
    error: null,
  },
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    getHistory(state) {
      return flow(
        set('getHistory.error', null),
        set('getHistory.status', ACTION_STATUS.PENDING),
      )(state);
    },

    getHistorySuccess(state, action) {
      return flow(
        set('getHistory.data', action.payload),
        set('getHistory.status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    getHistoryFailed(state, action) {
      return flow(
        set('getHistory.error', action.payload),
        set('getHistory.status', ACTION_STATUS.FAILED),
      )(state);
    },

    getStatistics(state) {
      return flow(
        set('getStatistics.error', null),
        set('getStatistics.status', ACTION_STATUS.PENDING),
      )(state);
    },

    getStatisticsSuccess(state, action) {
      return flow(
        set('getStatistics.data', action.payload),
        set('getStatistics.status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    getStatisticsFailed(state, action) {
      return flow(
        set('getStatistics.error', action.payload),
        set('getStatistics.status', ACTION_STATUS.FAILED),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = walletSlice;
