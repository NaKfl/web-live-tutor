import useActions from 'hooks/useActions';
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  selectbookTimeSchedule,
  selectDetailScheduleTutor,
} from 'app/containers/ScheduleTutor/selectors';
import { actions } from 'app/containers/ScheduleTutor/slice';
import { notifySuccess, notifyError } from 'utils/notify';
import { ACTION_STATUS } from 'utils/constants';

export const useHooks = props => {
  const { scheduleId } = props;
  const [selectTimes, setSelectTimes] = useState([]);
  const [freeTimesTutor, setFreeTimes] = useState([]);
  const selectorBookTimeSchedule = useSelector(selectbookTimeSchedule);
  const selectorDetailScheduleTutor = useSelector(selectDetailScheduleTutor);

  const { bookTimeSchedule, getDetailSchedule } = useActions(
    {
      bookTimeSchedule: actions.bookTimeSchedule,
      getDetailSchedule: actions.getDetailSchedule,
    },
    [actions],
  );

  useEffect(() => {
    getDetailSchedule(scheduleId);
  }, [getDetailSchedule, scheduleId]);

  useEffect(() => {
    if (selectorDetailScheduleTutor.status === ACTION_STATUS.SUCCESS) {
      setFreeTimes(selectorDetailScheduleTutor.data);
    } else {
      setFreeTimes([]);
    }
  }, [selectorDetailScheduleTutor]);

  useEffect(() => {
    // if (selectorBookTimeSchedule.status === ACTION_STATUS.SUCCESS) {
    console.log('selectorBookTimeSchedule', selectorBookTimeSchedule);
    // notifySuccess('Booked Success');
    // getDetailSchedule(scheduleId);
    // }
  }, [selectorBookTimeSchedule]);

  const onChangeCheckBox = value => {
    setSelectTimes(value);
  };

  const handleBookTime = useCallback(() => {
    if (selectTimes.length > 0) {
      bookTimeSchedule({
        scheduleDetailIds: selectTimes,
      });
      notifySuccess('Booked Success');
      getDetailSchedule(scheduleId);
      props.onCancel();
    } else {
      notifyError('Select Time || All times are booked');
    }
  }, [bookTimeSchedule, selectTimes]);

  return {
    handlers: { onChangeCheckBox, handleBookTime },
    selectors: { freeTimesTutor },
  };
};

export default useHooks;
