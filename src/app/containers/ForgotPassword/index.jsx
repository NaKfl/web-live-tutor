import Title from 'app/components/Title';
import { memo } from 'react';
import FirstStep from './Step/FirstStep';
import SecondStep from './Step/SecondStep';
import ThirdStep from './Step/ThirdStep';

import { Cover, CoverForgot } from './style';
import useHook from './hook';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { sliceKey, reducer } from './slice';
import saga from './saga';
export const ForgotPassword = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors, handlers } = useHook();
  const { step } = selectors;
  const { submitEmail, resetPassword } = handlers;
  return (
    <CoverForgot>
      <Cover>
        <Title level={2}>Reset Password</Title>
        {step === 0 && <FirstStep onFinish={submitEmail} />}
        {step === 1 && <SecondStep />}
        {step === 2 && <ThirdStep onFinish={resetPassword} />}
      </Cover>
    </CoverForgot>
  );
});

export default ForgotPassword;
