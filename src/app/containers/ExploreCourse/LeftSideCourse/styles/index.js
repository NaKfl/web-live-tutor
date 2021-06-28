import styled from 'styled-components';

export const StyledCourseCard = styled.div`
  width: 30%;
  overflow-x: hidden;
  border: 1px solid #e4e4e4;
  padding-left: 0;
  height: 50rem;
`;

export const StyledImageCard = styled.div`
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const StyledContentCard = styled.div`
  padding: 1.5rem;
  .topic-highlight {
    background-color: rgba(0, 0, 0, 0.08);
  }
  .topic-normal:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;
