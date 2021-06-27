import React, { memo } from 'react';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import { useHooks } from './hooks';
import saga from './saga';
import { reducer, sliceKey } from './slice';
import { StyledBookingList } from './styles';
import BookingListTable from './BookingListTable';

export const BookingListForTutor = () => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors, handlers } = useHooks();
  const { bookingList } = selectors;
  const { onChangePage } = handlers;

  return (
    <StyledBookingList>
      <BookingListTable
        onChangePage={onChangePage}
        totalCount={bookingList.length}
        dataSource={bookingList}
      ></BookingListTable>
    </StyledBookingList>
  );
};

export default memo(BookingListForTutor);
