import { Select } from 'antd';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
  max-width: 320px;
  &.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    height: 44px;
    border-radius: 6px;
    .ant-select-selection-item {
      display: flex;
      align-items: center;
    }
  }
`;

export { StyledSelect };
