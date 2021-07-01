import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';
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
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 10px;
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .image {
    height: 100px;
    margin-right: 25px;
  }
  ${media.smallMobile`
    flex-direction: column;
    align-items:flex-start;
  `}
  .content {
    max-width: 700px;
    h2 {
      font-size: 25px;
      font-weight: 600;
      margin-bottom: 6px;
    }
    p {
      margin-bottom: 3px;
      font-size: 15px;
      color: ${COLOR.NICKEL};
    }
  }
`;
