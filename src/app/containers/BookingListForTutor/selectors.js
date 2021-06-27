import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectBookingListState = state => state.bookingList;

export const selectBookingListData = createSelector(
  selectBookingListState,
  bookingListState => get('bookingList.data', bookingListState),
);

export const selectBookingList = createSelector(
  selectBookingListState,
  bookingListState => get('bookingList', bookingListState),
);
