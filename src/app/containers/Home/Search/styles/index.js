import styled from 'styled-components';
import { Input } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { COLOR } from 'styles/colorPalette';

export const StyledSearch = styled.div`
  max-height: 200px;
  width: 100%;
  padding: 10px 0px;
  margin-bottom: 16px;
  .title {
    display: flex;
    align-items: center;
    font-size: 1rem;
    & > * {
      margin-right: 15px;
      color: ${COLOR.VIOLET};
    }
    .selected {
      color: ${COLOR.PRIMARY};
    }
    .content {
      font-size: 1.5rem;
    }
  }
  .divider {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .divider2 {
    margin-top: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    & > * {
      margin-right: 10px;
    }
  }
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .test {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const StyledInputSearch = styled(Input)`
  border-radius: 6px !important;
  max-width: 320px;
  min-width: 250px;
`;

export const StyledFilterIcon = styled(FilterOutlined)`
  font-size: 1.25rem;
  margin-right: 10px;
  transition: all 0.2s ease-in;
  &:hover {
    transform: scale(1.1);
    color: ${COLOR.CORNFLOWER};
  }
`;
