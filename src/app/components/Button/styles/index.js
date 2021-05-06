import styled from 'styled-components';
import { Button } from 'antd';
import { buttonStyle } from './config';

export const StyledButton = styled(Button)`
  ${({ type, loading }) => buttonStyle({ type })}
  &:hover {
    ${({ type }) => buttonStyle({ type })}
    filter: brightness(110%);
  }
  &:focus {
    ${({ type }) => buttonStyle({ type })}
  }
`;
