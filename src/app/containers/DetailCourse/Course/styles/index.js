import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';

export const StyledCourseCard = styled.div`
  background-color: white;
  border: solid 1px #d8d8d8;
  box-shadow: 0 4px 0 0 rgba(0, 0, 0, 0.14);
  border-radius: 12px;
  overflow: hidden;
`;

export const StyledImageCard = styled.div`
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const StyledContentCard = styled.div`
  padding: 1.8rem;
  .title-course {
    font-size: 22px;
    font-weight: 600;
  }
  .description-course {
    font-size: 15px;
    font-weight: 500;
    color: ${COLOR.NICKEL};
  }
  .explore-btn {
    padding: 15px 20px !important;
    white-space: normal;
  }
`;
