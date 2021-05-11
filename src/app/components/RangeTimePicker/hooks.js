import { useState } from 'react';

export const TIME = {
  startTime: 0,
  endTime: 1,
  total: 2,
};

export const useHooks = props => {
  const [startTimeSelect, setStartTime] = useState(null);
  const [endTimeSelect, setEndTime] = useState(null);

  const handleChangePickTime = time => {
    if (time && time.length === TIME.total) {
      setStartTime(time[TIME.startTime]);
      setEndTime(time[TIME.endTime]);
    } else {
      setStartTime(null);
      setEndTime(null);
    }
  };

  return {
    handlers: { handleChangePickTime },
    selectors: { startTimeSelect, endTimeSelect },
  };
};

export default useHooks;
