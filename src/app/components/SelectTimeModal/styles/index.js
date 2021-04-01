import styled from 'styled-components';
import { Modal } from 'antd';
import { COLOR } from 'styles/colorPalette';

export const StyledModal = styled(Modal)`
  width: 400px !important;
  label {
    font-size: 18px;
    margin-top: 5px;
    margin-left: 0 !important;
  }
  .ant-modal-content {
    border-radius: 10px;
  }
  .text-description {
    margin-top: 0 !important;
    font-weight: normal;
  }
`;
export const StyledAvatar = styled.div`
  position: relative;
`;
