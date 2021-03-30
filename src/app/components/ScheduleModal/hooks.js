import useActions from 'hooks/useActions';
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  selectRegisterSchedule,
  selectUnRegisterSchedule,
  selectScheduleTutorByDate,
} from 'app/containers/ScheduleTutor/selectors';
import { actions } from 'app/containers/ScheduleTutor/slice';
import { ACTION_STATUS } from 'utils/constants';
import moment from 'moment';

export const useHooks = props => {
  const { date } = props;
  const selectorRegisterSchedule = useSelector(selectRegisterSchedule);
  const selectorUnRegisterSchedule = useSelector(selectUnRegisterSchedule);
  const selectorScheduleTutorByDate = useSelector(selectScheduleTutorByDate);
  const [freeTimes, setFreeTimes] = useState([]);

  const {
    registerSchedule,
    unRegisterSchedule,
    getFreeScheduleByDate,
  } = useActions(
    {
      registerSchedule: actions.registerSchedule,
      unRegisterSchedule: actions.unRegisterSchedule,
      getFreeScheduleByDate: actions.getFreeScheduleByDate,
    },
    [actions],
  );

  useEffect(() => {
    console.log('aaa', date.date);
    getFreeScheduleByDate(date.date);
  }, []);

  useEffect(() => {
    if (selectorScheduleTutorByDate.status === ACTION_STATUS.SUCCESS) {
      setFreeTimes(selectorScheduleTutorByDate.data[date.date]);
    } else {
      setFreeTimes([]);
    }
  }, [selectorScheduleTutorByDate]);

  useEffect(() => {
    if (
      selectorRegisterSchedule.status === ACTION_STATUS.SUCCESS ||
      selectorUnRegisterSchedule.status === ACTION_STATUS.SUCCESS
    ) {
      getFreeScheduleByDate(date.date);
    }
  }, [
    selectorRegisterSchedule,
    selectorUnRegisterSchedule,
    date,
    getFreeScheduleByDate,
  ]);

  const handleAddDateSchedule = ({ startTimeSelect, endTimeSelect }) => {
    const startTime = moment(startTimeSelect).format('HH:mm');
    const endTime = moment(endTimeSelect).format('HH:mm');
    registerSchedule({
      startTime,
      endTime,
      date: date.date,
    });
  };

  const handleUnRegisterSchedule = id => {
    unRegisterSchedule(id);
  };

  return {
    handlers: { handleAddDateSchedule, handleUnRegisterSchedule },
    selectors: { freeTimes },
  };
};

export default useHooks;
