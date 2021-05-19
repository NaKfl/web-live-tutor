import Button from 'app/components/Button';
import { Logo } from 'app/components/Logo';
import Space from 'app/components/Space';
import MenuBar from 'app/containers/Menu/MenuBar';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSelection from './LanguageSelection';
import { StyledHeader } from './styles';

export const LoginHeader = () => {
  const { t } = useTranslation();

  return (
    <StyledHeader>
      <div className="header-wrapper">
        <div className="left-menu">
          <div className="logo-wrapper">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <MenuBar />
        </div>
        <Space className="login-register-group">
          <LanguageSelection className="language" />
          <Link to="/login">
            <Button size="medium">{t('Login.btnCap')}</Button>
          </Link>
          <Link to="/register">
            <Button size="medium" type="accent">
              {t('Register.btnCap')}
            </Button>
          </Link>
        </Space>
      </div>
    </StyledHeader>
  );
};

export default memo(LoginHeader);
