import styled from 'styled-components';
import { Menu } from 'antd';
import { COLOR } from 'styles/colorPalette';

export const StyledMenu = styled(Menu)`
  border: none;
  &.ant-menu-horizontal:not(.ant-menu-dark) {
    & > .ant-menu-item,
    & > .ant-menu-submenu {
      width: fit-content;
      margin: 0 20px;
      height: 100%;
      color: ${COLOR.BOULDER};
      font-size: 16px;
      text-shadow: 0 -1px 0 ${COLOR.BLACK_12};
    }
    & > .ant-menu-item-selected,
    & > .ant-menu-item-active {
      color: ${COLOR.CORNFLOWER};
      border-color: ${COLOR.CORNFLOWER};
      text-shadow: 0 0 0.65px ${COLOR.CORNFLOWER},
        0 0 0.65px ${COLOR.CORNFLOWER};
    }
  }
`;

export const StyledItem = styled(Menu.Item)``;
