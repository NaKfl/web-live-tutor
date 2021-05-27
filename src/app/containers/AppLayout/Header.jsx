import Avatar from 'app/components/Avatar';
import Button from 'app/components/Button';
import Dropdown from 'app/components/Dropdown';
import { Logo } from 'app/components/Logo';
import Menu from 'app/components/Menu';
import Space from 'app/components/Space';
import FavoriteTutor from 'app/containers/FavoriteTutor';
import { useLogout } from 'app/containers/Login/hooks';
import MenuBar from 'app/containers/Menu/MenuBar';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROLES } from 'utils/constants';
import { useGetUserInfo } from './hooks';
import LanguageSelection from './LanguageSelection';
import { StyledHeader, StyledAvatar } from './styles';
import { useHistory } from 'react-router-dom';
import { CalendarFilled, BellFilled } from '@ant-design/icons';
import { useChangeRole } from 'app/containers/AppLayout/hooks';
import WalletAmount from 'app/components/WalletAmount';
import { useDeposit } from '../Wallet/hooks';

export const Header = () => {
  const { user } = useGetUserInfo();
  const history = useHistory();
  const { t } = useTranslation();
  const { handlers } = useLogout();
  const { onLogout } = handlers;
  const { changeRole } = useChangeRole();
  const { showPaymentModal } = useDeposit();

  return (
    <StyledHeader>
      <div className="header-wrapper">
        <div className="left-menu">
          <div className="logo-wrapper">
            <Link
              to={user.currentRole === ROLES.TUTOR ? 'schedule-tutor' : '/'}
            >
              <Logo />
            </Link>
          </div>
          <MenuBar />
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
            <BellFilled className="menu-icon" />
            <CalendarFilled
              className="menu-icon"
              onClick={() => {
                if (user?.currentRole === ROLES.STUDENT)
                  history.push('/booking-student');
                if (user?.currentRole === ROLES.TUTOR)
                  history.push('/booking-tutor');
              }}
            />
            {user?.currentRole === ROLES.STUDENT && <FavoriteTutor />}
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
