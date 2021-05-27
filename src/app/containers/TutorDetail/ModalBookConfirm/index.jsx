import { Modal } from 'antd';
import { StyledTable } from './styles';
import { memo } from 'react';
import { useHooks, CONDITION_RENDER } from './hooks';
import { useTables } from './table.config';
import { BookingStatus } from './BookingStatus';
import Button from 'app/components/Button';
import { DoubleRightOutlined } from '@ant-design/icons';

export const ModalBookConfirm = memo(() => {
  const { selectors, handlers } = useHooks();
  const tableConfig = useTables();

  const { isModalVisible, getConditionRender } = selectors;
  const { onHideModalBooking, onConfirmBooking } = handlers;

  return (
    <Modal
      title="Booking details"
      visible={isModalVisible}
      contentStyle={{
        backgroundColor: 'right',
      }}
      onCancel={() => onHideModalBooking()}
      footer={
        getConditionRender === CONDITION_RENDER.BOOKING
          ? [
              <Button key="back" onClick={onHideModalBooking}>
                Return
              </Button>,
              <Button
                type="accent"
                key="booking"
                icon={<DoubleRightOutlined />}
                onClick={() => onConfirmBooking()}
              >
                Booking
              </Button>,
            ]
          : getConditionRender === CONDITION_RENDER.SUCCESS
          ? [
              <Button key="done" onClick={onHideModalBooking}>
                Done
              </Button>,
            ]
          : [
              <Button key="back" onClick={onHideModalBooking}>
                Cancel
              </Button>,
              <Button key="deposit" type="accent">
                Deposit
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
    </Modal>
  );
});
