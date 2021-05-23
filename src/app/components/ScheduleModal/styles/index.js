import styled from 'styled-components';
import { Modal } from 'antd';

export const StyledModal = styled(Modal)`
  width: 380px !important;
  .btn-add {
    margin-left: 10px;
    width: 31px;
    height: 72px;
    padding: 0 !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ant-modal-content {
    border-radius: 10px;
    .ant-modal-body {
      padding-top: 18px;
      padding-right: 25px;
    }
  }
  .text-description {
    margin-top: 0 !important;
    font-weight: normal;
  }
  .time-schedules {
    .ant-skeleton.ant-skeleton-active .ant-skeleton-content {
      .ant-skeleton-title {
        display: inline-block;
        width: 94% !important;
        height: 20px;
        margin: 0 0 0 20px;
      }
      .ant-skeleton-paragraph {
        display: none;
      }
    }
    .ant-badge-status-text {
      font-size: 18px;
    }
  }
  .title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .sub-title {
    font-size: 15px;
    font-weight: 500;
    margin-left: 10px;
    margin-top: 10px;
    padding-bottom: 3px;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      left: 15px;
      bottom: 0;
      width: 80%;
      height: 1px;
      background: radial-gradient(
        ellipse at center,
        #ddd 0,
        hsla(0, 0%, 100%, 0) 100%
      );
    }
    p {
      margin: 0;
      font-size: 20px;
      letter-spacing: 1px;
      font-weight: 600;
    }
  }
`;
export const StyledAvatar = styled.div`
  position: relative;
`;

export const StyledRangeTimePicker = styled.div`
  width: 93%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .ant-picker-range,
  .ant-picker {
    box-shadow: none;
    .ant-picker-active-bar {
      display: none;
    }
  }
  .ant-picker {
    width: 100%;
    border-radius: 5px;
    .ant-picker-input {
      > input {
        font-size: 14px;
      }
    }
  }
`;
