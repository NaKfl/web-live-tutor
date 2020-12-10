import React, { memo } from 'react';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import saga from './saga';
import useHooks from './hooks';
import { sliceKey, reducer } from './slice';
import { Link } from 'react-router-dom';
import { StyledRegister } from './styles';
import Form from 'app/components/Form';
import Button from 'app/components/Button';
import Input from 'app/components/Input';
import Title from 'app/components/Title';
import Space from 'app/components/Space';
import Divider from 'app/components/Divider';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Image } from 'antd';
import banner from 'assets/2.png';
import { ACTION_STATUS } from 'utils/constants';
import { useTranslation } from 'react-i18next';

export const Register = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors } = useHooks();
  const { onFinish, onFinishFailed } = handlers;
  const { status } = selectors;
  const { t } = useTranslation();

  return (
    <StyledRegister>
      <Image
        alt="banner"
        src={banner}
        style={{
          width: '50% !important',
          height: '50%',
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
          Start learning English with Etutor
        </Title>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              message: t('Register.messageInvalidEmail'),
            },
            {
              required: true,
              message: t('Register.messageEmptyEmail'),
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
              message: t('Register.messageEmptyPassword'),
            },
          ]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item className="login-form-button login-form-button-local">
          <Button
            type="accent"
            size="small"
            htmlType="submit"
            loading={status === ACTION_STATUS.PENDING}
          >
            Create account
          </Button>
        </Form.Item>
        <Form.Item>
          <Divider>Or sign up with</Divider>
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
                  Google
                </Button>
              )}
              buttonText="Google Register"
              onFailure={res => console.log(res)}
              cookiePolicy={'single_host_origin'}
            />
            <FacebookLogin
              appId="703530593917463"
              fields="name,email,picture"
              render={renderProps => (
                <Button
                  className="login-form-button"
                  onClick={renderProps.onClick}
                >
                  Facebook
                </Button>
              )}
            />
          </Space>
        </Form.Item>
        <span className="login-form-register">
          <Title level={5}>
            Already have an account ?
            <Link to="/login"> {t('Register.linkLogin')} </Link>
          </Title>
        </span>
      </Form>
    </StyledRegister>
  );
});

export default Register;
