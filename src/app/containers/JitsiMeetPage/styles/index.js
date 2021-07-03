import styled from 'styled-components';

export const StyledMeetingPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  .jitsi-container {
    .button-group-right {
      visibility: ${({ isTutor }) => (isTutor ? 'hidden' : 'hidden')};
    }
  }
  .content {
    margin: auto 0;
  }
`;

export const StyledCountDown = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 234px;
  top: 40px;
  .ant-progress-text {
    color: white;
  }
`;
