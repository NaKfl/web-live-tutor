import styled from 'styled-components';
import Button from 'app/components/Button';

export const StyledGoogleButton = styled(Button)``;

export const StyledFacebookButton = styled(Button)``;

export const StyledLogin = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 50px;

  .login-form {
    width: 300px;
    display: flex;
    flex-direction: column;

    .login-form-title {
      margin-bottom: 24px;
    }
  }
`;
