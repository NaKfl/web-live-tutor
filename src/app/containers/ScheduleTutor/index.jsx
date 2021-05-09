import React, { memo } from 'react';
import useHooks from './hooks';
import { useTranslation } from 'react-i18next';
import { Calendar, Badge, Row } from 'antd';
import { StyledScheduleTutor } from './styles';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import { Select, DatePicker, Col, Typography } from 'antd';
import Button from 'app/components/Button';
import TextTimeSchedule from 'app/components/TextTimeSchedule';
import { reducer, sliceKey } from './slice';
import saga from './saga';
import moment from 'moment';

export const ScheduleTutor = () => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors } = useHooks();
  const { handleSelectDate } = handlers;
  const { scheduleTutor } = selectors;
  const { t } = useTranslation();

  const getFreeTimesOfDate = (data, date) => {
    return data[date] || [];
  };
  function dateCellRender(value) {
    const dateOfCell = moment(value).format('YYYY-MM-DD');
    const listFreeTime = getFreeTimesOfDate(scheduleTutor, dateOfCell);
    const dayOfDate = value.date();
    return (
      <div
        class="ant-picker-cell-inner ant-picker-calendar-date"
        onClick={() =>
          handleSelectDate({ date: dateOfCell, freeTimes: listFreeTime })
        }
      >
        <div class="ant-picker-calendar-date-value">{dayOfDate}</div>
        <div class="ant-picker-calendar-date-content">
          <Row className="flex-column align-content-center">
            {listFreeTime.map(time => {
              const hoursStart = moment(time.startTime, 'HH:mm').hours();
              let typeText = 'Purple';
              if (hoursStart > 8) {
                typeText = 'Green';
              }
              if (hoursStart > 16) {
                typeText = 'Red';
              }
              return (
                <TextTimeSchedule
                  typeText={typeText}
                  content={`${time.startTime} - ${time.endTime}`}
                ></TextTimeSchedule>
              );
            })}
          </Row>
        </div>
      </div>
    );
  }

  const headerRender = ({ value, type, onChange, onTypeChange }) => {
    return (
      <div className="header-schedule">
        <DatePicker
          format={'MMMM YYYY'}
          onChange={(date, dateString) => {
            onChange(date);
          }}
          defaultValue={moment()}
          picker="month"
        />
      </div>
    );
  };

  return (
    <StyledScheduleTutor>
      <Calendar
        className="schedule-calender"
        dateFullCellRender={dateCellRender}
        headerRender={headerRender}
        mode="month"
      />
    </StyledScheduleTutor>
  );
};

export default memo(ScheduleTutor);
