import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePicker, Row, Skeleton } from 'antd';
import TextTimeSchedule from 'app/components/TextTimeSchedule';
import moment from 'moment';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ACTION_STATUS, DATE_FORMAT } from 'utils/constants';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import useHooks from './hooks';
import saga from './saga';
import { reducer, sliceKey } from './slice';
import {
  StyledScheduleTutor,
  StyledCalendar,
  StyledHeaderTable,
} from './styles';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { sizes } from 'styles/media';
import { MoreOutlined } from '@ant-design/icons';
import calendar from 'assets/svg/calendar.svg';

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
  const { scheduleTutor, month, scheduleTutorStatus } = selectors;

  const { width } = useWindowDimensions();

  const getFreeTimesOfDate = (data, date) => {
    return data[date] || [];
  };
  function dateCellRender(value) {
    const dateOfCell = moment(value).format(DATE_FORMAT);
    const listFreeTime = getFreeTimesOfDate(scheduleTutor, dateOfCell);
    const dayOfDate = value.date();
    const compareToDateNow = moment(value).diff(moment(), 'days');
    if (compareToDateNow < 0) {
      return (
        <div className="ant-picker-cell-inner ant-picker-calendar-date">
          <div className="ant-picker-calendar-date-value invalid-date">
            {dayOfDate}
          </div>
          <div className="ant-picker-calendar-date-content">
            <Row className="flex-column align-content-center"></Row>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="ant-picker-cell-inner ant-picker-calendar-date"
          onClick={() =>
            handleSelectDate({ date: dateOfCell, freeTimes: listFreeTime })
          }
        >
          <div className="ant-picker-calendar-date-value">{dayOfDate}</div>
          <div className="ant-picker-calendar-date-content">
            <Row className="flex-column align-content-center">
              {(scheduleTutorStatus === ACTION_STATUS.PENDING &&
                [...Array(2)].map((_, index) => (
                  <Skeleton key={index} active paragraph={{ rows: 0 }} />
                ))) || (
                <>
                  {width >= sizes.tablet && listFreeTime?.length > 0 && (
                    <>
                      {listFreeTime.map(time => {
                        return (
                          <TextTimeSchedule
                            typeText="Purple"
                            content={`${time.startTime} - ${time.endTime}`}
                            key={time?.id}
                          />
                        );
                      })}
                    </>
                  )}
                  {width < sizes.tablet && listFreeTime?.length > 0 && (
                    <Row justify="center">
                      <MoreOutlined className="more-icon" />
                    </Row>
                  )}
                </>
              )}
            </Row>
          </div>
        </div>
      );
    }
  }

  const headerRender = () => {
    return (
      <div className="header-schedule">
        <StyledHeaderTable>
          <img className="image" src={calendar} alt="calendar" />
          <div className="content">
            <h2>{t('ScheduleTutor.title')}</h2>
            <p>{t('ScheduleTutor.guide')}</p>
            <p>{t('ScheduleTutor.subGuide')}</p>
          </div>
        </StyledHeaderTable>
        <div className="actions">
          <div style={{ width: 197 }}>
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
          </div>
          <button onClick={handleBackToToday} className="today-btn">
            {t('ScheduleTutor.toDay')}
          </button>
        </div>
      </div>
    );
  };

  return (
    <StyledScheduleTutor>
      <StyledCalendar
        dateFullCellRender={dateCellRender}
        headerRender={headerRender}
        mode="month"
        value={month}
      />
    </StyledScheduleTutor>
  );
};

export default memo(ScheduleTutor);
