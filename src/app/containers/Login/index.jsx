import Button from 'app/components/Button';
import Divider from 'app/components/Divider';
import Form from 'app/components/Form';
import { Col, Row } from 'app/components/Grid';
import Image from 'app/components/Image';
import Input from 'app/components/Input';
import Space from 'app/components/Space';
import banner from 'assets/login.png';
import FacebookLogo from 'assets/svg/facebook-logo.svg';
import GoogleLogo from 'assets/svg/google-logo.svg';
import { FACEBOOK_ID, GOOGLE_ID } from 'configs';
import React, { memo } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ACTION_STATUS } from 'utils/constants';
import { useInjectSaga } from 'utils/reduxInjectors';
import useHooks from './hooks';
import saga from './saga';
import { sliceKey } from './slice';
import { CoverLogin, StyledLogin, StyledLogo } from './styles';

export const Login = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  const { handlers, selectors } = useHooks();
  const { onFinish, onFinishFailed, handleLoginService } = handlers;
  const { status } = selectors;
  const { t } = useTranslation();

  return (
    <CoverLogin>
      <StyledLogin>
        <Row gutter={[48, 48]} justify="center" align="middle">
          <Col.RightCenter className="img-banner">
            <Image preview={false} alt="banner" src={banner} />
          </Col.RightCenter>
          <Col className="form-login">
            <h3 className="login-form-title">{t('Login.title')}</h3>
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              requiredMark={false}
              layout="vertical"
            >
              <Form.Item
                label={t('Login.labelEmail')}
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
                <Input placeholder={t('Login.exampleEmail')} />
              </Form.Item>
              <Form.Item
                label={t('Login.labelPassword')}
                name="password"
                rules={[
                  {
                    required: true,
                    message: t('Login.messageEmptyPassword'),
                  },
                ]}
              >
                <Input.Password type="password" />
              </Form.Item>
              <div className="footer-text">
                <div>
                  <span>{t('Login.suggestRegister')}</span>
                  <Link to="/register"> {t('Login.linkRegister')} </Link>
                </div>
                <Link
                  to="/password"
                  style={{ display: 'block', marginBottom: '10px' }}
                >
                  {t('Login.forgotPassword')}
                </Link>
              </div>
              <Form.Item>
                <Button
                  className="login-btn"
                  type="accent"
                  size="large"
                  htmlType="submit"
                  loading={status === ACTION_STATUS.PENDING}
                >
                  {t('Login.btnLogin')}
                </Button>
              </Form.Item>
              <Form.Item>
                <Divider className="divider">{t('Login.divider')}</Divider>
              </Form.Item>
              <Form.Item>
                <Space.StyledSpace className="login-service-btn" size="large">
                  <GoogleLogin
                    clientId={GOOGLE_ID}
                    render={renderProps => (
                      <StyledLogo
                        className="login-form-button"
                        onClick={renderProps.onClick}
                        src={GoogleLogo}
                        alt="google-logo"
                      />
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
                      <StyledLogo
                        className="login-form-button"
                        onClick={renderProps.onClick}
                        src={FacebookLogo}
                        alt="facebook-logo"
                      />
                    )}
                  />
                </Space.StyledSpace>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </StyledLogin>
    </CoverLogin>
  );
});

export default Login;
