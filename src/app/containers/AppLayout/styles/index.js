import styled from 'styled-components';
import Layout from 'app/components/Layout';
import { COLOR } from 'styles/colorPalette';
const { Content, Footer, Header } = Layout;
const maxWidth = 1370;

export const StyledIcon = styled.img`
  display: inline-block;
  width: 22px;
  height: 22px;
  cursor: pointer;
`;

export const StyledHeader = styled(Header)`
  .login-register-group {
    .language {
      margin-right: 10px;
    }
  }

  .avatar {
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
      0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    cursor: pointer;
  }

  position: fixed;
  width: 100%;
  height: 70px;
  z-index: 1000;
  background-color: ${COLOR.WHITE};
  border-bottom: solid 4px ${COLOR.CORNFLOWER};
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

  .right-menu {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    & > * {
      margin-left: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .sub-btn {
      box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
        0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
      margin-right: 5px;
    }
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
  min-height: calc(100vh - 140px);
  background-color: ${COLOR.WHITE};
  width: 100%;
  position: relative;

  .content-wrapper {
    min-height: calc(100vh - 140px);
    padding: 35px 0;
    max-width: ${`${maxWidth}px`};
    margin: 0 auto;
    justify-content: center;
    display: flex;
    margin-top: 70px;
  }
`;

export const StyledMeeting = styled(Content)`
  width: 100%;
`;

export const StyledFooter = styled(Footer)`
  background: #525961;
  color: #ddd;
  width: 100%;
  padding: 0 0 0;

  .footer-wrapper {
    max-width: ${`${maxWidth}px`};
    margin: 0 auto;
    padding: 24px 0;
    text-align: center;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .group-menus,
    .group-icons {
      * {
        margin-right: 15px;
      }
    }
  }
`;
