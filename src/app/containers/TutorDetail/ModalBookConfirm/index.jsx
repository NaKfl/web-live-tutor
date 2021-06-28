import { StyledModal, StyledTable } from './styles';
import { memo } from 'react';
import { useHooks, CONDITION_RENDER } from './hooks';
import { useTables } from './table.config';
import { BookingStatus } from './BookingStatus';
import Button from 'app/components/Button';
import { DoubleRightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useShowModal } from 'app/containers/AppLayout/hooks';

export const ModalBookConfirm = memo(() => {
  const { selectors, handlers } = useHooks();
  const tableConfig = useTables();
  const { t } = useTranslation();
  const { isModalVisible, getConditionRender } = selectors;
  const { onHideModalBooking, onConfirmBooking } = handlers;
  const { showPaymentModal } = useShowModal();

  return (
    <StyledModal
      title={t('BookingList.modalConfirm.title')}
      visible={isModalVisible}
      contentStyle={{
        backgroundColor: 'right',
      }}
      onCancel={() => onHideModalBooking()}
      footer={
        getConditionRender === CONDITION_RENDER.BOOKING
          ? [
              <Button key="back" onClick={onHideModalBooking}>
                {t('BookingList.modalConfirm.cancelBtn')}
              </Button>,
              <Button
                type="accent"
                key="booking"
                icon={<DoubleRightOutlined />}
                onClick={() => onConfirmBooking()}
              >
                {t('BookingList.modalConfirm.bookBtn')}
              </Button>,
            ]
          : getConditionRender === CONDITION_RENDER.SUCCESS
          ? [
              <Button key="done" onClick={onHideModalBooking}>
                {t('BookingList.modalConfirm.doneBtn')}
              </Button>,
            ]
          : [
              <Button key="back" onClick={onHideModalBooking}>
                {t('BookingList.modalConfirm.cancelBtn')}
              </Button>,
              <Button
                key="deposit"
                type="accent"
                onClick={() => {
                  onHideModalBooking();
                  showPaymentModal();
                }}
              >
                {t('BookingList.modalConfirm.depositBtn')}
              </Button>,
            ]
      }
    >
      {getConditionRender === CONDITION_RENDER.BOOKING ? (
        <StyledTable {...tableConfig} />
      ) : (
        <BookingStatus
          isSuccess={CONDITION_RENDER.SUCCESS === getConditionRender}
        />
      )}
    </StyledModal>
  );
});
