import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';
import { media } from 'styles/media';

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
  border-bottom-left-radius: 5px;
  box-shadow: 0 0 5px 0 rgb(0 0 0 / 16%);

  & div {
    border-bottom-left-radius: 5px;
  }
  .ant-carousel {
    width: 70%;
    box-shadow: 0 0 5px 0 rgb(0 0 0 / 16%);
  }
  .top-tutor {
    width: 30%;
  }

  ${media.subWide`
    .ant-carousel {
      width: 65%;
    }
    .top-tutor {
      width: 35%;
    }
  `}

  ${media.tablet`
  height: unset;
    flex-direction:column;
    .ant-carousel {
    width: 100%;
  }
  .top-tutor {
    width: 100%;
    height: 400px;
  }
  `}
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
    padding: 33px 30px 49px 30px;
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

  ${media.tablet`
  .search-banner {
    .search-title {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 20px;
      }
  }
  `}
`;

export const StyledTitle = styled.h3`
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 1px;
  text-align: center;
  color: #3c3c3c;
  ${media.custom600px`
  font-size: 25px;
  `}
  ${media.custom400px`
  font-size: 20px;
  `}
  ${media.smallMobile`
    white-space: normal;
  `}
`;
