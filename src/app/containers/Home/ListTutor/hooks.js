import { POPUP_TYPE } from 'app/containers/Popup/constants';
import { actions as popupActions } from 'app/containers/Popup/slice';
import useActions from 'hooks/useActions';
import { useHistory } from 'react-router-dom';
import { JWT_SECRET } from 'configs';
import jwt from 'jsonwebtoken';
import socket from 'utils/socket';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import { useCallback, useEffect } from 'react';

export const useHooks = props => {
  const history = useHistory();
  const { openPopup } = useActions({ openPopup: popupActions.openPopup }, [
    popupActions,
  ]);

  useEffect(() => {
    socket.on('call:acceptedCall', ({ userCall, userBeCalled, startTime }) => {
      const user = getUserFromStorage();
      const token = jwt.sign(
        {
          participantId: userBeCalled.id,
          roomName: userCall.id,
          password: userCall.id,
          displayName: user.name,
          userCall,
          userBeCalled,
          isTutor: true,
          startTime,
        },
        JWT_SECRET,
      );
      history.push(`/call/?token=${token}`);
    });
  }, [history]);

  useEffect(() => {
    socket.on('call:endedCall', ({ tutor }) => {
      showRatingForm(tutor);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return {
    selectors: {},
    handlers: { showInfoTutor, handleCallTutor, showRatingForm },
    states: {},
  };
};

export const useShowInfoTutor = () => {
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

  return { showInfoTutor };
};

export default useHooks;
