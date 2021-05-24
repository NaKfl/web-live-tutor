import styled from 'styled-components';
import { Row } from 'antd';

export const StyledGroupSelectTime = styled(Row)`
  .ant-checkbox-wrapper-disabled {
    position: relative;
    .ant-checkbox-disabled {
      visibility: hidden;
    }
    .icon-checked {
      position: absolute;
      top: 4px;
      left: 0;
      font-size: 16px;
      color: #f5f5f5;
      background: #b8b8b8;
      border-radius: 2px;
    }
  }
  .ant-checkbox-wrapper {
    display: flex;
    align-items: center;
    margin-left: 0;

    div {
      width: 10rem;
    }
  }
  .ant-skeleton.ant-skeleton-active .ant-skeleton-content {
    .ant-skeleton-title {
      margin: 0 0 5px 0;
    }
    .ant-skeleton-paragraph {
      display: none;
    }
  }
`;
