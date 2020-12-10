import React, { memo } from 'react';
import { StyledContent } from './styles';
import Layout from 'app/components/Layout';
import AuthHeader from './AuthHeader';
import Header from './Header';
import { isAuthenticated } from 'utils/localStorageUtils';

export const AuthLayout = ({ children }) => (
  <Layout>
    {isAuthenticated() ? <Header /> : <AuthHeader />}
    <StyledContent>{children}</StyledContent>
    <Layout.StyledFooter>Design by anh em 1 nha</Layout.StyledFooter>
  </Layout>
);

export default memo(AuthLayout);
