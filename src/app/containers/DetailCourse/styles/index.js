import styled from 'styled-components';
import { media } from 'styles/media';
import { Row } from 'antd';
import { COLOR } from 'styles/colorPalette';

export const StyledDetailCourse = styled(Row)`
  margin-top: -20px;
  width: 100%;
  height: 100%;

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
  }

  .title {
    font-size: 22px;
    font-weight: 600;
  }

  .sub-title-icon {
    font-size: 20px;
  }

  .sub-title-icon.question {
    color: ${COLOR.GOOGLE};
  }

  .sub-title-icon.people {
    color: ${COLOR.FACEBOOK};
  }

  .sub-title {
    font-size: 16px;
    margin: 0 0 0 6px;
  }

  .content {
    font-size: 14px;
    padding-left: 35px;
  }

  .topic {
    margin-bottom: 5px;
  }
`;
