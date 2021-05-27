import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import { ACTION_STATUS } from 'utils/constants';

const initialState = {
  getTutorDetail: {
    data: {},
    status: '',
    error: null,
  },
  getDetailSchedule: {
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
  },
  bookTimeSchedule: {
    error: null,
    status: '',
    data: [],
  },
  modalControl: {
    error: null,
    status: '',
    isModalVisible: false,
    idsSelected: [],
  },
};

const tutorDetailSlice = createSlice({
  name: 'tutorDetail',
  initialState,
  reducers: {
    getTutorDetail(state) {
      return flow(
        set('getTutorDetail.error', null),
        set('getTutorDetail.status', ACTION_STATUS.PENDING),
      )(state);
    },

    getTutorDetailSuccess(state, action) {
      return flow(
        set('getTutorDetail.data', action.payload),
        set('getTutorDetail.status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    getTutorDetailFailed(state, action) {
      return flow(
        set('getTutorDetail.error', action.payload),
        set('getTutorDetail.status', ACTION_STATUS.FAILED),
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

    getDetailSchedule(state) {
      return flow(
        set('getDetailSchedule.error', null),
        set('getDetailSchedule.status', ACTION_STATUS.PENDING),
      )(state);
    },

    getDetailScheduleSuccess(state, action) {
      return flow(
        set('getDetailSchedule.data', action.payload),
        set('getDetailSchedule.status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    getDetailScheduleFailed(state, action) {
      return flow(
        set('getDetailSchedule.error', action.payload),
        set('getDetailSchedule.status', ACTION_STATUS.FAILED),
      )(state);
    },

    bookTimeSchedule(state) {
      return flow(
        set('bookTimeSchedule.error', null),
        set('bookTimeSchedule.status', ACTION_STATUS.PENDING),
      )(state);
    },

    bookTimeScheduleSuccess(state, action) {
      return flow(
        set('bookTimeSchedule.data', action.payload),
        set('bookTimeSchedule.status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    bookTimeScheduleFailed(state, action) {
      return flow(
        set('bookTimeSchedule.error', action.payload),
        set('bookTimeSchedule.status', ACTION_STATUS.FAILED),
      )(state);
    },

    showModalBooking(state, action) {
      return flow(
        set('modalControl.isModalVisible', true),
        set('modalControl.idsSelected', action.payload || []),
      )(state);
    },

    hideModalBooking(state) {
      return flow(
        set('modalControl.isModalVisible', false),
        set('bookTimeSchedule.status', ''),
      )(state);
    },

    getPriceOneOfSession(state) {
      return flow(set('modalControl.status', ACTION_STATUS.PENDING))(state);
    },

    getPriceOneOfSessionSuccess(state, action) {
      return flow(
        set('modalControl.price', action.payload),
        set('modalControl.status', ACTION_STATUS.SUCCESS),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = tutorDetailSlice;
