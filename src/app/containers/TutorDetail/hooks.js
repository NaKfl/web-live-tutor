import useActions from 'hooks/useActions';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {
  selectTutorDetailData,
  selectScheduleTutorId,
  selectScheduleTutorByDate,
  selectbookTimeSchedule,
} from './selectors';
import { actions } from './slice';
import { useEffect, useState, useCallback } from 'react';
import { ACTION_STATUS } from 'utils/constants';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import { notifyError, notifySuccess } from 'utils/notify';

const useHooks = () => {
  const { tutorId } = useParams();
  const user = getUserFromStorage();
  const tutorDetail = useSelector(selectTutorDetailData);
  const selectorScheduleTutor = useSelector(selectScheduleTutorId);
  const selectorScheduleTutorByDate = useSelector(selectScheduleTutorByDate);
  const selectorBookTimeSchedule = useSelector(selectbookTimeSchedule);
  const [isShowedBtnBook, setBtnBook] = useState(false);
  const {
    getTutorDetail,
    getFreeScheduleByTutorId,
    getFreeScheduleByDate,
    bookTimeSchedule,
  } = useActions(
    {
      getTutorDetail: actions.getTutorDetail,
      getFreeScheduleByTutorId: actions.getFreeScheduleByTutorId,
      getFreeScheduleByDate: actions.getFreeScheduleByDate,
      bookTimeSchedule: actions.bookTimeSchedule,
    },
    [actions, actions],
  );

  const [scheduleDatesTutor, setScheduleDatesTutor] = useState([]);
  const [freeTimesTutor, setFreeTimesTutor] = useState([]);
  const [dateSelected, setDateSelected] = useState('');
  const [isSelectDate, setIsSelectDate] = useState(false);
  const [allTimesSelect, setAllTimesSelect] = useState([]);
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
  }, [
    getFreeScheduleByDate,
    dateSelected,
    tutorId,
    selectorBookTimeSchedule.data,
  ]);

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

  useEffect(() => {
    if (
      selectbookTimeSchedule &&
      selectbookTimeSchedule.status === ACTION_STATUS.SUCCESS
    ) {
      notifySuccess('Book Successfully');
    }
    if (
      selectbookTimeSchedule &&
      selectbookTimeSchedule.status === ACTION_STATUS.FAILED
    ) {
      notifyError('Error');
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

  const handleDisableBtnBook = useCallback(changedValues => {
    const isShowedBtnBook = Object.values(changedValues).some(
      item => item?.length > 0,
    );
    setBtnBook(isShowedBtnBook);
  }, []);

  const handleBookSchedule = useCallback(
    values => {
      const scheduleDetailIds = Object.values(values).flat();
      bookTimeSchedule({
        scheduleDetailIds,
      });
    },
    [bookTimeSchedule],
  );

  return {
    selectors: {
      tutorDetail,
      isSelectDate,
      scheduleDatesTutor,
      dateSelected,
      user,
      freeTimesTutor,
      isShowedBtnBook,
    },
    handlers: {
      onSelectDate,
      handleBackSelectDate,
      handleSelectDatePicker,
      handleDisableBtnBook,
      handleBookSchedule,
    },
  };
};

export default useHooks;
