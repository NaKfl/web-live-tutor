import React, { memo } from 'react';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import saga from './saga';
import useHooks from './hooks';
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
import { ACTION_STATUS } from 'utils/constants';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'app/components/Grid';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';

export const Register = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors } = useHooks();
  const { onFinish, onFinishFailed } = handlers;
  const { status } = selectors;
  const { t } = useTranslation();

  return (
    <Row gutter={[48, 48]}>
      <Col.RightCenter span={12}>
        <Image alt="banner" src={banner} />
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
            <Input type="password" placeholder="Password" />
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
                clientId="518404312823-ibh4ph48o4p3ad7b6f4jd4eoiv6m4o7l.apps.googleusercontent.com"
                render={renderProps => (
                  <Button
                    className="login-form-button"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    icon={<GoogleOutlined />}
                  >
                    {t('Register.btnRegisterGoogle')}
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
