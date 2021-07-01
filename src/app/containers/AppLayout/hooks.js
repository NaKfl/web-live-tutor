/* eslint-disable react-hooks/exhaustive-deps */
import useActions from 'hooks/useActions';
import { makeSelectIsAuthenticated } from 'app/containers/Login/selectors';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { emitConnectionLogin, emitDisconnectionLogout } from './socket';
import { selectUserInfoAuthenticate } from 'app/containers/Login/selectors';
import { actions as loginActions } from 'app/containers/Login/slice';
import { ROLES } from 'utils/constants';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import { REFRESH_TOKEN_INTERVAL_MINUTES } from 'configs';
import { POPUP_TYPE } from 'app/containers/Popup/constants';
import { JWT_SECRET } from 'configs';
import jwt from 'jsonwebtoken';
import { actions as popupActions } from 'app/containers/Popup/slice';
import socket from 'utils/socket';
import { notifyError } from 'utils/notify';
import { useTranslation } from 'react-i18next';
import { requestFirebaseNotificationPermission } from 'utils/firebase';

export const useHooks = () => {
  const isAuthenticated = useSelector(makeSelectIsAuthenticated);
  const user = useSelector(selectUserInfoAuthenticate);

  if (isAuthenticated) {
    emitConnectionLogin(user);
  } else {
    emitDisconnectionLogout();
  }

  return {
    selectors: {
      isAuthenticated,
      currentRole: user?.currentRole,
    },
  };
};

export const useNotify = () => {
  useEffect(() => {
    requestFirebaseNotificationPermission();
  }, []);
};

export const useListenSocket = () => {
  const { showCallModal, closeCallModal, showRatingForm } = useShowModal();
  const history = useHistory();
  const { t } = useTranslation();
  useEffect(() => {
    socket.on(
      'call:acceptedCall',
      ({ userCall, userBeCalled, startTime, roomName }) => {
        const user = getUserFromStorage();
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
        };
        const token = jwt.sign(obj, JWT_SECRET, {
          issuer: 'livetutor',
          subject: 'https://meet.livetutor.live',
          audience: 'livetutor',
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

  const { getMe } = useActions({ getMe: loginActions.getMe }, [loginActions]);

  useEffect(() => {
    getMe();
  }, [getMe]);

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

export default useHooks;
