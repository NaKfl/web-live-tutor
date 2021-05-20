import Button from 'app/components/Button';
import Divider from 'app/components/Divider';
import Form from 'app/components/Form';
import { Col, Row } from 'app/components/Grid';
import Image from 'app/components/Image';
import Input from 'app/components/Input';
import Space from 'app/components/Space';
import loginHooks from 'app/containers/Login/hooks';
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
import useHooks, { useUnmount } from './hooks';
import saga from './saga';
import { reducer, sliceKey } from './slice';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import { CoverRegister, StyledLogo, StyledRegister } from './styles';

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
    <CoverRegister>
      <StyledRegister>
        <Row gutter={[48, 48]} justify="center" align="middle">
          <Col.RightCenter className="img-banner">
            <Image preview={false} alt="banner" src={banner} />
          </Col.RightCenter>
          <Col className="form-register">
            <h3 className="register-form-title">{t('Register.title')}</h3>
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              requiredMark={false}
              layout="vertical"
            >
              <Form.Item
                label={t('Register.labelEmail')}
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
                <Input placeholder={t('Register.exampleEmail')} />
              </Form.Item>
              <Form.Item
                label={t('Register.labelPassword')}
                name="password"
                rules={[
                  {
                    required: true,
                    message: t('Register.messageEmptyPassword'),
                  },
                ]}
              >
                <Input.Password type="password" />
              </Form.Item>

              <div className="footer-text">
                <div>
                  <span>{t('Register.suggestLogin')}</span>
                  <Link to="/login"> {t('Register.linkLogin')} </Link>
                </div>
              </div>
              <Form.Item>
                <Button
                  className="register-btn"
                  type="accent"
                  size="large"
                  htmlType="submit"
                  loading={status === ACTION_STATUS.PENDING}
                >
                  {t('Register.btnRegister')}
                </Button>
              </Form.Item>
              <Form.Item>
                <Divider className="divider">{t('Register.divider')}</Divider>
              </Form.Item>
              <Form.Item>
                <Space.StyledSpace
                  className="register-service-btn"
                  size="large"
                >
                  <GoogleLogin
                    clientId={GOOGLE_ID}
                    render={renderProps => (
                      <StyledLogo
                        className="register-form-button"
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
                        className="register-form-button"
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
      </StyledRegister>
    </CoverRegister>
  );
});

export default Register;
