import useActions from 'hooks/useActions';
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  selectScheduleTutorId,
  selectScheduleTutorByDate,
} from 'app/containers/ScheduleTutor/selectors';
import { actions } from 'app/containers/ScheduleTutor/slice';
import { ACTION_STATUS } from 'utils/constants';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';

export const useHooks = props => {
  const {
    tutor: { userId },
  } = props;
  const user = getUserFromStorage();
  const selectorScheduleTutor = useSelector(selectScheduleTutorId);
  const selectorScheduleTutorByDate = useSelector(selectScheduleTutorByDate);
  const { getFreeScheduleByTutorId, getFreeScheduleByDate } = useActions(
    {
      getFreeScheduleByTutorId: actions.getFreeScheduleByTutorId,
      getFreeScheduleByDate: actions.getFreeScheduleByDate,
    },
    [actions],
  );

  const [scheduleDatesTutor, setScheduleDatesTutor] = useState([]);
  const [freeTimesTutor, setFreeTimesTutor] = useState([]);
  const [dateSelected, setDateSelected] = useState('');
  const [isSelectDate, setIsSelectDate] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);

  useEffect(() => {
    getFreeScheduleByTutorId({
      tutorId: userId,
    });
  }, [getFreeScheduleByTutorId, userId]);

  useEffect(() => {
    if (dateSelected) {
      getFreeScheduleByDate({
        date: dateSelected,
        tutorId: userId,
      });
    }
  }, [getFreeScheduleByDate, dateSelected, userId]);

  useEffect(() => {
    if (selectorScheduleTutorByDate.status === ACTION_STATUS.SUCCESS) {
      setFreeTimesTutor(selectorScheduleTutorByDate.data);
    } else {
      setFreeTimesTutor([]);
    }
  }, [selectorScheduleTutorByDate]);

  useEffect(() => {
    if (
      selectorScheduleTutor &&
      selectorScheduleTutor.status === ACTION_STATUS.SUCCESS
    ) {
      setScheduleDatesTutor(selectorScheduleTutor.data);
    } else {
      setScheduleDatesTutor([]);
    }
  }, [selectorScheduleTutor]);

  const onSelectDate = useCallback(value => {
    setDateSelected(value);
    setIsSelectDate(true);
  }, []);

  const handleBackSelectDate = useCallback(() => {
    setIsSelectDate(false);
  }, []);

  const handleSelectDatePicker = useCallback(
    dateOfCell => {
      setDateSelected(dateOfCell);
      getFreeScheduleByTutorId({
        tutorId: userId,
      });
    },
    [getFreeScheduleByTutorId, userId],
  );

  const toggleMessage = useCallback(() => {
    setIsShowMessage(prevState => !prevState);
  }, []);

  return {
    handlers: {
      onSelectDate,
      handleBackSelectDate,
      toggleMessage,
      handleSelectDatePicker,
    },
    selectors: {
      isSelectDate,
      isShowMessage,
      scheduleDatesTutor,
      dateSelected,
      user,
      freeTimesTutor,
    },
  };
};

export default useHooks;
