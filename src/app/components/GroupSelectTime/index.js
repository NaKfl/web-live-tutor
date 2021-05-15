import { Checkbox, Row, Typography } from 'antd';
import React, { memo } from 'react';
import TextTimeSchedule from '../TextTimeSchedule';
import { StyledGroupSelectTime } from './styles';
import { CheckSquareFilled } from '@ant-design/icons';

const GroupSelectTime = memo(props => {
  const { scheduleDetails, ...rest } = props;

  return (
    <StyledGroupSelectTime>
      <Checkbox.Group {...rest} style={{ width: '100%' }}>
        <Row className="flex-column">
          {(scheduleDetails || []).map(time => (
            <Checkbox
              value={time.id}
              key={time.id}
              checked={false}
              disabled={time.isBooked}
            >
              {time.isBooked && <CheckSquareFilled className="icon-checked" />}
              <TextTimeSchedule
                className="time-select"
                typeText={time.isBooked ? 'Gray' : 'Purple'}
                content={`${time.startPeriod} - ${time.endPeriod}`}
              />
            </Checkbox>
          ))}
        </Row>
      </Checkbox.Group>
    </StyledGroupSelectTime>
  );
});

export default GroupSelectTime;
