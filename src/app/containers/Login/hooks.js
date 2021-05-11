import useActions from 'hooks/useActions';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { makeSelectAuthenticationStatus } from './selectors';
import { actions } from './slice';
import { useHistory } from 'react-router-dom';

export const useHooks = () => {
  const { login, loginService } = useActions(
    { login: actions.login, loginService: actions.loginService },
    [actions],
  );
  const status = useSelector(makeSelectAuthenticationStatus);

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

export const useLoginService = () => {
  const { logout } = useActions({ logout: actions.logout });

  const onLogout = useCallback(() => {
    logout();
  }, [logout]);

  return {
    handlers: { onLogout },
  };
};

export const useLogout = () => {
  const history = useHistory();
  const { logout } = useActions({ logout: actions.logout });

  const onLogout = useCallback(() => {
    logout();
    history.push('/login');
  }, [history, logout]);

  return {
    handlers: { onLogout },
  };
};

export default useHooks;
