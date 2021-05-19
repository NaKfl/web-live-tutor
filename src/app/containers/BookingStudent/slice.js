import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import { ACTION_STATUS } from 'utils/constants';

const initialState = {
  bookingList: {
    status: '',
    error: null,
    data: [],
  },
  cancelBooking: {
    status: '',
    error: null,
  },
};

const bookingSlice = createSlice({
  name: 'bookingList',
  initialState,
  reducers: {
    getBookingList(state) {
      return flow(
        set('bookingList.error', null),
        set('bookingList.status', ACTION_STATUS.PENDING),
      )(state);
    },

    getBookingListSuccess(state, action) {
      return flow(
        set('bookingList.data', action.payload),
        set('bookingList.status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    getBookingListFailed(state, action) {
      return flow(
        set('bookingList.error', action.payload),
        set('bookingList.status', ACTION_STATUS.FAILED),
      )(state);
    },

    cancelBookSchedule(state) {
      return flow(
        set('cancelBooking.error', null),
        set('cancelBooking.status', ACTION_STATUS.PENDING),
      )(state);
    },

    cancelBookScheduleSuccess(state, action) {
      return flow(set('cancelBooking.status', ACTION_STATUS.SUCCESS))(state);
    },

    cancelBookScheduleFailed(state, action) {
      return flow(
        set('cancelBooking.error', action.payload),
        set('cancelBooking.status', ACTION_STATUS.FAILED),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = bookingSlice;
