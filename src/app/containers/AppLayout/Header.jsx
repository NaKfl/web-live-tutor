import { BarsOutlined, BellFilled } from '@ant-design/icons';
import Avatar from 'app/components/Avatar';
import Button from 'app/components/Button';
import Dropdown from 'app/components/Dropdown';
import { Logo } from 'app/components/Logo';
import Menu from 'app/components/Menu';
import Space from 'app/components/Space';
import WalletAmount from 'app/components/WalletAmount';
import { useChangeRole } from 'app/containers/AppLayout/hooks';
import FavoriteTutor from 'app/containers/FavoriteTutor';
import { useLogout } from 'app/containers/Login/hooks';
import MenuBar from 'app/containers/Menu/MenuBar';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { ROLES } from 'utils/constants';
import { useGetUserInfo } from './hooks';
import LanguageSelection from './LanguageSelection';
import { StyledHeader, StyledAvatar } from './styles';
import { useShowModal } from 'app/containers/AppLayout/hooks';
import querystring from 'querystring';
import isEmpty from 'lodash/fp/isEmpty';

export const Header = props => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { user } = useGetUserInfo();
  const { t } = useTranslation();
  const { handlers } = useLogout();
  const { onLogout } = handlers;
  const { changeRole } = useChangeRole();
  const { showPaymentModal } = useShowModal();

  const query = querystring.parse(props?.location?.search);
  const isShowMoreMenus = !isEmpty(query) && query['?more-menus'];

  return (
    <StyledHeader>
      <div className="header-wrapper">
        <div className="left-menu">
          <div className="logo-wrapper">
            <Link
              to={user?.currentRole === ROLES.TUTOR ? 'schedule-tutor' : '/'}
            >
              <Logo className="logo" />
            </Link>
          </div>
          <MenuBar className="nav-item-menus" />
        </div>
        {(user && (
          <Space className="right-menu">
            <Dropdown
              className="sub-btn"
              placement="bottomRight"
              trigger={['click']}
              overlay={
                <Menu>
                  <Menu.Item onClick={() => showPaymentModal()}>
                    {t('Wallet.depositNow')}
                  </Menu.Item>
                  <Menu.Item>
                    <Link to="/my-wallet">{t('Wallet.myWallet')}</Link>
                  </Menu.Item>
                </Menu>
              }
            >
              <WalletAmount wallet={user.walletInfo} />
            </Dropdown>
            <LanguageSelection />
            {user?.currentRole === ROLES.STUDENT && <FavoriteTutor />}
            <BellFilled className="menu-icon" />
            <BarsOutlined
              className="menu-icon more-btn"
              onClick={() =>
                isShowMoreMenus
                  ? history.push(`${pathname}`)
                  : history.push(`${pathname}?more-menus=true`)
              }
            />
            <Dropdown
              className="profile-menu"
              placement="bottomRight"
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
                    <Menu.Item onClick={() => changeRole()}>
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
              <StyledAvatar isExistName={user?.name}>
                <div className="avt-wrapper">
                  {user?.name && (
                    <span className="user-name">{user.name.split(' ')[0]}</span>
                  )}
                  <Avatar className="avatar" size={38} src={user.avatar} />
                </div>
              </StyledAvatar>
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
