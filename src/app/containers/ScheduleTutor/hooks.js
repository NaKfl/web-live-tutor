import useActions from 'hooks/useActions';
import { actions as popupActions } from 'app/containers/Popup/slice';
import { useCallback, useEffect } from 'react';
import { POPUP_TYPE } from 'app/containers/Popup/constants';

const useHooks = () => {
  const { openPopup } = useActions({ openPopup: popupActions.openPopup }, [
    popupActions,
  ]);

  const handleSelectDate = useCallback(
    date => {
      openPopup({
        key: 'registerSchedule',
        type: POPUP_TYPE.SCHEDULE_REGISTER,
        date,
      });
    },
    [openPopup],
  );
  return {
    handlers: { handleSelectDate },
    selectors: {},
  };
};

export default useHooks;
