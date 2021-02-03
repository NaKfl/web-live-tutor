import React, { memo } from 'react';
import { useInjectSaga } from 'utils/reduxInjectors';
import saga from './saga';
import useHooks from './hooks';
import { sliceKey } from './slice';
import { Link } from 'react-router-dom';
import { ACTION_STATUS } from 'utils/constants';
import Form from 'app/components/Form';
import Button from 'app/components/Button';
import Space from 'app/components/Space';
import Input from 'app/components/Input';
import Divider from 'app/components/Divider';
import Image from 'app/components/Image';
import banner from 'assets/1.png';
import Typography from 'app/components/Typography';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { FACEBOOK_ID, GOOGLE_ID } from 'configs';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'app/components/Grid';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
const { Title } = Typography;
export const Login = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  const { handlers, selectors } = useHooks();
  const { onFinish, onFinishFailed, handleLoginService } = handlers;
  const { status } = selectors;
  const { t } = useTranslation();

  return (
    <Row gutter={[48, 48]}>
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
            {t('Login.title')}
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
            <Input.Password type="password" placeholder="Password" />
          </Form.Item>
          <Link
            to="/forgot-password"
            style={{ display: 'block', marginBottom: '10px' }}
          >
            {t('Login.forgotPassword')}
          </Link>
          <Form.Item className="login-form-button login-form-button-local">
            <Button
              type="accent"
              size="large"
              htmlType="submit"
              loading={status === ACTION_STATUS.PENDING}
            >
              {t('Login.btnLogin')}
            </Button>
          </Form.Item>
          <Form.Item>
            <Divider>{t('Login.divider')}</Divider>
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
                    {t('Login.btnLoginFacebook')}
                  </Button>
                )}
              />
            </Space.StyledSpace>
          </Form.Item>
          <span className="login-form-register">
            <Title level={5}>
              {t('Login.suggestRegister')}
              <Link to="/register"> {t('Login.linkRegister')} </Link>
            </Title>
          </span>
        </Form>
      </Col>
    </Row>
  );
});

export default Login;
