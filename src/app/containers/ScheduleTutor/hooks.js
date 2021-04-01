import useActions from 'hooks/useActions';
import { actions as popupActions } from 'app/containers/Popup/slice';
import { useCallback, useEffect, useState } from 'react';
import { POPUP_TYPE } from 'app/containers/Popup/constants';
import { useSelector } from 'react-redux';
import { selectScheduleTutor } from './selectors';
import { ACTION_STATUS } from 'utils/constants';
import { actions } from './slice';

const useHooks = () => {
  const { openPopup } = useActions({ openPopup: popupActions.openPopup }, [
    popupActions,
  ]);
  const selectorScheduleTutor = useSelector(selectScheduleTutor);
  const { getFreeSchedule } = useActions(
    {
      getFreeSchedule: actions.getFreeSchedule,
    },
    [actions],
  );
  const [scheduleTutor, setScheduleTutor] = useState([]);

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
        data,
      });
    },
    [openPopup],
  );
  return {
    handlers: { handleSelectDate },
    selectors: { scheduleTutor },
  };
};

export default useHooks;
