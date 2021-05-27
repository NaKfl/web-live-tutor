import React from 'react';
import { StyledWalletAmount } from './styles';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button';

const WalletAmount = ({ wallet, ...rest }) => {
  const { amount } = wallet;
  return (
    <StyledWalletAmount {...rest}>
      <Button className="wrapper">
        <FontAwesomeIcon icon={faWallet} style={{ fontSize: 17 }} />
        <span className="amount">
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(amount)}
        </span>
      </Button>
    </StyledWalletAmount>
  );
};

export default WalletAmount;
