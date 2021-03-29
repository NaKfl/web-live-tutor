import { useState, useEffect } from 'react';
import moment from 'moment';

export const TIME = {
  startTime: 0,
  endTime: 1,
  total: 2,
};

export const useHooks = props => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

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
    selectors: { startTime, endTime },
  };
};

export default useHooks;
