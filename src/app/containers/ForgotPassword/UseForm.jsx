import Button from 'app/components/Button';
import Form from 'app/components/Form';
import StyledInput from 'app/components/Input';
import { memo } from 'react';
import { ACTION_STATUS } from 'utils/constants';
import { useTranslation } from 'react-i18next';

export const InputEmailForm = memo(({ onFinish, status }) => {
  const { t } = useTranslation();

  return (
    <Form onFinish={onFinish} layout="vertical" className="form">
      <Form.Item label={t('ForgotPassword.label.email')} name="email">
        <StyledInput></StyledInput>
      </Form.Item>
      <Form.Item>
        <div className="button">
          <Button
            type="accent"
            htmlType="submit"
            loading={status === ACTION_STATUS.PENDING}
          >
            {t('ForgotPassword.btnSendLink')}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
});

export const ChangePassword = memo(({ onFinish, status }) => {
  const { t } = useTranslation();

  return (
    <Form onFinish={onFinish} layout="vertical" className="form">
      <Form.Item label={t('ForgotPassword.label.password')} name="password">
        <StyledInput.Password></StyledInput.Password>
      </Form.Item>
      <Form.Item
        label={t('ForgotPassword.label.confirmPassword')}
        name="password2"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: t('ForgotPassword.err.inputPassword'),
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(t('ForgotPassword.err.passwordNotMatch')),
              );
            },
          }),
        ]}
      >
        <StyledInput.Password></StyledInput.Password>
      </Form.Item>
      <Form.Item>
        <div className="button">
          <Button
            type="accent"
            htmlType="submit"
            loading={status === ACTION_STATUS.PENDING}
          >
            {t('ForgotPassword.btnSubmit')}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
});
