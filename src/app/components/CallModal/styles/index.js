import styled, { keyframes } from 'styled-components';
import { Modal } from 'antd';

const blinkingModal = keyframes`
  25%
  {
    transform: scale( .96 );
  }
  50%
  {
    transform: scale( 1 );
  }
  75%
  {
    transform: scale( .96 );
  }
  100%
  {
    transform: scale( 1 );
  }
`;

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    animation: ${blinkingModal} 3s infinite;
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
