import { POPUP_TYPE } from 'app/containers/Popup/constants';
import { actions as popupActions } from 'app/containers/Popup/slice';
import useActions from 'hooks/useActions';
import { useCallback } from 'react';

export const useHooks = props => {
  const { openPopup } = useActions({ openPopup: popupActions.openPopup }, [
    popupActions,
  ]);

  const showInfoTutor = useCallback(
    tutor => {
      openPopup({
        key: 'showInfoTutor',
        type: POPUP_TYPE.INFO_TUTOR,
        tutor,
      });
    },
    [openPopup],
  );

  return {
    selectors: {},
    handlers: { showInfoTutor },
    states: {},
  };
};

export default useHooks;
