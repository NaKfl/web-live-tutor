import styled from 'styled-components';

export const StyledWalletAmount = styled.div`
  cursor: pointer;
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e4e6eb;
    padding: 10px 13px 10px 13px;
    border-radius: 30px;
    transition: ease 0.2s;

    &:hover {
      background-color: #cccccc;
    }

    .amount {
      font-size: 16px;
      font-weight: 600;
      margin-left: 5px;
      height: 18px;
      display: flex;
      align-items: center;
    }
  }
`;
