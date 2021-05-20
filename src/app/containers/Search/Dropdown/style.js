import { Tag } from 'antd';
import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';
const { CheckableTag } = Tag;

export const StyledTag = styled(CheckableTag)`
  padding: 10px;
  border-radius: 8px !important;
  border: 1px solid #efefef;
  font-size: 14px;
  user-select: none;
  &:hover {
    color: ${COLOR.CORNFLOWER} !important;
  }
  &::selection {
    background-color: ${COLOR.WHITE} !important;
  }
`;

export const StyledGroup = styled.div`
  display: flex;
  flex-direction: column;
  .ant-tag-checkable-checked {
    background-color: ${COLOR.WHITE};
    border: 1px solid ${COLOR.CORNFLOWER};
    color: ${COLOR.CORNFLOWER};
  }

  .ant-tag-checkable:active {
    background-color: ${COLOR.WHITE} !important;
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const StyledCategory = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > * {
    margin: 5px 8px;
  }
  .title {
    font-size: 18px;
    font-weight: 550;
    text-transform: uppercase;
    display: block;
    width: 100%;
    margin-bottom: 10px;
    & > * {
      margin-left: 8px;
    }
    .ant-badge-count {
      background-color: ${COLOR.CORNFLOWER};
    }
  }
`;

export const StyledDropDown = styled.div`
  padding: 15px;
  position: absolute;
  border-radius: 8px;
  max-width: 450px;
  max-height: 70vh;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  overflow-y: scroll;
  background-color: ${COLOR.WHITE};
  z-index: 99;
  top: 60px;
  left: 0;
  &::after {
    width: 98%;
    height: 45px;
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      white 100%
    );
    z-index: 1;
  }
`;
