import { Col } from 'app/components/Grid';
import styled from 'styled-components';
import { media } from 'styles/media';

export const StyledCourseCard = styled(Col)`
  overflow-x: hidden;
  border: 1px solid #e4e4e4;
  padding-left: 0;
  height: 50rem;
  ${media.custom768px`
  height: unset;
  `}
`;

export const StyledImageCard = styled.div`
  width: 100%;
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const StyledContentCard = styled.div`
  width: 100%;
  padding: 1.5rem;
  .topic {
    border-radius: 10px;
    cursor: pointer;
    width: 250px;
  }
  .topic-highlight {
    background-color: rgba(0, 0, 0, 0.08);
  }
  .topic-normal:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
  .topic-item-name {
    font-weight: 500;
    padding-left: 10px;
    font-size: 15px;
    margin: 10px 20px;
  }
  .topic-item-content {
    font-weight: 500;
    font-size: 15px;
    cursor: pointer;
    margin: 10px 0;
  }
  .title-course {
    font-size: 22px;
  }
  .description-course {
    font-size: 15px;
    font-weight: 500;
    padding-left: 10px;
  }
`;
