import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectBookingListState = state => state.bookingListForTutor;

export const selectBookingListData = createSelector(
  selectBookingListState,
  bookingListState => get('bookingList.data', bookingListState),
);

export const selectBookingListStatus = createSelector(
  selectBookingListState,
  bookingListState => get('bookingList.status', bookingListState),
);

export const selectBookingList = createSelector(
  selectBookingListState,
  bookingListState => get('bookingList', bookingListState),
);
