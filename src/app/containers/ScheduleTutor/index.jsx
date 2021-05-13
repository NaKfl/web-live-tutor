import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePicker, Row } from 'antd';
import TextTimeSchedule from 'app/components/TextTimeSchedule';
import moment from 'moment';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import useHooks from './hooks';
import saga from './saga';
import { reducer, sliceKey } from './slice';
import {
  StyledEnglishCalendar,
  StyledScheduleTutor,
  StyledVietnameseCalendar,
} from './styles';

export const ScheduleTutor = () => {
  const { t } = useTranslation();

  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors } = useHooks();
  const {
    handleSelectDate,
    handleChangeMonth,
    handleIncreaseMonth,
    handleDecreaseMonth,
    handleBackToToday,
  } = handlers;
  const { scheduleTutor, month } = selectors;

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
              return (
                <TextTimeSchedule
                  typeText="Purple"
                  content={`${time.startTime} - ${time.endTime}`}
                ></TextTimeSchedule>
              );
            })}
          </Row>
        </div>
      </div>
    );
  }

  const headerRender = () => {
    return (
      <div className="header-schedule">
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="arrow arrow-left"
          onClick={handleDecreaseMonth}
        />
        <DatePicker
          inputReadOnly
          allowClear={false}
          suffixIcon={false}
          format={'MMM YYYY'}
          onChange={date => {
            handleChangeMonth(date);
          }}
          defaultValue={moment()}
          picker="month"
          value={month}
        />
        <FontAwesomeIcon
          icon={faAngleRight}
          className="arrow arrow-right"
          onClick={handleIncreaseMonth}
        />
        <button onClick={handleBackToToday} className="today-btn">
          {t('ScheduleTutor.toDay')}
        </button>
      </div>
    );
  };

  return (
    <StyledScheduleTutor>
      {(t('Common.default') === t('Common.en') && (
        <StyledEnglishCalendar
          dateFullCellRender={dateCellRender}
          headerRender={headerRender}
          mode="month"
          value={month}
        />
      )) || (
        <StyledVietnameseCalendar
          dateFullCellRender={dateCellRender}
          headerRender={headerRender}
          mode="month"
          value={month}
        />
      )}
    </StyledScheduleTutor>
  );
};

export default memo(ScheduleTutor);
