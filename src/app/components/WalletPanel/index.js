import React from 'react';
import { StyledWalletPanel, StyledHeader, StyledBody } from './styles';

const WalletPanel = ({
  name,
  actionName,
  actionHandler,
  content,
  wallet,
  ...rest
}) => {
  return (
    <StyledWalletPanel {...rest}>
      <StyledHeader>
        <h3>{name}</h3>
        <span onClick={() => actionHandler()}>{actionName}</span>
      </StyledHeader>
      <StyledBody>{content && content}</StyledBody>
    </StyledWalletPanel>
  );
};

export default WalletPanel;
