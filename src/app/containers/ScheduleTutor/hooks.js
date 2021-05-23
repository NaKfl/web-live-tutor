import useActions from 'hooks/useActions';
import { actions as popupActions } from 'app/containers/Popup/slice';
import { useCallback, useEffect, useState } from 'react';
import { POPUP_TYPE } from 'app/containers/Popup/constants';
import { useSelector } from 'react-redux';
import {
  selectScheduleTutor,
  selectScheduleTutorStatus,
  selectScheduleTutorByDateStatus,
} from './selectors';
import { ACTION_STATUS } from 'utils/constants';
import { actions } from './slice';
import moment from 'moment';

const useHooks = () => {
  const { openPopup } = useActions({ openPopup: popupActions.openPopup }, [
    popupActions,
  ]);
  const selectorScheduleTutor = useSelector(selectScheduleTutor);
  const scheduleTutorStatus = useSelector(selectScheduleTutorStatus);
  const scheduleTutorByDateStatus = useSelector(
    selectScheduleTutorByDateStatus,
  );
  const { getFreeSchedule } = useActions(
    {
      getFreeSchedule: actions.getFreeSchedule,
    },
    [actions],
  );
  const [scheduleTutor, setScheduleTutor] = useState([]);
  const [month, setMonth] = useState(moment());

  useEffect(() => {
    getFreeSchedule();
  }, [getFreeSchedule]);

  useEffect(() => {
    if (
      selectorScheduleTutor &&
      selectorScheduleTutor.status === ACTION_STATUS.SUCCESS
    ) {
      setScheduleTutor(selectorScheduleTutor.data);
    } else {
      setScheduleTutor([]);
    }
  }, [selectorScheduleTutor]);

  const handleSelectDate = useCallback(
    data => {
      openPopup({
        key: 'registerSchedule',
        type: POPUP_TYPE.SCHEDULE_REGISTER,
        data: {
          ...data,
          isLoading: scheduleTutorByDateStatus === ACTION_STATUS.PENDING,
        },
      });
    },
    [openPopup, scheduleTutorByDateStatus],
  );

  const handleChangeMonth = useCallback(month => {
    setMonth(month);
  }, []);

  const handleIncreaseMonth = useCallback(() => {
    setMonth(prev => moment(prev).add(1, 'month'));
  }, []);

  const handleDecreaseMonth = useCallback(() => {
    setMonth(prev => moment(prev).add(-1, 'month'));
  }, []);

  const handleBackToToday = useCallback(() => {
    setMonth(moment());
  }, []);

  return {
    handlers: {
      handleSelectDate,
      handleChangeMonth,
      handleIncreaseMonth,
      handleDecreaseMonth,
      handleBackToToday,
    },
    selectors: { scheduleTutor, month, scheduleTutorStatus },
  };
};

export default useHooks;
