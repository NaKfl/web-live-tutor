import styled from 'styled-components';

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
    }
  }
`;
