import React, { memo } from 'react';
import { StyledModal } from './styles';
import { DeleteOutlined } from '@ant-design/icons';
import { Row, Typography, Badge } from 'antd';
import { useTranslation } from 'react-i18next';
import useHooks from './hooks';
import RangeTimePicker from 'app/components/RangeTimePicker';
const { Title } = Typography;

const ScheduleModal = memo(props => {
  const { t } = useTranslation();
  const { handlers } = useHooks(props);
  const { handleAddDateSchedule } = handlers;
  const { visible, onCancel, userCall, ...rest } = props;

  return (
    <StyledModal
      centered
      closable={false}
      visible={visible}
      onCancel={onCancel}
      footer={false}
      {...rest}
    >
      <Row className="flex-column">
        <Title level={4}>Register Schedule</Title>
        <Row className="time-schedules flex-column p-2 mb-4 align-items-center">
          <Row className="align-items-center">
            <Badge status={'success'} text={'8:00 - 11:00'} />
            <DeleteOutlined className="ms-5" />
          </Row>
          <Row className="align-items-center">
            <Badge status={'success'} text={'8:00 - 11:00'} />
            <DeleteOutlined className="ms-5" />
          </Row>
          <Row className="align-items-center">
            <Badge status={'success'} text={'8:00 - 11:00'} />
            <DeleteOutlined className="ms-5" />
          </Row>
        </Row>
        <RangeTimePicker onAdd={handleAddDateSchedule} />
      </Row>
    </StyledModal>
  );
});

export default ScheduleModal;
