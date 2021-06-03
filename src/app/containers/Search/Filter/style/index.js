import styled from 'styled-components';

export const StyleFilter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  .wrapper {
    display: flex;
    width: 50%;
    & > * {
      margin: 10px 10px;
    }
  }
`;

export const StyledFilterColumn = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  .title {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 12px;
    text-transform: capitalize;
  }
  .ant-select-selector {
    padding: 10px 8px;
    border-radius: 8px;
  }
`;
