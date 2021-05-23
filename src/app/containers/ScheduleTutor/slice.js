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
  scheduleTutorById: {
    status: '',
    error: null,
    data: [],
  },
  scheduleTutorByDate: {
    status: '',
    error: null,
    data: [],
  },
  registerSchedule: {
    error: null,
    status: '',
  },
  unRegisterSchedule: {
    error: null,
    status: '',
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

    getFreeScheduleByTutorId(state) {
      return flow(
        set('scheduleTutorById.error', null),
        set('scheduleTutorById.status', ACTION_STATUS.PENDING),
      )(state);
    },

    getFreeScheduleByTutorIdSuccess(state, action) {
      return flow(
        set('scheduleTutorById.data', action.payload),
        set('scheduleTutorById.status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    getFreeScheduleByTutorIdFailed(state, action) {
      return flow(
        set('scheduleTutorById.error', action.payload),
        set('scheduleTutorById.status', ACTION_STATUS.FAILED),
      )(state);
    },

    getFreeScheduleByDate(state) {
      return flow(
        set('scheduleTutorByDate.error', null),
        set('scheduleTutorByDate.status', ACTION_STATUS.PENDING),
      )(state);
    },

    getFreeScheduleByDateSuccess(state, action) {
      return flow(
        set('scheduleTutorByDate.data', action.payload),
        set('scheduleTutorByDate.status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    getFreeScheduleByDateFailed(state, action) {
      return flow(
        set('scheduleTutorByDate.error', action.payload),
        set('scheduleTutorByDate.status', ACTION_STATUS.FAILED),
      )(state);
    },

    registerSchedule(state) {
      return flow(
        set('registerSchedule.error', null),
        set('registerSchedule.status', ACTION_STATUS.PENDING),
      )(state);
    },

    registerScheduleSuccess(state) {
      return flow(set('registerSchedule.status', ACTION_STATUS.SUCCESS))(state);
    },

    registerScheduleFailed(state, action) {
      return flow(
        set('registerSchedule.error', action.payload),
        set('registerSchedule.status', ACTION_STATUS.FAILED),
      )(state);
    },

    unRegisterSchedule(state) {
      return flow(
        set('unRegisterSchedule.error', null),
        set('unRegisterSchedule.status', ACTION_STATUS.PENDING),
      )(state);
    },

    unRegisterScheduleSuccess(state) {
      return flow(set('unRegisterSchedule.status', ACTION_STATUS.SUCCESS))(
        state,
      );
    },

    unRegisterScheduleFailed(state, action) {
      return flow(
        set('unRegisterSchedule.error', action.payload),
        set('unRegisterSchedule.status', ACTION_STATUS.FAILED),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = scheduleSlice;
