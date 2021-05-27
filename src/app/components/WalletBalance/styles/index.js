import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';

export const StyledWalletBalance = styled.div`
  display: flex;
  width: 100%;
`;

export const StyledLeftPart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 30px;
  box-shadow: 0 0 5px 0 rgb(0 0 0 / 16%);
  text-align: center;
  flex: 1;
  margin-right: 15px;
  padding: 30px 0 38px 0;
  h3 {
    font-size: 24px;
    font-weight: 600;
    height: 27px;
    color: #2f252d;
  }
  h1 {
    font-size: 50px;
    font-weight: 700;
    letter-spacing: 2px;
    color: ${COLOR.CORNFLOWER};
    margin-bottom: 0;
  }
  p {
    margin-bottom: 20px;
    color: #837b98;
    font-size: 16px;
  }
`;

export const StyledInOutCome = styled.div`
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  padding-left: 70px;
  .wrapper {
    display: flex;
    align-items: flex-end;
    .icon {
      font-size: 32px;
      margin-right: 20px;
    }
    .income-icon {
      color: #55bcb3;
    }
    .outcome-icon {
      color: #fc7067;
    }
    .amount {
      p {
        margin-bottom: 3px;
        font-size: 24px;
        font-weight: 600;
        height: 27px;
        color: #2f252d;
      }
      h3 {
        font-size: 40px;
        font-weight: 700;
        margin-bottom: 0;
        height: 49px;
        letter-spacing: 2px;
      }
    }
    .income {
      color: #55bcb3;
    }
    .outcome {
      color: #fc7067;
    }
  }
`;

export const StyledRightPart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 30px;
  box-shadow: 0 0 5px 0 rgb(0 0 0 / 16%);
  text-align: center;
  flex: 1;
  margin-left: 15px;
  padding: 40px 0 48px 0;
`;
