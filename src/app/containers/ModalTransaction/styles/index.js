import { Modal } from 'antd';
import styled from 'styled-components';
import { media } from 'styles/media';

export const StyledModal = styled(Modal)`
  width: 900px !important;
  .ant-modal-body {
    padding: 22px 24px 10px 24px !important;
  }
  .payment-title {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 0;
  }
  p {
    margin: 0;
  }
  .ant-modal-content {
    border-radius: 10px;
    overflow: auto;

    ${media.mobile`
      ::-webkit-scrollbar {
        display: none;
      }
    `};
  }
`;

export const StyledTable = styled.div`
  .title {
    font-weight: 600;
    padding: 15px 0;
    margin: 0;
    font-size: 15px;
  }
`;
