import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import { ACTION_STATUS } from 'utils/constants';

const initialState = {
  bookingList: {
    status: '',
    error: null,
    data: [],
    total: 0,
  },
  cancelBooking: {
    status: '',
    error: null,
  },
};

const bookingSlice = createSlice({
  name: 'bookingListForTutor',
  initialState,
  reducers: {
    getBookingList(state) {
      return flow(
        set('bookingList.error', null),
        set('bookingList.status', ACTION_STATUS.PENDING),
      )(state);
    },

    getBookingListSuccess(state, action) {
      const { rows, count } = action.payload;
      return flow(
        set('bookingList.data', rows),
        set('bookingList.total', count),
        set('bookingList.status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    getBookingListFailed(state, action) {
      return flow(
        set('bookingList.error', action.payload),
        set('bookingList.status', ACTION_STATUS.FAILED),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = bookingSlice;
