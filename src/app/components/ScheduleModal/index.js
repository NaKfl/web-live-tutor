import React, { memo } from 'react';
import { StyledModal } from './styles';
import { DeleteOutlined } from '@ant-design/icons';
import { Row, Typography, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import useHooks from './hooks';
import TextTimeSchedule from 'app/components/TextTimeSchedule';
import { StyledRangeTimePicker } from './styles';
import { TimePicker } from 'antd';
import Button from 'app/components/Button';
import moment from 'moment';

const { Title } = Typography;
const { RangePicker } = TimePicker;

const ScheduleModal = memo(props => {
  const { t } = useTranslation();
  const { handlers, selectors } = useHooks(props);
  const {
    handleAddDateSchedule,
    handleUnRegisterSchedule,
    handleChangePickTime,
  } = handlers;
  const { freeTimes, startTimeSelect, endTimeSelect } = selectors;
  const { visible, data, onCancel, ...rest } = props;

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
        <Title level={5}>Register Schedule </Title>
        <Row className="time-schedules flex-column align-items-center">
          {freeTimes.map(time => {
            const hoursStart = moment(time.startTime, 'HH:mm').hours();
            let typeText = 'Purple';
            if (hoursStart > 8) {
              typeText = 'Green';
            }
            if (hoursStart > 16) {
              typeText = 'Red';
            }
            return (
              <Row className="align-items-center w-100">
                <TextTimeSchedule
                  typeText={typeText}
                  content={`${time.startTime} - ${time.endTime}`}
                ></TextTimeSchedule>
                {!time.isBooked && (
                  <DeleteOutlined
                    className="ms-3"
                    onClick={() => handleUnRegisterSchedule(time.id)}
                  />
                )}
              </Row>
            );
          })}
        </Row>
        <StyledRangeTimePicker>
          <RangePicker
            minuteStep={15}
            format={'HH:mm'}
            showNow={false}
            onChange={handleChangePickTime}
          />
        </StyledRangeTimePicker>
        <Checkbox>Repeat Weeks</Checkbox>
        <StyledRangeTimePicker>
          <RangePicker
            minuteStep={15}
            format={'HH:mm'}
            showNow={false}
            onChange={handleChangePickTime}
          />
        </StyledRangeTimePicker>
        <Row className="justify-content-end mt-3">
          <Button className="me-2" key="cancel" onClick={onCancel}>
            Cancle
          </Button>
          <Button
            className="btn-add"
            type="accent"
            onClick={() =>
              startTimeSelect &&
              endTimeSelect &&
              handleAddDateSchedule({ startTimeSelect, endTimeSelect })
            }
          >
            Register
          </Button>
        </Row>
      </Row>
    </StyledModal>
  );
});

export default ScheduleModal;
