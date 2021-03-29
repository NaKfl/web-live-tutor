import React, { memo } from 'react';
import useHooks from './hooks';
import { useTranslation } from 'react-i18next';
import { Calendar, Badge, Row } from 'antd';
import { StyledScheduleTutor } from './styles';

export const ScheduleTutor = () => {
  const { handlers, selectors } = useHooks();
  const { handleSelectDate } = handlers;
  const { t } = useTranslation();

  function getListData(value) {
    let listData;
    switch (value.date()) {
      case 10:
        listData = [
          { type: 'success', content: '8:00 - 11:00' },
          { type: 'success', content: '8:00 - 11:00' },
          { type: 'success', content: '8:00 - 11:00' },
        ];
        break;
      default:
    }
    return listData || [];
  }
  function dateCellRender(value) {
    const listData = getListData(value);
    const dayOfDate = value.date();
    return (
      <div
        class="ant-picker-cell-inner ant-picker-calendar-date"
        onClick={() => handleSelectDate(value)}
      >
        <div class="ant-picker-calendar-date-value">{dayOfDate}</div>
        <div class="ant-picker-calendar-date-content">
          <Row className="flex-column align-content-center">
            {listData.map(item => (
              <li key={item.content}>
                <Badge status={item.type} text={item.content} />
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
