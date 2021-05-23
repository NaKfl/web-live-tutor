import styled from 'styled-components';

export const StyledFavoriteTutor = styled.div`
  .heart-btn {
    font-size: 18px;
    transition: ease 0.2s;
    color: #646464;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #e4e6eb;
    padding: 10px;
    border-radius: 50%;
    transition: ease 0.2s;
    &:hover {
      background-color: #cccccc;
    }
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
