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
