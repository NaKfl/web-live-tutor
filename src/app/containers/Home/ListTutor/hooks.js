import { POPUP_TYPE } from 'app/containers/Popup/constants';
import { actions as popupActions } from 'app/containers/Popup/slice';
import useActions from 'hooks/useActions';
import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';

export const useHooks = () => {
  const history = useHistory();
  const { openPopup } = useActions({ openPopup: popupActions.openPopup }, [
    popupActions,
  ]);

  const showRatingForm = useCallback(
    tutor => {
      openPopup({
        key: 'showRatingForm',
        type: POPUP_TYPE.RATING_MODAL,
        tutor,
      });
    },
    [openPopup],
  );

  const showConfirmCallModal = useCallback(
    tutor => {
      openPopup({
        key: 'showConfirmCallModal',
        type: POPUP_TYPE.CONFIRM_CALL_VIDEO,
        tutor,
      });
    },
    [openPopup],
  );

  const handleCallTutor = tutor => {
    showConfirmCallModal(tutor);
  };

  const redirectToDetailTutor = useCallback(
    tutor => {
      history.push(`/tutor/${tutor?.userId}`);
    },
    [history],
  );

  return {
    selectors: {},
    handlers: { handleCallTutor, redirectToDetailTutor, showRatingForm },
    states: {},
  };
};

export const useShowInfoTutor = () => {
  const history = useHistory();

  const redirectToDetailTutor = useCallback(
    tutor => {
      history.push(`/tutor/${tutor?.userId}`);
    },
    [history],
  );

  return { showInfoTutor: redirectToDetailTutor };
};

export default useHooks;
