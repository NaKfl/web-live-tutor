import useActions from 'hooks/useActions';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { useHistory } from 'react-router-dom';
import { makeSelectRegisterStatus } from './selectors';
import { ACTION_STATUS } from 'utils/constants';

export const useHooks = () => {
  const history = useHistory();
  const { register, reset } = useActions(
    { register: actions.register, reset: actions.reset },
    [actions],
  );
  const status = useSelector(makeSelectRegisterStatus);

  useEffect(() => {
    if (status === ACTION_STATUS.SUCCESS) {
      history.push('/login');
      reset();
    }
  }, [status, reset, history]);

  const onFinish = useCallback(
    values => {
      delete values.confirm;
      register(values);
    },
    [register],
  );

  const onFinishFailed = useCallback(errorInfo => {
    console.log('Failed: ', errorInfo);
  }, []);

  return {
    handlers: { onFinish, onFinishFailed },
    selectors: { status },
  };
};

export default useHooks;
