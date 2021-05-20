import { POPUP_TYPE } from 'app/containers/Popup/constants';
import { actions as popupActions } from 'app/containers/Popup/slice';
import useActions from 'hooks/useActions';
import { useHistory } from 'react-router-dom';
import { JWT_SECRET } from 'configs';
import jwt from 'jsonwebtoken';
import socket from 'utils/socket';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import { useCallback, useEffect } from 'react';
import { notifyError } from 'utils/notify';

export const useHooks = () => {
  const history = useHistory();
  const { openPopup } = useActions({ openPopup: popupActions.openPopup }, [
    popupActions,
  ]);

  useEffect(() => {
    socket.on(
      'call:acceptedCall',
      ({ userCall, userBeCalled, startTime, roomName }) => {
        const user = getUserFromStorage();
        const userInfo = {
          displayName: user.name,
          email: user.email,
        };
        const token = jwt.sign(
          {
            participantId: userBeCalled.id,
            roomName,
            userInfo,
            userCall,
            userBeCalled,
            isTutor: true,
            startTime,
          },
          JWT_SECRET,
        );
        history.push(`/call/?token=${token}`);
      },
    );
  }, [history]);

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

  useEffect(() => {
    socket.on('call:cancelCalled', ({ userCall, userBeCalled }) => {
      notifyError(`${userBeCalled.name} rejected`);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showCallModal = useCallback(
    userCall => {
      openPopup({
        key: 'showCallModal',
        type: POPUP_TYPE.CALL_VIDEO,
        userCall,
      });
    },
    [openPopup],
  );

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

  const handleCallTutor = userId => {
    socket.emit('call:callVideo', { userId });
  };

  useEffect(() => {
    socket.on('call:notifyCall', ({ userCall }) => {
      showCallModal(userCall);
    });
  }, [showCallModal]);

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
