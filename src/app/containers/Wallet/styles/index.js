import styled from 'styled-components';
import { Col, Row, Table } from 'antd';

export const StyledWallet = styled(Row)`
  width: 100%;
  height: calc(100vh - 210px);
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledFullHeightCol = styled(Col)`
  height: 100%;
`;

export const StyledLeftPart = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  .row-chart {
    flex: 1;
    margin-top: 30px;
  }
`;

export const StyledTable = styled(Table)``;
