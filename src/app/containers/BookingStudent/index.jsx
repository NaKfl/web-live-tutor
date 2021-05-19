import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import { useHooks } from './hooks';
import saga from './saga';
import { reducer, sliceKey } from './slice';
import { StyledBookingList } from './styles';
import BookingListTable from './BookingListTable';

export const BookingStudent = () => {
  const { t } = useTranslation();
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors, handlers } = useHooks();
  const { bookingList } = selectors;
  const { onChangePage, handleCancelBooking } = handlers;
  return (
    <StyledBookingList>
      <BookingListTable
        onChangePage={onChangePage}
        totalCount={bookingList.length}
        handleCancelBooking={handleCancelBooking}
        dataSource={bookingList}
      ></BookingListTable>
    </StyledBookingList>
  );
};

export default memo(BookingStudent);
