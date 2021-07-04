/* eslint-disable react-hooks/exhaustive-deps */
import {
  makeSelectIsAuthenticated,
  selectUserInfoAuthenticate,
} from 'app/containers/Login/selectors';
import { actions as loginActions } from 'app/containers/Login/slice';
import { POPUP_TYPE } from 'app/containers/Popup/constants';
import { actions as popupActions } from 'app/containers/Popup/slice';
import { JWT_SECRET, REFRESH_TOKEN_INTERVAL_MINUTES } from 'configs';
import useActions from 'hooks/useActions';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { ROLES, TIME_IN_ROOM } from 'utils/constants';
import firebaseUtils from 'utils/firebase';
import {
  getUser as getUserFromStorage,
  removeParticipantJoin,
} from 'utils/localStorageUtils';
import { notifyError } from 'utils/notify';
import socket from 'utils/socket';
import { actions as chatActions } from 'app/containers/Chat/slice';

export const useLoginLogoutSocket = () => {
  const user = getUserFromStorage();
  if (user) {
    socket.emit('connection:login', { user });
  } else {
    socket.emit('disconnection:logout');
  }
};

export const useNotify = () => {
  useEffect(() => {
    if (firebaseUtils.isSupportedFirebase)
      firebaseUtils.requestFirebaseNotificationPermission();
  }, []);
};

export const useRemoveParticipantJoin = () => {
  removeParticipantJoin();
};

export const useListenSocket = () => {
  const { showCallModal, closeCallModal, showRatingForm } = useShowModal();
  const history = useHistory();
  const { t } = useTranslation();
  const { setUnreadCount, setRecentList } = useActions(
    {
      toggleChatPopup: chatActions.toggleChatPopup,
      setUnreadCount: chatActions.setUnreadCount,
      setRecentList: chatActions.setRecentList,
    },
    [chatActions],
  );

  useEffect(() => {
    socket.on('chat:returnRecentList', ({ recentList, unreadCount }) => {
      setRecentList(recentList);
      setUnreadCount(unreadCount);
    });
  }, []);

  useEffect(() => {
    socket.on('chat:joinOrLeave', () => {
      socket.emit('chat:getRecentList');
    });
  }, []);

  useEffect(() => {
    socket.on(
      'call:acceptedCall',
      ({ userCall, userBeCalled, startTime, roomName }) => {
        const user = getUserFromStorage();
        const endSession = moment(startTime).add(5, 'minutes');
        const obj = {
          context: {
            user: {
              email: user?.email,
              name: user?.name,
            },
          },
          room: roomName,
          roomName,
          userCall,
          userBeCalled,
          isTutor: user.currentRole === ROLES.TUTOR,
          startTime,
          endSession,
        };
        const token = jwt.sign(obj, JWT_SECRET, {
          issuer: 'livetutor',
          subject: 'https://meet.livetutor.live',
          audience: 'livetutor',
          expiresIn: `${TIME_IN_ROOM}s`,
        });
        closeCallModal();
        history.push(`/call/?token=${token}`);
      },
    );
  }, [history]);

  useEffect(() => {
    socket.on('call:notifyCall', ({ userCall }) => {
      const studentCall = {
        ...userCall,
        isReceived: true,
      };
      showCallModal(studentCall);
    });
  }, []);

  useEffect(() => {
    socket.on('call:canCallTutor', ({ userBeCalled }) => {
      showCallModal(userBeCalled);
    });
  }, [showCallModal]);

  useEffect(() => {
    socket.on('call:canNotCallTutor', ({ userBeCalled }) => {
      notifyError(`${userBeCalled.name} ${t('Notify.tutorBusy')}`);
    });
  }, []);

  useEffect(() => {
    socket.on('call:cancelCalled', ({ userCall, userBeCalled }) => {
      closeCallModal();
      notifyError(`${userBeCalled.name} ${t('Notify.reject')}`);
    });
  }, []);

  useEffect(() => {
    socket.on('call:selfCancelCalled', () => {
      closeCallModal();
    });
  }, []);

  useEffect(() => {
    socket.on('call:endedCallTutor', ({ userCall, session }) => {
      showRatingForm({
        userId: userCall.id,
        sessionId: session.id,
        isTutor: true,
      });
    });

    socket.on('call:endedCall', ({ userBeCalled, session }) => {
      showRatingForm({
        userId: userBeCalled.id,
        sessionId: session.id,
      });
    });
  }, []);
};

export const useAuthenticatedRedirect = () => {
  const history = useHistory();
  const location = useLocation();
  const isRedirect = ['/login', '/register'].includes(location.pathname);
  const { from } = location.state || { from: { pathname: '/' } };
  const isAuthenticated = useSelector(makeSelectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated && isRedirect) {
      history.replace(from);
    }
  }, [isAuthenticated, history, from, isRedirect]);
};

export const useGetUserInfo = () => {
  const user = useSelector(selectUserInfoAuthenticate);
  return { user };
};

export const useChangeRole = () => {
  const history = useHistory();
  const user = getUserFromStorage();
  const { changeRoleAction } = useActions(
    {
      changeRoleAction: loginActions.changeRole,
    },
    [loginActions],
  );

  const changeRole = useCallback(() => {
    if (user?.currentRole === ROLES.STUDENT) {
      changeRoleAction({
        roleName: ROLES.TUTOR,
      });
      history.push('/schedule-tutor');
    }

    if (user?.currentRole === ROLES.TUTOR) {
      changeRoleAction({
        roleName: ROLES.STUDENT,
      });
      history.push('/');
    }
  }, [changeRoleAction, history, user?.currentRole]);

  return { changeRole };
};

export const useRefreshToken = () => {
  const intervalRefreshTokenMilliseconds =
    REFRESH_TOKEN_INTERVAL_MINUTES * 60 * 1000;
  const { refreshToken } = useActions(
    { refreshToken: loginActions.refreshToken },
    [loginActions],
  );

  const isAuthenticated = useSelector(makeSelectIsAuthenticated);

  useEffect(() => {
    window.intervalRefreshTokenTimer = null;
    if (isAuthenticated) {
      refreshToken();
      if (window.intervalRefreshTokenTimer === null) {
        window.intervalRefreshTokenTimer = setInterval(
          () => refreshToken(),
          intervalRefreshTokenMilliseconds,
        );
      }
    }

    return () => {
      clearInterval(window.intervalRefreshTokenTimer);
    };
  }, [intervalRefreshTokenMilliseconds, isAuthenticated, refreshToken]);
};

export const useShowModal = () => {
  const { openPopup, closePopup } = useActions(
    { openPopup: popupActions.openPopup, closePopup: popupActions.closePopup },
    [popupActions],
  );

  const showPaymentModal = useCallback(
    user => {
      openPopup({
        key: 'showPaymentModal',
        type: POPUP_TYPE.PAYMENT_MODAL,
        user,
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

  const closeCallModal = useCallback(() => {
    closePopup({
      key: 'showCallModal',
      type: POPUP_TYPE.CALL_VIDEO,
    });
  }, [closePopup]);

  const showTransactionModal = useCallback(
    transactions => {
      openPopup({
        key: 'showTransactionModal',
        type: POPUP_TYPE.TRANSACTION_MODAL,
        transactions,
      });
    },
    [openPopup],
  );

  return {
    showPaymentModal,
    showTransactionModal,
    showCallModal,
    closeCallModal,
    showRatingForm,
  };
};

export default useLoginLogoutSocket;
