import styled from 'styled-components';
import { media } from 'styles/media';

export const StyledCoursePage = styled.div`
  width: 100%;
  height: 100%;
  ${media.mobile`
      padding: 0;
      >h3 {
        font-size: 24px;
      }
  `}
`;
