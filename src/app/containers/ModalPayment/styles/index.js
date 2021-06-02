import styled from 'styled-components';
import { Modal } from 'antd';

export const StyledModal = styled(Modal)`
  width: 600px !important;
  .ant-modal-body {
    padding: 24px 24px 0px 24px !important;
  }
  .payment-title {
    text-align: center;
  }
  p {
    margin: 0;
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
      .payment-form-recharge {
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
            > input {
              text-align: center;
            }
          }
        }
      }
    }
  }
`;
