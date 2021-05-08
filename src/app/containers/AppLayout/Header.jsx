import Avatar from 'app/components/Avatar';
import Dropdown from 'app/components/Dropdown';
import Space from 'app/components/Space';
import Menu from 'app/components/Menu';
import Button from 'app/components/Button';
import MenuBar from 'app/containers/Menu/MenuBar';
import { useLogout } from 'app/containers/Login/hooks';
import React, { memo } from 'react';
import { Logo } from 'app/components/Logo';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { StyledHeader } from 'app/components/Layout';
import FavoriteTutor from 'app/containers/AppLayout/Private/FavoriteTutor';
import { actions as loginActions } from 'app/containers/Login/slice';
import useActions from 'hooks/useActions';
import { selectUserInfoAuthenticate } from 'app/containers/Login/selectors';
import { useSelector } from 'react-redux';
import { ROLES } from 'utils/constants';

export const Header = () => {
  const user = useSelector(selectUserInfoAuthenticate);
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
      <div className="left-menu">
        <div className="logo-wrapper">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <MenuBar />
      </div>
      {(user && (
        <Space>
          {user?.currentRole === ROLES.STUDENT && <FavoriteTutor />}
          <Dropdown
            trigger={['click']}
            overlay={
              <Menu>
                <Menu.Item>
                  <Link to="/profile">{t('Header.linkProfile')}</Link>
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
            <Avatar src={user.avatar} />
          </Dropdown>
        </Space>
      )) || (
        <Space>
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
    </StyledHeader>
  );
};

export default memo(Header);
