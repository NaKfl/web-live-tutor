import styled from 'styled-components';
import { Modal } from 'antd';
import { media } from 'styles/media';

export const StyledModal = styled(Modal)`
  .ant-modal-title {
    font-weight: 600;
    font-size: 18px;
  }

  .ant-modal-body {
    padding: 13px 24px;
  }

  .ant-modal-content {
    border-radius: 10px;
    overflow: auto;
    max-width: 80vh;

    ${media.mobile`
      ::-webkit-scrollbar {
        display: none;
      }
    `};
  }
`;
