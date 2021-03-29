import React from 'react';
import { StyledRangeTimePicker } from './styles';
import { TimePicker } from 'antd';
import Button from 'app/components/Button';
import useHooks from './hooks';

const { RangePicker } = TimePicker;

const RangeTimePicker = props => {
  const { onAdd } = props;
  const { handlers, selectors } = useHooks(props);
  const { handleChangePickTime } = handlers;
  const { startTime, endTime } = selectors;
  return (
    <StyledRangeTimePicker>
      <RangePicker
        minuteStep={30}
        format={'HH:mm'}
        showNow={false}
        onChange={handleChangePickTime}
      />
      <Button
        className="mx-1"
        onClick={() => startTime && endTime && onAdd({ startTime, endTime })}
      >
        Add
      </Button>
    </StyledRangeTimePicker>
  );
};

export default RangeTimePicker;
