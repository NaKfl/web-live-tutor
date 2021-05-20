import { useSelector } from 'react-redux';
import { selectConfirmStatus } from './selectors';
import { useEffect } from 'react';
import { actions } from './slice';
import useActions from 'hooks/useActions';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'utils/common';

const useHooks = () => {
  const status = useSelector(selectConfirmStatus);
  const query = useQuery(useLocation());
  const { confirmVerifyAccount } = useActions(
    {
      confirmVerifyAccount: actions.confirmVerifyAccount,
    },
    [actions, actions],
  );

  useEffect(() => {
    const token = query.get('token');
    confirmVerifyAccount(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    handlers: {},
    selectors: { status },
  };
};

export default useHooks;
