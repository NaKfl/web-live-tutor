import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeSelectStep, makeSelectStatus } from './selectors';
import { actions } from './slice';
import useActions from 'hooks/useActions';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';

export const useHook = () => {
  const location = useLocation();
  const step = useSelector(makeSelectStep);
  const status = useSelector(makeSelectStatus);
  const {
    submitEmail,
    changeToThirdStep,
    resetPassword,
    resetStep,
  } = useActions(
    {
      submitEmail: actions.submitEmail,
      changeToThirdStep: actions.changeToThirdStep,
      resetPassword: actions.resetPassword,
      resetStep: actions.resetStep,
    },
    [actions],
  );
  useEffect(() => {
    const { token } = qs.parse(location.search);
    if (token) {
      changeToThirdStep();
    }
  }, [changeToThirdStep, location.search]);

  useEffect(() => {
    return () => {
      resetStep();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSubmitEmail = useCallback(
    ({ email }) => {
      submitEmail(email);
    },
    [submitEmail],
  );

  const onResetPassword = useCallback(
    data => {
      const { email, password } = data;
      const { token } = qs.parse(location.search);
      resetPassword({ email, password, token });
    },
    [location.search, resetPassword],
  );

  return {
    selectors: {
      step,
      status,
    },
    handlers: {
      submitEmail: onSubmitEmail,
      resetPassword: onResetPassword,
    },
  };
};

export default useHook;
