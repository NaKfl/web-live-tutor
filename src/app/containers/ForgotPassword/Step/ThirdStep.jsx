import { memo } from 'react';
import Button from 'app/components/Button';
import { ChangePassword } from '../UseForm';
import { useTranslation } from 'react-i18next';
import { makeChangePasswordSuccess, makeSelectError } from '../selectors';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const CONDITION_RENDER = {
  FORM: 'FORM',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

export const ThirdStep = memo(({ onFinish, status }) => {
  const isChangeSuccess = useSelector(makeChangePasswordSuccess);
  const error = useSelector(makeSelectError);
  const history = useHistory();

  const backToHome = () => {
    history.replace('/');
  };
  const getCondition = () => {
    if (isChangeSuccess && !error) {
      return CONDITION_RENDER.SUCCESS;
    } else if (!isChangeSuccess && !!error) {
      return CONDITION_RENDER.FAILED;
    } else {
      return CONDITION_RENDER.FORM;
    }
  };

  const RenderComponent = () => {
    if (getCondition() === CONDITION_RENDER.FORM) {
      return <ChangePasswordForm onFinish={onFinish} status={status} />;
    } else if (getCondition() === CONDITION_RENDER.SUCCESS) {
      return <ChangePasswordSuccess backToHome={backToHome} />;
    } else {
      return <ChangePasswordFailed backToHome={backToHome} />;
    }
  };
  return (
    <>
      <RenderComponent onFinish={onFinish} status={status} />
    </>
  );
});

const ChangePasswordForm = ({ onFinish, status }) => {
  const { t } = useTranslation();
  return (
    <>
      <p>{t('ForgotPassword.enterPassword')}</p>
      <ChangePassword onFinish={onFinish} status={status}></ChangePassword>
    </>
  );
};
const ChangePasswordSuccess = ({ backToHome }) => {
  const { t } = useTranslation();
  return (
    <>
      <p>{t('ForgotPassword.forgotPasswordSuccess')}</p>
      <div className="button">
        <Button onClick={() => backToHome()} type="accent">
          {t('ForgotPassword.backToHome')}
        </Button>
      </div>
    </>
  );
};

const ChangePasswordFailed = ({ backToHome }) => {
  const { t } = useTranslation();
  return (
    <>
      <p>{t('ForgotPassword.forgotPasswordFailed')}</p>
      <div className="button">
        <Button onClick={() => backToHome()} type="accent">
          {t('ForgotPassword.backToHome')}
        </Button>
      </div>
    </>
  );
};

export default ThirdStep;
