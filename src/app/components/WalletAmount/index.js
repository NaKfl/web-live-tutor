import React from 'react';
import { StyledWalletAmount } from './styles';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WalletAmount = ({ wallet, onClick, ...rest }) => {
  const { amount } = wallet;
  return (
    <StyledWalletAmount {...rest} onClick={onClick}>
      <div className="wrapper">
        <FontAwesomeIcon icon={faPlus} style={{ fontSize: 13 }} />
        <span className="amount">
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(amount)}
        </span>
      </div>
    </StyledWalletAmount>
  );
};

export default WalletAmount;
