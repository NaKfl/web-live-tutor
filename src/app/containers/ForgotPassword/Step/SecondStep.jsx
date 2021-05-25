import { memo } from 'react';
import { useTranslation } from 'react-i18next';
export const SecondStep = memo(() => {
  const { t } = useTranslation();
  return (
    <>
      <p>{t('ForgotPassword.checkEmail')}</p>
    </>
  );
});

export default SecondStep;
