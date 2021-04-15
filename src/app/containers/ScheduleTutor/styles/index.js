import styled from 'styled-components';
import { media } from 'styles/media';

export const StyledScheduleTutor = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 5rem;
  .schedule-calender {
    .ant-picker-panel {
      border: 1px #f0f0f0 solid;
    }
    .ant-picker-content {
      > thead {
        > tr {
          font-size: 16px;
        }
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
