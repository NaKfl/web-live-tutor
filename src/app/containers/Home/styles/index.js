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
  margin: 22px 0;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 1px;
  text-align: center;
  color: #3c3c3c;
  display: table;
  white-space: nowrap;
  text-align: center;
  &::before,
  &::after {
    opacity: 0.7;
    content: '';
    display: table-cell;
    position: relative;
    top: 50%;
    width: 50%;
    background-repeat: no-repeat;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABaAAAAACCAYAAACuTHuKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1OThBRDY4OUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1OThBRDY4QUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU5OEFENjg3Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU5OEFENjg4Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VU513gAAADVJREFUeNrs0DENACAQBDBIWLGBJQby/mUcJn5sJXQmOQMAAAAAAJqt+2prAAAAAACg2xdgANk6BEVuJgyMAAAAAElFTkSuQmCC);
  }
  &::before {
    background-position: right 1em top 50%;
  }
  &::after {
    background-position: left 1em top 50%;
  }
`;
