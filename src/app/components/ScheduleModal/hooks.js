import useActions from 'hooks/useActions';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectRegisterSchedule,
  selectUnRegisterSchedule,
  selectScheduleTutorByDate,
} from 'app/containers/ScheduleTutor/selectors';
import { actions } from 'app/containers/ScheduleTutor/slice';
import { ACTION_STATUS } from 'utils/constants';
import moment from 'moment';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';

export const useHooks = props => {
  const { data } = props;
  const user = getUserFromStorage();
  const selectorRegisterSchedule = useSelector(selectRegisterSchedule);
  const selectorUnRegisterSchedule = useSelector(selectUnRegisterSchedule);
  const selectorScheduleTutorByDate = useSelector(selectScheduleTutorByDate);
  const [freeTimes, setFreeTimes] = useState([]);

  const {
    registerSchedule,
    unRegisterSchedule,
    getFreeScheduleByDate,
    getFreeSchedule,
  } = useActions(
    {
      registerSchedule: actions.registerSchedule,
      getFreeSchedule: actions.getFreeSchedule,
      unRegisterSchedule: actions.unRegisterSchedule,
      getFreeScheduleByDate: actions.getFreeScheduleByDate,
    },
    [actions],
  );

  useEffect(() => {
    getFreeScheduleByDate({
      date: data.date,
      tutorId: user.id,
    });
  }, [getFreeScheduleByDate, data]);

  useEffect(() => {
    if (selectorScheduleTutorByDate.status === ACTION_STATUS.SUCCESS) {
      setFreeTimes(selectorScheduleTutorByDate.data);
    } else {
      setFreeTimes([]);
    }
  }, [selectorScheduleTutorByDate]);

  useEffect(() => {
    if (
      selectorRegisterSchedule.status === ACTION_STATUS.SUCCESS ||
      selectorUnRegisterSchedule.status === ACTION_STATUS.SUCCESS
    ) {
      getFreeSchedule();
      getFreeScheduleByDate({
        date: data.date,
        tutorId: user.id,
      });
    }
  }, [
    selectorRegisterSchedule,
    selectorUnRegisterSchedule,
    data,
    getFreeSchedule,
    user.id,
    getFreeScheduleByDate,
  ]);

  const handleAddDateSchedule = ({ startTimeSelect, endTimeSelect }) => {
    const startTime = moment(startTimeSelect).format('HH:mm');
    const endTime = moment(endTimeSelect).format('HH:mm');
    registerSchedule({
      startTime,
      endTime,
      date: data.date,
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
