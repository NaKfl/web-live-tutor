import styled from 'styled-components';
import { media } from 'styles/media';

export const StyledDetailCourse = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 150px;

  ${media.mobile`
    padding: 0;
    .detail-course-right, .detail-course-left {
      flex: unset !important;
    }
    .topic-item{
      flex-wrap: nowrap;
    }
  `}

  ${media.tablet`
    padding: 0;
    .detail-course-right, .detail-course-left {
      flex: unset !important;
    }
  `}

  .detail-course-right {
    flex: 0.6;
    .topic-item {
      flex-wrap: nowrap;
      .topic-item-order {
        width: 30px;
      }
      .topic-item-name {
        width: 90%;
      }
    }
  }
  .detail-course-left {
    flex: 0.4;
  }
`;
