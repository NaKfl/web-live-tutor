import styled from 'styled-components';
import { Modal } from 'antd';
import { media } from 'styles/media';

export const StyledModal = styled(Modal)`
  .ant-modal-title {
    font-weight: 600;
    font-size: 18px;
  }

  .ant-modal-body {
    padding: 10px 24px;
    max-height: 500px;
    overflow: auto;
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

  .ant-comment-content-author {
    margin-bottom: 0;
  }

  .rate {
    font-size: 12px;
    li {
      margin-right: 4px;
    }
  }
`;
