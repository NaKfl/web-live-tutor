import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';

export const StyledWalletAmount = styled.div`
  cursor: pointer;
  .wrapper {
    color: ${COLOR.WHITE};
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${COLOR.CORNFLOWER};
    padding: 10px 15px 10px 15px;
    border-radius: 30px;
    transition: ease 0.2s;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
      0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);

    &:hover {
      background-color: #6979f8;
    }

    .amount {
      font-size: 16px;
      font-weight: 600;
      margin-left: 8px;
      height: 18px;
      display: flex;
      align-items: center;
    }
  }
`;
