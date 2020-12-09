import React, { memo } from 'react';
import Title from 'app/components/Title';
import { StyledDashboard } from './styles';

const Dashboard = memo(() => {
  return (
    <StyledDashboard>
      <Title>Hello World !</Title>
    </StyledDashboard>
  );
});

export default memo(Dashboard);
