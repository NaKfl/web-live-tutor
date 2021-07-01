import { useSelector } from 'react-redux';
import { selectConfirmStatus } from './selectors';
import { useEffect } from 'react';
import { actions } from './slice';
import useActions from 'hooks/useActions';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';

const useHooks = () => {
  const status = useSelector(selectConfirmStatus);
  const location = useLocation();
  const { confirmVerifyAccount } = useActions(
    {
      confirmVerifyAccount: actions.confirmVerifyAccount,
    },
    [actions, actions],
  );

  useEffect(() => {
    const { token } = qs.parse(location.search);
    confirmVerifyAccount(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    handlers: {},
    selectors: { status },
  };
};

export default useHooks;
