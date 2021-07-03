import { memo } from 'react';
import { StyledInputNumber } from './styles';

const InputNumber = ({ ...rest }) => {
  return <StyledInputNumber {...rest} />;
};

export default memo(InputNumber);
