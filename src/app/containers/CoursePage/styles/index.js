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
export const LayoutListCourses = styled.div`
  width: calc(100% + 16px);
  margin: -8px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;
