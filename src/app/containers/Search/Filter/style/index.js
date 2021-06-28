import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';
import { media } from 'styles/media';

export const StyleFilter = styled.div`
  width: 55%;
  margin: 10px auto;
  display: flex;
  position: relative;
  .wrapper {
    border-radius: 8px;
    padding: 10px 20px;
    box-shadow: 0px 4px 16px ${COLOR.SHADOW_GRAY};
    z-index: 10;
    background-color: white;
  }
  ${media.custom400px`
    width: unset;
  `}
`;

export const StyledFilterColumn = styled.div`
  margin-bottom: 10px;
  display: flex;
  width: 100%;
  flex-direction: column;
  .title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
  }
  .ant-select-selector {
    width: 220px;
    padding: 8px;
    border-radius: 8px;
  }
`;
