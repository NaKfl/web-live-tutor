import styled from 'styled-components';
import { Modal } from 'antd';
import { COLOR } from 'styles/colorPalette';
import { media } from 'styles/media';

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 10px;
  }
`;
export const StyledHeaderTable = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 20px;

  .left-header {
    display: flex;
    align-items: center;
    margin-right: 30px;
    ${media.smallMobile`
    flex-direction: column;
    align-items:flex-start;
  `}
    .content {
      max-width: 700px;
      h2 {
        font-size: 25px;
        font-weight: 600;
        margin-bottom: 6px;
      }
      p {
        margin-bottom: 3px;
        font-size: 15px;
        color: ${COLOR.NICKEL};
      }
    }
  }

  .image {
    height: 100px;
    margin-right: 25px;
  }

  ${media.custom600px`
    flex-direction: column;
    align-items:flex-start;
    .left-header{
      margin-right:unset;
      margin-bottom:20px;
    }
  `}
`;
