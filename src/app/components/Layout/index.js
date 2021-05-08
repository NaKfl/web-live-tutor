import { Layout } from 'antd';
import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';

const StyledLayout = styled(Layout)``;

export const StyledHeader = styled(Layout.Header)`
  .left-menu {
    flex: 1;
    display: flex;
    align-items: center;
  }
  height: 70px;
  .logo-wrapper {
    display: flex;
    align-items: center;
    width: 220px;
  }
  z-index: 1;
  background-color: ${COLOR.WHITE};
  display: flex;
  justify-content: space-between;
  box-shadow: 0 -1px 13px 2px ${COLOR.BLACK_20};
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

export const StyledContent = styled(Layout.Content)`
  padding: 50px;
`;

export const StyledFooter = styled(Layout.Footer)`
  text-align: center;
  background-color: ${COLOR.WHITE};
  color: ${COLOR.VIOLET};
  position: absolute;
  bottom: 0;
  width: 100%;
`;
export default StyledLayout;
