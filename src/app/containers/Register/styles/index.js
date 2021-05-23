import styled from 'styled-components';
import Button from 'app/components/Button';
import { media } from 'styles/media';
import { COLOR } from 'styles/colorPalette';

export const StyledGoogleButton = styled(Button)``;

export const StyledFacebookButton = styled(Button)``;

export const StyledRegister = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .img-banner {
    img {
      height: 470px;
      width: auto;
    }
  }

  ${media.mobile`
    .register-page {
      flex-direction: column;
      margin: 0;
      .img-banner{
        padding: 0;
        max-width: 50%;
      }
      .form-register{
        max-width: 100%;
        .register-form-title{
          text-align: center;
        }
      }
    }
  `}

  .form-register {
    .register-form-title {
      font-size: 32px;
      margin-bottom: 22px;
      font-weight: 600;
    }
    .ant-form-item {
    }
    .ant-form-item-control-input-content input[id='email'],
    .ant-form-item-control-input-content .ant-input-affix-wrapper {
      width: 320px;
    }
    .footer-text {
      margin-bottom: 10px;
      width: 320px;
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      span {
        margin-right: 5px;
      }
      a {
        color: ${COLOR.CORNFLOWER};
      }
    }
    .register-btn {
      width: 320px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      height: 44px;
    }
    .divider {
      width: 320px;
      margin-top: 10px;
      margin-bottom: 0;
      font-size: 15px;
    }
    .register-service-btn {
      width: 320px;
      display: flex;
      justify-content: center;
      & > * {
        display: flex;
        justify-content: center;
        margin: 0;
      }
    }
  }
`;

export const CoverRegister = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledLogo = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
  background-color: transparent;
  box-shadow: -3px 3px 1px -2px rgb(0 0 0 / 10%),
    -3px 2px 2px 0px rgb(0 0 0 / 7%), -3px 1px 5px 0px rgb(0 0 0 / 4%);
  opacity: 0.9;
  transition: ease 0.2s;
  &:hover {
    opacity: 1;
  }
`;
