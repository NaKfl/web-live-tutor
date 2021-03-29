import Avatar from 'app/components/Avatar';
import Dropdown from 'app/components/Dropdown';
import Space from 'app/components/Space';
import Menu from 'app/components/Menu';
import Button from 'app/components/Button';
import { useLogout } from 'app/containers/Login/hooks';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { StyledHeader } from 'app/components/Layout';
import FavoriteTutor from 'app/containers/AppLayout/Private/FavoriteTutor';
import { getUser } from 'utils/localStorageUtils';

export const Header = () => {
  const user = getUser();
  const { t } = useTranslation();
  const { handlers } = useLogout();
  const { onLogout } = handlers;
  const [selectedKey, setSelectedKey] = useState(['1']);

  return (
    <StyledHeader>
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={selectedKey}
        onClick={e => {
          if (e.key) setSelectedKey([e.key]);
        }}
      >
        <Menu.Item key="1">
          <Link to="/">{t('Category.tutor')}</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/register-tutor">{t('Category.registerTutor')}</Link>
        </Menu.Item>
        <Menu.Item key="3">{t('Category.progress')}</Menu.Item>
        <Menu.Item key="4">
          <Link to="/schedule-tutor">Schedule</Link>
        </Menu.Item>
      </Menu>
      {(user && (
        <Space>
          <FavoriteTutor></FavoriteTutor>
          <Dropdown
            trigger={['click']}
            overlay={
              <Menu>
                <Menu.Item>
                  <Link to="/profile">{t('Header.linkProfile')}</Link>
                </Menu.Item>
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
