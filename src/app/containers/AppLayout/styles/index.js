import styled from 'styled-components';
import Layout from 'app/components/Layout';
import { COLOR } from 'styles/colorPalette';
import { media } from 'styles/media';
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
  ${media.mobile`
  padding:35px 35px;
  `}
`;

export const StyledMeeting = styled(Content)`
  width: 100%;
`;

export const StyledFooter = styled(Footer)`
  background-color: ${COLOR.WHITE};
  width: 100%;
  text-align: center;
  display: flex;
  position: relative;
  justify-content: flex-end;
  align-items: center;
`;

export const StyledText = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
`;

export const ButtonNoOutline = styled.button`
  outline: none;
  border: none;
  background-color: #fff;
`;
