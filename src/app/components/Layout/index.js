import { Layout } from 'antd';
import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';

const StyledLayout = styled(Layout)``;

export const StyledHeader = styled(Layout.Header)`
  z-index: 1;
  background-color: ${COLOR.WHITE};
  display: flex;
  justify-content: space-between;
  box-shadow: 0 -1px 13px 2px ${COLOR.BLACK_20};
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
