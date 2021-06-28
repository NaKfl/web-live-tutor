import styled from 'styled-components';
import { Modal } from 'antd';
import { media } from 'styles/media';
import { COLOR } from 'styles/colorPalette';

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

  .guide {
    margin-bottom: 5px;
    font-weight: 600;
    font-size: 15px;
  }

  .warn-icon {
    color: ${COLOR.CORNFLOWER};
    font-size: 20px;
    margin-right: 8px;
  }

  .options {
    margin-bottom: 10px;
  }

  .option {
    margin-left: 20px;
    margin-top: 4px;
  }
`;
