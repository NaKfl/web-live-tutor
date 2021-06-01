import React from 'react';
import { StyledWalletChart } from './styles';
import { Line } from '@ant-design/charts';
import { COLOR } from 'styles/colorPalette';

const WalletChart = ({ statistics = [], ...rest }) => {
  const config = {
    data: statistics,
    xField: 'time',
    yField: 'total',
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: `${COLOR.CORNFLOWER}`,
        lineWidth: 2,
      },
    },
  };
  return (
    <StyledWalletChart {...rest}>
      <Line {...config} />
    </StyledWalletChart>
  );
};

export default WalletChart;
