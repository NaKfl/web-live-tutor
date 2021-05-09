import styled from 'styled-components';
import { Modal } from 'antd';
import { COLOR } from 'styles/colorPalette';

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
  .ant-picker-range {
    width: 80%;
  }
  .btn-add {
    padding: 8px 10px !important;
  }
`;
