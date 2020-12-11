import { Layout } from 'antd';
import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';

export const StyledHeader = styled(Layout.Header)`
  background-color: ${COLOR.WHITE};
  color: ${COLOR.VIOLET};
  display: flex;
  justify-content: space-between;
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
