import React, { memo } from 'react';
import { useInjectSaga } from 'utils/reduxInjectors';
import saga from './saga';
import useHooks from './hooks';
import { sliceKey } from './slice';
import { Link } from 'react-router-dom';
import { ACTION_STATUS } from 'utils/constants';
import {
  StyledLogin,
  StyledGoogleButton,
  StyledFacebookButton,
} from './styles';
import Form from 'app/components/Form';
import Button from 'app/components/Button';
import Input from 'app/components/Input';
import Title from 'app/components/Title';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useTranslation } from 'react-i18next';

export const Login = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  const { handlers, selectors } = useHooks();
  const { onFinish, onFinishFailed, handleLoginService } = handlers;
  const { status } = selectors;
  const { t } = useTranslation();

  return (
    <StyledLogin>
      <Form
        className="login-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Title className="login-form-title">{t('Login.title')}</Title>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: t('Login.messageInvalidEmail'),
            },
            {
              required: true,
              message: t('Login.messageEmptyEmail'),
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: t('Login.messageEmptyPassword'),
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item className="login-form-forgot">
          <a href="">{t('Login.forgotPassword')}</a>
        </Form.Item>
        <Form.Item className="login-form-button login-form-button-local">
          <Button
            type="primary"
            htmlType="submit"
            loading={status === ACTION_STATUS.PENDING}
          >
            {t('Login.btnLogin')}
          </Button>
        </Form.Item>
        <GoogleLogin
          clientId="518404312823-ibh4ph48o4p3ad7b6f4jd4eoiv6m4o7l.apps.googleusercontent.com"
          render={renderProps => (
            <StyledGoogleButton
              className="login-form-button"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              {t('Login.btnLoginGoogle')}
            </StyledGoogleButton>
          )}
          buttonText="Google Login"
          onSuccess={receivedData =>
            handleLoginService({
              service: 'google',
              data: receivedData && receivedData.accessToken,
            })
          }
          onFailure={res => console.log(res)}
          cookiePolicy={'single_host_origin'}
        />
        <FacebookLogin
          appId="703530593917463"
          fields="name,email,picture"
          callback={receivedData =>
            handleLoginService({
              service: 'facebook',
              data: receivedData && receivedData.accessToken,
            })
          }
          render={renderProps => (
            <StyledFacebookButton
              className="login-form-button"
              onClick={renderProps.onClick}
            >
              {t('Login.btnLoginFacebook')}
            </StyledFacebookButton>
          )}
        />
        <span className="login-form-register">
          <Link to="/register"> {t('Login.linkRegister')} </Link>
        </span>
      </Form>
    </StyledLogin>
  );
});

export default Login;
