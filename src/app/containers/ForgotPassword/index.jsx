import Title from 'app/components/Title';
import { memo } from 'react';
import FirstStep from './Step/FirstStep';
import SecondStep from './Step/SecondStep';
import ThirdStep from './Step/ThirdStep';
import { Cover, CoverForgot } from './style';
import useHook from './hook';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { sliceKey, reducer } from './slice';
import { useTranslation } from 'react-i18next';
import saga from './saga';

export const ForgotPassword = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { selectors, handlers } = useHook();
  const { step, status } = selectors;
  const { submitEmail, resetPassword } = handlers;
  const { t } = useTranslation();

  return (
    <CoverForgot>
      <Cover>
        <Title level={2}>{t('ForgotPassword.title')}</Title>
        {step === 0 && <FirstStep onFinish={submitEmail} status={status} />}
        {step === 1 && <SecondStep />}
        {step === 2 && <ThirdStep onFinish={resetPassword} status={status} />}
      </Cover>
    </CoverForgot>
  );
});

export default ForgotPassword;
