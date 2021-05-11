import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';

export const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  .logo-img {
    width: 47px;
    height: 47px;
  }
  .logo-name {
    color: ${COLOR.CORNFLOWER};
    font-size: 28px;
    margin-left: 5px;
    letter-spacing: 1px;
    letter-spacing: 2.8px;
  }
`;
