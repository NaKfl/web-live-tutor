import useActions from 'hooks/useActions';
import { makeSelectIsAuthenticated } from 'app/containers/Login/selectors';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { emitConnectionLogin, emitDisconnectionLogout } from './socket';
import { selectUserInfoAuthenticate } from 'app/containers/Login/selectors';
import { actions as loginActions } from 'app/containers/Login/slice';
import { ROLES } from 'utils/constants';
import { POPUP_TYPE } from 'app/containers/Popup/constants';
import { actions as popupActions } from 'app/containers/Popup/slice';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';

export const useHooks = () => {
  const isAuthenticated = useSelector(makeSelectIsAuthenticated);
  const user = useSelector(selectUserInfoAuthenticate);
  const { openPopup } = useActions({ openPopup: popupActions.openPopup }, [
    popupActions,
  ]);
  if (isAuthenticated) {
    emitConnectionLogin(user);
  } else {
    emitDisconnectionLogout();
  }
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
  return {
    selectors: {
      isAuthenticated,
      currentRole: user?.currentRole,
    },
    handlerHooks: { showPaymentModal },
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

export default useHooks;
