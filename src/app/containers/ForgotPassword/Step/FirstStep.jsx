import { memo } from 'react';
import { InputEmailForm } from '../UseForm';
import { useTranslation } from 'react-i18next';
export const FirstStep = memo(({ onFinish, status }) => {
  const { t } = useTranslation();
  return (
    <>
      <p>{t('ForgotPassword.enterEmail')}</p>
      <InputEmailForm onFinish={onFinish} status={status}></InputEmailForm>
    </>
  );
});

export default FirstStep;
