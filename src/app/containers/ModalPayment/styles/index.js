import styled from 'styled-components';
import { Modal } from 'antd';
import { media } from 'styles/media';

export const StyledModal = styled(Modal)`
  width: 600px !important;
  .ant-modal-body {
    padding: 22px 24px 10px 24px !important;
  }
  .payment-title {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 0;
  }
  p {
    margin: 0;
  }
  .ant-modal-content {
    border-radius: 10px;
    overflow: auto;
    max-width: 80vh;

    ${media.mobile`
      ::-webkit-scrollbar {
        display: none;
      }
    `};
  }
  .payment-collapse {
    .ant-collapse-item {
      border: 1px solid #d9d9d9;
      margin-bottom: 15px;

      .payment-img-header {
        width: 30px;
        height: 30px;
      }

      .option-title {
        margin-left: 15px;
        .header-content-first {
          font-size: 14px;
          font-weight: 700;
        }
        .header-content-second {
          font-size: 12px;
        }
      }
    }

    .ant-collapse-content {
      .bank-img-thumbnail {
        height: 45px;
        width: 75px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
        max-width: 100%;
      }
      .payment-form-recharge-paypal {
        padding-top: 20px;
        width: 361px;
        margin: 0 auto;
        input {
          text-align: center;
        }
        .deposit-button {
          margin-bottom: 10px;
        }
        .ant-form-item-control {
          display: flex;
          justify-content: center;
          align-items: center;
          .ant-form-item-control-input {
            width: 70%;
          }
        }
      }
      .payment-form-recharge {
        width: 361px;
        margin: 0 auto;
        input {
          text-align: center;
        }
        .deposit-button {
          margin-bottom: 10px;
        }
        .ant-form-item-control {
          display: flex;
          justify-content: center;
          align-items: center;
          .ant-form-item-control-input {
            width: 70%;
          }
          .ant-form-item-control-input-content {
            display: flex;
            justify-content: center;
          }
        }
      }
    }
  }
`;
