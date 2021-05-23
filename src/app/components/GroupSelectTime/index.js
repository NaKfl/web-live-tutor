import { CheckSquareFilled } from '@ant-design/icons';
import { Checkbox, Row, Skeleton } from 'antd';
import React, { memo } from 'react';
import TextTimeSchedule from '../TextTimeSchedule';
import { StyledGroupSelectTime } from './styles';

const GroupSelectTime = memo(props => {
  const { scheduleDetails, isLoading, ...rest } = props;

  return (
    <StyledGroupSelectTime>
      {(isLoading &&
        [...Array(2)].map((_, index) => (
          <Skeleton key={index} active paragraph={{ rows: 0 }} />
        ))) || (
        <Checkbox.Group {...rest} style={{ width: '100%' }}>
          <Row className="flex-column">
            {(scheduleDetails || []).map(time => (
              <Checkbox
                value={time.id}
                key={time.id}
                checked={false}
                disabled={time.isBooked}
              >
                {time.isBooked && (
                  <CheckSquareFilled className="icon-checked" />
                )}
                <TextTimeSchedule
                  className="time-select"
                  typeText={time.isBooked ? 'Gray' : 'Purple'}
                  content={`${time.startPeriod} - ${time.endPeriod}`}
                />
              </Checkbox>
            ))}
          </Row>
        </Checkbox.Group>
      )}
    </StyledGroupSelectTime>
  );
});

export default GroupSelectTime;
