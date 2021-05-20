import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';

export const StyledRegisterTutor = styled.div`
  width: 700px;
  .ant-steps-item-process .ant-steps-item-icon {
    background: ${COLOR.CORNFLOWER};
    border-color: ${COLOR.CORNFLOWER};
  }

  .ant-steps-item-finish {
    .ant-steps-item-icon {
      border-color: ${COLOR.CORNFLOWER};
      .ant-steps-icon {
        color: ${COLOR.CORNFLOWER};
      }
    }
    .ant-steps-item-content .ant-steps-item-title {
      &:after {
        background-color: ${COLOR.CORNFLOWER};
      }
    }
  }
`;

export const StepsContent = styled.div`
  margin-top: 60px;
  margin-bottom: 30px;
`;

export const StepsAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
