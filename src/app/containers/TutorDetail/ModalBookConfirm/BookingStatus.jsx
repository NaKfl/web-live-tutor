import { memo } from 'react';
import { Result } from 'antd';

export const BookingStatus = memo(({ isSuccess = false }) => {
  return (
    <Result
      status={isSuccess ? 'success' : 'error'}
      title={isSuccess ? 'Booking success' : 'Booking failed'}
      subTitle={
        isSuccess
          ? "Check your mail's inbox to see detail order"
          : 'Your current money is not enough to pay'
      }
    />
  );
});
