import styled from 'styled-components';
import Layout from 'app/components/Layout';
import { COLOR } from 'styles/colorPalette';
const { Content, Footer, Header } = Layout;
const maxWidth = 1370;

export const StyledHeader = styled(Header)`
  position: fixed;
  width: 100%;
  height: 70px;
  z-index: 1000;
  background-color: ${COLOR.WHITE};

  box-shadow: 0 -1px 13px 2px ${COLOR.BLACK_20};

  .header-wrapper {
    max-width: ${`${maxWidth}px`};
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .left-menu {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .logo-wrapper {
    display: flex;
    align-items: center;
    width: 220px;
  }
  .ant-menu-horizontal > {
    .ant-menu-item a {
      color: #7d7d7d;
      font-size: 16px;
      text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
      &:hover {
        color: ${COLOR.CORNFLOWER};
      }
    }
    .ant-menu-item-selected a {
      color: ${COLOR.CORNFLOWER};
    }
    .ant-menu-item:hover {
      border-color: ${COLOR.CORNFLOWER};
    }
  }
`;

export const StyledLayout = styled(Layout)`
  width: 100%;
  min-height: 100vh;
`;

export const StyledContent = styled(Content)`
  background-color: ${COLOR.BROWN_F5};
  width: 100%;
  position: relative;

  .content-wrapper {
    max-width: ${`${maxWidth}px`};
    margin: 0 auto;
    justify-content: center;
    display: flex;
    height: calc(100% - 70px);
    margin-top: 70px;
  }
`;

export const StyledMeeting = styled(Content)`
  width: 100%;
`;

export const StyledFooter = styled(Footer)`
  .footer-wrapper {
    max-width: ${`${maxWidth}px`};
    margin: 0 auto;
    text-align: center;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  background-color: ${COLOR.WHITE};
  width: 100%;

  position: relative;
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
