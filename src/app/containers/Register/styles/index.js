import styled from 'styled-components';
import Button from 'app/components/Button';

export const StyledGoogleButton = styled(Button)``;

export const StyledFacebookButton = styled(Button)``;

export const StyledRegister = styled.div`
  height: 100%;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start !important;
  margin-top: 50px;
  .ant-image-img {
    width: 500px;
    margin-right: 20px;
  }
  .login-form {
    width: 300px;
    display: flex;
    flex-direction: column;

    .login-form-title {
      margin-bottom: 24px;
    }
  }
`;
