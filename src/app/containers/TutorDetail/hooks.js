import useActions from 'hooks/useActions';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectTutorDetailData } from './selectors';
import { actions } from './slice';
import { useEffect, useState, useCallback } from 'react';
import {
  selectScheduleTutorId,
  selectScheduleTutorByDate,
} from 'app/containers/ScheduleTutor/selectors';
import { actions as scheduleTutorActions } from 'app/containers/ScheduleTutor/slice';
import { ACTION_STATUS } from 'utils/constants';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';

const useHooks = () => {
  const { tutorId } = useParams();
  const user = getUserFromStorage();
  const tutorDetail = useSelector(selectTutorDetailData);
  const selectorScheduleTutor = useSelector(selectScheduleTutorId);
  const selectorScheduleTutorByDate = useSelector(selectScheduleTutorByDate);

  const {
    getTutorDetail,
    getFreeScheduleByTutorId,
    getFreeScheduleByDate,
  } = useActions(
    {
      getTutorDetail: actions.getTutorDetail,
      getFreeScheduleByTutorId: scheduleTutorActions.getFreeScheduleByTutorId,
      getFreeScheduleByDate: scheduleTutorActions.getFreeScheduleByDate,
    },
    [actions, scheduleTutorActions],
  );

  const [scheduleDatesTutor, setScheduleDatesTutor] = useState([]);
  const [freeTimesTutor, setFreeTimesTutor] = useState([]);
  const [dateSelected, setDateSelected] = useState('');
  const [isSelectDate, setIsSelectDate] = useState(false);

  useEffect(() => {
    getTutorDetail(tutorId);
  }, [getTutorDetail, tutorId]);

  useEffect(() => {
    getFreeScheduleByTutorId({
      tutorId,
    });
  }, [getFreeScheduleByTutorId, tutorId]);

  useEffect(() => {
    if (dateSelected) {
      getFreeScheduleByDate({
        date: dateSelected,
        tutorId,
      });
    }
  }, [getFreeScheduleByDate, dateSelected, tutorId]);

  useEffect(() => {
    if (selectorScheduleTutorByDate?.status === ACTION_STATUS.SUCCESS) {
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
        tutorId: tutorId,
      });
    },
    [getFreeScheduleByTutorId, tutorId],
  );

  return {
    selectors: {
      tutorDetail,
      isSelectDate,
      scheduleDatesTutor,
      dateSelected,
      user,
      freeTimesTutor,
    },
    handlers: {
      onSelectDate,
      handleBackSelectDate,
      handleSelectDatePicker,
    },
  };
};

export default useHooks;
