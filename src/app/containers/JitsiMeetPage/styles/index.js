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
