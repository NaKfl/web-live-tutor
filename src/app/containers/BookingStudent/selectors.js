import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectBookingListState = state => state.bookingList;

export const selectBookingList = createSelector(
  selectBookingListState,
  bookingListState => get('bookingList', bookingListState),
);

export const selectCancelBooking = createSelector(
  selectBookingListState,
  bookingListState => get('cancelBooking', bookingListState),
);
