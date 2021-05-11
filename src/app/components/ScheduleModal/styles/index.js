import styled from 'styled-components';
import { Modal } from 'antd';

export const StyledModal = styled(Modal)`
  width: 350px !important;
  .ant-modal-content {
    border-radius: 10px;
  }
  .text-description {
    margin-top: 0 !important;
    font-weight: normal;
  }
  .time-schedules {
    .ant-badge-status-text {
      font-size: 18px;
    }
  }
`;
export const StyledAvatar = styled.div`
  position: relative;
`;

export const StyledRangeTimePicker = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
  .ant-picker-range,
  .ant-picker {
    width: 75%;
    border: none;
  }
  .ant-picker-input {
    > input {
      font-size: 15px;
    }
  }
`;
