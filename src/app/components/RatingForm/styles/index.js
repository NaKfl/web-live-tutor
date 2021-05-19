import { Modal } from 'antd';
import styled from 'styled-components';

export const StyledModal = styled(Modal)`
  width: 400px !important;
  border-top: solid 4px #6979f8;
  border-radius: 5px;
  .ant-modal-content {
    border-bottom: solid 4px #fff;
    .tutor-name {
      font-size: 20px;
      margin-bottom: 0px;
    }
    .average-rating {
      margin-right: 5px;
    }
  }
  hr {
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .text-description {
    margin-top: 0 !important;
    font-weight: normal;
  }
`;
export const StyledAvatar = styled.div`
  position: relative;
`;

export const StyledTextHighlight = styled.div`
  margin: 4px;
  padding: 10px;
  background-color: #fadb14;
  color: #ffffff;
  height: 24px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
