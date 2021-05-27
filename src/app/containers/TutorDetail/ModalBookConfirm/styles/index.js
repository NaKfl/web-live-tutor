import styled from 'styled-components';
import { Table } from 'antd';

export const StyledTotal = styled.div`
  display: flex;
  width: 100%;
  & > * {
    line-height: 24px;
    padding: 8px;
  }
  .title {
    width: 80%;
    font-size: 16px;
    text-align: left;
  }
  .price {
    width: 20%;
    text-align: center;
    font-size: 18px;
    font-weight: 550;
    &::after {
      content: '$';
    }
  }
`;

export const StyledTable = styled(Table)`
  .ant-table-footer {
    margin-top: 8px;
  }
`;
