import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import { ACTION_STATUS } from 'utils/constants';

const initialState = {
  getRecentList: {
    status: '',
    error: null,
  },
};

const chatListSlice = createSlice({
  name: 'chatList',
  initialState,
  reducers: {
    getRecentList(state) {
      return flow(
        set('getRecentList.error', null),
        set('getRecentList.status', ACTION_STATUS.PENDING),
      )(state);
    },

    getRecentListSuccess(state, action) {
      const { user } = action.payload;
      return flow(
        set('info', user),
        set('getRecentList.status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    getRecentListFailed(state, action) {
      return flow(
        set('getRecentList.error', action.payload),
        set('getRecentList.status', ACTION_STATUS.FAILED),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = chatListSlice;
