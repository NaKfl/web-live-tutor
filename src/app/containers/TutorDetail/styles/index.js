import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';
import { media } from 'styles/media';

export const StyledTutorDetail = styled.div`
  width: 100%;
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

export const StyledTutorName = styled.h3`
  font-size: 25px;
  font-weight: 600 !important;
  margin-bottom: 0;
  display: block;
  height: 40px;
`;

export const StyledTutorTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  background-color: ${COLOR.WHITE};
  padding: 12px 0;
  .status {
    color: rgba(0, 0, 0, 0.54);
  }
  .start-btn {
    margin-top: 2px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tutor-info {
    .rate {
      font-size: 12px;
      li {
        margin-right: 4px;
      }
    }
    ${media.mobile`
      justify-content: center;
    `}

    > button {
      width: 100%;
      justify-content: center;
    }
    .group-info {
      margin-left: 15px;
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

export const StyledTutorContent = styled.div`
  width: 100%;
  .intro-section {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 20px;
    margin-bottom: 20px;
    .name {
      margin-bottom: 15px;
    }
    .bio {
      margin-bottom: 30px;
    }
    .schedule-btn {
      width: 100%;
      text-align: center;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 15px;
    }
    .function-icon-group {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        font-size: 12px;
        color: ${COLOR.CORNFLOWER};
      }
      .function-icon {
        font-size: 19px;
        padding: 6px;
        border-radius: 50%;
        background-color: transparent;
        transition: ease 0.2s;
        &:hover {
          background-color: rgba(0, 0, 0, 0.04);
        }
      }
    }
  }
  .intro-about {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 20px;
    margin-bottom: 20px;
    .part {
      margin-bottom: 20px;
      .part-title {
        font-weight: 600;
        font-size: 17px;
      }
      .part-content {
        margin-top: 10px;
        margin-left: 20px;
      }
    }
    .last-part {
      margin-bottom: 0;
    }
  }
  .intro-video-section {
    video {
      border-radius: 5px;
    }
  }
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
    .schedule-title {
      font-weight: 600;
      font-size: 17px;
    }
    .schedule-content {
      margin-top: 10px;
    }
    .group-tutor-calender {
      position: relative;

      .btn-back {
        font-size: 15px;
        > span {
          margin-right: 10px;
        }
      }
      .ant-skeleton.ant-skeleton-active {
        margin-top: 10px;
        .ant-skeleton-content {
          .ant-skeleton-title {
            margin: 0 0 5px 0;
          }
          .ant-skeleton-paragraph {
            margin-top: 10px;
          }
        }
      }
    }
    .tutor-calender {
      ${media.mobile`
        border: none;
        padding: 0;
      `}
      .ant-picker-calendar-header {
        justify-content: flex-start;
        .ant-picker-calendar-mode-switch {
          display: none;
        }
      }
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
