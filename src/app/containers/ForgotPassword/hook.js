import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeSelectStep } from './selectors';
import { actions } from './slice';
import useActions from 'hooks/useActions';
import { useQuery } from 'utils/common';
import { useLocation } from 'react-router-dom';
export const useHook = () => {
  const step = useSelector(makeSelectStep);
  const query = useQuery(useLocation());
  const { submitEmail, changeToThirdStep, resetPassword } = useActions(
    {
      submitEmail: actions.submitEmail,
      changeToThirdStep: actions.changeToThirdStep,
      resetPassword: actions.resetPassword,
    },
    [actions],
  );
  useEffect(() => {
    const token = query.get('token');
    if (token) {
      changeToThirdStep();
    }
  }, [changeToThirdStep, query]);

  const onSubmitEmail = useCallback(
    ({ email }) => {
      submitEmail(email);
    },
    [submitEmail],
  );

  const onResetPassword = useCallback(
    data => {
      const { email, password } = data;
      const token = query.get('token');
      resetPassword({ email, password, token });
    },
    [query, resetPassword],
  );

  return {
    selectors: {
      step,
    },
    handlers: {
      submitEmail: onSubmitEmail,
      resetPassword: onResetPassword,
    },
  };
};

export default useHook;
