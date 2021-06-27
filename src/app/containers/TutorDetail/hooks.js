/* eslint-disable react-hooks/exhaustive-deps */
import useActions from 'hooks/useActions';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {
  selectTutorDetailData,
  selectScheduleTutorId,
  selectScheduleTutorByDate,
  selectbookTimeSchedule,
  selectTutorDetailStatus,
  selectScheduleTutorByDateStatus,
  selectDetailScheduleTutorStatus,
  selectScheduleTutorIdStatus,
} from './selectors';
import { actions } from './slice';
import { actions as homeActions } from 'app/containers/Home/slice';
import { useEffect, useState, useCallback, useRef } from 'react';
import { ACTION_STATUS } from 'utils/constants';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import { actions as popupActions } from 'app/containers/Popup/slice';
import { Form } from 'antd';
import { POPUP_TYPE } from '../Popup/constants';

const useHooks = () => {
  const { tutorId } = useParams();
  const user = getUserFromStorage();
  const tutorDetail = useSelector(selectTutorDetailData);
  const selectorScheduleTutor = useSelector(selectScheduleTutorId);
  const selectorScheduleTutorByDate = useSelector(selectScheduleTutorByDate);
  const selectorBookTimeSchedule = useSelector(selectbookTimeSchedule);
  const getTutorDetailStatus = useSelector(selectTutorDetailStatus);
  const detailScheduleTutorStatus = useSelector(
    selectDetailScheduleTutorStatus,
  );
  const scheduleTutorByDateStatus = useSelector(
    selectScheduleTutorByDateStatus,
  );
  const scheduleTutorIdStatus = useSelector(selectScheduleTutorIdStatus);
  const [isShowedBtnBook, setBtnBook] = useState(false);
  const [form] = Form.useForm();
  const scheduleRef = useRef();
  const {
    getTutorDetail,
    getFreeScheduleByTutorId,
    getFreeScheduleByDate,
    showModalBooking,
    openPopup,
    manageFavoriteTutor,
  } = useActions(
    {
      getTutorDetail: actions.getTutorDetail,
      getFreeScheduleByTutorId: actions.getFreeScheduleByTutorId,
      getFreeScheduleByDate: actions.getFreeScheduleByDate,
      bookTimeSchedule: actions.bookTimeSchedule,
      showModalBooking: actions.showModalBooking,
      manageFavoriteTutor: homeActions.manageFavoriteTutor,
      openPopup: popupActions.openPopup,
    },
    [actions, popupActions, homeActions],
  );

  const [scheduleDatesTutor, setScheduleDatesTutor] = useState([]);
  const [freeTimesTutor, setFreeTimesTutor] = useState([]);
  const [dateSelected, setDateSelected] = useState('');
  const [isSelectDate, setIsSelectDate] = useState(false);
  const [isFavorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(tutorDetail.isFavorite);
  }, [tutorDetail]);

  useEffect(() => {
    getTutorDetail(tutorId);
  }, [tutorId]);

  useEffect(() => {
    getFreeScheduleByTutorId({
      tutorId,
    });
  }, [tutorId]);

  useEffect(() => {
    if (dateSelected) {
      getFreeScheduleByDate({
        date: dateSelected,
        tutorId,
      });
    }
  }, [dateSelected]);

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
      selectorBookTimeSchedule &&
      selectorBookTimeSchedule.status === ACTION_STATUS.SUCCESS
    ) {
      form.resetFields();
    }
  }, [form, selectorBookTimeSchedule]);

  const onClickHeart = useCallback(data => {
    setFavorite(pre => !pre);
    manageFavoriteTutor(data);
  }, []);

  const onSelectDate = useCallback(value => {
    setDateSelected(value);
    setIsSelectDate(true);
  }, []);

  const handleBackSelectDate = useCallback(() => {
    setIsSelectDate(false);
  }, []);

  const handleSelectDatePicker = useCallback(dateOfCell => {
    setDateSelected(dateOfCell);
  }, []);

  const handleDisableBtnBook = useCallback(allValues => {
    const isShowedBtnBook = Object.values(allValues).some(
      item => item?.length > 0,
    );
    setBtnBook(isShowedBtnBook);
  }, []);

  const handleBookSchedule = useCallback(
    values => {
      const ids = Object.values(values).flat();
      const scheduleDetailIds = ids.filter(item => item != null);
      showModalBooking(scheduleDetailIds);
    },
    [showModalBooking],
  );

  const handleShowReviews = useCallback(
    reviews => {
      openPopup({
        key: 'reviews-modal',
        type: POPUP_TYPE.REVIEW_MODAL,
        reviews,
      });
    },
    [openPopup],
  );
  const executeScroll = () => {
    window.scrollTo({ top: scheduleRef.current.offsetTop, behavior: 'smooth' });
    // scheduleRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return {
    selectors: {
      tutorDetail,
      isSelectDate,
      scheduleDatesTutor,
      dateSelected,
      user,
      freeTimesTutor,
      isShowedBtnBook,
      form,
      getTutorDetailStatus,
      scheduleTutorByDateStatus,
      detailScheduleTutorStatus,
      scheduleTutorIdStatus,
      scheduleRef,
      isFavorite,
    },
    handlers: {
      onSelectDate,
      handleBackSelectDate,
      handleSelectDatePicker,
      handleDisableBtnBook,
      handleBookSchedule,
      handleShowReviews,
      executeScroll,
      onClickHeart,
    },
  };
};

export default useHooks;
