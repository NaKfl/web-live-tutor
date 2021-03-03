import styled from 'styled-components';
import Layout from 'app/components/Layout';
import { COLOR } from 'styles/colorPalette';
const { Content, Header, Footer } = Layout;

export const StyledLayout = styled(Layout)`
  width: 100%;
  min-height: 100vh;
`;

export const StyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLOR.WHITE};
  .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 24px 16px 0;
    float: left;
  }
  .left {
    flex: 1;
  }
  box-shadow: 0px 12px 19px -12px rgba(0, 0, 0, 0.75);
`;

export const StyledContent = styled(Content)`
  padding: 35px 50px;
  background-color: ${COLOR.WHITE};
  width: 100%;
  justify-content: center;
  display: flex;
  position: relative;
`;

export const StyledFooter = styled(Footer)`
  background-color: ${COLOR.WHITE};
  text-align: center;
`;
