import styled from 'styled-components';

export const StyledHome = styled.div`
  width: 100%;
  height: 100%;
  .list {
    & > * {
      width: 50%;
    }
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`;
