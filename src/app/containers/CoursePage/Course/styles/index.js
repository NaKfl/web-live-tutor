import styled from 'styled-components';

export const StyledCourseCard = styled.div`
  border: solid 1px #d8d8d8;
  box-shadow: 0 4px 0 0 rgba(0, 0, 0, 0.14);
  border-radius: 12px;
  height: 23.5rem;
  max-width: 18rem;
  cursor: pointer;
  .description-course {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .title-course {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

export const StyledImageCard = styled.div`
  border-radius: 12px;
  height: 12rem;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const StyledLevelText = styled.div`
  position: absolute;
  bottom: 20px;
`;

export const StyledContentCard = styled.div`
  padding: 1.5rem;
`;
