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
  allFeedbacks: {
    data: [],
    status: '',
    error: null,
  },
  feedbackSession: {
    data: [],
    status: '',
    error: null,
  },
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

    getFeedbackSession(state) {
      return flow(
        set('feedbackSession.error', null),
        set('allFeedbacks.status', ACTION_STATUS.PENDING),
      )(state);
    },

    getFeedbackSessionSuccess(state, action) {
      return flow(
        set('feedbackSession.data', action.payload),
        set('feedbackSession.status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    getFeedbackSessionFailed(state, action) {
      return flow(
        set('feedbackSession.error', action.payload),
        set('feedbackSession.status', ACTION_STATUS.FAILED),
      )(state);
    },

    changeTargetIsTutor(state, action) {
      return flow(set('isTutor', action.payload || !state.isTutor))(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = historySlice;
