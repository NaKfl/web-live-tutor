import styled from 'styled-components';
import { media } from 'styles/media';

export const StyledScheduleTutor = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 5rem;
  .schedule-calender {
    .header-schedule {
      margin-bottom: 1.5rem;
      .ant-picker-input {
        font-size: 15px;
        > input {
          font-size: 16px;
        }
      }
    }
    .ant-picker-panel {
      border: 1px #f0f0f0 solid;
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
        border: 2px solid #f0f0f0;
      }
      > thead {
        > tr {
          font-size: 16px;
          th {
            text-align: center;
            padding: 8px 0;
            transform: translateX(-10px);
          }
          th:nth-child(1) {
            visibility: hidden;
          }
          th:nth-child(1):after {
            visibility: visible;
            content: 'Sunday';
          }
          th:nth-child(2) {
            visibility: hidden;
          }
          th:nth-child(2):after {
            visibility: visible;
            content: 'Monday';
          }
          th:nth-child(3) {
            visibility: hidden;
          }
          th:nth-child(3):after {
            visibility: visible;
            content: 'Tuesday';
          }
          th:nth-child(4) {
            visibility: hidden;
          }
          th:nth-child(4):after {
            visibility: visible;
            content: 'Wednesday';
          }
          th:nth-child(5) {
            visibility: hidden;
          }
          th:nth-child(5):after {
            visibility: visible;
            content: 'Thursday';
          }
          th:nth-child(6) {
            visibility: hidden;
          }
          th:nth-child(6):after {
            visibility: visible;
            content: 'Friday';
          }
          th:nth-child(7) {
            visibility: hidden;
          }
          th:nth-child(7):after {
            visibility: visible;
            content: 'Saturday';
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
  }
`;
