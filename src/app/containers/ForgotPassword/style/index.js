import styled from 'styled-components';

export const CoverForgot = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Cover = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  * > {
    margin-bottom: 28px;
  }
  width: 340px;
  p {
    letter-spacing: 1.5px;
    font-size: 0.8rem;
  }
  .form {
    width: 100%;
    input {
      width: 100%;
    }
    .ant-form-item {
      width: 100% !important;
      max-width: 560px !important;
    }
    button {
      align-self: center;
    }
    .button {
      margin-top: 10px;
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
`;
