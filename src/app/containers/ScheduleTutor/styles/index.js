import { Calendar } from 'antd';
import styled from 'styled-components';
import { media } from 'styles/media';
import { COLOR } from 'styles/colorPalette';

export const StyledScheduleTutor = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledEnglishCalendar = styled(Calendar)`
  .header-schedule {
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    .today-btn {
      margin-left: 40px;
      font-size: 16px;
      font-weight: 600;
      background-color: ${COLOR.WHITE};
      border: 2px solid #e8e9eb;
      border-radius: 8px;
      padding: 8px 30px;
      cursor: pointer;
    }
    .arrow {
      font-size: 22px;
      cursor: pointer;
      color: ${COLOR.CORNFLOWER};
    }
    .arrow-left {
      margin-right: 10px;
    }
    .arrow-right {
      margin-left: 10px;
    }
    .ant-picker {
      border: none;
      padding: 0;
    }
    .ant-picker-focused {
      border: none;
      outline: none;
      box-shadow: none;
    }
    .ant-picker-input {
      > input {
        cursor: pointer;
        font-size: 30px;
        font-weight: 600;
        text-align: center;
        width: 145px;
      }
    }
  }
  .ant-picker-panel {
    .ant-picker-body {
      padding: 0;
    }
  }
  .ant-picker-content {
    .ant-picker-cell-in-view {
      font-weight: 600;
    }
    .ant-picker-cell {
      text-align: center;
      font-weight: 600;
    }
    td {
      border: 1px solid #e8e9eb;
    }
    > thead {
      > tr {
        font-size: 13px;
        letter-spacing: 1px;
        height: 32px;
        th {
          text-align: center;
          transform: translateX(-11px);
          padding: 0 !important;
        }
        th:nth-child(1) {
          visibility: hidden;
        }
        th:nth-child(1):after {
          visibility: visible;
          content: 'Sunday';
          font-weight: 300;
        }
        th:nth-child(2) {
          visibility: hidden;
        }
        th:nth-child(2):after {
          visibility: visible;
          content: 'Monday';
          font-weight: 300;
        }
        th:nth-child(3) {
          visibility: hidden;
        }
        th:nth-child(3):after {
          visibility: visible;
          content: 'Tuesday';
          font-weight: 300;
        }
        th:nth-child(4) {
          visibility: hidden;
        }
        th:nth-child(4):after {
          visibility: visible;
          content: 'Wednesday';
          font-weight: 300;
        }
        th:nth-child(5) {
          visibility: hidden;
        }
        th:nth-child(5):after {
          visibility: visible;
          content: 'Thursday';
          font-weight: 300;
        }
        th:nth-child(6) {
          visibility: hidden;
        }
        th:nth-child(6):after {
          visibility: visible;
          content: 'Friday';
          font-weight: 300;
        }
        th:nth-child(7) {
          visibility: hidden;
        }
        th:nth-child(7):after {
          visibility: visible;
          content: 'Saturday';
          font-weight: 300;
        }
      }
    }
    > tbody {
      tr {
        td.ant-picker-cell {
          &:hover {
            box-shadow: inset 0px 0px 0px 1px ${COLOR.CORNFLOWER};
            .ant-picker-cell-inner.ant-picker-calendar-date {
              background: none !important;
            }
          }
          .ant-picker-cell-inner {
            padding: 8px;
            .ant-picker-calendar-date-value {
              display: inline-block;
              padding: 5px 10px;
              border-radius: 25%;
              transition: none;
            }
            .ant-picker-calendar-date-content {
              margin-top: 5px;
              height: 83px;
            }
          }
        }
        td.ant-picker-cell-selected {
          .ant-picker-cell-inner.ant-picker-calendar-date {
            background: unset;
            &:before {
              content: none;
            }
            .ant-picker-calendar-date-value {
              color: black;
              display: inline-block;
              padding: 5px 10px;
              border-radius: 25%;
            }
          }
        }
        td.ant-picker-cell-in-view.ant-picker-cell-today
          .ant-picker-cell-inner {
          .ant-picker-calendar-date-value {
            color: ${COLOR.WHITE};
            display: inline-block;
            padding: 5px 10px;
            border-radius: 25%;
            background-color: ${COLOR.CORNFLOWER};
          }
          &:before {
            content: none;
          }
        }
      }
    }
    .ant-picker-calendar-date {
      border-top: none;
      margin: 0;
    }
    ${media.mobile`
      .ant-picker-calendar-date {
        width: 35px;
        height: 3.5rem;
      }
      `}
  }
`;

export const StyledVietnameseCalendar = styled(Calendar)`
  .header-schedule {
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    .today-btn {
      margin-left: 40px;
      font-size: 16px;
      font-weight: 600;
      background-color: ${COLOR.WHITE};
      border: 2px solid #e8e9eb;
      border-radius: 8px;
      padding: 8px 30px;
      cursor: pointer;
    }
    .arrow {
      font-size: 22px;
      cursor: pointer;
      color: ${COLOR.CORNFLOWER};
    }
    .arrow-left {
      margin-right: 10px;
    }
    .arrow-right {
      margin-left: 10px;
    }
    .ant-picker {
      border: none;
      padding: 0;
    }
    .ant-picker-focused {
      border: none;
      outline: none;
      box-shadow: none;
    }
    .ant-picker-input {
      > input {
        cursor: pointer;
        font-size: 30px;
        font-weight: 600;
        text-align: center;
        width: 145px;
      }
    }
  }
  .ant-picker-panel {
    .ant-picker-body {
      padding: 0;
    }
  }
  .ant-picker-content {
    .ant-picker-cell-in-view {
      font-weight: 600;
    }
    .ant-picker-cell {
      text-align: center;
      font-weight: 600;
    }
    td {
      border: 1px solid #e8e9eb;
    }
    > thead {
      > tr {
        font-size: 13px;
        letter-spacing: 1px;
        height: 32px;
        th {
          text-align: center;
          transform: translateX(-11px);
          padding: 0 !important;
        }
        th:nth-child(1) {
          visibility: hidden;
        }
        th:nth-child(1):after {
          visibility: visible;
          content: 'Chủ Nhật';
          font-weight: 300;
        }
        th:nth-child(2) {
          visibility: hidden;
        }
        th:nth-child(2):after {
          visibility: visible;
          content: 'Thứ Hai';
          font-weight: 300;
        }
        th:nth-child(3) {
          visibility: hidden;
        }
        th:nth-child(3):after {
          visibility: visible;
          content: 'Thứ Ba';
          font-weight: 300;
        }
        th:nth-child(4) {
          visibility: hidden;
        }
        th:nth-child(4):after {
          visibility: visible;
          content: 'Thứ Tư';
          font-weight: 300;
        }
        th:nth-child(5) {
          visibility: hidden;
        }
        th:nth-child(5):after {
          visibility: visible;
          content: 'Thứ Năm';
          font-weight: 300;
        }
        th:nth-child(6) {
          visibility: hidden;
        }
        th:nth-child(6):after {
          visibility: visible;
          content: 'Thứ Sáu';
          font-weight: 300;
        }
        th:nth-child(7) {
          visibility: hidden;
        }
        th:nth-child(7):after {
          visibility: visible;
          content: 'Thứ Bảy';
          font-weight: 300;
        }
      }
    }
    > tbody {
      tr {
        td.ant-picker-cell {
          &:hover {
            box-shadow: inset 0px 0px 0px 1px ${COLOR.CORNFLOWER};
            .ant-picker-cell-inner.ant-picker-calendar-date {
              background: none !important;
            }
          }
          .ant-picker-cell-inner {
            padding: 8px;
            .ant-picker-calendar-date-value {
              display: inline-block;
              padding: 4px 8px;
              border-radius: 25%;
              transition: none;
            }
            .ant-picker-calendar-date-content {
              margin-top: 5px;
              height: 83px;
            }
          }
        }
        td.ant-picker-cell-selected {
          .ant-picker-cell-inner.ant-picker-calendar-date {
            background: unset;
            &:before {
              content: none;
            }
            .ant-picker-calendar-date-value {
              color: black;
              display: inline-block;
              padding: 5px 10px;
              border-radius: 25%;
            }
          }
        }
        td.ant-picker-cell-in-view.ant-picker-cell-today
          .ant-picker-cell-inner {
          .ant-picker-calendar-date-value {
            color: ${COLOR.WHITE};
            display: inline-block;
            padding: 5px 10px;
            border-radius: 25%;
            background-color: ${COLOR.CORNFLOWER};
          }
          &:before {
            content: none;
          }
        }
      }
    }
    .ant-picker-calendar-date {
      border-top: none;
      margin: 0;
    }
    ${media.mobile`
      .ant-picker-calendar-date {
        width: 35px;
        height: 3.5rem;
      }
      `}
  }
`;
