import styled from 'styled-components';

export const StyledMeetingPage = styled.div`
  width: 100%;
  height: 100vh;
  .jitsi-container {
      .button-group-right {
        visibility: ${({ isTutor }) => (isTutor ? 'hidden' : 'hidden')};
      }
    }
  }
`;
