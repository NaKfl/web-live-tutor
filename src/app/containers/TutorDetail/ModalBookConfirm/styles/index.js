import styled from 'styled-components';
import { Table } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import TextTimeSchedule from 'app/components/TextTimeSchedule';

export const StyledTotal = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  & > * {
    line-height: 24px;
    padding: 8px;
  }
  .title {
    font-size: 16px;
    text-align: left;
  }
  .price {
    text-align: center;
    font-size: 18px;
    font-weight: 550;
  }
`;

export const StyledTable = styled(Table)`
  .ant-table-footer {
    margin-top: 8px;
  }
`;

export const StyledModal = styled(Modal)`
  .ant-modal-title {
    font-weight: 600;
    font-size: 18px;
  }
  .ant-modal-content {
    border-radius: 10px;
  }
  .ant-modal-header {
    border-radius: 10px 10px 0 0;
  }
`;

export const StyledTextTimeSchedule = styled(TextTimeSchedule)`
  width: 100% !important;
`;
