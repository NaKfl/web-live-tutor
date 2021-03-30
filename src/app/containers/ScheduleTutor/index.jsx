import React, { memo } from 'react';
import useHooks from './hooks';
import { useTranslation } from 'react-i18next';
import { Calendar, Badge, Row } from 'antd';
import { StyledScheduleTutor } from './styles';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
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
            {listFreeTime.map(time => (
              <li key={time.id}>
                <Badge
                  status={'success'}
                  text={`${time.startTime} - ${time.endTime}`}
                />
              </li>
            ))}
          </Row>
        </div>
      </div>
    );
  }

  return (
    <StyledScheduleTutor>
      <Calendar
        className="schedule-calender"
        dateFullCellRender={dateCellRender}
        mode="month"
      />
    </StyledScheduleTutor>
  );
};

export default memo(ScheduleTutor);
