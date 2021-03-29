import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import { ACTION_STATUS } from 'utils/constants';

const initialState = {
  scheduleTutor: {
    status: '',
    error: null,
    data: [],
  },
};

const scheduleSlice = createSlice({
  name: 'scheduleRegister',
  initialState,
  reducers: {
    getFreeSchedule(state) {
      return flow(
        set('scheduleTutor.error', null),
        set('scheduleTutor.status', ACTION_STATUS.PENDING),
      )(state);
    },

    getFreeScheduleSuccess(state, action) {
      return flow(
        set('scheduleTutor.data', action.payload),
        set('scheduleTutor.status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    getFreeScheduleFailed(state, action) {
      return flow(
        set('scheduleTutor.error', action.payload),
        set('scheduleTutor.status', ACTION_STATUS.FAILED),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = scheduleSlice;
