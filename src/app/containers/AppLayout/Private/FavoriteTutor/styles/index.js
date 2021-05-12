import styled from 'styled-components';

export const StyledFavoriteTutor = styled.div`
  .heart-btn {
    font-size: 22px;
    transition: ease 0.2s;
    color: #757575;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

export const StyledFavoriteChild = styled.div`
  width: 185px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    max-width: 150px;
    overflow: hidden;
  }
  .right {
    font-size: 17px;
    opacity: 0.4;
    transition: ease 0.2s;
    &:hover {
      opacity: 1;
    }
  }
`;
