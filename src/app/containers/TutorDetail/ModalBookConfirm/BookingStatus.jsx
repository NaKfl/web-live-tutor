import { memo } from 'react';
import { Result } from 'antd';
import { useTranslation } from 'react-i18next';

export const BookingStatus = memo(({ isSuccess = false }) => {
  const { t } = useTranslation();
  return (
    <Result
      status={isSuccess ? 'success' : 'error'}
      title={
        isSuccess
          ? t('BookingList.modalConfirm.successTitle')
          : t('BookingList.modalConfirm.errorTitle')
      }
      subTitle={
        isSuccess
          ? t('BookingList.modalConfirm.successSubTitle')
          : t('BookingList.modalConfirm.errorSubTitle')
      }
    />
  );
});
