import styled from 'styled-components';
import { Menu } from 'antd';
import { COLOR } from 'styles/colorPalette';

export const StyledMenu = styled(Menu)`
  border-bottom-color: ${COLOR.WHITE};
`;
export const StyledItem = styled(Menu.Item)`
  border-bottom: 0px !important;
  outline: none;
`;
