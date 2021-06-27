import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';

export const StyledHome = styled.div`
  margin-top: -35px;
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
  .available-tutor-title {
    margin-top: 40px;
  }
`;

export const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  .ant-pagination {
    li {
      transition: none;
      &:hover {
        border-color: ${COLOR.CORNFLOWER};
        a {
          color: ${COLOR.CORNFLOWER};
        }
      }
      button {
        transition: none;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          border-color: ${COLOR.CORNFLOWER};
          color: ${COLOR.CORNFLOWER};
        }
      }
    }
    .ant-pagination-item-active {
      border-color: ${COLOR.CORNFLOWER};
      a {
        color: ${COLOR.CORNFLOWER};
      }
    }
  }
`;

export const StyledCoverSearch = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
`;

export const StyledFistPart = styled.div`
  height: 400px;
  display: flex;
  .ant-carousel {
    width: 1000px;
  }
  border-bottom-left-radius: 5px;
  box-shadow: 0 0 5px 0 rgb(0 0 0 / 16%);

  & div {
    border-bottom-left-radius: 5px;
  }
  .ant-carousel {
    box-shadow: 0 0 5px 0 rgb(0 0 0 / 16%);
  }
`;

export const StyledSecondPart = styled.div`
  border-top: solid 4px ${COLOR.CORNFLOWER};
  border-bottom: solid 4px ${COLOR.WHITE};
  border-radius: 5px;
  background-color: ${COLOR.WHITE};
  box-shadow: 0 0 5px 0 rgb(0 0 0 / 16%);

  margin: 20px 0;
  .search-banner {
    width: 100%;
    background-color: ${COLOR.WHITE};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 33px 0 49px 0;
    color: #0b2239;
    .search-title {
      font-size: 33px;
      font-weight: 700;
      margin-bottom: 20px;
      letter-spacing: 1px;
    }
    .sub-title {
      font-size: 16px;
      font-weight: 400;
      margin-bottom: 20px;
    }
  }
`;

export const StyledTopList = styled.div`
  flex: 1;
`;

export const StyledTitle = styled.h3`
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 1px;
  text-align: center;
  color: #3c3c3c;
`;
