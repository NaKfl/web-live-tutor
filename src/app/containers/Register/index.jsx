import React, { memo } from 'react';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import saga from './saga';
import useHooks, { useUnmount } from './hooks';
import { sliceKey, reducer } from './slice';
import { Link } from 'react-router-dom';
import Form from 'app/components/Form';
import Button from 'app/components/Button';
import Input from 'app/components/Input';
import Title from 'app/components/Title';
import Space from 'app/components/Space';
import Divider from 'app/components/Divider';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Image from 'app/components/Image';
import banner from 'assets/2.png';
import { FACEBOOK_ID, GOOGLE_ID } from 'configs';
import { ACTION_STATUS } from 'utils/constants';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'app/components/Grid';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import loginHooks from 'app/containers/Login/hooks';

export const Register = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors } = useHooks();
  useUnmount();
  const { onFinish, onFinishFailed } = handlers;
  const { handlers: loginHandlers } = loginHooks();
  const { handleLoginService } = loginHandlers;
  const { status } = selectors;
  const { t } = useTranslation();

  return (
    <Row gutter={[48, 48]} justify="center" align="middle">
      <Col.RightCenter span={12}>
        <Image preview={false} alt="banner" src={banner} />
      </Col.RightCenter>
      <Col span={12}>
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
            {t('Register.title')}
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
            <Input.Password type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item className="login-form-button login-form-button-local">
            <Button
              type="accent"
              size="large"
              htmlType="submit"
              loading={status === ACTION_STATUS.PENDING}
            >
              {t('Register.btnRegister')}
            </Button>
          </Form.Item>
          <Form.Item>
            <Divider>{t('Register.divider')}</Divider>
          </Form.Item>
          <Form.Item>
            <Space.StyledSpace size="large">
              <GoogleLogin
                clientId={GOOGLE_ID}
                render={renderProps => (
                  <Button
                    className="login-form-button"
                    onClick={renderProps.onClick}
                    icon={<GoogleOutlined />}
                  >
                    {t('Register.btnRegisterGoogle')}
                  </Button>
                )}
                buttonText="Google Login"
                onSuccess={receivedData =>
                  handleLoginService({
                    service: 'google',
                    data: receivedData && receivedData.accessToken,
                  })
                }
                cookiePolicy={'single_host_origin'}
              />
              <FacebookLogin
                appId={FACEBOOK_ID}
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
                    icon={<FacebookOutlined />}
                  >
                    {t('Register.btnRegisterFacebook')}
                  </Button>
                )}
              />
            </Space.StyledSpace>
          </Form.Item>
          <span className="login-form-register">
            <Title level={5}>
              {t('Register.suggestLogin')}
              <Link to="/login"> {t('Register.linkLogin')} </Link>
            </Title>
          </span>
        </Form>
      </Col>
    </Row>
  );
});

export default Register;
