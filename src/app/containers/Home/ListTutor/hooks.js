import { POPUP_TYPE } from 'app/containers/Popup/constants';
import { actions as popupActions } from 'app/containers/Popup/slice';
import useActions from 'hooks/useActions';
import { useHistory } from 'react-router-dom';
import socket from 'utils/socket';
import { useCallback, useEffect } from 'react';
import { useShowModal } from 'app/containers/AppLayout/hooks';

export const useHooks = () => {
  const history = useHistory();
  const { openPopup } = useActions({ openPopup: popupActions.openPopup }, [
    popupActions,
  ]);

  useEffect(() => {
    socket.on('call:endedCall', ({ userCall, tutor, session }) => {
      const tutorInfo = tutor?.tutor;
      showRatingForm({
        userId: tutorInfo.userId,
        sessionId: session.id,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleCallTutor = tutor => {
    socket.emit('call:callVideo', { userId: tutor.userId });
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
