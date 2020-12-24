import React, { memo } from 'react';
import { StyledHeader } from 'app/components/Layout';
import Menu from 'app/components/Menu';
import Space from 'app/components/Space';
import Button from 'app/components/Button';
import { Link } from 'react-router-dom';

export const PublicHeader = () => {
  return (
    <StyledHeader>
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">For organizations</Menu.Item>
        <Menu.Item key="2">For kids</Menu.Item>
        <Menu.Item key="3">Our courses</Menu.Item>
      </Menu>
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
    </StyledHeader>
  );
};

export default memo(PublicHeader);
