import Avatar from 'app/components/Avatar';
import Dropdown from 'app/components/Dropdown';
import Space from 'app/components/Space';
import Menu from 'app/components/Menu';
import Button from 'app/components/Button';
import {
  useLogout,
  useGetUserInfoAuthenticate,
} from 'app/containers/Login/hooks';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { StyledHeader } from 'app/components/Layout';

export const Header = () => {
  const user = useGetUserInfoAuthenticate();
  const { t } = useTranslation();
  const { handlers } = useLogout();
  const { onLogout } = handlers;

  return (
    <StyledHeader>
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">Tutors</Menu.Item>
        <Menu.Item key="2">Courses</Menu.Item>
        <Menu.Item key="3">Progress</Menu.Item>
      </Menu>
      {(user && (
        <Space>
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
            <Button size="medium">LOG IN</Button>
          </Link>
          <Link to="/register">
            <Button size="medium" type="accent">
              SIGN UP
            </Button>
          </Link>
        </Space>
      )}
    </StyledHeader>
  );
};

export default memo(Header);
