import useActions from 'hooks/useActions';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  makeSelectAuthenticationStatus,
  makeSelectIsAuthenticated,
} from './selectors';
import { actions } from './slice';

export const useHooks = () => {
  const history = useHistory();
  const { login, loginService } = useActions(
    { login: actions.login, loginService: actions.loginService },
    [actions],
  );
  const isAuthenticated = useSelector(makeSelectIsAuthenticated);
  const status = useSelector(makeSelectAuthenticationStatus);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }, [isAuthenticated, history]);

  const onFinish = useCallback(
    values => {
      login(values);
    },
    [login],
  );

  const onFinishFailed = useCallback(errorInfo => {
    console.log('Failed: ', errorInfo);
  }, []);

  const handleLoginService = useCallback(
    payload => {
      loginService(payload);
    },
    [loginService],
  );

  return {
    handlers: { onFinish, onFinishFailed, handleLoginService },
    selectors: { status },
  };
};

export const useLogout = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { logout } = useActions({ logout: actions.logout });
  const isAuthenticated = useSelector(makeSelectIsAuthenticated);

  useEffect(() => {
    if (!pathname.includes('/login') && !isAuthenticated) {
      history.push('/login');
    }
  }, [isAuthenticated, history, pathname]);

  const onLogout = useCallback(() => {
    logout();
  }, [logout]);

  return {
    handlers: { onLogout },
  };
};

export default useHooks;
