import { makeSelectIsAuthenticated } from 'app/containers/Login/selectors';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { emitConnectionLogin, emitDisconnectionLogout } from './socket';
import { getUser as getUserInfoFromStorage } from 'utils/localStorageUtils';

export const useHooks = () => {
  const isAuthenticated = useSelector(makeSelectIsAuthenticated);

  return {
    selectors: {
      isAuthenticated,
    },
    handler: {},
  };
};

export const useAuthenticatedRedirect = () => {
  const history = useHistory();
  const location = useLocation();
  const isRedirect = ['/login', '/register'].includes(location.pathname);
  const { from } = location.state || { from: { pathname: '/' } };
  const isAuthenticated = useSelector(makeSelectIsAuthenticated);
  const user = getUserInfoFromStorage();

  useEffect(() => {
    if (isAuthenticated && isRedirect) {
      history.replace(from);
    }
  }, [isAuthenticated, history, from, isRedirect]);

  useEffect(() => {
    if (isAuthenticated) {
      emitConnectionLogin(user);
    } else {
      emitDisconnectionLogout();
    }
  }, [isAuthenticated, user]);
};

export default useHooks;
