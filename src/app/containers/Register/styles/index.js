import styled from 'styled-components';
import Button from 'app/components/Button';
import { media } from 'styles/media';

export const StyledGoogleButton = styled(Button)``;

export const StyledFacebookButton = styled(Button)``;

export const StyledRegister = styled.div`
  ${media.mobile`
    .register-page {
      flex-direction: column;
      margin: 0 !important;
      .img-banner{
        padding: 0 !important;
        max-width: 50%;
      }
      .form-register{
        max-width: 100%;
        .login-form-title{
          text-align: center;
        }
      }
    }
  `}
`;
