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

export const useHooks = () => {
  const isAuthenticated = useSelector(makeSelectIsAuthenticated);
  const user = useSelector(selectUserInfoAuthenticate);
  const { showCallModal } = useShowModal();
  const history = useHistory();

  useEffect(() => {
    socket.on(
      'call:acceptedCall',
      ({ userCall, userBeCalled, startTime, roomName }) => {
        const user = getUserFromStorage();
        const userInfo = {
          displayName: user?.name,
          email: user?.email,
        };
        const token = jwt.sign(
          {
            participantId: userBeCalled.id,
            roomName,
            userInfo,
            userCall,
            userBeCalled,
            isTutor: user.currentRole === ROLES.TUTOR,
            startTime,
          },
          JWT_SECRET,
        );
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
  }, [showCallModal]);

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
  };
};

export default useHooks;
