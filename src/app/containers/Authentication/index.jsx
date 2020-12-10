import React, { memo } from 'react';
import { useInjectSaga } from 'utils/reduxInjectors';
import saga from './saga';
import useHooks from './hooks';
import { sliceKey } from './slice';
import { Link } from 'react-router-dom';
import { ACTION_STATUS } from 'utils/constants';
import { StyledLogin } from './styles';
import Form from 'app/components/Form';
import Button from 'app/components/Button';
import Space from 'app/components/Space';
import Input from 'app/components/Input';
import Divider from 'app/components/Divider';
import { Image } from 'antd';
import banner from 'assets/1.png';
import Typography from 'app/components/Typography';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useTranslation } from 'react-i18next';
const { Title } = Typography;
export const Login = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  const { handlers, selectors } = useHooks();
  const { onFinish, onFinishFailed, handleLoginService } = handlers;
  const { status } = selectors;
  const { t } = useTranslation();

  return (
    <StyledLogin>
      <Image
        alt="banner"
        src={banner}
        style={{
          width: '100%',
          height: '100%',
          transform: 'scale(1.5)',
          marginRight: '100px',
        }}
      />
      <Form
        className="login-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        requiredMark={false}
        layout="vertical"
      >
        <Title
          className="login-form-title"
          level={3}
          style={{ marginBottom: '15px !important' }}
        >
          Welcome back to Etutor
        </Title>
        <Form.Item
          label="Email"
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
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: t('Login.messageEmptyPassword'),
            },
          ]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Link to="/forgot-password"> {t('Login.forgotPassword')} </Link>
        </Form.Item>
        <Form.Item className="login-form-button login-form-button-local">
          <Button
            type="accent"
            size="small"
            htmlType="submit"
            loading={status === ACTION_STATUS.PENDING}
          >
            {t('Login.btnLogin')}
          </Button>
        </Form.Item>
        <Form.Item>
          <Divider>Or</Divider>
        </Form.Item>
        <Form.Item>
          <Space>
            <GoogleLogin
              clientId="518404312823-ibh4ph48o4p3ad7b6f4jd4eoiv6m4o7l.apps.googleusercontent.com"
              render={renderProps => (
                <Button
                  className="login-form-button"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  {t('Login.btnLoginGoogle')}
                </Button>
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
                <Button
                  className="login-form-button"
                  onClick={renderProps.onClick}
                >
                  {t('Login.btnLoginFacebook')}
                </Button>
              )}
            />
          </Space>
        </Form.Item>
        <span className="login-form-register">
          <Title level={5}>
            New to Etutor?
            <Link to="/register"> {t('Login.linkRegister')} </Link>
          </Title>
        </span>
      </Form>
    </StyledLogin>
  );
});

export default Login;
