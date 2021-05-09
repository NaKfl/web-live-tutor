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
  const { startTimeSelect, endTimeSelect } = selectors;
  return (
    <StyledRangeTimePicker>
      <RangePicker
        minuteStep={15}
        format={'HH:mm'}
        showNow={false}
        onChange={handleChangePickTime}
      />
      <Button
        className="btn-add"
        type="accent"
        onClick={() =>
          startTimeSelect &&
          endTimeSelect &&
          onAdd({ startTimeSelect, endTimeSelect })
        }
      >
        Add
      </Button>
    </StyledRangeTimePicker>
  );
};

export default RangeTimePicker;
