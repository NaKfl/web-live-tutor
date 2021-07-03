import { memo } from 'react';
import { StyledInputNumber } from './styles';

const InputNumber = ({ ...rest }) => {
  return <StyledInputNumber defaultValue={0} {...rest} />;
};

export default memo(InputNumber);
