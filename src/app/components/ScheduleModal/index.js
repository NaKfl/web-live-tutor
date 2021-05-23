import { DeleteOutlined } from '@ant-design/icons';
import {
  Col,
  DatePicker,
  Empty,
  Row,
  Skeleton,
  Switch,
  TimePicker,
  Typography,
} from 'antd';
import Button from 'app/components/Button';
import TextTimeSchedule from 'app/components/TextTimeSchedule';
import moment from 'moment';
import React, { memo } from 'react';
import useHooks from './hooks';
import { StyledModal, StyledRangeTimePicker } from './styles';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;
const { RangePicker } = TimePicker;

const ScheduleModal = memo(props => {
  const { t } = useTranslation();
  const { handlers, selectors } = useHooks(props);
  const {
    handleAddDateSchedule,
    handleUnRegisterSchedule,
    handleChangePickTime,
    onChangeRepeatDay,
    onChangeEndDate,
  } = handlers;
  const {
    currentDate,
    freeTimes,
    startTimeSelect,
    endTimeSelect,
    isRepeated,
  } = selectors;
  const { visible, data, onCancel, ...rest } = props;
  const { isLoading } = data;

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
        <Title className="title">
          {`${t('ScheduleTutor.schedule')} ${moment(currentDate).format(
            'DD/MM/YYYY',
          )}`}
        </Title>
        <h3 className="sub-title">{t('ScheduleTutor.registeredSchedule')}</h3>
        <Row className="time-schedules flex-column align-items-center">
          {(isLoading &&
            [...Array(freeTimes.length || 2)].map((_, index) => (
              <Skeleton key={index} active paragraph={{ rows: 0 }} />
            ))) || (
            <>
              {(freeTimes.length &&
                freeTimes.map(time => {
                  return (
                    <Row
                      className="align-items-center justify-content-between w-100"
                      align="middle"
                      key={time.id}
                    >
                      <Col span={21}>
                        <Row justify="end">
                          <TextTimeSchedule
                            typeText="Purple"
                            content={`${time.startTime} - ${time.endTime}`}
                          />
                        </Row>
                      </Col>
                      <Col span={3}>
                        {!time.isBooked && (
                          <DeleteOutlined
                            style={{
                              fontSize: '16px',
                              color: '#5f6368',
                              fill: '#5f6368',
                              marginBottom: 10,
                              paddingLeft: 10,
                            }}
                            onClick={() => handleUnRegisterSchedule(time.id)}
                          />
                        )}
                      </Col>
                    </Row>
                  );
                })) || (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="Empty"
                />
              )}
            </>
          )}
        </Row>
        <h3 className="sub-title">{t('ScheduleTutor.registerNewSchedule')}</h3>
        <Row>
          <Col span={21}>
            <Row justify="end">
              <StyledRangeTimePicker>
                <RangePicker
                  minuteStep={15}
                  format={'HH:mm'}
                  showNow={false}
                  suffixIcon={false}
                  onChange={handleChangePickTime}
                />
              </StyledRangeTimePicker>
            </Row>
            <Row align="middle" style={{ marginLeft: 18, marginTop: 5 }}>
              <Col span={12}>
                <Row align="middle">
                  <Switch
                    size="small"
                    onChange={onChangeRepeatDay}
                    defaultChecked={false}
                    style={{
                      marginRight: 7,
                    }}
                  />
                  <span>{t('ScheduleTutor.repeatUtil')}</span>
                </Row>
              </Col>
              <Col span={12}>
                <Row justify="end">
                  <StyledRangeTimePicker>
                    <DatePicker
                      disabled={!isRepeated}
                      onChange={onChangeEndDate}
                      suffixIcon={false}
                    />
                  </StyledRangeTimePicker>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Button
              className="btn-add"
              type="accent"
              onClick={() =>
                startTimeSelect &&
                endTimeSelect &&
                handleAddDateSchedule({ startTimeSelect, endTimeSelect })
              }
            >
              +
            </Button>
          </Col>
        </Row>
      </Row>
      <Row className="mt-3 justify-content-end">
        <Button key="cancel" onClick={onCancel}>
          {t('Common.cancel')}
        </Button>
      </Row>
    </StyledModal>
  );
});

export default ScheduleModal;
