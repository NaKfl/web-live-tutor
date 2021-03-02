import styled from 'styled-components';
import { Badge, Modal } from 'antd';
import { COLOR } from 'styles/colorPalette';

export const StyledModal = styled(Modal)`
  max-height: calc(100% - 40px);
`;

export const StyledProfile = styled.div`
  display: flex;
  justify-content: center;
  h3,
  h4,
  h5 {
    font-weight: normal;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .profile-form {
    width: 100%;
  }
`;

export const StyledTutorTitle = styled.div`
  .tutor-info {
    padding: 10px 30px;
    > button {
      width: 100%;
      justify-content: center;
    }
    .group-info {
      > h3 {
        opacity: 0.9;
      }
      flex-direction: column;
      .country {
        .ant-image {
          width: 32px;
          margin-left: 5px;
          margin-right: 5px;
        }
        > h5 {
          margin: 0;
          opacity: 0.8;
          font-weight: normal;
        }
      }
    }
  }
`;
export const StyledGroupIconRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  > span {
    margin-right: 20px;
  }
`;
export const StyledGroupIcon = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  .anticon {
    font-size: 24px;
    color: ${COLOR.BOULDER};
    cursor: pointer;
  }
`;
export const StyledTutorContent = styled.div`
  .intro-badge {
    .rate {
      font-size: 12px;
    }
  }
  .video-tutor {
    width: 100%;
    object-fit: contain;
  }
`;

export const StyledPart = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledAvatar = styled.div`
  position: relative;
`;

export const StyledName = styled.p`
  margin: 0;
  font-size: 18px;
`;

export const StyledRow = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledMessage = styled.p`
  font-size: 15px;
  margin-bottom: 0;
  margin-right: 5px;
`;
