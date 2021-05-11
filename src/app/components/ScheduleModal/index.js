import React, { memo } from 'react';
import { StyledModal } from './styles';
import {
  DeleteOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { Row, Typography, DatePicker, Badge } from 'antd';
import { useTranslation } from 'react-i18next';
import useHooks from './hooks';
import TextTimeSchedule from 'app/components/TextTimeSchedule';
import { StyledRangeTimePicker } from './styles';
import { TimePicker, Switch } from 'antd';
import Button from 'app/components/Button';
import moment from 'moment';

const { Title } = Typography;
const { RangePicker } = TimePicker;

const ScheduleModal = memo(props => {
  const { handlers, selectors } = useHooks(props);
  const {
    handleAddDateSchedule,
    handleUnRegisterSchedule,
    handleChangePickTime,
    onChangeRepeatDay,
    onChangeEndDate,
  } = handlers;
  const { freeTimes, startTimeSelect, endTimeSelect, isRepeated } = selectors;
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
              <Row className="align-items-center w-100 justify-content-between">
                <TextTimeSchedule
                  typeText={typeText}
                  content={`${time.startTime} - ${time.endTime}`}
                ></TextTimeSchedule>
                {!time.isBooked && (
                  <DeleteOutlined
                    style={{
                      fontSize: '16px',
                      color: '#5f6368',
                      fill: '#5f6368',
                    }}
                    className="ms-3"
                    onClick={() => handleUnRegisterSchedule(time.id)}
                  />
                )}
              </Row>
            );
          })}
        </Row>
        <StyledRangeTimePicker>
          <ClockCircleOutlined
            style={{
              fontSize: '16px',
              color: '#5f6368',
              fill: '#5f6368',
              marginRight: '24px',
            }}
          />

          <RangePicker
            minuteStep={15}
            format={'HH:mm'}
            showNow={false}
            suffixIcon={false}
            onChange={handleChangePickTime}
          />
        </StyledRangeTimePicker>
        <Row>
          <Switch
            size="small"
            onChange={onChangeRepeatDay}
            defaultChecked={false}
            style={{
              marginRight: '24px',
            }}
          />
          <span>Repeat until the date</span>
        </Row>
        {isRepeated && (
          <StyledRangeTimePicker>
            <CalendarOutlined
              style={{
                fontSize: '16px',
                color: '#5f6368',
                fill: '#5f6368',
                marginRight: '24px',
              }}
            />

            <DatePicker onChange={onChangeEndDate} suffixIcon={false} />
          </StyledRangeTimePicker>
        )}

        <Row className="mt-3 justify-content-end">
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
