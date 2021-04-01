import useActions from 'hooks/useActions';
import { actions as popupActions } from 'app/containers/Popup/slice';
import { useCallback, useEffect, useState } from 'react';
import { POPUP_TYPE } from 'app/containers/Popup/constants';
import { useSelector } from 'react-redux';

const useHooks = () => {
  const { openPopup } = useActions({ openPopup: popupActions.openPopup }, [
    popupActions,
  ]);
  const handleSelectTime = useCallback(
    scheduleId => {
      openPopup({
        key: 'selectTimeModal',
        type: POPUP_TYPE.SELECT_TIME_MODAL,
        scheduleId,
      });
    },
    [openPopup],
  );
  return {
    handlers: { handleSelectTime },
    selectors: {},
  };
};

export default useHooks;
