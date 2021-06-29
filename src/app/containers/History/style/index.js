import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';
import { media } from 'styles/media';

export const StyledHistory = styled.div`
  width: 100%;
  height: 100%;
`;

export const StyledTable = styled.div`
  .title {
    font-weight: 600;
    padding: 15px 0;
    margin: 0;
    font-size: 15px;
  }
`;

export const StyledHeaderTable = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .image {
    height: 100px;
    margin-right: 25px;
  }
  ${media.smallMobile`
    flex-direction: column;
    align-items:flex-start;
  `}
  .content {
    max-width: 700px;
    h2 {
      font-size: 25px;
      font-weight: 600;
      margin-bottom: 6px;
    }
    p {
      margin-bottom: 3px;
      font-size: 15px;
      color: ${COLOR.NICKEL};
    }
  }
`;
