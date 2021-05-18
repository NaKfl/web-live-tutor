import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';

export const StyledText = styled.span`
  color: #fff;
  padding-left: 10px;
  padding-right: 10px;
  white-space: nowrap;
`;
export const StyledTextHighlight = styled.div`
  margin: 4px;
  padding-top: 0px;
  background-color: ${({ color }) => (color ? color : COLOR.CORNFLOWER)};
  height: 24px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
