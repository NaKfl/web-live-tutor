import styled from 'styled-components';
import { Modal } from 'antd';
import { COLOR } from 'styles/colorPalette';
import { media } from 'styles/media';

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 10px;
    overflow: auto;

    ${media.mobile`
      ::-webkit-scrollbar {
        display: none;
      }
    `}
  }
  .ant-modal-body {
    height: 85vh;
  }
`;

export const StyledProfile = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
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
    padding: 16px 32px;

    ${media.mobile`
      justify-content: center;
    `}

    > button {
      width: 100%;
      justify-content: center;
    }
    .group-info {
      ${media.mobile`
        padding: 0 16px;
      `}

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
  .intro-schedule {
    .group-tutor-calender {
      position: relative;
      .btn-back {
        position: absolute;
        font-size: 15px;
        opacity: 0.9;
        top: 10px;
        left: 10px;
        > span {
          margin-right: 10px;
        }
      }
    }
    .tutor-calender {
      ${media.mobile`
        border: none;
        padding: 0;
      `}

      width: 100%;
      border: 1px #d9d9d9 solid;
      padding: 20px;

      .ant-picker-cell-today {
        .background-free-time {
          border-bottom: 1px black solid;
        }
      }

      .background-free-time {
        .date-disabled {
          color: rgba(0, 0, 0, 0.25) !important;
        }
      }
      .date-free-time {
        color: green;
        font-weight: bold;
        text-decoration: underline;
      }

      .ant-picker-calendar-date {
        height: 50px;
      }
    }
  }
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
