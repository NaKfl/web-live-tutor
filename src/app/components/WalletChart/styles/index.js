import styled from 'styled-components';

export const StyledWalletChart = styled.div`
  height: 100%;

  div[data-chart-source-type='G2Plot'] {
    height: 100% !important;
    canvas {
      height: 100% !important;
    }
  }
`;
