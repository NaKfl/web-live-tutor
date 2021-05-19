import { faBell, faCalendarWeek } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from 'app/components/Avatar';
import Button from 'app/components/Button';
import Dropdown from 'app/components/Dropdown';
import { Logo } from 'app/components/Logo';
import Menu from 'app/components/Menu';
import Space from 'app/components/Space';
import FavoriteTutor from 'app/containers/AppLayout/Private/FavoriteTutor';
import { useLogout } from 'app/containers/Login/hooks';
import { actions as loginActions } from 'app/containers/Login/slice';
import MenuBar from 'app/containers/Menu/MenuBar';
import useActions from 'hooks/useActions';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROLES } from 'utils/constants';
import { useGetUserInfo } from './hooks';
import LanguageSelection from './LanguageSelection';
import { StyledHeader } from './styles';

export const Header = () => {
  const { user } = useGetUserInfo();
  const { t } = useTranslation();
  const { handlers } = useLogout();
  const { onLogout } = handlers;
  const { changeRole } = useActions(
    {
      changeRole: loginActions.changeRole,
    },
    [loginActions],
  );

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
        {(user && (
          <Space className="right-menu">
            <Button className="sub-btn" type="accent">
              {t('Header.subscribe')}
            </Button>
            <FontAwesomeIcon
              icon={faBell}
              style={{ fontSize: 22, color: '#757575' }}
            />
            <FontAwesomeIcon
              icon={faCalendarWeek}
              style={{ fontSize: 22, color: '#757575' }}
            />
            {user?.currentRole === ROLES.STUDENT && <FavoriteTutor />}
            <LanguageSelection />
            <Dropdown
              placement="bottomRight"
              trigger={['click']}
              overlay={
                <Menu>
                  <Menu.Item>
                    <Link to="/profile">{t('Header.linkProfile')}</Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link to="/history">{t('Header.linkHistory')}</Link>
                  </Menu.Item>

                  {(!user?.roles?.includes(ROLES.TUTOR) && (
                    <Menu.Item>
                      <Link to="/register-tutor">
                        {t('Header.linkRegisterTutor')}
                      </Link>
                    </Menu.Item>
                  )) || (
                    <Menu.Item
                      onClick={() =>
                        changeRole({
                          roleName:
                            user?.currentRole === ROLES.STUDENT
                              ? ROLES.TUTOR
                              : ROLES.STUDENT,
                        })
                      }
                    >
                      {user?.currentRole === ROLES.STUDENT
                        ? t('Header.switchRoleToTutor')
                        : t('Header.switchRoleToStudent')}
                    </Menu.Item>
                  )}
                  <Menu.Item onClick={onLogout}>
                    {t('Header.linkLogout')}
                  </Menu.Item>
                </Menu>
              }
            >
              <Avatar className="avatar" size={38} src={user.avatar} />
            </Dropdown>
          </Space>
        )) || (
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
        )}
      </div>
    </StyledHeader>
  );
};

export default memo(Header);
